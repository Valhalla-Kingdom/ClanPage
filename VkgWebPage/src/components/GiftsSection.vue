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
  <section id="gifts" class="py-20 px-4 md:px-6 max-w-7xl mx-auto">
    
    <!-- Header Principal -->
    <div class="text-center mb-16">
      <h2 class="text-4xl font-medieval font-bold mb-4 text-medieval-gold">Treasure Room</h2>
      <div class="h-1 w-24 bg-medieval-gold mx-auto mb-4"></div>
      <p class="text-white/60 italic">
        "Gold for the army, glory for the clan."
      </p>
    </div>

    <!-- Loop das Seções -->
    <div v-for="(section, index) in sections" :key="index" class="mb-12 last:mb-0">
      
      <!-- Cabeçalho da Tabela -->
      <div class="flex items-center gap-3 mb-4 px-2">
        <i :class="['fas text-2xl text-medieval-gold', section.icon]"></i>
        <div>
          <h3 class="text-xl font-medieval font-bold text-white uppercase tracking-wider">{{ section.title }}</h3>
          <p class="text-xs text-gray-500">{{ section.subtitle }}</p>
        </div>
      </div>

      <!-- Tabela -->
      <div class="overflow-x-auto card-bg rounded-lg border border-white/10 shadow-lg relative">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="bg-black/60 text-medieval-gold text-[10px] uppercase tracking-wider border-b border-white/10">
              <th class="p-3 w-12 text-center">#</th>
              <th class="p-3">Reward</th>
              <th class="p-3 text-right hidden md:table-cell">Code</th>
              <th class="p-3 text-center">Redeem</th>
            </tr>
          </thead>
          <tbody class="text-sm text-gray-300">
            <tr v-for="gift in section.data" :key="gift.id" class="border-b border-white/5 hover:bg-white/5 transition duration-200 group">
              
              <!-- ID -->
              <td class="p-3 text-center font-mono opacity-30">{{ gift.id }}</td>
              
              <!-- Nome -->
              <td class="p-3 font-bold text-white group-hover:text-medieval-gold transition">
                {{ gift.name }}
                <div class="md:hidden text-[10px] text-gray-500 font-mono mt-1">{{ gift.code }}</div>
              </td>

              <!-- Código (Desktop) -->
              <td class="p-3 text-right hidden md:table-cell font-mono text-xs text-gray-500 select-all">
                {{ gift.code }}
              </td>

              <!-- Botões de Ação -->
              <td class="p-3">
                <div class="flex justify-center gap-2">
                  
                  <!-- Web -->
                  <a :href="gift.browser" target="_blank" title="Jogar no Navegador" 
                     class="w-8 h-8 flex items-center justify-center border border-medieval-gold/30 text-medieval-gold bg-medieval-gold/5 rounded hover:bg-medieval-gold hover:text-black transition">
                    <i class="fas fa-globe"></i>
                  </a>

                  <!-- Triumph -->
                  <a :href="gift.triumph" target="_blank" title="Jogar no Triumph"
                     class="w-8 h-8 flex items-center justify-center border border-blue-500/30 text-blue-400 bg-blue-500/5 rounded hover:bg-blue-600 hover:text-white transition">
                    <i class="fas fa-trophy"></i>
                  </a>

                  <!-- Mobile -->
                  <a :href="gift.mobile" title="Abrir no App"
                     class="w-8 h-8 flex items-center justify-center border border-green-500/30 text-green-400 bg-green-500/5 rounded hover:bg-green-600 hover:text-black transition">
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
    <div class="mt-8 text-center text-xs text-gray-600">
      * Code availability is managed by the game developer. Expired codes cannot be reactivated.
      If the Daily Links do not work, please try here <a href="https://scorewarrior.helpshift.com/hc/en/3-total-battle/faq/661-how-do-i-claim-daily-gifts-from-the-community/" target="_blank" class="text-medieval-gold underline">Total Battle Support - Gifts</a>.
    </div>

  </section>
</template>