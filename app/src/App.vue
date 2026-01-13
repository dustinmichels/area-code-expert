<script setup lang="ts">
import { ref, onMounted } from 'vue'
import PhoneShell from './components/PhoneShell.vue'
import ChatScreen from './components/ChatScreen.vue'
import HomeScreen from './components/HomeScreen.vue'
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
  message: string
}

const contacts = ref<RawContactData[]>([])
const activeContact = ref<ContactData | null>(null)

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
  activeContact.value = null
}

const handleStartGame = () => {
  if (contacts.value.length > 0) {
    const randomIndex = Math.floor(Math.random() * contacts.value.length)
    // Pick a random name
    const rawContact = contacts.value[randomIndex]
    if (!rawContact) return

    const randomNameIndex = Math.floor(Math.random() * namesData.names.length)
    const randomName = namesData.names[randomNameIndex] || 'Unknown'

    activeContact.value = {
      ...rawContact,
      name: randomName,
    }
  }
}
</script>

<template>
  <main>
    <PhoneShell>
      <ChatScreen v-if="activeContact" :contact="activeContact" @back="goHome" />
      <HomeScreen v-else @start="handleStartGame" />
    </PhoneShell>
  </main>
</template>

<style scoped></style>
