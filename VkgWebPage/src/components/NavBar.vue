<script setup>
import { ref } from 'vue';

const mobileMenu = ref(false);
</script>

<template>
  <nav class="fixed w-full z-50 bg-[#030508]/90 border-b border-slate-800/50 px-4 md:px-6 py-4 flex justify-between items-center backdrop-blur-md">
    <div class="flex items-center gap-3">
      <router-link to="/" class="flex items-center gap-3 group">
        <!-- Ícone atualizado para o tema da alcatéia -->
         <img src="../assets/lobo_menu.png" alt="Lobo" class="w-8 h-8 mx-auto">
        <span class="font-medieval text-lg md:text-xl font-bold tracking-wider text-slate-200 group-hover:text-blue-400 transition duration-300">[WLF] Wolf</span>
      </router-link>
    </div>
    
    <!-- Desktop Menu -->
    <div class="hidden lg:flex gap-6 items-center text-sm uppercase tracking-wider font-bold text-slate-400">
      <router-link to="/" class="hover:text-blue-400 transition duration-300">Home</router-link>
      <router-link :to="{ path: '/', hash: '#sobre' }" class="hover:text-blue-400 transition duration-300">About</router-link>
      <router-link to="/guia" class="hover:text-blue-400 transition duration-300 text-blue-400">Academy (Guide)</router-link>
      <router-link :to="{ path: '/', hash: '#roe' }" class="hover:text-blue-400 transition duration-300">RoE</router-link>
      <router-link :to="{ path: '/', hash: '#gifts' }" class="hover:text-blue-400 transition duration-300">Gifts</router-link>
      <router-link :to="{ path: '/', hash: '#recrutamento' }" class="bg-blue-600/20 border border-blue-500/50 text-blue-400 px-4 py-2 rounded font-bold hover:bg-blue-600 hover:text-white transition text-xs shadow-[0_0_10px_rgba(59,130,246,0.2)]">
        Recruitment
      </router-link>
            <!-- Novo Link de Gerenciamento -->
      <router-link to="/management" class="hover:text-blue-400 transition duration-300 flex items-center gap-2">
        <i class="fas fa-crown"></i> Management
      </router-link>
    </div>

    <!-- Mobile Toggle Button -->
    <div class="lg:hidden flex items-center gap-4">
      <button @click="mobileMenu = !mobileMenu" class="text-slate-400 hover:text-blue-400 transition focus:outline-none">
        <i class="fas" :class="mobileMenu ? 'fa-times' : 'fa-bars'" style="font-size: 1.5rem;"></i>
      </button>
    </div>

    <!-- Mobile Menu Overlay -->
    <Transition name="fade">
      <div v-if="mobileMenu" class="fixed inset-0 top-[73px] z-40 bg-[#030508]/95 flex flex-col items-center justify-start pt-10 gap-8 text-xl font-medieval text-slate-300 overflow-y-auto h-[calc(100vh-73px)] backdrop-blur-md">
        
        <!-- Links traduzidos para o inglês -->
        <router-link @click="mobileMenu = false" to="/" class="hover:text-blue-400 transition">Home</router-link>
        <router-link @click="mobileMenu = false" to="/guia" class="hover:text-blue-400 transition">Academy (Guide)</router-link>
        <router-link @click="mobileMenu = false" :to="{ path: '/', hash: '#gifts' }" class="hover:text-blue-400 transition">Gifts</router-link>
        <router-link @click="mobileMenu = false" :to="{ path: '/', hash: '#roe' }" class="hover:text-blue-400 transition">RoE</router-link>
        <router-link @click="mobileMenu = false" :to="{ path: '/', hash: '#recrutamento' }" class="hover:text-blue-400 transition">Recruitment</router-link>
        <router-link @click="mobileMenu = false" to="/management" class="hover:text-blue-400 transition text-blue-300">
          <i class="fas fa-crown mr-2"></i> Management
        </router-link>
        <div class="mt-8 border-t border-slate-800/80 w-1/2"></div>
        <p class="text-xs text-slate-500 font-sans uppercase tracking-widest">WLF Shadow</p>
      </div>
    </Transition>
  </nav>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>