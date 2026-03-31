<script setup>
import { ref } from 'vue';
// Importa os dados centralizados
import { dailyGifts, oneTimeGifts, eventGifts } from '../data/dataGifts';

// Configuração das seções visíveis
const sections = ref([
  { 
    title: "Daily Gifts", 
    subtitle: "Valid only on the specific day of the week (UTC)", 
    data: dailyGifts,
    icon: "fa-calendar-day"
  },
  { 
    title: "Treasure Chest (Unique)", 
    subtitle: "These codes work only once per account", 
    data: oneTimeGifts,
    icon: "fa-gem"
  },
  { 
    title: "Special Events", 
    subtitle: "Roulettes and Seasonal Bonuses", 
    data: eventGifts,
    icon: "fa-star"
  },
]);
</script>

<template>
  <section id="gifts" class="py-20 px-4 md:px-6 max-w-7xl mx-auto text-slate-300">
    
    <!-- Header Principal -->
    <div class="text-center mb-16">
      <i class="fas fa-gift text-blue-500 text-4xl mb-4 drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]"></i>
      <h2 class="text-4xl font-medieval font-bold mb-4 text-slate-200">The Pack's Spoils</h2>
      <div class="h-1 w-24 bg-blue-500 mx-auto mb-4 shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
      <p class="text-slate-400 italic">
        "Spoils for the pack, glory for the shadows."
      </p>
    </div>

    <!-- Loop das Seções -->
    <div v-for="(section, index) in sections" :key="index" class="mb-12 last:mb-0">
      
      <!-- Cabeçalho da Tabela -->
      <div class="flex items-center gap-3 mb-4 px-2">
        <i :class="['fas text-2xl text-blue-400', section.icon]"></i>
        <div>
          <h3 class="text-xl font-medieval font-bold text-slate-200 uppercase tracking-wider">{{ section.title }}</h3>
          <p class="text-xs text-slate-500">{{ section.subtitle }}</p>
        </div>
      </div>

      <!-- Tabela -->
      <div class="overflow-x-auto bg-[#0b101a]/80 backdrop-blur-sm rounded-lg border border-slate-800 shadow-[0_0_15px_rgba(0,0,0,0.5)] relative">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="bg-[#0a0f1a] text-blue-300 text-[10px] uppercase tracking-wider border-b border-slate-700/50">
              <th class="p-3 w-12 text-center">#</th>
              <th class="p-3">Reward</th>
              <th class="p-3 text-right hidden md:table-cell">Code</th>
              <th class="p-3 text-center">Redeem</th>
            </tr>
          </thead>
          <tbody class="text-sm text-slate-300">
            <tr v-for="gift in section.data" :key="gift.id" class="border-b border-slate-800/50 hover:bg-slate-800/40 transition duration-200 group">
              
              <!-- ID -->
              <td class="p-3 text-center font-mono text-slate-600">{{ gift.id }}</td>
              
              <!-- Nome -->
              <td class="p-3 font-bold text-slate-200 group-hover:text-blue-400 transition duration-300">
                {{ gift.name }}
                <div class="md:hidden text-[10px] text-slate-500 font-mono mt-1">{{ gift.code }}</div>
              </td>

              <!-- Código (Desktop) -->
              <td class="p-3 text-right hidden md:table-cell font-mono text-xs text-slate-500 select-all group-hover:text-slate-400 transition">
                {{ gift.code }}
              </td>

              <!-- Botões de Ação -->
              <td class="p-3">
                <div class="flex justify-center gap-2">
                  
                  <!-- Web Browser -->
                  <a :href="gift.browser" target="_blank" title="Play on Browser" 
                     class="w-8 h-8 flex items-center justify-center border border-slate-600/50 text-slate-400 bg-slate-800/30 rounded hover:bg-slate-700 hover:text-white transition shadow-sm">
                    <i class="fas fa-globe"></i>
                  </a>

                  <!-- Triumph (PC) -->
                  <a :href="gift.triumph" target="_blank" title="Play on Triumph PC"
                     class="w-8 h-8 flex items-center justify-center border border-blue-500/30 text-blue-400 bg-blue-900/20 rounded hover:bg-blue-600 hover:text-white transition shadow-[0_0_5px_rgba(59,130,246,0.2)]">
                    <i class="fas fa-desktop"></i>
                  </a>

                  <!-- Mobile -->
                  <a :href="gift.mobile" title="Open in Mobile App"
                     class="w-8 h-8 flex items-center justify-center border border-purple-500/30 text-purple-400 bg-purple-900/20 rounded hover:bg-purple-600 hover:text-white transition shadow-[0_0_5px_rgba(168,85,247,0.2)]">
                    <i class="fas fa-mobile-alt"></i>
                  </a>

                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Disclaimer -->
    <div class="mt-8 text-center text-xs text-slate-500">
      * Code availability is managed by the game developer. Expired codes cannot be reactivated.<br>
      If the Daily Links do not work, please check the official <a href="https://scorewarrior.helpshift.com/hc/en/3-total-battle/faq/661-how-do-i-claim-daily-gifts-from-the-community/" target="_blank" class="text-blue-400 underline hover:text-blue-300 transition">Total Battle Support Guide</a>.
    </div>

  </section>
</template>