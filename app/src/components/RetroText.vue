<script setup lang="ts">
// Logic can be added here if needed
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
        Trent
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
          To: <span class="text-black font-normal">Maria</span>
        </h2>
      </div>

      <div class="p-[10px] flex flex-col gap-[10px] overflow-y-auto pb-4">
        <!-- RECEIVED (Grey) Bubble 1 -->
        <div
          class="max-w-[75%] w-fit px-[15px] py-[8px] rounded-[15px] text-[15px] leading-tight relative shadow-[0_1px_3px_rgba(0,0,0,0.3)] bg-[linear-gradient(to_bottom,#e5e5ea_0%,#e5e5ea_45%,#d5d5d5_50%,#d5d5d5_100%)] text-black self-start border border-[#c3c3c3] ml-[5px]"
        >
          <p class="m-0 font-normal">
            Nottt much! Just drinking this pube juice my mom bought for me today. Yummy right?(:
          </p>
          <!-- Grey Tail -->
          <div
            class="absolute bottom-[0px] left-[-7px] w-[20px] h-[16px] bg-[#d5d5d5] rounded-br-[15px] border-b border-l border-[#c3c3c3]"
          ></div>
          <div
            class="absolute bottom-[0px] left-[-4px] w-[10px] h-[16px] bg-[#d5d5d5] rounded-br-[10px] z-10"
          ></div>
          <div
            class="absolute bottom-0 left-[-15px] w-[15px] h-[20px] rounded-br-[20px]"
            style="background: transparent; box-shadow: 10px 0 0 #d5d5d5"
          ></div>
        </div>

        <!-- SENT (Green) Bubble 1 -->
        <div
          class="max-w-[75%] w-fit px-[15px] py-[8px] rounded-[15px] text-[15px] leading-tight relative shadow-[0_1px_3px_rgba(0,0,0,0.3)] bg-[linear-gradient(to_bottom,#dcfbc3_0%,#dcfbc3_45%,#98e558_50%,#87dd40_100%)] text-black self-end border border-[#89ad65] mr-[5px]"
        >
          <p class="m-0 font-normal">Not my first choice in juices.. (:</p>
          <!-- Green Tail -->
          <div
            class="absolute bottom-[0px] right-[-7px] w-[20px] h-[16px] bg-[#87dd40] rounded-bl-[15px] border-b border-r border-[#89ad65]"
          ></div>
          <div
            class="absolute bottom-[0px] right-[-4px] w-[10px] h-[16px] bg-[#87dd40] rounded-bl-[10px] z-10"
          ></div>
          <div
            class="absolute bottom-0 right-[-15px] w-[15px] h-[20px] rounded-bl-[20px]"
            style="background: transparent; box-shadow: -10px 0 0 #87dd40"
          ></div>
        </div>

        <!-- RECEIVED (Grey) Bubble 2 -->
        <div
          class="max-w-[75%] w-fit px-[15px] py-[8px] rounded-[15px] text-[15px] leading-tight relative shadow-[0_1px_3px_rgba(0,0,0,0.3)] bg-[linear-gradient(to_bottom,#e5e5ea_0%,#e5e5ea_45%,#d5d5d5_50%,#d5d5d5_100%)] text-black self-start border border-[#c3c3c3] ml-[5px]"
        >
          <p class="m-0 font-normal">
            Granted. It does taste a little funky but other then thAt i could drink this all day! (:
          </p>
          <div
            class="absolute bottom-[0px] left-[-7px] w-[20px] h-[16px] bg-[#d5d5d5] rounded-br-[15px] border-b border-l border-[#c3c3c3]"
          ></div>
          <div
            class="absolute bottom-[0px] left-[-4px] w-[10px] h-[16px] bg-[#d5d5d5] rounded-br-[10px] z-10"
          ></div>
          <div
            class="absolute bottom-0 left-[-15px] w-[15px] h-[20px] rounded-br-[20px]"
            style="background: transparent; box-shadow: 10px 0 0 #d5d5d5"
          ></div>
        </div>

        <!-- RECEIVED (Grey) Bubble 3 -->
        <div
          class="max-w-[75%] w-fit px-[15px] py-[8px] rounded-[15px] text-[15px] leading-tight relative shadow-[0_1px_3px_rgba(0,0,0,0.3)] bg-[linear-gradient(to_bottom,#e5e5ea_0%,#e5e5ea_45%,#d5d5d5_50%,#d5d5d5_100%)] text-black self-start border border-[#c3c3c3] ml-[5px]"
        >
          <p class="m-0 font-normal">Dude. I meant prune. I swear.(:</p>
          <div
            class="absolute bottom-[0px] left-[-7px] w-[20px] h-[16px] bg-[#d5d5d5] rounded-br-[15px] border-b border-l border-[#c3c3c3]"
          ></div>
          <div
            class="absolute bottom-[0px] left-[-4px] w-[10px] h-[16px] bg-[#d5d5d5] rounded-br-[10px] z-10"
          ></div>
          <div
            class="absolute bottom-0 left-[-15px] w-[15px] h-[20px] rounded-br-[20px]"
            style="background: transparent; box-shadow: 10px 0 0 #d5d5d5"
          ></div>
        </div>

        <!-- SENT (Green) Bubble 2 -->
        <div
          class="max-w-[75%] w-fit px-[15px] py-[8px] rounded-[15px] text-[15px] leading-tight relative shadow-[0_1px_3px_rgba(0,0,0,0.3)] bg-[linear-gradient(to_bottom,#dcfbc3_0%,#dcfbc3_45%,#98e558_50%,#87dd40_100%)] text-black self-end border border-[#89ad65] mr-[5px]"
        >
          <p class="m-0 font-normal">AHAHA. sure.. Thats what they all say(;</p>
          <div
            class="absolute bottom-[0px] right-[-7px] w-[20px] h-[16px] bg-[#87dd40] rounded-bl-[15px] border-b border-r border-[#89ad65]"
          ></div>
          <div
            class="absolute bottom-[0px] right-[-4px] w-[10px] h-[16px] bg-[#87dd40] rounded-bl-[10px] z-10"
          ></div>
          <div
            class="absolute bottom-0 right-[-15px] w-[15px] h-[20px] rounded-bl-[20px]"
            style="background: transparent; box-shadow: -10px 0 0 #87dd40"
          ></div>
        </div>
      </div>
    </div>

    <!-- Footer / Input Area -->
    <div
      class="h-[44px] bg-[linear-gradient(to_bottom,#dbe2e9_0%,#b9c2ce_100%)] flex items-center px-[6px] border-t border-[#8e939d] shadow-[inset_0_1px_0_rgba(255,255,255,0.5)]"
    >
      <div
        class="camera-btn w-[26px] h-[22px] bg-[#8e96a5] rounded mr-2 border border-[#767d89]"
      ></div>
      <!-- Placeholder -->

      <div
        class="flex-1 h-[28px] bg-[#fdfdfd] border border-[#aeb5bf] rounded-[14px] mx-[4px] shadow-[inset_0_1px_4px_rgba(0,0,0,0.2)] flex items-center px-2"
      >
        <span class="text-gray-400 text-sm">Text Message</span>
      </div>

      <button
        class="ml-2 border border-[#1d4d80] rounded-[5px] text-white font-bold text-[14px] px-[12px] py-[4px] shadow-[0_1px_0_rgba(255,255,255,0.3)] bg-[linear-gradient(to_bottom,#8ec1f6_0%,#468ccf_50%,#4081c0_51%,#2166b1_100%)] [text-shadow:0_-1px_0_rgba(0,0,0,0.4)] disabled:opacity-50"
      >
        Send
      </button>
    </div>
  </div>
</template>
