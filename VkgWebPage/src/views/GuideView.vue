<script setup>
import { ref, computed } from 'vue';

// Sub-component Imports
// I recommend creating a 'src/components/guides' folder to stay organized
import GuideIniciante from '../components/guides/GuideIniciante.vue';
import GuideEconomia from '../components/guides/GuideEconomia.vue';
import GuideMilitar from '../components/guides/GuideMilitar.vue';
import GuideEventos from '../components/guides/GuideEventos.vue';
import GuideDicas from '../components/guides/GuideDicas.vue';

const activeTabId = ref('iniciante');

const tabs = [
  { id: 'iniciante', label: 'First Steps', icon: 'fa-shoe-prints', component: GuideIniciante },
  { id: 'economia', label: 'Economy & Resources', icon: 'fa-coins', component: GuideEconomia },
  { id: 'militar', label: 'Military & Captains', icon: 'fa-chess-knight', component: GuideMilitar },
  { id: 'eventos', label: 'Daily Events', icon: 'fa-calendar-alt', component: GuideEventos },
  { id: 'dicas', label: 'Golden Tips', icon: 'fa-lightbulb', component: GuideDicas }
];

// Computed to return the current component based on selected ID
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

    <div class="max-w-7xl mx-auto px-4 md:px-6 mt-12 grid md:grid-cols-4 gap-8">
      
      <aside class="md:col-span-1">
        <div class="sticky top-28 bg-white/5 border border-white/10 rounded-lg p-4 backdrop-blur-sm">
          <h3 class="text-medieval-gold font-bold uppercase tracking-widest mb-4 text-sm px-2">Topics</h3>
          <nav class="flex flex-col gap-2">
            <button 
              v-for="tab in tabs" 
              :key="tab.id"
              @click="activeTabId = tab.id"
              :class="[
                'text-left px-4 py-3 rounded transition flex items-center gap-3',
                activeTabId === tab.id 
                  ? 'bg-medieval-gold text-black font-bold shadow-[0_0_10px_rgba(197,160,89,0.4)]' 
                  : 'text-gray-400 hover:bg-white/10 hover:text-white'
              ]"
            >
              <i :class="['fas', tab.icon, 'w-6 text-center']"></i>
              {{ tab.label }}
            </button>
          </nav>
        </div>
      </aside>

      <main class="md:col-span-3 min-h-[500px]">
        <Transition name="fade" mode="out-in">
          <component :is="currentComponent" :key="activeTabId" />
        </Transition>
      </main>
    </div>
  </div>
</template>

<style scoped>
/* Tab transition animation */
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
</style>