<script setup lang="ts">
const emit = defineEmits(['start'])
</script>

<template>
  <div
    class="flex flex-col h-full bg-[#cbd2d9] items-center justify-center relative overflow-hidden"
  >
    <!-- Background Pattern Effect (Optional subtle overlay to match shell) -->
    <div
      class="absolute inset-0 pointer-events-none opacity-50 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"
    ></div>

    <!-- Title Container -->
    <div class="z-10 text-center mb-12">
      <h1
        class="font-['Helvetica_Neue'] font-bold text-[32px] leading-tight text-[#2f3640] drop-shadow-sm px-4"
      >
        Area Code<br />Guesser
      </h1>
      <p class="mt-2 text-[#56687e] font-medium text-sm">How well do u know ur area codes?</p>
    </div>

    <!-- Start Button -->
    <button
      @click="emit('start')"
      class="z-10 group relative px-8 py-3 bg-[#007aff] hover:bg-[#0069d9] active:scale-95 transition-all duration-200 rounded-full shadow-[0_4px_14px_0_rgba(0,118,255,0.39)] overflow-hidden"
    >
      <span
        class="relative z-20 font-bold text-white text-lg tracking-wide group-hover:tracking-wider transition-all"
        >START</span
      >

      <!-- Shine effect -->
      <div
        class="absolute top-0 -left-[100%] w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-[-25deg] animate-[shine_3s_infinite] group-hover:animate-none"
      ></div>
    </button>

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
