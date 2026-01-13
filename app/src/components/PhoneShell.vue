<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const currentTime = ref('')

const updateTime = () => {
  const now = new Date()
  let hours = now.getHours()
  const minutes = now.getMinutes()
  const ampm = hours >= 12 ? 'PM' : 'AM'
  hours = hours % 12
  hours = hours ? hours : 12 // the hour '0' should be '12'
  const minutesStr = minutes < 10 ? '0' + minutes : minutes
  currentTime.value = `${hours}:${minutesStr} ${ampm}`
}

let timer: ReturnType<typeof setInterval>

onMounted(() => {
  updateTime()
  timer = setInterval(updateTime, 1000)
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
})
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
      class="h-5 flex justify-between items-center px-[5px] text-xs border-b border-[#7d8591] bg-gradient-to-b from-[#dbe2e9] to-[#b9c2ce] shrink-0"
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

      <div class="flex items-center gap-2">
        <div class="font-bold text-[#1f1f1f] drop-shadow-[0_1px_0_rgba(255,255,255,0.5)]">
          {{ currentTime }}
        </div>
        <div class="battery">
          <span class="battery-icon"></span>
        </div>
      </div>
    </div>

    <!-- Screen Content -->
    <div class="flex-1 flex flex-col relative overflow-hidden">
      <slot />
    </div>
  </div>
</template>

<style scoped>
/* Add any scoped styles if needed, though most are inline loop tailwind */
</style>
