<script setup lang="ts">
import { computed } from 'vue'

interface ContactData {
  name: string
  areaCode: string
  state: string
  cities: string
  message: string
}

const props = defineProps<{
  results: string[]
  history: ContactData[]
  duration: number
}>()

const emit = defineEmits(['home'])

const correctCount = computed(() => props.results.filter((r) => r === 'green').length)
const hintCount = computed(() => props.results.filter((r) => r === 'yellow').length)
const incorrectCount = computed(() => props.results.filter((r) => r === 'red').length)

const formattedDuration = computed(() => {
  const totalSeconds = Math.floor(props.duration / 1000)
  const m = Math.floor(totalSeconds / 60)
  const s = totalSeconds % 60
  return `${m}m ${s}s`
})

const shareResults = () => {
  const emojiMap: Record<string, string> = {
    green: '🟢',
    yellow: '🟡',
    red: '🔴',
  }
  const emojiString = props.results.map((r) => emojiMap[r] || '⚪').join('')

  const text = `AreaCodeExpert #1\n${emojiString}\nTime: ${formattedDuration.value}\nhttps://area-code-expert.netlify.app/`

  if (navigator.share) {
    navigator.share({
      title: 'Area Code Hero Results',
      text: text,
    })
  } else {
    navigator.clipboard.writeText(text)
    alert('Results copied to clipboard!')
  }
}
</script>

<template>
  <div class="flex flex-col h-full bg-[#cbd2d9]">
    <!-- Header -->
    <div
      class="h-[44px] flex justify-between items-center px-[5px] text-white border-b border-[#56687e] shadow-[0_1px_2px_rgba(0,0,0,0.3)] bg-[linear-gradient(to_bottom,#b2bed7_0%,#738aba_50%,#5e77aa_50%,#526da4_100%)] shrink-0"
    >
      <button
        @click="emit('home')"
        class="relative h-[30px] pl-[12px] pr-[8px] flex items-center justify-center text-white font-bold text-[13px] [text-shadow:0_-1px_0_rgba(0,0,0,0.6)] z-10 filter drop-shadow-[0_1px_0_rgba(0,0,0,0.2)] cursor-pointer"
      >
        <div
          class="absolute inset-0 bg-[linear-gradient(to_bottom,#7a94b8_0%,#526f96_50%,#4a6890_51%,#2f4f7d_100%)] border border-[#304c70] -z-10 [clip-path:polygon(12px_0,100%_0,100%_100%,12px_100%,0_50%)] rounded-r-[5px]"
        ></div>
        <div
          class="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.35)_0%,rgba(255,255,255,0.1)_50%,rgba(255,255,255,0)_50%)] -z-10 [clip-path:polygon(12px_0,100%_0,100%_100%,12px_100%,0_50%)] rounded-r-[5px]"
        ></div>
        Home
      </button>

      <h1
        class="text-[20px] font-bold m-0 [text-shadow:0_-1px_0_rgba(0,0,0,0.6)] flex-1 text-center font-['Helvetica_Neue'] tracking-tight"
      >
        Results
      </h1>
      <div class="w-[50px]"></div>
    </div>

    <!-- Content -->
    <div class="flex-1 overflow-y-auto p-4 flex flex-col gap-6 items-center text-center">
      <!-- Summary -->
      <div
        class="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/50 w-full max-w-sm"
      >
        <h2 class="text-2xl font-bold text-gray-800 mb-2">Good game!</h2>
        <div class="text-3xl font-bold text-blue-600 mb-4">{{ formattedDuration }}</div>
        <p class="text-gray-700 leading-relaxed">
          You got
          <span class="font-bold text-green-600">{{ correctCount }} correct (without a hint)</span>,
          <span class="font-bold text-yellow-600">{{ hintCount }} correct (with a hint)</span>, and
          <span class="font-bold text-red-600">{{ incorrectCount }} incorrect</span>.
        </p>
      </div>

      <!-- Review List -->
      <div class="w-full max-w-sm">
        <h3 class="text-left text-gray-600 font-bold mb-2 ml-1 text-sm uppercase tracking-wider">
          To Review
        </h3>
        <ul class="flex flex-col gap-2">
          <li
            v-for="(contact, index) in history"
            :key="contact.areaCode"
            class="bg-white rounded-lg p-3 shadow-sm border border-gray-200 flex items-center justify-between text-left"
          >
            <div>
              <span class="font-bold text-lg text-gray-800 w-12 inline-block">{{
                contact.areaCode
              }}</span>
              <span class="text-gray-600 text-sm"
                >= {{ contact.cities }} in {{ contact.state }}</span
              >
            </div>
            <!-- Status Dot -->
            <div
              class="w-3 h-3 rounded-full shrink-0"
              :class="{
                'bg-green-500': results[index] === 'green',
                'bg-yellow-400': results[index] === 'yellow',
                'bg-red-500': results[index] === 'red',
                'bg-gray-300': !results[index],
              }"
            ></div>
          </li>
        </ul>
      </div>

      <!-- Footer Actions -->
      <div class="w-full max-w-sm mt-auto pt-4 flex flex-col gap-3">
        <button
          @click="shareResults"
          class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl shadow-[0_2px_5px_rgba(0,0,0,0.2)] active:scale-95 transition-all flex items-center justify-center gap-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
            />
          </svg>
          Share Results
        </button>
      </div>
    </div>
  </div>
</template>
