<script setup>
import { computed } from 'vue';
// Importa os dados centralizados
import { captainsData, heroesData } from '../../data/data';

// Função para carregar imagens dinamicamente
const getImageUrl = (folder, name) => {
  return new URL(`../../assets/${folder}/${name}.jpg`, import.meta.url).href;
};

// --- Lógica de Categorização de Heróis ---

// Função auxiliar para achatar a lista de heróis (tira dos tiers e põe num array único)
const allHeroes = computed(() => {
  return heroesData.flatMap(tier => tier.units);
});

// Categorias definidas manualmente baseadas no nome do Herói
const heroCategories = {
  attack: {
    pvp: ['Guan Yu', 'Yamato'],
    general: ['Meriones', 'Thaddeus', 'Ayrin']
  },
  defense: ['Alrick', 'Matemhain'],
  support: ['Haemon', 'Faron', 'Nectarius', 'Ridong'],
  useless: ['Garvel', 'Julia', 'Thelensia','Svyatogor']
};

// Filtros Computados
const pvpHeroes = computed(() => allHeroes.value.filter(h => heroCategories.attack.pvp.includes(h.unit)));
const generalAttackHeroes = computed(() => allHeroes.value.filter(h => heroCategories.attack.general.includes(h.unit)));
const defenseHeroes = computed(() => allHeroes.value.filter(h => heroCategories.defense.includes(h.unit)));
const supportHeroes = computed(() => allHeroes.value.filter(h => heroCategories.support.includes(h.unit)));
const uselessHeroes = computed(() => allHeroes.value.filter(h => heroCategories.useless.includes(h.unit)));

</script>

