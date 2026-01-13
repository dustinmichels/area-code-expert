<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import gsap from 'gsap'

const emit = defineEmits(['daily', 'practice'])

const bubbleContainer = ref<HTMLElement | null>(null)
let intervalId: ReturnType<typeof setInterval> | null = null
let lastColumnIndex = -1

const phrases = ['omg', 'c u l8r', 'ily', 'u up?', 'ttyl', 'tysm']
const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8']

const spawnBubble = () => {
  if (!bubbleContainer.value) return

  const el = document.createElement('div')
  el.textContent = phrases[Math.floor(Math.random() * phrases.length)] || ''

  // Random styling
  const color = colors[Math.floor(Math.random() * colors.length)] || '#000'
  const fontSize = 14 + Math.random() * 8
  // Determine position using columns to prevent overlap
  const numColumns = 5
  const colWidth = 100 / numColumns

  // Pick a column different from the last one
  let colIndex = Math.floor(Math.random() * numColumns)
  while (colIndex === lastColumnIndex) {
    colIndex = Math.floor(Math.random() * numColumns)
  }
  lastColumnIndex = colIndex

  // Calculate X position within the chosen column (with some padding)
  // e.g., if colWidth is 20, column 0 is 0-20. We want maybe 2-18 range.
  const padding = 2
  const minX = colIndex * colWidth + padding
  const maxX = (colIndex + 1) * colWidth - padding
  const startX = minX + Math.random() * (maxX - minX)
  // Start mainly from bottom, but some random Y variance to feel natural
  const startY = Math.random() * 50 // 0 to 50px from bottom constraint
  const startRotation = Math.random() * 30 - 15

  // Apply styles
  el.style.position = 'absolute'
  el.style.left = `${startX}%`
  el.style.bottom = `${40 + Math.random() * 60}px` // Start strictly below or at bottom edge
  el.style.transform = `translateX(-50%) rotate(${startRotation}deg)`
  el.style.backgroundColor = color
  el.style.color = '#fff'
  el.style.fontFamily = 'ui-rounded, "Comic Sans MS", "Chalkboard SE", sans-serif'
  el.style.fontWeight = 'bold'
  el.style.fontSize = `${fontSize}px`
  el.style.padding = '6px 14px'
  el.style.borderRadius = '20px'
  el.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)'
  el.style.opacity = '0'
  el.style.whiteSpace = 'nowrap'
  el.style.pointerEvents = 'none'
  el.style.zIndex = '5' // Still low, but ensuring visibility if container z-index is managed

  bubbleContainer.value.appendChild(el)

  // Animation timeline
  const tl = gsap.timeline({
    onComplete: () => {
      if (el.parentNode) {
        el.parentNode.removeChild(el)
      }
    },
  })

  // Float up and fade logic
  const duration = 5 + Math.random() * 4 // slow and subtle
  const floatDistance = 150 + Math.random() * 150 // pixels up

  tl.to(el, {
    opacity: 0.7,
    y: -40,
    duration: 1,
    ease: 'power1.out',
  }).to(
    el,
    {
      y: -floatDistance,
      opacity: 0,
      rotation: startRotation + (Math.random() * 30 - 15),
      duration: duration - 1,
      ease: 'none',
    },
    '>',
  )
}

onMounted(() => {
  // Spawn a few immediately so it's not empty
  spawnBubble()
  setTimeout(spawnBubble, 500)
  intervalId = setInterval(spawnBubble, 1500)
})

onUnmounted(() => {
  if (intervalId) clearInterval(intervalId)
  if (bubbleContainer.value) {
    gsap.killTweensOf(bubbleContainer.value.children)
  }
})
</script>

<template>
  <div
    class="flex flex-col h-full bg-[#cbd2d9] items-center justify-center relative overflow-hidden"
  >
    <!-- Background Pattern Effect (Optional subtle overlay to match shell) -->
    <div
      class="absolute inset-0 pointer-events-none opacity-50 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"
    ></div>

    <!-- Floating Bubbles Container -->
    <div
      ref="bubbleContainer"
      class="absolute top-0 left-0 w-full h-2/5 overflow-hidden pointer-events-none z-0"
    ></div>

    <!-- Title Container -->
    <div class="z-10 text-center mb-12">
      <h1
        class="font-['Helvetica_Neue'] font-bold text-[42px] leading-tight text-[#2f3640] drop-shadow-sm px-4"
      >
        Area Code<br />Expert
      </h1>
      <p class="mt-2 text-[#56687e] font-medium text-base">How well do u know ur area codes?</p>
    </div>

    <!-- Buttons -->
    <div class="z-10 flex flex-col gap-4">
      <button
        @click="emit('daily')"
        class="group relative px-8 py-3 bg-[#007aff] hover:bg-[#0069d9] active:scale-95 transition-all duration-200 rounded-full shadow-[0_4px_14px_0_rgba(0,118,255,0.39)] overflow-hidden w-64"
      >
        <span
          class="relative z-20 font-bold text-white text-lg tracking-wide group-hover:tracking-wider transition-all"
          >DAILY CHALLENGE</span
        >
        <!-- Shine effect -->
        <div
          class="absolute top-0 -left-[100%] w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-[-25deg] animate-[shine_3s_infinite] group-hover:animate-none"
        ></div>
      </button>

      <button
        @click="emit('practice')"
        class="group relative px-8 py-3 bg-[#34c759] hover:bg-[#2db84c] active:scale-95 transition-all duration-200 rounded-full shadow-[0_4px_14px_0_rgba(52,199,89,0.39)] overflow-hidden w-64"
      >
        <span
          class="relative z-20 font-bold text-white text-lg tracking-wide group-hover:tracking-wider transition-all"
          >PRACTICE MODE</span
        >
      </button>
    </div>

    <!-- Credits -->
    <div class="z-10 mt-8 text-center">
      <p class="text-[#56687e] text-sm font-medium">
        A geo-guessing game by
        <a
          href="https://dustinmichels.com/"
          target="_blank"
          class="underline hover:text-[#007aff] transition-colors"
          >Dustin Michels</a
        >
      </p>
    </div>

    <!-- Footer decoration (optional) -->
    <div class="absolute bottom-8 text-[#8e96a5] text-xs font-mono">v1.0</div>
  </div>
</template>

<style scoped>
@keyframes shine {
  0% {
    left: -100%;
  }
  20% {
    left: 100%;
  }
  100% {
    left: 100%;
  }
}
</style>
