<script setup>
import { ref, computed } from 'vue';

// Importação dos Sub-componentes
import GuideIniciante from '../components/guides/GuideIniciante.vue';
import GuideEconomia from '../components/guides/GuideEconomia.vue';
import GuideMilitar from '../components/guides/GuideMilitar.vue';
import GuideEventos from '../components/guides/GuideEventos.vue';
import GuideDicas from '../components/guides/GuideDicas.vue';
import GuideCalculator from '../components/guides/GuideCalculator.vue'; 

const activeTabId = ref('iniciante');
const isMenuOpen = ref(true); // Controla o estado do menu retrátil

const tabs = [
  { id: 'iniciante', label: 'First Steps', icon: 'fa-shoe-prints', component: GuideIniciante },
  { id: 'economia', label: 'Economy & Resources', icon: 'fa-coins', component: GuideEconomia },
  { id: 'militar', label: 'Military & Captains', icon: 'fa-chess-knight', component: GuideMilitar },
  { id: 'eventos', label: 'Events', icon: 'fa-calendar-alt', component: GuideEventos },
  // { id: 'calculator', label: 'Army Calculator', icon: 'fa-calculator', component: GuideCalculator }, 
  { id: 'dicas', label: 'Pro Tips', icon: 'fa-lightbulb', component: GuideDicas }
];

// Computed para retornar o componente atual baseado no ID selecionado
const currentComponent = computed(() => {
  const tab = tabs.find(t => t.id === activeTabId.value);
  return tab ? tab.component : GuideIniciante;
});
</script>

<template>
  <div class="pt-24 min-h-screen bg-[#0a0a0a] pb-20">
    
    <header class="text-center py-12 px-6 bg-gradient-to-b from-black to-transparent border-b border-white/5">
      <h1 class="text-4xl md:text-5xl font-medieval text-medieval-gold mb-4">Valhalla Academy</h1>
      <p class="text-gray-400 max-w-2xl mx-auto italic">
        "Knowledge is a ruler's sharpest weapon. Study these scrolls and lead your army to glory."
      </p>
    </header>

    <div class="max-w-[98%] xl:max-w-7xl mx-auto px-4 md:px-6 mt-12 flex flex-col md:flex-row gap-6 md:gap-8">
      
      <aside 
        class="relative transition-all duration-300 ease-in-out shrink-0 z-20"
        :class="isMenuOpen ? 'md:w-64' : 'md:w-20'"
      >
        <div class="md:sticky md:top-28 bg-white/5 border border-white/10 rounded-lg p-2 md:p-4 backdrop-blur-sm flex flex-row md:flex-col overflow-x-auto md:overflow-visible custom-scrollbar">
          
          <div class="hidden md:flex justify-between items-center mb-4 px-2 h-8">
            <h3 v-if="isMenuOpen" class="text-medieval-gold font-bold uppercase tracking-widest text-sm whitespace-nowrap overflow-hidden transition-opacity duration-300">
              Topics
            </h3>
            <button @click="isMenuOpen = !isMenuOpen" 
                    class="text-gray-400 hover:text-white transition w-8 h-8 flex items-center justify-center rounded hover:bg-white/10 ml-auto"
                    title="Collapse/Expand Menu">
              <i class="fas" :class="isMenuOpen ? 'fa-chevron-left' : 'fa-list-ul'"></i>
            </button>
          </div>

          <nav class="flex flex-row md:flex-col gap-2 min-w-max md:min-w-0 pb-2 md:pb-0">
            <button 
              v-for="tab in tabs" 
              :key="tab.id"
              @click="activeTabId = tab.id"
              class="text-left rounded transition flex items-center relative group"
              :class="[
                isMenuOpen ? 'px-4 py-3 gap-3' : 'p-3 justify-center md:h-12 md:w-12 mx-auto',
                activeTabId === tab.id 
                  ? 'bg-medieval-gold text-black font-bold shadow-[0_0_10px_rgba(197,160,89,0.4)]' 
                  : 'text-gray-400 hover:bg-white/10 hover:text-white'
              ]"
            >
              <i :class="['fas', tab.icon, isMenuOpen ? 'w-6 text-center' : 'text-lg']"></i>
              
              <span class="whitespace-nowrap overflow-hidden transition-all duration-300"
                    :class="isMenuOpen ? 'block opacity-100 ml-1' : 'hidden md:hidden block ml-2'">
                {{ tab.label }}
              </span>

              <div v-if="!isMenuOpen" 
                   class="hidden md:block absolute left-full ml-4 px-3 py-2 bg-black text-medieval-gold text-xs font-bold uppercase tracking-wider rounded border border-white/10 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50 whitespace-nowrap shadow-xl">
                {{ tab.label }}
              </div>
            </button>
          </nav>
        </div>
      </aside>

      <main class="flex-1 min-w-0 min-h-[500px] transition-all duration-300">
        <Transition name="fade" mode="out-in">
          <component :is="currentComponent" :key="activeTabId" />
        </Transition>
      </main>
      
    </div>
  </div>
</template>