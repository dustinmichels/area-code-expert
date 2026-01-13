<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import statesData from '../assets/states.json'

interface ContactData {
  name: string
  areaCode: string
  state: string
  message: string
}

const contact = ref<ContactData | null>(null)
const userInput = ref('')

interface Message {
  id: number
  text: string
  isUser: boolean
}

const messages = ref<Message[]>([])

const states = statesData.states

onMounted(async () => {
  try {
    const response = await fetch('/data/data.json')
    const data = await response.json()
    if (data && data.length > 0) {
      const randomIndex = Math.floor(Math.random() * data.length)
      contact.value = data[randomIndex]
      if (contact.value) {
        messages.value = [
          {
            id: Date.now(),
            text: contact.value.message,
            isUser: false,
          },
        ]
      }
    }
  } catch (error) {
    console.error('Failed to load data:', error)
  }
})

const formattedPhone = computed(() => {
  if (!contact.value) return ''
  return `${contact.value.areaCode}-XXX-XXXX`
})

const filteredStates = computed(() => {
  if (!userInput.value) return []
  const input = userInput.value.toLowerCase()
  // Don't show suggestions if the input is exactly a state name
  if (states.some((s) => s.name.toLowerCase() === input)) return []
  return states.filter((s) => s.name.toLowerCase().includes(input))
})

const isValidState = computed(() => {
  return states.some((s) => s.name.toLowerCase() === userInput.value.toLowerCase())
})

const selectState = (name: string) => {
  userInput.value = name
}

const sendMessage = () => {
  if (!userInput.value || !contact.value) return

  // 1. Add user message
  messages.value.push({
    id: Date.now(),
    text: userInput.value,
    isUser: true,
  })

  // 2. Check correctness
  const guessedState = states.find((s) => s.name.toLowerCase() === userInput.value.toLowerCase())
  const isCorrect = guessedState?.code === contact.value.state

  // 3. Add response
  setTimeout(() => {
    messages.value.push({
      id: Date.now() + 1,
      text: isCorrect ? 'Correct!' : 'Incorrect',
      isUser: false,
    })
  }, 500)

  // 4. Clear input
  userInput.value = ''
}
</script>

