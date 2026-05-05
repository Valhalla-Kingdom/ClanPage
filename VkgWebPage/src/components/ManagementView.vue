<script setup>
import { ref, computed } from 'vue';

// --- VAULTS STATE ---
const vaultTinmanCount = ref(2);
const vaultClockMinutes = ref(13);

// --- TINMAN STATE ---
const tinmanCount = ref(4);
const tinmanClockMinutes = ref(13);
const tinmanBonus = ref("34.5");
const tinmanTime1 = ref("2 hours after start (RESET +2)");
const tinmanTime2 = ref("Right after the first summon");

// --- GENERATED MESSAGES (COMPUTED - NO EMOJIS) ---
const vaultMessage = computed(() => {
  return `[WLF] Wolf - Vault Attacks\n\nATTENTION: ${vaultTinmanCount.value} TINMEN (DO NOT ADD EXTRA POINTS!), ${vaultClockMinutes.value} MINUTES, THE REST IN THE BOOK!!!!\n\nIn a few hours!\nAncestral treasures emerge from the rifts waiting for warriors to explore them.\n\nFor the best performance, follow the Pack's strategy:\nComplete your daily missions, clear the map, and summon the Pack for vault incursions.\n\nVault Troops (Recommended):\n- Level 1-19: NO Melee units.\n- Level 20-29: ONLY Mounted units.\n- Level 30-39: NO Mounted units.\n- NEVER bring catapults or scouts.\n\nPOINTS:\nFocus strictly on ${vaultClockMinutes.value} MINUTES ON THE CLOCK and put everything else IN THE BOOK.\nONLY ${vaultTinmanCount.value} TINMEN.\n\nMay the wolf's shadow obscure the gleam of enemy gold. Ahooo!\n\n*** Reviving costs silver and is reduced by 90% in the vaults.`;
});

const tinmanMessage = computed(() => {
  return `[WLF] Wolf - Tinman Summoning\n\nGood morning, Good afternoon, Good evening to all Wolves!\n\nTHE MOUNTAIN TREMBLES, THE TREES BEND ON THE HILL, SOMETHING IS COMING!! MY GOD!!! IT IS THE TINMAN!\n\nThis time we have ${tinmanCount.value} Summons of:\n${tinmanClockMinutes.value} Minutes each and a Bonus of ${tinmanBonus.value}%\n\nThe summons will be at the following times:\n1st Summon: ${tinmanTime1.value}\n2nd Summon: ${tinmanTime2.value}`;
});

const ragnarokMessage = computed(() => {
  return `[WLF] Wolf - Ragnarok Alert\n\nRagnarok is upon us! Slay the monsters, gather the coins, and DO NOT FORGET to spend them on CLAN CHESTS in the Ragnarok Shop.\n\nLet's flood our clan chat with gifts! The strength of the wolf is the pack!`;
});

const olympusMessage = computed(() => {
  return `[WLF] Wolf - Olympus Decree\n\nWarriors of Olympus! Make sure to complete your Battle Pass tasks to maximize your Hermes Points.\n\nCrucial: Spend your points to buy CLAN CHESTS in the Olympus Shop to support the family. Let's grow together!`;
});

const darkOmensMessage = computed(() => {
  return `[WLF] Wolf - Dark Omens\n\nThe portals are open! Hit the Dark Omens portals, collect the summoning items, and let's spawn the bosses together.\n\nMaximum participation required. Share the wealth!`;
});

// --- COPY FUNCTION ---
const copyToClipboard = async (text, eventName) => {
  try {
    await navigator.clipboard.writeText(text);
    alert(`${eventName} message copied to clipboard!`);
  } catch (err) {
    // Fallback if clipboard API fails
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);
    alert(`${eventName} message copied to clipboard!`);
  }
};
</script>

