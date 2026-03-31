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
  <div class="pt-24 min-h-screen bg-[#030508] pb-20 font-sans text-slate-300">
    
    <!-- Cabeçalho Temático WLF -->
    <header class="text-center py-16 px-6 bg-gradient-to-b from-[#0a0f1a] to-transparent border-b border-slate-800/50 relative overflow-hidden">
      <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/10 via-transparent to-transparent pointer-events-none"></div>
      
      <div class="relative z-10">
        <div class="text-slate-500 text-6xl mb-4 opacity-80">
          <img src="../assets/lobo.png" alt="Wolf" class="w-32 h-32 mx-auto">
        </div>
        <h1 class="text-4xl md:text-5xl font-medieval text-slate-200 mb-4 tracking-wider drop-shadow-lg uppercase">
          Wolf <span class="text-blue-400 font-light">Academy</span>
        </h1>
        <p class="text-slate-400 max-w-2xl mx-auto italic text-lg border-l-4 border-blue-500/50 pl-4 py-1 bg-slate-900/20">
          "Knowledge is a ruler's sharpest weapon. Study these scrolls and lead the wolf pack with class."
        </p>
      </div>
    </header>

    <div class="max-w-[98%] xl:max-w-7xl mx-auto px-4 md:px-6 mt-12 flex flex-col md:flex-row gap-6 md:gap-8">
      
      <!-- Menu Lateral -->
      <aside 
        class="relative transition-all duration-300 ease-in-out shrink-0 z-20"
        :class="isMenuOpen ? 'md:w-64' : 'md:w-20'"
      >
        <div class="md:sticky md:top-28 bg-[#0b101a]/80 border border-slate-700/50 rounded-lg p-2 md:p-4 backdrop-blur-md flex flex-row md:flex-col overflow-x-auto md:overflow-visible custom-scrollbar shadow-[0_0_20px_rgba(0,0,0,0.5)]">
          
          <div class="hidden md:flex justify-between items-center mb-4 px-2 h-8">
            <h3 v-if="isMenuOpen" class="text-slate-400 font-bold uppercase tracking-widest text-sm whitespace-nowrap overflow-hidden transition-opacity duration-300">
              Topics
            </h3>
            <button @click="isMenuOpen = !isMenuOpen" 
                    class="text-slate-500 hover:text-blue-300 transition w-8 h-8 flex items-center justify-center rounded hover:bg-slate-800 ml-auto"
                    title="Collapse/Expand Menu">
              <i class="fas" :class="isMenuOpen ? 'fa-chevron-left' : 'fa-list-ul'"></i>
            </button>
          </div>

          <nav class="flex flex-row md:flex-col gap-2 min-w-max md:min-w-0 pb-2 md:pb-0">
            <button 
              v-for="tab in tabs" 
              :key="tab.id"
              @click="activeTabId = tab.id"
              class="text-left rounded transition-all duration-200 flex items-center relative group overflow-hidden"
              :class="[
                isMenuOpen ? 'px-4 py-3 gap-3' : 'p-3 justify-center md:h-12 md:w-12 mx-auto',
                activeTabId === tab.id 
                  ? 'bg-gradient-to-r from-slate-800 to-[#0b101a] text-blue-300 font-bold border-l-2 border-blue-400 shadow-[inset_0_0_10px_rgba(96,165,250,0.1)]' 
                  : 'text-slate-500 hover:bg-slate-800/50 hover:text-slate-200 border-l-2 border-transparent'
              ]"
            >
              <i :class="['fas', tab.icon, isMenuOpen ? 'w-6 text-center' : 'text-lg', activeTabId === tab.id ? 'drop-shadow-[0_0_5px_rgba(96,165,250,0.5)]' : '']"></i>
              
              <span class="whitespace-nowrap transition-all duration-300 text-sm"
                    :class="isMenuOpen ? 'block opacity-100 ml-1' : 'hidden md:hidden block ml-2'">
                {{ tab.label }}
              </span>

              <!-- Tooltip para quando o menu está recolhido -->
              <div v-if="!isMenuOpen" 
                   class="hidden md:block absolute left-full ml-4 px-3 py-2 bg-[#0b101a] text-slate-300 text-xs font-bold uppercase tracking-wider rounded border border-slate-700 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50 whitespace-nowrap shadow-xl">
                {{ tab.label }}
              </div>
            </button>
          </nav>
        </div>
      </aside>

      <!-- Renderização do Componente de Guia -->
      <main class="flex-1 min-w-0 min-h-[500px] transition-all duration-300">
        <Transition name="fade" mode="out-in">
          <component :is="currentComponent" :key="activeTabId" />
        </Transition>
      </main>
      
    </div>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* Scrollbar Temática Ice/Silver */
.custom-scrollbar::-webkit-scrollbar {
  height: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.4);
  border-radius: 4px;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(148, 163, 184, 0.3); /* Slate-400 com opacidade */
  border-radius: 4px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: rgba(96, 165, 250, 0.6); /* Blue-400 no hover */
}
</style>