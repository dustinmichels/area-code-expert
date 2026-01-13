<script setup lang="ts">
import { ref, onMounted } from 'vue'
import PhoneShell from './PhoneShell.vue'
import ChatScreen from './ChatScreen.vue'
import HomeScreen from './HomeScreen.vue'

interface ContactData {
  name: string
  areaCode: string
  state: string
  message: string
}

const contacts = ref<ContactData[]>([])
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
    activeContact.value = contacts.value[randomIndex] || null
  }
}

const openChat = (contact: ContactData) => {
  activeContact.value = contact
}
</script>

<template>
  <PhoneShell>
    <ChatScreen v-if="activeContact" :contact="activeContact" @back="goHome" />
    <HomeScreen v-else @start="handleStartGame" />
  </PhoneShell>
</template>