<template>
  <div class="pt-24 min-h-screen bg-[#030508] pb-20 font-sans text-slate-300">
    
    <!-- Header -->
    <header class="text-center py-12 px-6 bg-gradient-to-b from-[#0a0f1a] to-transparent border-b border-slate-800/50 relative overflow-hidden">
      <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/10 via-transparent to-transparent pointer-events-none"></div>
      <div class="relative z-10">
        <i class="fas fa-crown text-blue-500 text-5xl mb-4 drop-shadow-[0_0_15px_rgba(59,130,246,0.3)]"></i>
        <h1 class="text-4xl md:text-5xl font-medieval text-slate-200 mb-4 tracking-wider uppercase">
          Pack <span class="text-blue-400 font-light">Management</span>
        </h1>
        <p class="text-slate-400 max-w-2xl mx-auto italic text-sm">
          "Leadership is not just about giving orders, it's about guiding the pack." <br> Use these quick, game-chat friendly announcements (No Emojis).
        </p>
      </div>
    </header>

    <main class="max-w-7xl mx-auto px-4 md:px-6 mt-12 grid md:grid-cols-2 gap-8">
      
      <!-- 1. VAULTS ATTACK ANNOUNCEMENT -->
      <div class="bg-[#0b101a]/80 p-6 rounded-lg border border-slate-700/50 shadow-lg backdrop-blur-sm flex flex-col md:col-span-2 lg:col-span-1">
        <div class="flex items-center gap-3 mb-6 border-b border-slate-800 pb-3">
          <i class="fas fa-dungeon text-2xl text-green-500"></i>
          <h2 class="text-xl font-bold text-slate-200 uppercase tracking-widest">Vaults Attack</h2>
        </div>
        
        <div class="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label class="block text-xs font-bold text-blue-400 uppercase mb-1">Tinmen</label>
            <input type="number" v-model="vaultTinmanCount" min="0" class="w-full bg-[#0a0f1a] border border-slate-700 rounded p-2 text-slate-200 focus:border-blue-500 outline-none transition">
          </div>
          <div>
            <label class="block text-xs font-bold text-blue-400 uppercase mb-1">Clock (Mins)</label>
            <input type="number" v-model="vaultClockMinutes" min="0" class="w-full bg-[#0a0f1a] border border-slate-700 rounded p-2 text-slate-200 focus:border-blue-500 outline-none transition">
          </div>
        </div>

        <div class="flex-grow flex flex-col mt-auto">
          <textarea readonly :value="vaultMessage" class="w-full h-48 bg-slate-900/50 border border-slate-800 rounded p-3 text-sm text-slate-300 resize-none outline-none mb-4 custom-scrollbar leading-relaxed"></textarea>
          <button @click="copyToClipboard(vaultMessage, 'Vault Attacks')" class="w-full bg-slate-800 border border-slate-600 text-slate-300 font-bold py-3 rounded uppercase tracking-wider hover:bg-slate-700 hover:text-white transition">
            <i class="fas fa-copy mr-2"></i> Copy Message
          </button>
        </div>
      </div>

      <!-- 2. TINMAN ANNOUNCEMENT (UPDATED) -->
      <div class="bg-[#0b101a]/80 p-6 rounded-lg border border-slate-700/50 shadow-lg backdrop-blur-sm flex flex-col">
        <div class="flex items-center gap-3 mb-6 border-b border-slate-800 pb-3">
          <i class="fas fa-robot text-2xl text-slate-400"></i>
          <h2 class="text-xl font-bold text-slate-200 uppercase tracking-widest">Tinman Summon</h2>
        </div>
        
        <div class="grid grid-cols-3 gap-4 mb-4">
          <div>
            <label class="block text-xs font-bold text-blue-400 uppercase mb-1">Amount</label>
            <input type="number" v-model="tinmanCount" min="1" class="w-full bg-[#0a0f1a] border border-slate-700 rounded p-2 text-slate-200 focus:border-blue-500 outline-none transition">
          </div>
          <div>
            <label class="block text-xs font-bold text-blue-400 uppercase mb-1">Minutes</label>
            <input type="number" v-model="tinmanClockMinutes" min="1" class="w-full bg-[#0a0f1a] border border-slate-700 rounded p-2 text-slate-200 focus:border-blue-500 outline-none transition">
          </div>
          <div>
            <label class="block text-xs font-bold text-blue-400 uppercase mb-1">Bonus %</label>
            <input type="text" v-model="tinmanBonus" class="w-full bg-[#0a0f1a] border border-slate-700 rounded p-2 text-slate-200 focus:border-blue-500 outline-none transition">
          </div>
        </div>

        <div class="space-y-4 mb-4">
          <div>
            <label class="block text-xs font-bold text-blue-400 uppercase mb-1">1st Summon Time</label>
            <input type="text" v-model="tinmanTime1" class="w-full bg-[#0a0f1a] border border-slate-700 rounded p-2 text-slate-200 focus:border-blue-500 outline-none transition">
          </div>
          <div>
            <label class="block text-xs font-bold text-blue-400 uppercase mb-1">2nd Summon Time</label>
            <input type="text" v-model="tinmanTime2" class="w-full bg-[#0a0f1a] border border-slate-700 rounded p-2 text-slate-200 focus:border-blue-500 outline-none transition">
          </div>
        </div>

        <div class="flex-grow flex flex-col mt-auto">
          <textarea readonly :value="tinmanMessage" class="w-full h-48 bg-slate-900/50 border border-slate-800 rounded p-3 text-sm text-slate-300 resize-none outline-none mb-4 custom-scrollbar leading-relaxed"></textarea>
          <button @click="copyToClipboard(tinmanMessage, 'Tinman')" class="w-full bg-blue-600/20 border border-blue-500/50 text-blue-400 font-bold py-3 rounded uppercase tracking-wider hover:bg-blue-600 hover:text-white transition shadow-[0_0_10px_rgba(59,130,246,0.15)]">
            <i class="fas fa-copy mr-2"></i> Copy Message
          </button>
        </div>
      </div>

      <!-- 3. RAGNAROK ANNOUNCEMENT -->
      <div class="bg-[#0b101a]/80 p-6 rounded-lg border border-slate-700/50 shadow-lg backdrop-blur-sm flex flex-col">
        <div class="flex items-center gap-3 mb-6 border-b border-slate-800 pb-3">
          <i class="fas fa-dragon text-2xl text-red-500"></i>
          <h2 class="text-xl font-bold text-slate-200 uppercase tracking-widest">Ragnarok Chests</h2>
        </div>
        
        <p class="text-xs text-slate-500 mb-4">Remind the clan to spend coins on Clan Chests during Ragnarok.</p>

        <div class="flex-grow flex flex-col mt-auto">
          <textarea readonly :value="ragnarokMessage" class="w-full h-32 bg-slate-900/50 border border-slate-800 rounded p-3 text-sm text-slate-300 resize-none outline-none mb-4 custom-scrollbar leading-relaxed"></textarea>
          <button @click="copyToClipboard(ragnarokMessage, 'Ragnarok')" class="w-full bg-slate-800 border border-slate-600 text-slate-300 font-bold py-3 rounded uppercase tracking-wider hover:bg-slate-700 hover:text-white transition">
            <i class="fas fa-copy mr-2"></i> Copy Message
          </button>
        </div>
      </div>

      <!-- 4. OLYMPUS ANNOUNCEMENT -->
      <div class="bg-[#0b101a]/80 p-6 rounded-lg border border-slate-700/50 shadow-lg backdrop-blur-sm flex flex-col">
        <div class="flex items-center gap-3 mb-6 border-b border-slate-800 pb-3">
          <i class="fas fa-university text-2xl text-yellow-500"></i>
          <h2 class="text-xl font-bold text-slate-200 uppercase tracking-widest">Olympus Hermes</h2>
        </div>
        
        <p class="text-xs text-slate-500 mb-4">Remind the clan to finish the pass for Hermes points and buy Clan Chests.</p>

        <div class="flex-grow flex flex-col mt-auto">
          <textarea readonly :value="olympusMessage" class="w-full h-32 bg-slate-900/50 border border-slate-800 rounded p-3 text-sm text-slate-300 resize-none outline-none mb-4 custom-scrollbar leading-relaxed"></textarea>
          <button @click="copyToClipboard(olympusMessage, 'Olympus')" class="w-full bg-slate-800 border border-slate-600 text-slate-300 font-bold py-3 rounded uppercase tracking-wider hover:bg-slate-700 hover:text-white transition">
            <i class="fas fa-copy mr-2"></i> Copy Message
          </button>
        </div>
      </div>

      <!-- 5. DARK OMENS ANNOUNCEMENT -->
      <div class="bg-[#0b101a]/80 p-6 rounded-lg border border-slate-700/50 shadow-lg backdrop-blur-sm flex flex-col md:col-span-2 lg:col-span-2">
        <div class="flex items-center gap-3 mb-6 border-b border-slate-800 pb-3">
          <i class="fas fa-skull text-2xl text-purple-500"></i>
          <h2 class="text-xl font-bold text-slate-200 uppercase tracking-widest">Dark Omens</h2>
        </div>
        
        <p class="text-xs text-slate-500 mb-4">Call the pack to hit portals and summon bosses together.</p>

        <div class="flex-grow flex flex-col mt-auto">
          <textarea readonly :value="darkOmensMessage" class="w-full h-24 bg-slate-900/50 border border-slate-800 rounded p-3 text-sm text-slate-300 resize-none outline-none mb-4 custom-scrollbar leading-relaxed"></textarea>
          <button @click="copyToClipboard(darkOmensMessage, 'Dark Omens')" class="w-full md:w-1/3 mx-auto bg-slate-800 border border-slate-600 text-slate-300 font-bold py-3 rounded uppercase tracking-wider hover:bg-slate-700 hover:text-white transition">
            <i class="fas fa-copy mr-2"></i> Copy Message
          </button>
        </div>
      </div>

    </main>
  </div>
</template>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.2);
  border-radius: 4px;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(148, 163, 184, 0.3);
  border-radius: 4px;
}
</style>