<template>
  <div class="space-y-12">
    
    <!-- Seção de Capitães (Mantida Original) -->
    <div class="card-bg p-8 rounded-lg border border-white/10">
      <h2 class="text-3xl font-medieval text-white mb-6 border-b border-medieval-gold/30 pb-4">Hall dos Capitães</h2>
      <p class="text-gray-300 mb-8 leading-relaxed">
        Conheça os heróis que liderarão seus exércitos. Entender a especialidade de cada um é a chave para a vitória.
      </p>

      <div class="space-y-12">
        <div v-for="tier in captainsData" :key="tier.tier" class="space-y-6">
          <div class="flex items-center gap-3 border-b border-white/10 pb-2">
             <i class="fas fa-crown text-2xl" :class="tier.color"></i>
             <h3 class="text-2xl font-medieval font-bold uppercase tracking-widest" :class="tier.color">{{ tier.tier }}</h3>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            <div v-for="cap in tier.units" :key="cap.unit" 
                 class="relative flex flex-col bg-black/40 border p-5 rounded transition hover:-translate-y-1 hover:shadow-lg group"
                 :class="[tier.borderColor, tier.bg]">
              
              <div class="flex items-center gap-4 mb-4">
                <img :src="getImageUrl('capitains', cap.unit)" :alt="cap.unit" 
                     class="w-14 h-14 rounded-full object-cover border shadow-sm shrink-0 bg-gray-800"
                     :class="[tier.borderColor]">
                <h4 class="text-white font-bold text-lg group-hover:text-medieval-gold transition">{{ cap.unit }}</h4>
              </div>
              
              <p class="text-gray-300 text-sm mb-4 flex-grow border-l-2 pl-3 leading-relaxed" :class="tier.borderColor">
                {{ cap.desc }}
              </p>
              
              <div class="mt-auto bg-black/50 p-3 rounded border border-white/5 text-xs">
                <span class="font-bold text-medieval-gold uppercase tracking-wider block mb-1">
                  <i class="fas fa-lightbulb mr-1"></i> Dica Tática:
                </span>
                <span class="text-gray-400 italic">{{ cap.tips }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Seção de Heróis (Avatar) - REORGANIZADA -->
    <div class="card-bg p-8 rounded-lg border border-white/10">
      <h2 class="text-3xl font-medieval text-white mb-6 border-b border-medieval-gold/30 pb-4">Panteão dos Heróis (Avatares)</h2>
      <p class="text-gray-300 mb-8 leading-relaxed">
        Seu Avatar define seu estilo de jogo. Escolha com sabedoria entre dominar o campo de batalha, proteger sua cidade ou maximizar sua economia.
      </p>

      <div class="space-y-12">

        <!-- 1. Categoria ATTACK -->
        <div class="space-y-6">
          <div class="flex items-center gap-3 border-b border-red-500/50 pb-2">
             <div class="bg-red-500/20 p-2 rounded-full border border-red-500 text-red-500"><i class="fas fa-swords text-xl"></i></div>
             <h3 class="text-2xl font-medieval font-bold uppercase tracking-widest text-red-500">Attack</h3>
          </div>

          <!-- Subcategoria: PvP -->
          <div class="pl-4 border-l-2 border-red-500/30">
            <h4 class="text-lg font-bold text-white mb-4 uppercase tracking-wider flex items-center gap-2">
              <i class="fas fa-skull text-red-400"></i> PvP Specialists
            </h4>
            <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              <div v-for="hero in pvpHeroes" :key="hero.unit" 
                   class="relative flex flex-col bg-black/40 border border-red-500/30 p-5 rounded transition hover:-translate-y-1 hover:shadow-lg group bg-red-900/5">
                <div class="flex items-center gap-4 mb-4">
                  <img :src="getImageUrl('heroes', hero.unit)" :alt="hero.unit" class="w-14 h-14 rounded-full object-cover border border-red-500 shadow-sm shrink-0 bg-gray-800">
                  <h4 class="text-white font-bold text-lg group-hover:text-red-400 transition">{{ hero.unit }}</h4>
                </div>
                <p class="text-gray-300 text-sm mb-2">{{ hero.desc }}</p>
                <div class="mt-auto text-xs text-red-300 italic"><i class="fas fa-crosshairs mr-1"></i> {{ hero.tips }}</div>
              </div>
            </div>
          </div>

          <!-- Subcategoria: Geral -->
          <div class="pl-4 border-l-2 border-red-500/30 mt-6">
            <h4 class="text-lg font-bold text-white mb-4 uppercase tracking-wider flex items-center gap-2">
              <i class="fas fa-fist-raised text-orange-400"></i> General Offense
            </h4>
            <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              <div v-for="hero in generalAttackHeroes" :key="hero.unit" 
                   class="relative flex flex-col bg-black/40 border border-orange-500/30 p-5 rounded transition hover:-translate-y-1 hover:shadow-lg group bg-orange-900/5">
                <div class="flex items-center gap-4 mb-4">
                  <img :src="getImageUrl('heroes', hero.unit)" :alt="hero.unit" class="w-14 h-14 rounded-full object-cover border border-orange-500 shadow-sm shrink-0 bg-gray-800">
                  <h4 class="text-white font-bold text-lg group-hover:text-orange-400 transition">{{ hero.unit }}</h4>
                </div>
                <p class="text-gray-300 text-sm mb-2">{{ hero.desc }}</p>
                <div class="mt-auto text-xs text-orange-300 italic"><i class="fas fa-star mr-1"></i> {{ hero.tips }}</div>
              </div>
            </div>
          </div>
        </div>

        <!-- 2. Categoria DEFENSE -->
        <div class="space-y-6">
          <div class="flex items-center gap-3 border-b border-blue-500/50 pb-2">
             <div class="bg-blue-500/20 p-2 rounded-full border border-blue-500 text-blue-500"><i class="fas fa-shield-alt text-xl"></i></div>
             <h3 class="text-2xl font-medieval font-bold uppercase tracking-widest text-blue-500">Defense</h3>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            <div v-for="hero in defenseHeroes" :key="hero.unit" 
                 class="relative flex flex-col bg-black/40 border border-blue-500/30 p-5 rounded transition hover:-translate-y-1 hover:shadow-lg group bg-blue-900/5">
              <div class="flex items-center gap-4 mb-4">
                <img :src="getImageUrl('heroes', hero.unit)" :alt="hero.unit" class="w-14 h-14 rounded-full object-cover border border-blue-500 shadow-sm shrink-0 bg-gray-800">
                <h4 class="text-white font-bold text-lg group-hover:text-blue-400 transition">{{ hero.unit }}</h4>
              </div>
              <p class="text-gray-300 text-sm mb-2">{{ hero.desc }}</p>
              <div class="mt-auto text-xs text-blue-300 italic"><i class="fas fa-shield-virus mr-1"></i> {{ hero.tips }}</div>
            </div>
          </div>
        </div>

        <!-- 3. Categoria SUPPORT -->
        <div class="space-y-6">
          <div class="flex items-center gap-3 border-b border-green-500/50 pb-2">
             <div class="bg-green-500/20 p-2 rounded-full border border-green-500 text-green-500"><i class="fas fa-hands-helping text-xl"></i></div>
             <h3 class="text-2xl font-medieval font-bold uppercase tracking-widest text-green-500">Support & Economy</h3>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            <div v-for="hero in supportHeroes" :key="hero.unit" 
                 class="relative flex flex-col bg-black/40 border border-green-500/30 p-5 rounded transition hover:-translate-y-1 hover:shadow-lg group bg-green-900/5">
              <div class="flex items-center gap-4 mb-4">
                <img :src="getImageUrl('heroes', hero.unit)" :alt="hero.unit" class="w-14 h-14 rounded-full object-cover border border-green-500 shadow-sm shrink-0 bg-gray-800">
                <h4 class="text-white font-bold text-lg group-hover:text-green-400 transition">{{ hero.unit }}</h4>
              </div>
              <p class="text-gray-300 text-sm mb-2">{{ hero.desc }}</p>
              <div class="mt-auto text-xs text-green-300 italic"><i class="fas fa-magic mr-1"></i> {{ hero.tips }}</div>
            </div>
          </div>
        </div>

        <!-- 4. Categoria USELESS -->
        <div class="space-y-6 opacity-70 hover:opacity-100 transition duration-500">
          <div class="flex items-center gap-3 border-b border-gray-600 pb-2">
             <div class="bg-gray-700/20 p-2 rounded-full border border-gray-600 text-gray-500"><i class="fas fa-ban text-xl"></i></div>
             <h3 class="text-2xl font-medieval font-bold uppercase tracking-widest text-gray-500">Basic / Useless</h3>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            <div v-for="hero in uselessHeroes" :key="hero.unit" 
                 class="relative flex flex-col bg-black/40 border border-gray-700 p-5 rounded grayscale group hover:grayscale-0 transition">
              <div class="flex items-center gap-4 mb-4">
                <img :src="getImageUrl('heroes', hero.unit)" :alt="hero.unit" class="w-14 h-14 rounded-full object-cover border border-gray-600 shadow-sm shrink-0 bg-gray-800">
                <h4 class="text-gray-400 font-bold text-lg group-hover:text-white transition">{{ hero.unit }}</h4>
              </div>
              <p class="text-gray-500 text-sm mb-2">{{ hero.desc }}</p>
              <div class="mt-auto text-xs text-gray-600 italic group-hover:text-gray-400"><i class="fas fa-sad-tear mr-1"></i> {{ hero.tips }}</div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>