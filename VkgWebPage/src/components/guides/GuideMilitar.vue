<script setup>
import { captainsData, heroesData } from '../../data/data';

const getImageUrl = (folder, name) => {
  return new URL(`../../assets/${folder}/${name}.jpg`, import.meta.url).href;
};
</script>

<template>
  <div class="space-y-8">
    <div class="card-bg p-8 rounded-lg border border-white/10">
      <h2 class="text-3xl font-medieval text-white mb-6 border-b border-medieval-gold/30 pb-4">Art of War</h2>
      
      <div class="space-y-6 text-gray-300">
        <p>Don't attack other players before you are ready. The initial "Peace Shield" is your best friend.</p>

        <h3 class="text-xl text-medieval-gold font-bold">Essential Equipment</h3>
        <p>A captain without equipment is useless. Forge equipment in the Smithy focused on:</p>
        <ul class="grid grid-cols-2 gap-4 mt-4">
          <li class="bg-white/5 p-3 rounded text-center border border-white/10">
            <span class="block text-medieval-gold font-bold">Speed</span>
            <span class="text-xs">For gathering and fast attacks</span>
          </li>
          <li class="bg-white/5 p-3 rounded text-center border border-white/10">
            <span class="block text-medieval-gold font-bold">Strength</span>
            <span class="text-xs">For killing epic monsters</span>
          </li>
        </ul>
      </div>
    </div>

    <div class="card-bg p-8 rounded-lg border border-white/10">
      <h2 class="text-3xl font-medieval text-white mb-6 border-b border-medieval-gold/30 pb-4">Hall of Captains</h2>
      <p class="text-gray-300 mb-8 leading-relaxed">
        Meet the heroes who will lead your armies. Understanding each one's specialty is the key to victory.
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
                  <i class="fas fa-lightbulb mr-1"></i> Tactical Tip:
                </span>
                <span class="text-gray-400 italic">{{ cap.tips }}</span>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="card-bg p-8 rounded-lg border border-white/10">
      <h2 class="text-3xl font-medieval text-white mb-6 border-b border-medieval-gold/30 pb-4">Pantheon of Heroes</h2>
      <p class="text-gray-300 mb-8 leading-relaxed">
        Beyond captains, your Avatar (Hero) possesses unique abilities that can drastically change the course of battle or your city's economy.
      </p>

      <div class="space-y-12">
        <div v-for="tier in heroesData" :key="tier.tier" class="space-y-6">
          <div class="flex items-center gap-3 border-b border-white/10 pb-2">
             <i class="fas fa-user-shield text-2xl" :class="tier.color"></i>
             <h3 class="text-2xl font-medieval font-bold uppercase tracking-widest" :class="tier.color">{{ tier.tier }}</h3>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            <div v-for="hero in tier.units" :key="hero.unit" 
                 class="relative flex flex-col bg-black/40 border p-5 rounded transition hover:-translate-y-1 hover:shadow-lg group"
                 :class="[tier.borderColor, tier.bg]">
              
              <div class="flex items-center gap-4 mb-4">
                <img :src="getImageUrl('heroes', hero.unit)" :alt="hero.unit" 
                     class="w-14 h-14 rounded-full object-cover border shadow-sm shrink-0 bg-gray-800"
                     :class="[tier.borderColor]">
                
                <h4 class="text-white font-bold text-lg group-hover:text-yellow-400 transition">{{ hero.unit }}</h4>
              </div>
              
              <p class="text-gray-300 text-sm mb-4 flex-grow border-l-2 pl-3 leading-relaxed" :class="tier.borderColor">
                {{ hero.desc }}
              </p>
              
              <div class="mt-auto bg-black/50 p-3 rounded border border-white/5 text-xs">
                <span class="font-bold text-medieval-gold uppercase tracking-wider block mb-1">
                  <i class="fas fa-star mr-1"></i> Specialty:
                </span>
                <span class="text-gray-400 italic">{{ hero.tips }}</span>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>