<script setup lang="ts">
import { ref, onMounted, computed, nextTick, watch } from 'vue'
import statesData from '../assets/states.json'

// Define emits
const emit = defineEmits(['back'])

interface ContactData {
  name: string
  areaCode: string
  state: string
  cities: string
  message: string
}

const props = defineProps<{
  contact: ContactData
}>()

const userInput = ref('')

interface Message {
  id: number
  text: string
  isUser: boolean
  isBlurred?: boolean
}

const messages = ref<Message[]>([])
const isTyping = ref(false)
const chatContainer = ref<HTMLElement | null>(null)

const scrollToBottom = async () => {
  await nextTick()
  if (chatContainer.value) {
    chatContainer.value.scrollTop = chatContainer.value.scrollHeight
  }
}

watch(messages, scrollToBottom, { deep: true })
watch(isTyping, scrollToBottom)

const states = statesData.states

onMounted(() => {
  if (props.contact) {
    messages.value = [
      {
        id: Date.now(),
        text: props.contact.message,
        isUser: false,
        isBlurred: true,
      },
    ]
  }
})

const formattedPhone = computed(() => {
  return `${props.contact.areaCode}-XXX-XXXX`
})

// Removed filteredStates and selectState logic as we are switching to a select element

const sendMessage = () => {
  if (!userInput.value) return

  // 1. Add user message
  messages.value.push({
    id: Date.now(),
    text: userInput.value,
    isUser: true,
  })

  // 2. Check correctness
  const guessedState = states.find((s) => s.name.toLowerCase() === userInput.value.toLowerCase())
  const isCorrect = guessedState?.code === props.contact.state

  // 3. Clear input
  userInput.value = ''

  // 4. Show typing indicators
  isTyping.value = true

  // 5. Add response
  setTimeout(() => {
    isTyping.value = false
    messages.value.push({
      id: Date.now() + 1,
      text: isCorrect ? 'Correct!' : 'Incorrect',
      isUser: false,
    })

    if (isCorrect) {
      setTimeout(() => {
        isTyping.value = true
        setTimeout(() => {
          isTyping.value = false
          messages.value.push({
            id: Date.now() + 2,
            text: `${props.contact.areaCode} is the area code for ${props.contact.cities}, ${props.contact.state}`,
            isUser: false,
          })
        }, 1500)
      }, 500)
    }
  }, 1500)
}
</script>

