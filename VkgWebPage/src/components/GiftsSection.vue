<script setup>
import { ref } from 'vue';

// --- DADOS PARA PREENCHER MANUALMENTE ---

// 1. Links Diários (Segunda a Domingo)
const dailyGifts = ref([
  { id: 1, name: "Monday 500 Gold: (gold500)", browser: "https://totalbattle.com/?present=gold", triumph: "https://triumph.totalbattle.com/?present=gold", mobile: "https://totalbattle.onelink.me/Xsl6/h3n9bz4l" },
  { id: 2, name: "Thursday XP: (xp)", browser: "https://totalbattle.com/?present=xp", triumph: "https://triumph.totalbattle.com/?present=xp", mobile: "https://totalbattle.onelink.me/Xsl6/atjav1j0" },
  { id: 3, name: "Wednesday 1500 Tar: (tar1500)", browser: "#", triumph: "#", mobile: "#" },
  { id: 4, name: "Thursday 25p Speedups: (speedups25)", browser: "#", triumph: "#", mobile: "#" },
  { id: 5, name: "Friday 500 Gold: (gold500)", browser: "#", triumph: "#", mobile: "#" },
  { id: 6, name: "Saturday 4x15m Speedup: (speedups15)", browser: "#", triumph: "#", mobile: "#" },
  { id: 7, name: "Sunday 3h Speedups: (speedups3)", browser: "#", triumph: "#", mobile: "#" },
]);

// 2. Links que funcionam apenas uma vez (One-Time)
const oneTimeGifts = ref([
  { id: 1, name: "3k Gold: (tt1 2024_IX51)", browser: "#", triumph: "#", mobile: "#" },
  { id: 2, name: "3k Gold: (tt2 2024_JYL)", browser: "#", triumph: "#", mobile: "#" },
  // Adicione mais linhas aqui...
]);

// 3. Links de Eventos (Event Links)
const eventGifts = ref([
  { id: 1, name: "Coins during Dragon Roulette", browser: "#", triumph: "#", mobile: "#" },
  { id: 2, name: "Coins during Lucky Roulette", browser: "#", triumph: "#", mobile: "#" },
  // Adicione mais linhas aqui...
]);

// 4. Arquivos por Ano (2025, 2024, etc.)
const archive2025 = ref([
  { id: 1, name: "1k Gold 2 Marches: (ref1_april_25)", browser: "#", triumph: "#", mobile: "#" },
  // Adicione mais linhas aqui...
]);

const archive2024 = ref([
  { id: 1, name: "1k Gold 2 Marches: (ref5_december_24)", browser: "#", triumph: "#", mobile: "#" },
  // Adicione mais linhas aqui...
]);

const archive2023 = ref([
  { id: 1, name: "1k Gold 2 Marches: (ref5_december_23)", browser: "#", triumph: "#", mobile: "#" },
  // Adicione mais linhas aqui...
]);

// Função auxiliar para renderizar tabelas repetitivas
const sections = ref([
  { title: "Links Diários", subtitle: "Funcionam no seu respectivo dia", data: dailyGifts },
  { title: "TB Gifts (Únicos)", subtitle: "Funcionam apenas uma vez por conta", data: oneTimeGifts },
  { title: "Event Links", subtitle: "Links especiais de roletas e eventos", data: eventGifts },
  { title: "Arquivo 2025", subtitle: "Histórico de gifts de 2025", data: archive2025 },
  { title: "Arquivo 2024", subtitle: "Histórico de gifts de 2024", data: archive2024 },
  { title: "Arquivo 2023", subtitle: "Histórico de gifts de 2023", data: archive2023 },
]);
</script>

<template>
  <section id="gifts" class="py-20 px-4 md:px-6 max-w-7xl mx-auto">
    
    <!-- Header Principal -->
    <div class="text-center mb-16">
      <h2 class="text-4xl font-medieval font-bold mb-4 text-medieval-gold">Sala do Tesouro (Gifts)</h2>
      <div class="h-1 w-24 bg-medieval-gold mx-auto mb-4"></div>
      <p class="text-white/60 italic">Resgate suas recompensas diárias e ajude o clã a crescer.</p>
    </div>

    <!-- Loop para gerar as tabelas de cada categoria -->
    <div v-for="(section, index) in sections" :key="index" class="mb-16">
      
      <!-- Subtítulo da Seção -->
      <div class="mb-6 border-l-4 border-medieval-gold pl-4 bg-white/5 py-2">
        <h3 class="text-2xl font-medieval font-bold text-white">{{ section.title }}</h3>
        <p class="text-gray-400 text-sm">{{ section.subtitle }}</p>
      </div>

      <!-- Tabela Responsiva -->
      <div class="overflow-x-auto card-bg rounded-lg border border-white/10">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="bg-black/60 text-medieval-gold text-xs uppercase tracking-wider border-b border-white/10">
              <th class="p-4 w-16 text-center">#</th>
              <th class="p-4">Gift Name / Código</th>
              <th class="p-4 text-center">Browser</th>
              <th class="p-4 text-center">Triumph</th>
              <th class="p-4 text-center">Mobile</th>
            </tr>
          </thead>
          <tbody class="text-sm text-gray-300">
            <tr v-for="gift in section.data" :key="gift.id" class="border-b border-white/5 hover:bg-white/5 transition duration-200">
              <td class="p-4 text-center font-mono opacity-50">{{ gift.id }}</td>
              <td class="p-4 font-bold text-white">
                {{ gift.name }}
              </td>
              <!-- Botão Browser -->
              <td class="p-4 text-center">
                <a :href="gift.browser" target="_blank" class="inline-block px-3 py-1 border border-medieval-gold/30 text-medieval-gold rounded hover:bg-medieval-gold hover:text-black transition text-xs font-bold uppercase">
                  TB Web
                </a>
              </td>
              <!-- Botão Triumph -->
              <td class="p-4 text-center">
                <a :href="gift.triumph" target="_blank" class="inline-block px-3 py-1 border border-blue-500/30 text-blue-400 rounded hover:bg-blue-600 hover:text-white transition text-xs font-bold uppercase">
                  Triumph
                </a>
              </td>
              <!-- Botão Mobile -->
              <td class="p-4 text-center">
                <a :href="gift.mobile" target="_blank" class="inline-block px-3 py-1 border border-green-500/30 text-green-400 rounded hover:bg-green-600 hover:text-black transition text-xs font-bold uppercase">
                  <i class="fas fa-mobile-alt mr-1"></i> App
                </a>
              </td>
            </tr>
            <!-- Mensagem se a lista estiver vazia -->
            <tr v-if="section.data.length === 0">
              <td colspan="5" class="p-8 text-center text-gray-500 italic">
                Nenhum gift cadastrado nesta seção ainda.
              </td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>

    <!-- Aviso de Rodapé -->
    <div class="mt-8 p-4 bg-red-900/10 border border-red-900/30 rounded text-center">
      <p class="text-red-400 text-xs uppercase tracking-widest font-bold">
        <i class="fas fa-exclamation-triangle mr-2"></i> Atenção
      </p>
      <p class="text-gray-400 text-sm mt-2">
        Links antigos podem expirar. A administração não se responsabiliza por códigos inválidos.
      </p>
    </div>

  </section>
</template>