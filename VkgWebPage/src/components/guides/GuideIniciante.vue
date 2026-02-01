<script setup>
import { computed } from 'vue';
import { captainsData } from '../../data/data';

const getImageUrl = (folder, name) => {
  return new URL(`../../assets/${folder}/${name}.jpg`, import.meta.url).href;
};

const tutorialCaptains = computed(() => {
  const targets = ['Sofia', 'Tengel', 'Logos'];
  let found = [];
  
  captainsData.forEach(tier => {
    tier.units.forEach(cap => {
      if (targets.includes(cap.unit)) {
        found.push(cap);
      }
    });
  });
  
  return found.sort((a, b) => targets.indexOf(a.unit) - targets.indexOf(b.unit));
});
</script>

<template>
  <div class="space-y-8">
    
    <!-- Introduction -->
    <div class="card-bg p-8 rounded-lg border border-white/10">
      <h2 class="text-3xl font-medieval text-white mb-6 border-b border-medieval-gold/30 pb-4">
        Starting Your Journey
      </h2>
      <p class="text-gray-300 leading-relaxed text-lg">
        Welcome, Jarl! The start in Total Battle can be brutal. Your first <strong class="text-white">3 days</strong> will define whether you will be a military powerhouse or just a farm for others.
      </p>
    </div>

    <!-- STEP 0: Aydae's Saga -->
    <div class="card-bg p-8 rounded-lg border border-medieval-gold/50 relative overflow-hidden">
      <div class="absolute top-0 right-0 p-4 opacity-10">
        <i class="fas fa-book-open text-9xl text-medieval-gold"></i>
      </div>

      <div class="relative z-10">
        <div class="flex items-center gap-3 mb-6">
          <div class="bg-medieval-gold text-black w-8 h-8 flex items-center justify-center rounded font-bold">0</div>
          <h3 class="text-2xl font-medieval text-medieval-gold font-bold">Aydae's Saga (Tutorial)</h3>
        </div>
        
        <p class="text-gray-300 mb-6">
          Before thinking about war, you have a mission: <strong class="text-white">Save Princess Aydae</strong>. 
          Do not ignore the tutorial chapters! They are not just story; they are the source of your first and most important Captains.
        </p>

        <div class="bg-black/40 rounded-lg p-6 border border-white/10">
          <h4 class="text-medieval-gold font-bold text-sm uppercase mb-4 flex items-center gap-2">
            <i class="fas fa-chess-queen"></i> Chapter Rewards:
          </h4>
          
          <div class="grid md:grid-cols-3 gap-4">
            
            <div v-for="cap in tutorialCaptains" :key="cap.unit" 
                 class="bg-white/5 p-4 rounded border border-white/5 hover:border-medieval-gold/50 transition text-center group">
              
              <img :src="getImageUrl('capitains', cap.unit)" :alt="cap.unit"
                   class="w-16 h-16 rounded-full object-cover mx-auto mb-3 border border-white/20 group-hover:scale-110 transition bg-gray-800">
              
              <h5 class="text-white font-bold">{{ cap.unit }}</h5>
              <p class="text-xs text-gray-400 mt-2 line-clamp-3">{{ cap.desc }}</p>
            </div>

          </div>
        </div>
      </div>
    </div>

    <!-- STEP 1: Capitol Rush -->
    <div class="card-bg p-8 rounded-lg border border-white/10">
      <div class="flex items-center gap-3 mb-4">
        <div class="bg-white/10 text-white w-8 h-8 flex items-center justify-center rounded font-bold">1</div>
        <h3 class="text-xl font-medieval text-white font-bold">Capitol Rush</h3>
      </div>
      
      <p class="text-gray-300 mb-4">
        Don't waste time training excessive low-level troops (T1/T2). Your goal is to level up the <strong>Capitol</strong> as fast as possible to unlock superior technologies.
      </p>

      <div class="bg-blue-900/20 p-4 border-l-4 border-blue-500 rounded flex items-start gap-3">
        <i class="fas fa-info-circle text-blue-400 mt-1"></i>
        <div>
          <strong class="text-blue-400 block mb-1">Vital Economy Tip:</strong> 
          <span class="text-gray-300 text-sm">Use your speedups only on constructions and research that take <strong>more than 4 hours</strong>. For short times, use the alliance "Help" button.</span>
        </div>
      </div>
    </div>

    <!-- STEP 2: Join a Clan -->
    <div class="card-bg p-8 rounded-lg border border-white/10">
      <div class="flex items-center gap-3 mb-4">
        <div class="bg-white/10 text-white w-8 h-8 flex items-center justify-center rounded font-bold">2</div>
        <h3 class="text-xl font-medieval text-white font-bold">Join a Clan (Immediately!)</h3>
      </div>
      
      <ul class="grid md:grid-cols-3 gap-4 text-sm">
        <li class="flex items-center gap-3 bg-black/40 p-3 rounded border border-white/5">
          <i class="fas fa-hand-holding-medical text-green-500"></i>
          <span class="text-gray-300">Help reduces construction time</span>
        </li>
        <li class="flex items-center gap-3 bg-black/40 p-3 rounded border border-white/5">
          <i class="fas fa-gift text-yellow-500"></i>
          <span class="text-gray-300">Clan Chests (Resources/Gold)</span>
        </li>
        <li class="flex items-center gap-3 bg-black/40 p-3 rounded border border-white/5">
          <i class="fas fa-shield-alt text-blue-500"></i>
          <span class="text-gray-300">Protection against attacks</span>
        </li>
      </ul>
    </div>

    <!-- STEP 3: The 200 Points Rule -->
    <div class="card-bg p-8 rounded-lg border border-white/10">
      <div class="flex items-center gap-3 mb-4">
        <div class="bg-white/10 text-white w-8 h-8 flex items-center justify-center rounded font-bold">3</div>
        <h3 class="text-xl font-medieval text-white font-bold">The 200 Points Rule</h3>
      </div>

      <div class="flex flex-col md:flex-row gap-6 items-center">
        <div class="flex-1">
          <p class="text-gray-300 mb-4">
            Daily quests are the backbone of your growth. They provide resources, Hero XP, and fragments.
          </p>
          <ul class="list-disc pl-5 space-y-2 text-gray-400 text-sm">
            <li>Complete simple tasks (gathering, training, killing monsters).</li>
            <li>The goal is not just to complete them, but to reach the chest milestones.</li>
          </ul>
        </div>
        
        <div class="bg-yellow-900/10 p-6 rounded-lg border border-yellow-500/30 text-center w-full md:w-auto min-w-[200px]">
          <div class="text-4xl font-bold text-medieval-gold mb-1">200</div>
          <div class="text-xs uppercase tracking-widest text-yellow-500 font-bold mb-3">Daily Points</div>
          <p class="text-xs text-gray-400">Mandatory goal to earn the<br><strong>Summoning Scroll</strong>.</p>
        </div>
      </div>
    </div>

    <!-- STEP 4: City Layout -->
    <div class="card-bg p-8 rounded-lg border border-white/10">
      <div class="flex items-center gap-3 mb-6">
        <div class="bg-white/10 text-white w-8 h-8 flex items-center justify-center rounded font-bold">4</div>
        <h3 class="text-xl font-medieval text-white font-bold">The Golden Standard: City Layout</h3>
      </div>

      <p class="text-gray-300 mb-6">
        To maximize efficiency, veteran players follow a specific building ratio. This setup ensures you have enough food for upkeep, silver for production, and training speed for war.
      </p>

      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        
        <!-- Farms -->
        <div class="bg-green-900/10 border border-green-500/30 p-4 rounded text-center">
          <i class="fas fa-wheat text-green-500 text-2xl mb-2"></i>
          <div class="text-2xl font-bold text-white">18</div>
          <div class="text-xs uppercase tracking-widest text-green-400">Farms</div>
        </div>

        <!-- Mansions -->
        <div class="bg-yellow-900/10 border border-yellow-500/30 p-4 rounded text-center">
          <i class="fas fa-home text-yellow-500 text-2xl mb-2"></i>
          <div class="text-2xl font-bold text-white">6</div>
          <div class="text-xs uppercase tracking-widest text-yellow-400">Mansions</div>
        </div>

        <!-- Barracks -->
        <div class="bg-red-900/10 border border-red-500/30 p-4 rounded text-center">
          <i class="fas fa-campground text-red-500 text-2xl mb-2"></i>
          <div class="text-2xl font-bold text-white">10</div>
          <div class="text-xs uppercase tracking-widest text-red-400">Barracks</div>
        </div>

        <!-- Resources -->
        <div class="bg-gray-800/40 border border-gray-500/30 p-4 rounded text-center">
          <i class="fas fa-hammer text-gray-400 text-2xl mb-2"></i>
          <div class="text-2xl font-bold text-white">1</div>
          <div class="text-xs uppercase tracking-widest text-gray-400">Of Each Resource</div>
        </div>

      </div>

      <div class="bg-black/30 p-4 rounded mb-6 border border-white/5">
        <h4 class="text-medieval-gold font-bold text-sm mb-2">Standard Buildings:</h4>
        <p class="text-xs text-gray-400">
          Temple, Caravan, Portal Master, Academy, Warehouse. (Always build these as they unlock).
        </p>
      </div>

      <div class="bg-purple-900/20 p-4 border-l-4 border-purple-500 rounded flex items-start gap-3">
        <i class="fas fa-balance-scale text-purple-400 mt-1"></i>
        <div>
          <strong class="text-purple-400 block mb-1">Strategic Choice:</strong> 
          <span class="text-gray-300 text-sm">
            This is the standard recommendation (18 Farms / 6 Mansions). However, you can adjust this balance depending on your playstyle. 
            Prioritize <strong>Mansions</strong> if you need more Silver (Production/Research). Prioritize <strong>Farms</strong> if you need more Food (Troop Upkeep). 
            The number of Barracks and Resource buildings should generally remain standard.
          </span>
        </div>
      </div>

    </div>

  </div>
</template>