<template>
  <div class="flex flex-col h-full bg-[#cbd2d9]">
    <!-- Header -->
    <div
      class="h-[44px] flex justify-between items-center px-[5px] text-white border-b border-[#56687e] shadow-[0_1px_2px_rgba(0,0,0,0.3)] bg-[linear-gradient(to_bottom,#b2bed7_0%,#738aba_50%,#5e77aa_50%,#526da4_100%)] shrink-0"
    >
      <!-- Back Button -->
      <button
        @click="emit('back')"
        class="relative h-[30px] pl-[12px] pr-[8px] flex items-center justify-center text-white font-bold text-[13px] [text-shadow:0_-1px_0_rgba(0,0,0,0.6)] z-10 filter drop-shadow-[0_1px_0_rgba(0,0,0,0.2)] cursor-pointer"
      >
        <div
          class="absolute inset-0 bg-[linear-gradient(to_bottom,#7a94b8_0%,#526f96_50%,#4a6890_51%,#2f4f7d_100%)] border border-[#304c70] -z-10 [clip-path:polygon(12px_0,100%_0,100%_100%,12px_100%,0_50%)] rounded-r-[5px]"
        ></div>
        <!-- Inner bevel reflection for back button -->
        <div
          class="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.35)_0%,rgba(255,255,255,0.1)_50%,rgba(255,255,255,0)_50%)] -z-10 [clip-path:polygon(12px_0,100%_0,100%_100%,12px_100%,0_50%)] rounded-r-[5px]"
        ></div>
        Home
      </button>

      <h1
        class="text-[20px] font-bold m-0 [text-shadow:0_-1px_0_rgba(0,0,0,0.6)] flex-1 text-center font-['Helvetica_Neue'] tracking-tight"
      >
        {{ props.contact?.name || '...' }}
      </h1>

      <!-- Edit Button -->
      <button
        class="border border-[#324f73] rounded-[5px] text-white font-bold text-[12px] px-[12px] py-[5px] shadow-[0_1px_0_rgba(255,255,255,0.2),inset_0_1px_1px_rgba(255,255,255,0.2)] bg-[linear-gradient(to_bottom,#7a94b8_0%,#526f96_50%,#4a6890_51%,#2f4f7d_100%)] [text-shadow:0_-1px_0_rgba(0,0,0,0.6)] cursor-pointer active:brightness-90"
      >
        Edit
      </button>
    </div>

    <!-- Content Area -->
    <div class="flex-1 flex flex-col relative overflow-hidden bg-[#cbd2d9]">
      <!-- Contact Bar -->
      <div
        class="bg-[rgba(255,255,255,0.9)] p-[10px] border-b border-[#aeb5bf] text-sm flex items-center z-10 shadow-sm backdrop-blur-sm sticky top-0"
      >
        <h2 class="m-0 font-normal text-[#888] flex gap-2">
          To: <span class="text-black font-normal">{{ formattedPhone }}</span>
        </h2>
      </div>

      <div
        class="p-[10px] flex flex-col gap-[10px] overflow-y-auto pb-4"
        v-if="props.contact"
        ref="chatContainer"
      >
        <div
          v-for="msg in messages"
          :key="msg.id"
          class="max-w-[75%] w-fit px-[15px] py-[8px] rounded-[15px] text-[15px] leading-tight relative shadow-[0_1px_3px_rgba(0,0,0,0.3)] text-black border"
          :class="[
            msg.isUser
              ? 'self-end mr-[5px] bg-[linear-gradient(to_bottom,#d9f7be_0%,#d9f7be_45%,#b5e884_50%,#b5e884_100%)] border-[#92c661]'
              : 'self-start ml-[5px] bg-[linear-gradient(to_bottom,#e5e5ea_0%,#e5e5ea_45%,#d5d5d5_50%,#d5d5d5_100%)] border-[#c3c3c3]',
            msg.isBlurred ? 'cursor-pointer' : '',
          ]"
          @click="msg.isBlurred && (msg.isBlurred = false)"
        >
          <div
            v-if="msg.isBlurred"
            class="absolute inset-0 flex items-center justify-center z-10 font-bold text-gray-500 bg-white/50 rounded-[15px] select-none"
          >
            Hint
          </div>
          <p class="m-0 font-normal" :class="{ 'blur-sm select-none': msg.isBlurred }">
            {{ msg.text }}
          </p>

          <!-- Tail (SVG) -->
          <!-- Received (Left) -->
          <div
            v-if="!msg.isUser"
            class="absolute bottom-0 left-[-9px] w-[20px] h-[20px] z-[-1] overflow-hidden"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M20 20H0C10 20 18 10 20 0V20Z" fill="#d5d5d5" />
              <path d="M0 20C10 20 18 10 20 0" stroke="#c3c3c3" stroke-width="1" />
              <line x1="0" y1="20" x2="20" y2="20" stroke="#c3c3c3" stroke-width="1" />
            </svg>
          </div>

          <!-- Sent (Right) -->
          <div
            v-else
            class="absolute bottom-0 right-[-9px] w-[20px] h-[20px] z-[-1] overflow-hidden transform scale-x-[-1]"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M20 20H0C10 20 18 10 20 0V20Z" fill="#b5e884" />
              <path d="M0 20C10 20 18 10 20 0" stroke="#92c661" stroke-width="1" />
              <line x1="0" y1="20" x2="20" y2="20" stroke="#92c661" stroke-width="1" />
            </svg>
          </div>
        </div>

        <!-- Typing Indicator -->
        <div
          v-if="isTyping"
          class="max-w-[75%] w-fit px-[15px] py-[12px] rounded-[15px] relative shadow-[0_1px_3px_rgba(0,0,0,0.3)] bg-[linear-gradient(to_bottom,#e5e5ea_0%,#e5e5ea_45%,#d5d5d5_50%,#d5d5d5_100%)] border border-[#c3c3c3] self-start ml-[5px]"
        >
          <div class="typing-dots flex gap-[4px]">
            <span class="w-[6px] h-[6px] bg-[#8e8e93] rounded-full"></span>
            <span class="w-[6px] h-[6px] bg-[#8e8e93] rounded-full"></span>
            <span class="w-[6px] h-[6px] bg-[#8e8e93] rounded-full"></span>
          </div>
          <!-- Tail for Typing Indicator -->
          <div class="absolute bottom-0 left-[-9px] w-[20px] h-[20px] z-[-1] overflow-hidden">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M20 20H0C10 20 18 10 20 0V20Z" fill="#d5d5d5" />
              <path d="M0 20C10 20 18 10 20 0" stroke="#c3c3c3" stroke-width="1" />
              <line x1="0" y1="20" x2="20" y2="20" stroke="#c3c3c3" stroke-width="1" />
            </svg>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer / Input Area -->
    <div
      class="h-[44px] bg-[linear-gradient(to_bottom,#dbe2e9_0%,#b9c2ce_100%)] flex items-center px-[6px] border-t border-[#8e939d] shadow-[inset_0_1px_0_rgba(255,255,255,0.5)] relative shrink-0"
    >
      <div class="relative flex-1 mx-[4px]">
        <select
          v-model="userInput"
          @keyup.enter="sendMessage"
          class="w-full h-[28px] bg-[#fdfdfd] border border-[#aeb5bf] rounded-[14px] shadow-[inset_0_1px_4px_rgba(0,0,0,0.2)] px-3 text-sm outline-none appearance-none"
        >
          <option value="" disabled selected>Guess the state...</option>
          <option v-for="state in states" :key="state.code" :value="state.name">
            {{ state.name }}
          </option>
        </select>
        <!-- Custom arrow indicator -->
        <div class="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
          <svg
            width="10"
            height="6"
            viewBox="0 0 10 6"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 1L5 5L9 1"
              stroke="#8e8e93"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
      </div>

      <button
        :disabled="!userInput"
        @click="sendMessage"
        class="ml-2 border border-[#1d4d80] rounded-[5px] text-white font-bold text-[14px] px-[12px] py-[4px] shadow-[0_1px_0_rgba(255,255,255,0.3)] bg-[linear-gradient(to_bottom,#8ec1f6_0%,#468ccf_50%,#4081c0_51%,#2166b1_100%)] [text-shadow:0_-1px_0_rgba(0,0,0,0.4)] disabled:opacity-50 disabled:grayscale disabled:cursor-not-allowed"
      >
        Send
      </button>
    </div>
  </div>
</template>

<style scoped>
.typing-dots span {
  animation: bounce 1.4s infinite ease-in-out both;
}

.typing-dots span:nth-child(1) {
  animation-delay: -0.32s;
}

.typing-dots span:nth-child(2) {
  animation-delay: -0.16s;
}

@keyframes bounce {
  0%,
  80%,
  100% {
    transform: scale(0);
  }
  40% {
    transform: scale(1);
  }
}
</style>
