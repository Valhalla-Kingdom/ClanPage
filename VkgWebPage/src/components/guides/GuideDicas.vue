<script setup>
const monsterGuide = [
  // 1 Type
  { lvl: 1, targets: [ { type: 'Undead', color: 'text-slate-400', troops: 'Ranged / Melee' } ] },
  { lvl: 2, targets: [ { type: 'Elf', color: 'text-green-400', troops: 'Ranged / Melee' } ] },
  { lvl: 3, targets: [ { type: 'Cursed', color: 'text-purple-400', troops: 'Ranged / Melee' } ] },
  { lvl: 4, targets: [ { type: 'Barbarian', color: 'text-yellow-500', troops: 'Ranged / Melee' } ] },
  { lvl: 5, targets: [ { type: 'Inferno', color: 'text-red-400', troops: 'Ranged / Melee' } ] },
  { lvl: 6, targets: [ { type: 'Undead', color: 'text-slate-400', troops: 'Mounted / Ranged' } ] },
  { lvl: 7, targets: [ { type: 'Elf', color: 'text-green-400', troops: 'Mounted / Ranged' } ] },
  { lvl: 8, targets: [ { type: 'Cursed', color: 'text-purple-400', troops: 'Mounted / Ranged' } ] },
  { lvl: 9, targets: [ { type: 'Barbarian', color: 'text-yellow-500', troops: 'Melee / Mounted' } ] },
  { lvl: 10, targets: [ { type: 'Inferno', color: 'text-red-400', troops: 'Mounted' } ] },
  // 2 Types
  { lvl: 11, targets: [ { type: 'Elf', color: 'text-green-400', troops: 'Ranged' }, { type: 'Undead', color: 'text-slate-400', troops: 'Melee' } ] },
  { lvl: 12, targets: [ { type: 'Barbarian', color: 'text-yellow-500', troops: 'Melee' }, { type: 'Cursed', color: 'text-purple-400', troops: 'Melee' } ] },
  { lvl: 13, targets: [ { type: 'Inferno', color: 'text-red-400', troops: 'Ranged' }, { type: 'Undead', color: 'text-slate-400', troops: 'Mounted' } ] },
  { lvl: 14, targets: [ { type: 'Cursed', color: 'text-purple-400', troops: 'Mounted' }, { type: 'Elf', color: 'text-green-400', troops: 'Ranged' } ] },
  { lvl: 15, targets: [ { type: 'Barbarian', color: 'text-yellow-500', troops: 'Ranged' }, { type: 'Inferno', color: 'text-red-400', troops: 'Ranged' } ] },
  // 3 Types
  { lvl: 16, targets: [ { type: 'Cursed', color: 'text-purple-400', troops: 'Ranged' }, { type: 'Elf', color: 'text-green-400', troops: 'Ranged / Mounted' }, { type: 'Undead', color: 'text-slate-400', troops: 'Mounted' } ] },
  { lvl: 17, targets: [ { type: 'Barbarian', color: 'text-yellow-500', troops: 'Mounted' }, { type: 'Inferno', color: 'text-red-400', troops: 'Melee' }, { type: 'Undead', color: 'text-slate-400', troops: 'Mounted' } ] },
  { lvl: 18, targets: [ { type: 'Barbarian', color: 'text-yellow-500', troops: 'Ranged' }, { type: 'Cursed', color: 'text-purple-400', troops: 'Melee' }, { type: 'Elf', color: 'text-green-400', troops: 'Ranged' } ] },
  { lvl: 19, targets: [ { type: 'Elf', color: 'text-green-400', troops: 'Mounted' }, { type: 'Inferno', color: 'text-red-400', troops: 'Ranged / Melee' }, { type: 'Undead', color: 'text-slate-400', troops: 'Mounted' } ] },
  { lvl: 20, targets: [ { type: 'Barbarian', color: 'text-yellow-500', troops: 'Ranged' }, { type: 'Cursed', color: 'text-purple-400', troops: 'Mounted' }, { type: 'Inferno', color: 'text-red-400', troops: 'Ranged' } ] },
  // 5 Types
  { lvl: 21, targets: [ { type: 'Barbarian', color: 'text-yellow-500', troops: 'Mounted' }, { type: 'Cursed', color: 'text-purple-400', troops: 'Mounted' }, { type: 'Elf', color: 'text-green-400', troops: 'Ranged / Mounted' }, { type: 'Inferno', color: 'text-red-400', troops: 'Ranged' }, { type: 'Undead', color: 'text-slate-400', troops: 'Mounted' } ] },
  { lvl: 22, targets: [ { type: 'Barbarian', color: 'text-yellow-500', troops: 'Ranged' }, { type: 'Cursed', color: 'text-purple-400', troops: 'Melee' }, { type: 'Elf', color: 'text-green-400', troops: 'Mounted' }, { type: 'Inferno', color: 'text-red-400', troops: 'Ranged / Melee' }, { type: 'Undead', color: 'text-slate-400', troops: 'Melee' } ] },
  { lvl: 23, targets: [ { type: 'Barbarian', color: 'text-yellow-500', troops: 'Mounted' }, { type: 'Cursed', color: 'text-purple-400', troops: 'Melee' }, { type: 'Elf', color: 'text-green-400', troops: 'Mounted' }, { type: 'Inferno', color: 'text-red-400', troops: 'Mounted' }, { type: 'Undead', color: 'text-slate-400', troops: 'Melee' } ] },
  { lvl: 24, targets: [ { type: 'Barbarian', color: 'text-yellow-500', troops: 'Ranged / Melee' }, { type: 'Cursed', color: 'text-purple-400', troops: 'Melee' }, { type: 'Elf', color: 'text-green-400', troops: 'Melee' }, { type: 'Inferno', color: 'text-red-400', troops: 'Melee' }, { type: 'Undead', color: 'text-slate-400', troops: 'Mounted' } ] },
  { lvl: 25, targets: [ { type: 'Barbarian', color: 'text-yellow-500', troops: 'Ranged' }, { type: 'Cursed', color: 'text-purple-400', troops: 'Mounted' }, { type: 'Elf', color: 'text-green-400', troops: 'Mounted' }, { type: 'Inferno', color: 'text-red-400', troops: 'Ranged / Mounted' }, { type: 'Undead', color: 'text-slate-400', troops: 'Ranged' } ] },
  { lvl: 26, targets: [ { type: 'Barbarian', color: 'text-yellow-500', troops: 'Ranged' }, { type: 'Cursed', color: 'text-purple-400', troops: 'Melee' }, { type: 'Elf', color: 'text-green-400', troops: 'Mounted' }, { type: 'Inferno', color: 'text-red-400', troops: 'Mounted' }, { type: 'Undead', color: 'text-slate-400', troops: 'Melee' } ] },
  { lvl: 27, targets: [ { type: 'Barbarian', color: 'text-yellow-500', troops: 'Ranged / Melee' }, { type: 'Cursed', color: 'text-purple-400', troops: 'Melee' }, { type: 'Elf', color: 'text-green-400', troops: 'Melee' }, { type: 'Inferno', color: 'text-red-400', troops: 'Mounted' }, { type: 'Undead', color: 'text-slate-400', troops: 'Mounted' } ] },
  { lvl: 28, targets: [ { type: 'Barbarian', color: 'text-yellow-500', troops: 'Ranged / Melee' }, { type: 'Cursed', color: 'text-purple-400', troops: 'Mounted' }, { type: 'Elf', color: 'text-green-400', troops: 'Mounted' }, { type: 'Inferno', color: 'text-red-400', troops: 'Mounted' }, { type: 'Undead', color: 'text-slate-400', troops: 'Ranged' } ] },
  { lvl: 29, targets: [ { type: 'Barbarian', color: 'text-yellow-500', troops: 'Ranged' }, { type: 'Cursed', color: 'text-purple-400', troops: 'Melee' }, { type: 'Elf', color: 'text-green-400', troops: 'Mounted' }, { type: 'Inferno', color: 'text-red-400', troops: 'Ranged' }, { type: 'Undead', color: 'text-slate-400', troops: 'Melee' } ] },
  { lvl: 30, targets: [ { type: 'Barbarian', color: 'text-yellow-500', troops: 'Ranged' }, { type: 'Cursed', color: 'text-purple-400', troops: 'Mounted' }, { type: 'Elf', color: 'text-green-400', troops: 'Mounted' }, { type: 'Inferno', color: 'text-red-400', troops: 'Melee' }, { type: 'Undead', color: 'text-slate-400', troops: 'Melee' } ] },
  { lvl: 31, targets: [ { type: 'Barbarian', color: 'text-yellow-500', troops: 'Melee' }, { type: 'Cursed', color: 'text-purple-400', troops: 'Mounted' }, { type: 'Elf', color: 'text-green-400', troops: 'Mounted' }, { type: 'Inferno', color: 'text-red-400', troops: 'Mounted' }, { type: 'Undead', color: 'text-slate-400', troops: 'Ranged' } ] },
  { lvl: 32, targets: [ { type: 'Barbarian', color: 'text-yellow-500', troops: 'Ranged' }, { type: 'Cursed', color: 'text-purple-400', troops: 'Melee' }, { type: 'Elf', color: 'text-green-400', troops: 'Mounted' }, { type: 'Inferno', color: 'text-red-400', troops: 'Melee' }, { type: 'Undead', color: 'text-slate-400', troops: 'Ranged' } ] },
  { lvl: 33, targets: [ { type: 'Barbarian', color: 'text-yellow-500', troops: 'Ranged / Melee' }, { type: 'Cursed', color: 'text-purple-400', troops: 'Melee' }, { type: 'Elf', color: 'text-green-400', troops: 'Melee' }, { type: 'Inferno', color: 'text-red-400', troops: 'Mounted' }, { type: 'Undead', color: 'text-slate-400', troops: 'Melee' } ] },
  { lvl: 34, targets: [ { type: 'Barbarian', color: 'text-yellow-500', troops: 'Ranged' }, { type: 'Cursed', color: 'text-purple-400', troops: 'Mounted' }, { type: 'Elf', color: 'text-green-400', troops: 'Mounted' }, { type: 'Inferno', color: 'text-red-400', troops: 'Mounted' }, { type: 'Undead', color: 'text-slate-400', troops: 'Ranged' } ] },
  { lvl: 35, targets: [ { type: 'Barbarian', color: 'text-yellow-500', troops: 'Ranged' }, { type: 'Cursed', color: 'text-purple-400', troops: 'Melee' }, { type: 'Elf', color: 'text-green-400', troops: 'Mounted' }, { type: 'Inferno', color: 'text-red-400', troops: 'Mounted' }, { type: 'Undead', color: 'text-slate-400', troops: 'Melee' } ] },
  { lvl: 36, targets: [ { type: 'Barbarian', color: 'text-yellow-500', troops: '-' }, { type: 'Cursed', color: 'text-purple-400', troops: 'Melee / Mounted' }, { type: 'Elf', color: 'text-green-400', troops: 'Melee / Ranged' }, { type: 'Inferno', color: 'text-red-400', troops: '-' }, { type: 'Undead', color: 'text-slate-400', troops: 'Melee' } ] },
  { lvl: 37, targets: [ { type: 'Barbarian', color: 'text-yellow-500', troops: '-' }, { type: 'Cursed', color: 'text-purple-400', troops: 'Mounted / Melee' }, { type: 'Elf', color: 'text-green-400', troops: 'Ranged / Melee' }, { type: 'Inferno', color: 'text-red-400', troops: 'Ranged / Mounted' }, { type: 'Undead', color: 'text-slate-400', troops: 'Melee' } ] },
  { lvl: 38, targets: [ { type: 'Barbarian', color: 'text-yellow-500', troops: '-' }, { type: 'Cursed', color: 'text-purple-400', troops: '-' }, { type: 'Elf', color: 'text-green-400', troops: 'Melee' }, { type: 'Inferno', color: 'text-red-400', troops: 'Ranged / Mounted' }, { type: 'Undead', color: 'text-slate-400', troops: 'Ranged' } ] },
  { lvl: 39, targets: [ { type: 'Barbarian', color: 'text-yellow-500', troops: '-' }, { type: 'Cursed', color: 'text-purple-400', troops: 'Ranged / Melee' }, { type: 'Elf', color: 'text-green-400', troops: '-' }, { type: 'Inferno', color: 'text-red-400', troops: 'Mounted / Ranged' } ] }
];
</script>