<template>
  <div
    class="w-full max-w-[375px] h-[667px] font-sans text-black flex flex-col mx-auto border border-[#ccc] shadow-[0_0_20px_rgba(0,0,0,0.2)]"
    style="
      background-color: #cbd2d9;
      background-image:
        repeating-linear-gradient(
          transparent,
          transparent 1px,
          rgba(255, 255, 255, 0.2) 1px,
          rgba(255, 255, 255, 0.2) 2px
        ),
        repeating-linear-gradient(
          90deg,
          transparent,
          transparent 1px,
          rgba(255, 255, 255, 0.2) 1px,
          rgba(255, 255, 255, 0.2) 2px
        );
    "
  >
    <!-- Status Bar -->
    <div
      class="h-5 flex justify-between items-center px-[5px] text-xs border-b border-[#7d8591] bg-gradient-to-b from-[#dbe2e9] to-[#b9c2ce]"
    >
      <div class="flex items-center gap-[2px]">
        <div
          class="w-1.5 h-1.5 border border-[#444] rounded-full bg-black shadow-[inset_0_1px_1px_rgba(255,255,255,0.5)]"
        ></div>
        <div
          class="w-1.5 h-1.5 border border-[#444] rounded-full bg-black shadow-[inset_0_1px_1px_rgba(255,255,255,0.5)]"
        ></div>
        <div
          class="w-1.5 h-1.5 border border-[#444] rounded-full bg-black shadow-[inset_0_1px_1px_rgba(255,255,255,0.5)]"
        ></div>
        <div
          class="w-1.5 h-1.5 border border-[#444] rounded-full bg-black shadow-[inset_0_1px_1px_rgba(255,255,255,0.5)]"
        ></div>
        <div
          class="w-1.5 h-1.5 border border-[#444] rounded-full shadow-[inset_0_1px_1px_rgba(255,255,255,0.5)]"
        ></div>
        <span class="ml-1 font-bold text-[#1f1f1f] drop-shadow-[0_1px_0_rgba(255,255,255,0.5)]"
          >AT&T</span
        >
        <span class="wifi-icon"></span>
      </div>
      <div class="font-bold text-[#1f1f1f] drop-shadow-[0_1px_0_rgba(255,255,255,0.5)]">
        10:51 PM
      </div>
      <div class="battery">
        <span class="battery-icon"></span>
      </div>
    </div>

    <!-- Header -->
    <div
      class="h-[44px] flex justify-between items-center px-[5px] text-white border-b border-[#56687e] shadow-[0_1px_2px_rgba(0,0,0,0.3)] bg-[linear-gradient(to_bottom,#b2bed7_0%,#738aba_50%,#5e77aa_50%,#526da4_100%)]"
    >
      <!-- Back Button -->
      <button
        class="relative h-[30px] pl-[12px] pr-[8px] flex items-center justify-center text-white font-bold text-[13px] [text-shadow:0_-1px_0_rgba(0,0,0,0.6)] z-10 filter drop-shadow-[0_1px_0_rgba(0,0,0,0.2)]"
      >
        <div
          class="absolute inset-0 bg-[linear-gradient(to_bottom,#7a94b8_0%,#526f96_50%,#4a6890_51%,#2f4f7d_100%)] border border-[#304c70] -z-10 [clip-path:polygon(12px_0,100%_0,100%_100%,12px_100%,0_50%)] rounded-r-[5px]"
        ></div>
        <!-- Inner bevel reflection for back button -->
        <div
          class="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.35)_0%,rgba(255,255,255,0.1)_50%,rgba(255,255,255,0)_50%)] -z-10 [clip-path:polygon(12px_0,100%_0,100%_100%,12px_100%,0_50%)] rounded-r-[5px]"
        ></div>
        Messages
      </button>

      <h1
        class="text-[20px] font-bold m-0 [text-shadow:0_-1px_0_rgba(0,0,0,0.6)] flex-1 text-center font-['Helvetica_Neue'] tracking-tight"
      >
        {{ contact?.name || '...' }}
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

      <div class="p-[10px] flex flex-col gap-[10px] overflow-y-auto pb-4" v-if="contact">
        <div
          v-for="msg in messages"
          :key="msg.id"
          class="max-w-[75%] w-fit px-[15px] py-[8px] rounded-[15px] text-[15px] leading-tight relative shadow-[0_1px_3px_rgba(0,0,0,0.3)] text-black border"
          :class="[
            msg.isUser
              ? 'self-end mr-[5px] bg-[linear-gradient(to_bottom,#d9f7be_0%,#d9f7be_45%,#b5e884_50%,#b5e884_100%)] border-[#92c661]'
              : 'self-start ml-[5px] bg-[linear-gradient(to_bottom,#e5e5ea_0%,#e5e5ea_45%,#d5d5d5_50%,#d5d5d5_100%)] border-[#c3c3c3]',
          ]"
        >
          <p class="m-0 font-normal">{{ msg.text }}</p>

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
      </div>
    </div>

    <!-- Footer / Input Area -->
    <div
      class="h-[44px] bg-[linear-gradient(to_bottom,#dbe2e9_0%,#b9c2ce_100%)] flex items-center px-[6px] border-t border-[#8e939d] shadow-[inset_0_1px_0_rgba(255,255,255,0.5)] relative"
    >
      <div
        class="camera-btn w-[26px] h-[22px] bg-[#8e96a5] rounded mr-2 border border-[#767d89]"
      ></div>

      <!-- Suggestions List -->
      <div
        v-if="filteredStates.length > 0"
        class="absolute bottom-full mb-1 left-0 w-full bg-white/90 backdrop-blur-sm border border-gray-400 rounded-t-md max-h-[200px] overflow-y-auto z-50 shadow-lg"
      >
        <div
          v-for="state in filteredStates"
          :key="state.code"
          @mousedown.prevent="selectState(state.name)"
          class="px-4 py-2 border-b border-gray-200 last:border-0 hover:bg-[#007aff] hover:text-white cursor-pointer text-sm font-medium text-black transition-colors"
        >
          {{ state.name }}
        </div>
      </div>

      <input
        v-model="userInput"
        type="text"
        placeholder="Guess the state..."
        @keyup.enter="isValidState && sendMessage()"
        class="flex-1 h-[28px] bg-[#fdfdfd] border border-[#aeb5bf] rounded-[14px] mx-[4px] shadow-[inset_0_1px_4px_rgba(0,0,0,0.2)] px-3 text-sm outline-none placeholder-gray-400"
      />

      <button
        :disabled="!isValidState"
        @click="sendMessage"
        class="ml-2 border border-[#1d4d80] rounded-[5px] text-white font-bold text-[14px] px-[12px] py-[4px] shadow-[0_1px_0_rgba(255,255,255,0.3)] bg-[linear-gradient(to_bottom,#8ec1f6_0%,#468ccf_50%,#4081c0_51%,#2166b1_100%)] [text-shadow:0_-1px_0_rgba(0,0,0,0.4)] disabled:opacity-50 disabled:grayscale disabled:cursor-not-allowed"
      >
        Send
      </button>
    </div>
  </div>
</template>
