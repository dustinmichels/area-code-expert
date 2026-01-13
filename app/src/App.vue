<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import PhoneShell from './components/PhoneShell.vue'
import ChatScreen from './components/ChatScreen.vue'
import HomeScreen from './components/HomeScreen.vue'
import ResultsScreen from './components/ResultsScreen.vue'
import namesData from './assets/names.json'
import { mulberry32, generateDailySeed } from './utils/seededRandom'

interface ContactData {
  name: string
  areaCode: string
  state: string
  cities: string
  message: string
}

interface RawContactData {
  areaCode: string
  state: string
  cities: string
  messages: string[]
}

const contacts = ref<RawContactData[]>([])
const gameQueue = ref<ContactData[]>([])
const currentRoundIndex = ref(0) // 0 to 3 (or infinite)
const roundResults = ref<string[]>([])
const showResults = ref(false)
const gameMode = ref<'daily' | 'practice'>('daily')

const gameStartTime = ref<number>(0)
const gameDuration = ref<number>(0)

const activeContact = computed(() => {
  if (gameQueue.value.length > currentRoundIndex.value) {
    return gameQueue.value[currentRoundIndex.value]
  }
  return null
})

onMounted(async () => {
  try {
    const response = await fetch('/data/data.json')
    const data = await response.json()
    if (data && data.length > 0) {
      contacts.value = data
    }
  } catch (error) {
    console.error('Failed to load data:', error)
  }
})

const goHome = () => {
  gameQueue.value = []
  currentRoundIndex.value = 0
  roundResults.value = []
  showResults.value = false
  gameStartTime.value = 0
  gameDuration.value = 0
}

const generateContact = (rawContact: RawContactData, rng: () => number): ContactData => {
  const randomNameIndex = Math.floor(rng() * namesData.names.length)
  const randomName = namesData.names[randomNameIndex] || 'Unknown'

  const messages = rawContact.messages || []
  const randomMessage =
    (messages.length > 0 ? messages[Math.floor(rng() * messages.length)] : 'Hello!') || 'Hello!'

  return {
    areaCode: rawContact.areaCode,
    state: rawContact.state,
    cities: rawContact.cities,
    message: randomMessage,
    name: randomName,
  }
}

const handleStartGame = (seed?: number) => {
  if (contacts.value.length > 0) {
    // Determine RNG source
    let rng = Math.random
    if (typeof seed === 'number') {
      rng = mulberry32(seed)
    }

    // Shuffle contacts and pick 4 using Fisher-Yates for consistency
    const shuffled = [...contacts.value]
    let m = shuffled.length
    while (m) {
      const i = Math.floor(rng() * m--)
      const t = shuffled[m]!
      shuffled[m] = shuffled[i]!
      shuffled[i] = t
    }
    const selectedRaw = shuffled.slice(0, 4)

    gameQueue.value = selectedRaw.map((raw) => generateContact(raw, rng))

    currentRoundIndex.value = 0
    roundResults.value = []
    gameStartTime.value = Date.now()
    gameDuration.value = 0
  }
}

const handleDailyChallenge = () => {
  gameMode.value = 'daily'
  const seed = generateDailySeed()
  handleStartGame(seed)
}

const handlePracticeMode = () => {
  gameMode.value = 'practice'
  handleStartGame() // uses Math.random
}

const handleNextRound = () => {
  currentRoundIndex.value++

  if (gameMode.value === 'practice') {
    // In practice mode, add another random contact if we ran out (or just always keep buffer)
    // currently we started with 4. Let's just add one more each time we advance to keep it infinite
    if (contacts.value.length > 0) {
      const rng = Math.random
      const randomIdx = Math.floor(rng() * contacts.value.length)
      const raw = contacts.value[randomIdx]
      gameQueue.value.push(generateContact(raw!, rng))
    }
  } else {
    // Daily mode: strict 4 rounds
    if (currentRoundIndex.value >= 4) {
      showResults.value = true
    }
  }
}

const handleRoundComplete = (result: string) => {
  roundResults.value.push(result)

  if (roundResults.value.length === 4) {
    gameDuration.value = Date.now() - gameStartTime.value
  }
}
</script>

<template>
  <main>
    <PhoneShell>
      <ChatScreen
        v-if="activeContact"
        :key="activeContact.areaCode + '-' + currentRoundIndex"
        :contact="activeContact"
        :round-results="roundResults"
        :start-time="gameStartTime"
        :is-practice="gameMode === 'practice'"
        @back="goHome"
        @next-round="handleNextRound"
        @round-complete="handleRoundComplete"
      />
      <ResultsScreen
        v-else-if="showResults"
        :results="roundResults"
        :history="gameQueue"
        :duration="gameDuration"
        @home="goHome"
      />
      <HomeScreen v-else @daily="handleDailyChallenge" @practice="handlePracticeMode" />
    </PhoneShell>
  </main>
</template>

<style scoped></style>