<template>
  <div class="space-y-8 text-slate-300">
    
    <!-- Troop Stacking Strategy -->
    <div class="bg-[#0b101a]/80 p-8 rounded-lg border border-slate-800 shadow-lg backdrop-blur-sm">
      <h2 class="text-3xl font-medieval text-slate-200 mb-6 border-b border-slate-700/50 pb-4">
        Troop Stacking Strategy
      </h2>
      
      <div class="grid md:grid-cols-2 gap-8">
        
        <!-- Explicação Visual -->
        <div class="space-y-4">
          <p class="text-slate-400 leading-relaxed">
            Stacking is the art of layering your army so that cheaper troops die first, protecting your valuable Mercenaries and Monsters.
          </p>
          
          <div class="bg-[#0a0f1a] border border-slate-700/50 p-4 rounded-lg">
            <h4 class="text-blue-400 font-bold uppercase text-xs mb-3">The Pack's Rule of Targeting</h4>
            <p class="text-sm text-slate-200 font-bold bg-red-900/20 p-2 rounded border-l-2 border-red-500 mb-2">
              "The enemy ALWAYS attacks your stack with the Highest Total Health first."
            </p>
            <p class="text-xs text-slate-500">
              Your goal is to make your <strong>Guardsmen (G)</strong> have more Total Health than your Monsters.
            </p>
          </div>

          <div class="bg-blue-900/10 border border-blue-500/20 p-4 rounded-lg">
            <h4 class="text-blue-400 font-bold uppercase text-xs mb-3">The 2:1 Ratio (Simplified)</h4>
            <p class="text-xs text-slate-400 mb-2">To ensure lower tiers take the hit, use this rough ratio:</p>
            <div class="flex flex-col gap-2">
              <div class="flex items-center gap-2">
                <span class="bg-blue-500 text-white text-[10px] font-bold px-2 py-1 rounded w-12 text-center">Top</span>
                <span class="text-slate-300 text-sm">1,000 G5 Troops</span>
              </div>
              <div class="flex items-center gap-2">
                <span class="bg-blue-700 text-white text-[10px] font-bold px-2 py-1 rounded w-12 text-center">Mid</span>
                <span class="text-slate-300 text-sm">2,000 G4 Troops <span class="text-slate-500 text-xs">(2x previous)</span></span>
              </div>
              <div class="flex items-center gap-2">
                <span class="bg-blue-900 text-white text-[10px] font-bold px-2 py-1 rounded w-12 text-center">Bot</span>
                <span class="text-slate-300 text-sm">4,000 G3 Troops <span class="text-slate-500 text-xs">(2x previous)</span></span>
              </div>
            </div>
          </div>
        </div>

        <!-- Calculadora Simples -->
        <div class="bg-[#0a0f1a] p-6 rounded-lg border border-slate-800 flex flex-col justify-center">
          <h3 class="text-xl font-medieval text-slate-200 mb-4">Leadership & Stacking</h3>
          
          <ul class="space-y-3 text-sm text-slate-400">
            <li class="flex items-start gap-3">
              <i class="fas fa-calculator text-blue-500 mt-1"></i>
              <span>
                <strong class="text-slate-200">Total Leadership:</strong> Sum of Hero + Captains + Research + Clan Bonuses.
              </span>
            </li>
            <li class="flex items-start gap-3">
              <i class="fas fa-layer-group text-blue-500 mt-1"></i>
              <span>
                <strong class="text-slate-200">Layers (n):</strong> If a monster squad has 4 types (n=4), you need at least <strong>9 layers</strong> (2n+1) of fodder troops before your main damage dealers attack safely.
              </span>
            </li>
            <li class="flex items-start gap-3">
              <i class="fas fa-flask text-blue-500 mt-1"></i>
              <span>
                <strong class="text-slate-200">Potions:</strong> Always use a <strong>Leadership Potion</strong> before calculating your max stack size for big events.
              </span>
            </li>
          </ul>

          <div class="mt-6 text-center">
            <p class="text-xs text-slate-500 italic mb-2">Need precise numbers?</p>
            <a href="https://totalcalculator.org/index.php" target="_blank" 
               class="inline-block border border-blue-500/50 bg-blue-600/20 text-blue-400 px-6 py-2 rounded hover:bg-blue-600 hover:text-white transition font-bold uppercase text-xs shadow-[0_0_10px_rgba(59,130,246,0.15)]">
              Open External Calculator
            </a>
          </div>
        </div>

      </div>
    </div>

    <!-- Citadels Guide -->
    <div class="bg-[#0b101a]/80 p-8 rounded-lg border border-slate-800 shadow-lg backdrop-blur-sm">
      <h2 class="text-3xl font-medieval text-slate-200 mb-6 border-b border-slate-700/50 pb-4">
        Citadels Strategy
      </h2>
      
      <div class="bg-blue-900/20 p-4 border-l-4 border-blue-500 rounded mb-8 shadow-sm">
        <strong class="text-blue-400 block mb-1"> The Golden Rule:</strong> 
        <span class="text-slate-300 text-sm">
          Citadels contain keys to rare crypts. The <strong>Citadel's level</strong> is equal to the <strong>Crypt Key's level</strong> you will receive.
        </span>
      </div>

      <div class="grid md:grid-cols-2 gap-8">
        
        <!-- Elven Citadel -->
        <div class="space-y-4">
          <div class="flex items-center gap-3 mb-2">
            <i class="fas fa-leaf text-green-500 text-xl"></i>
            <h3 class="text-xl font-medieval text-green-500 font-bold">Elven Citadel</h3>
          </div>
          
          <div class="space-y-3">
            <!-- Lvl 10 -->
            <div class="bg-green-900/10 border border-green-500/20 p-3 rounded">
              <div class="flex justify-between items-center mb-1">
                <span class="text-slate-200 font-bold">Level 10</span>
                <span class="text-[10px] bg-green-500/20 text-green-300 px-2 py-0.5 rounded uppercase font-bold">Ranged Only</span>
              </div>
              <p class="text-xs text-slate-400">Requires: <strong class="text-slate-200">100-150 T2 Catapults</strong></p>
            </div>

            <!-- Lvl 15 -->
            <div class="bg-green-900/10 border border-green-500/20 p-3 rounded">
              <div class="flex justify-between items-center mb-1">
                <span class="text-slate-200 font-bold">Level 15</span>
                <span class="text-[10px] bg-orange-500/20 text-orange-300 px-2 py-0.5 rounded uppercase font-bold">Mounted Only</span>
              </div>
              <p class="text-xs text-slate-400">Requires: <strong class="text-slate-200">320-350 T3 Catapults</strong></p>
            </div>

            <!-- Lvl 20 -->
            <div class="bg-green-900/10 border border-green-500/20 p-3 rounded">
              <div class="flex justify-between items-center mb-1">
                <span class="text-slate-200 font-bold">Level 20</span>
                <span class="text-[10px] bg-red-500/20 text-red-300 px-2 py-0.5 rounded uppercase font-bold">Melee & Flying</span>
              </div>
              <p class="text-xs text-slate-400">Requires: <strong class="text-slate-200">1,000 T3 Catapults</strong></p>
            </div>

             <!-- Lvl 25 -->
             <div class="bg-green-900/10 border border-green-500/20 p-3 rounded">
              <div class="flex justify-between items-center mb-1">
                <span class="text-slate-200 font-bold">Level 25</span>
                <span class="text-[10px] bg-red-500/20 text-red-300 px-2 py-0.5 rounded uppercase font-bold">Melee & Flying</span>
              </div>
              <p class="text-xs text-slate-400">
                Requires: <strong class="text-slate-200">3,200 T5 Catapults</strong> <br>
                + <strong class="text-slate-200">100 T9 Mercenaries</strong>
              </p>
            </div>
          </div>
        </div>

        <!-- Cursed Citadel -->
        <div class="space-y-4">
          <div class="flex items-center gap-3 mb-2">
            <i class="fas fa-skull text-purple-500 text-xl"></i>
            <h3 class="text-xl font-medieval text-purple-500 font-bold">Cursed Citadel</h3>
          </div>
          
          <div class="space-y-3">
            <!-- Lvl 20 -->
            <div class="bg-purple-900/10 border border-purple-500/20 p-3 rounded">
              <div class="flex justify-between items-center mb-1">
                <span class="text-slate-200 font-bold">Level 20</span>
                <span class="text-[10px] bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded uppercase font-bold text-right">Melee & Flying Melee Only</span>
              </div>
              <p class="text-xs text-slate-500 italic mb-1">*No animals or giants allowed</p>
              <p class="text-xs text-slate-400">Requires: <strong class="text-slate-200">2,200 T4 Catapults</strong></p>
            </div>

            <!-- Lvl 25 -->
            <div class="bg-purple-900/10 border border-purple-500/20 p-3 rounded">
              <div class="flex justify-between items-center mb-1">
                <span class="text-slate-200 font-bold">Level 25</span>
                <span class="text-[10px] bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded uppercase font-bold">Melee & Flying</span>
              </div>
              <p class="text-xs text-slate-400 leading-relaxed">
                Requires: <br>
                <strong class="text-slate-200">7,800 T5 Catapults</strong> + <br>
                <strong class="text-slate-200">4,000 T6 Catapults</strong> + <br>
                <strong class="text-slate-200">150 T9 Mercenaries</strong>
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>

    <!-- Common Monster Guide (DYNAMIC) -->
    <div class="bg-[#0b101a]/80 p-8 rounded-lg border border-slate-800 shadow-lg backdrop-blur-sm">
      <h2 class="text-3xl font-medieval text-slate-200 mb-6 border-b border-slate-700/50 pb-4">
        Common Monster Guide
      </h2>
      <p class="text-slate-400 text-sm mb-6">
        Target the correct weakness of each monster to minimize losses.
      </p>

      <div class="overflow-hidden rounded-lg border border-slate-800">
        <!-- Wrapper com scroll para tabelas longas -->
        <div class="max-h-[600px] overflow-y-auto custom-scrollbar">
          <table class="w-full text-left text-sm">
            <thead class="bg-[#0a0f1a] text-blue-300 uppercase font-bold text-xs sticky top-0 z-10 shadow-md">
              <tr>
                <th class="p-3 border-b border-slate-700 w-16 text-center">Lvl</th>
                <th class="p-3 border-b border-slate-700">Monster Type</th>
                <th class="p-3 border-b border-slate-700 text-right">Recommended Troops</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-800 text-slate-300">
              
              <tr v-for="level in monsterGuide" :key="level.lvl" class="hover:bg-slate-800/40 transition">
                <td class="p-3 text-center text-slate-200 font-bold align-top">{{ level.lvl }}</td>
                
                <td class="p-3 align-top">
                  <div class="space-y-1">
                    <div v-for="(target, idx) in level.targets" :key="idx" :class="target.color" class="font-semibold">
                      {{ target.type }}
                    </div>
                  </div>
                </td>
                
                <td class="p-3 text-right align-top">
                  <div class="space-y-1">
                    <div v-for="(target, idx) in level.targets" :key="idx">
                      {{ target.troops }}
                    </div>
                  </div>
                </td>
              </tr>
              
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Essential Beginner Strategy -->
    <div class="bg-[#0b101a]/80 p-8 rounded-lg border border-slate-800 shadow-lg backdrop-blur-sm">
      <h2 class="text-3xl font-medieval text-slate-200 mb-6 border-b border-slate-700/50 pb-4">Essential Beginner Strategy</h2>
      
      <div class="space-y-8">
        
        <!-- Acrônimos -->
        <div>
          <h4 class="text-blue-400 font-bold uppercase text-sm mb-3">
            <i class="fas fa-book mr-2"></i> Must-Know Acronyms
          </h4>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs text-slate-400">
            <div class="bg-slate-800/30 p-2 rounded border border-slate-700/50"><strong>WS:</strong> Wellspring (Tar)</div>
            <div class="bg-slate-800/30 p-2 rounded border border-slate-700/50"><strong>DM:</strong> Dragon Mound</div>
            <div class="bg-slate-800/30 p-2 rounded border border-slate-700/50"><strong>RoA:</strong> Rise of the Ancients</div>
            <div class="bg-slate-800/30 p-2 rounded border border-slate-700/50"><strong>CoT:</strong> Clash for Throne</div>
            <div class="bg-slate-800/30 p-2 rounded border border-slate-700/50"><strong>RSS:</strong> Resources</div>
            <div class="bg-slate-800/30 p-2 rounded border border-slate-700/50"><strong>KC:</strong> Kingdom Chat</div>
          </div>
        </div>

        <!-- Carter First Strategy -->
        <div class="bg-purple-900/10 border border-purple-500/20 p-4 rounded-lg">
          <h4 class="text-purple-400 font-bold uppercase text-sm mb-2">
            <i class="fas fa-dungeon mr-2"></i> The "Carter First" Rule
          </h4>
          <p class="text-slate-300 text-sm mb-3">
            Crypting is your main source of early growth. <strong>Avoid </strong>building armor for other captains until Carter has good crypt equipment.
          </p>
          <ul class="list-disc pl-5 text-xs text-slate-400 space-y-1">
            <li>Craft Level 3 → 5 → 7 equipment for Carter <strong>first</strong>.</li>
            <li>Focus Research on <strong>Archaeology</strong> (Exploration Efficiency & Tar Capacity).</li>
            <li>Use Gems & Enchantments to boost Tar Production.</li>
          </ul>
        </div>

        <!-- The Daily Power Hour -->
        <div class="bg-slate-900/40 border border-slate-700/50 p-4 rounded-lg">
          <h4 class="text-blue-400 font-bold uppercase text-sm mb-2">
            <i class="fas fa-hourglass-half mr-2"></i> The Daily "Power Hour" Routine
          </h4>
          <p class="text-slate-300 text-sm mb-3">
            Optimize your login routine to maximize bonuses in minimum time:
          </p>
          <ol class="list-decimal pl-5 text-xs text-slate-400 space-y-2">
            <li><strong>Activate VIP:</strong> (1 Hour) enables auto-complete for daily jobs.</li>
            <li><strong>Check Triumphal Missions:</strong> Refresh hard missions. Aim for simple training/building tasks.</li>
            <li><strong>Assign Captains:</strong> Set Aurora (Construction) or Farhad (Research) active <em>before</em> starting tasks.</li>
            <li><strong>Execute:</strong> Do your Daily Quests, collect Clan Gifts, and Help clanmates.</li>
            <li><strong>Pay Taxes:</strong> Send Gold Ingots to the Palace.</li>
          </ol>
        </div>

        <!-- City Placement -->
        <div class="grid md:grid-cols-2 gap-4">
          <div class="bg-[#0a0f1a] border border-slate-800 p-3 rounded">
            <h5 class="text-slate-200 font-bold text-xs mb-1">Golden Pass & Helen</h5>
            <p class="text-[10px] text-slate-400">
              The Golden Pass is the best investment for new players. It unlocks <strong>Helen of Troy</strong>, who boosts food production and training speed essential for big armies.
            </p>
          </div>
          <div class="bg-[#0a0f1a] border border-slate-800 p-3 rounded">
            <h5 class="text-slate-200 font-bold text-xs mb-1">City Tile Strategy</h5>
            <p class="text-[10px] text-slate-400">
              Always be inside <strong>Clan Territory</strong> for bonuses. Place city on a <strong>Food Bonus Tile</strong> for army upkeep or <strong>Silver Bonus Tile</strong> for production.
            </p>
          </div>
        </div>

      </div>
    </div>

    <!-- Veteran Secrets -->
    <div class="bg-[#0b101a]/80 p-8 rounded-lg border border-slate-800 shadow-lg backdrop-blur-sm">
      <h2 class="text-3xl font-medieval text-slate-200 mb-6 border-b border-slate-700/50 pb-4">Veteran Secrets</h2>
      <ul class="space-y-4">
          <li class="flex gap-3">
            <i class="fas fa-check-circle text-blue-500 mt-1"></i>
            <span class="text-slate-400">Never leave your troops in the city when offline without a shield. Send them to a clan fort or to gather far away.</span>
          </li>
          <li class="flex gap-3">
            <i class="fas fa-check-circle text-blue-500 mt-1"></i>
            <span class="text-slate-400">Focus on ONLY ONE troop type at the beginning (e.g., Guardsmen or Specialists) to maximize your research.</span>
          </li>
      </ul>
    </div>
    
  </div>
</template>

<style scoped>
/* Scrollbar Temática Ice/Silver para a nova tabela dinâmica */
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.4);
  border-radius: 4px;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(148, 163, 184, 0.3); /* Slate-400 */
  border-radius: 4px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: rgba(96, 165, 250, 0.6); /* Blue-400 */
}
</style>