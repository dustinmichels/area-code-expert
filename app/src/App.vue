<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import PhoneShell from './components/PhoneShell.vue'
import ChatScreen from './components/ChatScreen.vue'
import HomeScreen from './components/HomeScreen.vue'
import ResultsScreen from './components/ResultsScreen.vue'
import namesData from './assets/names.json'

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
const currentRoundIndex = ref(0) // 0 to 3
const roundResults = ref<string[]>([])
const showResults = ref(false)

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

const handleStartGame = () => {
  if (contacts.value.length > 0) {
    // Shuffle contacts and pick 4
    const shuffled = [...contacts.value].sort(() => 0.5 - Math.random())
    const selectedRaw = shuffled.slice(0, 4)

    gameQueue.value = selectedRaw.map((rawContact) => {
      const randomNameIndex = Math.floor(Math.random() * namesData.names.length)
      const randomName = namesData.names[randomNameIndex] || 'Unknown'

      const messages = rawContact.messages || []
      const randomMessage =
        (messages.length > 0 ? messages[Math.floor(Math.random() * messages.length)] : 'Hello!') ||
        'Hello!'

      return {
        areaCode: rawContact.areaCode,
        state: rawContact.state,
        cities: rawContact.cities,
        message: randomMessage,
        name: randomName,
      }
    })

    currentRoundIndex.value = 0
    roundResults.value = []
    gameStartTime.value = Date.now()
    gameDuration.value = 0
  }
}

const handleNextRound = () => {
  currentRoundIndex.value++
  if (currentRoundIndex.value >= 4) {
    showResults.value = true
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
        :key="activeContact.areaCode"
        :contact="activeContact"
        :round-results="roundResults"
        :start-time="gameStartTime"
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
      <HomeScreen v-else @start="handleStartGame" />
    </PhoneShell>
  </main>
</template>

<style scoped></style>
