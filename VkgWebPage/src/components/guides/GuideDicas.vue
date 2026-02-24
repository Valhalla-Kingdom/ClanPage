<template>
  <div class="space-y-8">
    <!-- Troop Stacking Strategy -->
    <div class="card-bg p-8 rounded-lg border border-white/10">
      <h2 class="text-3xl font-medieval text-white mb-6 border-b border-medieval-gold/30 pb-4">
        Troop Stacking Strategy
      </h2>
      
      <div class="grid md:grid-cols-2 gap-8">
        
        <!-- Explicação Visual -->
        <div class="space-y-4">
          <p class="text-gray-300 leading-relaxed">
            Stacking is the art of layering your army so that cheaper troops die first, protecting your valuable Mercenaries and Monsters.
          </p>
          
          <div class="bg-black/40 border border-white/10 p-4 rounded-lg">
            <h4 class="text-medieval-gold font-bold uppercase text-xs mb-3">The Golden Rule of Targeting</h4>
            <p class="text-sm text-white font-bold bg-red-900/20 p-2 rounded border-l-2 border-red-500 mb-2">
              "The enemy ALWAYS attacks your stack with the Highest Total Health first."
            </p>
            <p class="text-xs text-gray-400">
              Your goal is to make your <strong>Guardsmen (G)</strong> have more Total Health than your Monsters.
            </p>
          </div>

          <div class="bg-blue-900/10 border border-blue-500/20 p-4 rounded-lg">
            <h4 class="text-blue-400 font-bold uppercase text-xs mb-3">The 2:1 Ratio (Simplified)</h4>
            <p class="text-xs text-gray-300 mb-2">To ensure lower tiers take the hit, use this rough ratio:</p>
            <div class="flex flex-col gap-2">
              <div class="flex items-center gap-2">
                <span class="bg-blue-500 text-white text-[10px] font-bold px-2 py-1 rounded w-12 text-center">Top</span>
                <span class="text-white text-sm">1,000 G5 Troops</span>
              </div>
              <div class="flex items-center gap-2">
                <span class="bg-blue-700 text-white text-[10px] font-bold px-2 py-1 rounded w-12 text-center">Mid</span>
                <span class="text-white text-sm">2,000 G4 Troops <span class="text-gray-500 text-xs">(2x previous)</span></span>
              </div>
              <div class="flex items-center gap-2">
                <span class="bg-blue-900 text-white text-[10px] font-bold px-2 py-1 rounded w-12 text-center">Bot</span>
                <span class="text-white text-sm">4,000 G3 Troops <span class="text-gray-500 text-xs">(2x previous)</span></span>
              </div>
            </div>
          </div>
        </div>

        <!-- Calculadora Simples -->
        <div class="bg-white/5 p-6 rounded-lg border border-white/10 flex flex-col justify-center">
          <h3 class="text-xl font-medieval text-white mb-4">Leadership & Stacking</h3>
          
          <ul class="space-y-3 text-sm text-gray-400">
            <li class="flex items-start gap-3">
              <i class="fas fa-calculator text-medieval-gold mt-1"></i>
              <span>
                <strong class="text-white">Total Leadership:</strong> Sum of Hero + Captains + Research + Clan Bonuses.
              </span>
            </li>
            <li class="flex items-start gap-3">
              <i class="fas fa-layer-group text-medieval-gold mt-1"></i>
              <span>
                <strong class="text-white">Layers (n):</strong> If a monster squad has 4 types (n=4), you need at least <strong>9 layers</strong> (2n+1) of fodder troops before your main damage dealers attack safely.
              </span>
            </li>
            <li class="flex items-start gap-3">
              <i class="fas fa-flask text-medieval-gold mt-1"></i>
              <span>
                <strong class="text-white">Potions:</strong> Always use a <strong>Leadership Potion</strong> before calculating your max stack size for big events.
              </span>
            </li>
          </ul>

          <div class="mt-6 text-center">
            <p class="text-xs text-gray-500 italic mb-2">Need precise numbers?</p>
            <a href="https://totalcalculator.org/index.php" target="_blank" 
               class="inline-block border border-medieval-gold text-medieval-gold px-6 py-2 rounded hover:bg-medieval-gold hover:text-black transition font-bold uppercase text-xs">
              Open External Calculator
            </a>
          </div>
        </div>

      </div>
    </div>

    <!-- Citadels Guide -->
    <div class="card-bg p-8 rounded-lg border border-white/10">
      <h2 class="text-3xl font-medieval text-white mb-6 border-b border-medieval-gold/30 pb-4">
        Citadels Strategy
      </h2>
      
      <div class="bg-blue-900/20 p-4 border-l-4 border-blue-500 rounded mb-8">
        <strong class="text-blue-400 block mb-1"> The Golden Rule:</strong> 
        <span class="text-gray-300 text-sm">
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
                <span class="text-white font-bold">Level 10</span>
                <span class="text-[10px] bg-green-500/20 text-green-300 px-2 py-0.5 rounded uppercase font-bold">Ranged Only</span>
              </div>
              <p class="text-xs text-gray-400">Requires: <strong class="text-white">100-150 T2 Catapults</strong></p>
            </div>

            <!-- Lvl 15 -->
            <div class="bg-green-900/10 border border-green-500/20 p-3 rounded">
              <div class="flex justify-between items-center mb-1">
                <span class="text-white font-bold">Level 15</span>
                <span class="text-[10px] bg-orange-500/20 text-orange-300 px-2 py-0.5 rounded uppercase font-bold">Mounted Only</span>
              </div>
              <p class="text-xs text-gray-400">Requires: <strong class="text-white">320-350 T3 Catapults</strong></p>
            </div>

            <!-- Lvl 20 -->
            <div class="bg-green-900/10 border border-green-500/20 p-3 rounded">
              <div class="flex justify-between items-center mb-1">
                <span class="text-white font-bold">Level 20</span>
                <span class="text-[10px] bg-red-500/20 text-red-300 px-2 py-0.5 rounded uppercase font-bold">Melee & Flying</span>
              </div>
              <p class="text-xs text-gray-400">Requires: <strong class="text-white">1,000 T3 Catapults</strong></p>
            </div>

             <!-- Lvl 25 -->
             <div class="bg-green-900/10 border border-green-500/20 p-3 rounded">
              <div class="flex justify-between items-center mb-1">
                <span class="text-white font-bold">Level 25</span>
                <span class="text-[10px] bg-red-500/20 text-red-300 px-2 py-0.5 rounded uppercase font-bold">Melee & Flying</span>
              </div>
              <p class="text-xs text-gray-400">
                Requires: <strong class="text-white">3,200 T5 Catapults</strong> <br>
                + <strong class="text-white">100 T9 Mercenaries</strong>
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
                <span class="text-white font-bold">Level 20</span>
                <span class="text-[10px] bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded uppercase font-bold text-right">Melee & Flying Melee Only</span>
              </div>
              <p class="text-xs text-gray-500 italic mb-1">*No animals or giants allowed</p>
              <p class="text-xs text-gray-400">Requires: <strong class="text-white">2,200 T4 Catapults</strong></p>
            </div>

            <!-- Lvl 25 -->
            <div class="bg-purple-900/10 border border-purple-500/20 p-3 rounded">
              <div class="flex justify-between items-center mb-1">
                <span class="text-white font-bold">Level 25</span>
                <span class="text-[10px] bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded uppercase font-bold">Melee & Flying</span>
              </div>
              <p class="text-xs text-gray-400 leading-relaxed">
                Requires: <br>
                <strong class="text-white">7,800 T5 Catapults</strong> + <br>
                <strong class="text-white">4,000 T6 Catapults</strong> + <br>
                <strong class="text-white">150 T9 Mercenaries</strong>
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>

    <!-- Common Monster Guide -->
    <div class="card-bg p-8 rounded-lg border border-white/10">
      <h2 class="text-3xl font-medieval text-white mb-6 border-b border-medieval-gold/30 pb-4">
        Common Monster Guide
      </h2>
      <p class="text-gray-400 text-sm mb-6">
        Target the correct weakness of each monster to minimize losses.
      </p>

      <div class="overflow-hidden rounded-lg border border-white/10">
        <table class="w-full text-left text-sm">
          <thead class="bg-black/50 text-medieval-gold uppercase font-bold text-xs">
            <tr>
              <th class="p-3 border-b border-white/10 w-16 text-center">Lvl</th>
              <th class="p-3 border-b border-white/10">Monster Type</th>
              <th class="p-3 border-b border-white/10 text-right">Recommended Troops</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-white/5 text-gray-300">
            <!-- Level 10 -->
            <tr class="hover:bg-white/5">
              <td class="p-3 text-center text-white font-bold">10</td>
              <td class="p-3 text-red-400">Inferno</td>
              <td class="p-3 text-right">Riders / Archers</td>
            </tr>
            <!-- Level 11 -->
            <tr class="hover:bg-white/5">
              <td class="p-3 text-center text-white font-bold">11</td>
              <td class="p-3">
                <span class="text-green-400">Elf</span> / <span class="text-purple-400">Undead</span>
              </td>
              <td class="p-3 text-right">Archers (Elf) / Spearmen (Undead)</td>
            </tr>
            <!-- Level 12 -->
            <tr class="hover:bg-white/5">
              <td class="p-3 text-center text-white font-bold">12</td>
              <td class="p-3">
                <span class="text-yellow-500">Barbarian</span> / <span class="text-purple-400">Cursed</span>
              </td>
              <td class="p-3 text-right">Spearmen</td>
            </tr>
            <!-- Level 13 -->
            <tr class="hover:bg-white/5">
              <td class="p-3 text-center text-white font-bold">13</td>
              <td class="p-3">
                <span class="text-red-400">Inferno</span> / <span class="text-purple-400">Undead</span>
              </td>
              <td class="p-3 text-right">Archers (Inf) / Riders (Und)</td>
            </tr>
            <!-- Level 14 -->
            <tr class="hover:bg-white/5">
              <td class="p-3 text-center text-white font-bold">14</td>
              <td class="p-3">
                <span class="text-purple-400">Cursed</span> / <span class="text-green-400">Elf</span>
              </td>
              <td class="p-3 text-right">Riders (Cur) / Archers (Elf)</td>
            </tr>
            <!-- Level 15 -->
            <tr class="hover:bg-white/5">
              <td class="p-3 text-center text-white font-bold">15</td>
              <td class="p-3">
                <span class="text-yellow-500">Barbarian</span> / <span class="text-red-400">Inferno</span>
              </td>
              <td class="p-3 text-right">Archers (Barb) / Arch or Spear (Inf)</td>
            </tr>
            <!-- Level 16 -->
            <tr class="hover:bg-white/5">
              <td class="p-3 text-center text-white font-bold">16</td>
              <td class="p-3">
                <span class="text-purple-400">Cursed</span> / <span class="text-purple-400">Undead</span>
              </td>
              <td class="p-3 text-right">Archers (Cur) / Riders (Und)</td>
            </tr>
            <!-- Level 17 -->
            <tr class="hover:bg-white/5">
              <td class="p-3 text-center text-white font-bold">17</td>
              <td class="p-3">
                <span class="text-red-400">Inferno</span> / <span class="text-purple-400">Undead</span>
              </td>
              <td class="p-3 text-right">Spearmen (Inf) / Riders (Und)</td>
            </tr>
            <!-- Level 18 -->
            <tr class="hover:bg-white/5">
              <td class="p-3 text-center text-white font-bold">18</td>
              <td class="p-3">
                <span class="text-purple-400">Cursed</span> / <span class="text-yellow-500">Barbarian</span>
              </td>
              <td class="p-3 text-right">Spearmen (Cur) / Archers (Barb)</td>
            </tr>
            <!-- Level 19 -->
            <tr class="hover:bg-white/5">
              <td class="p-3 text-center text-white font-bold">19</td>
              <td class="p-3">
                <span class="text-red-400">Inferno</span> / <span class="text-green-400">Elf</span> / <span class="text-purple-400">Undead</span>
              </td>
              <td class="p-3 text-right">Arch/Spear (Inf) / Riders (Elf/Und)</td>
            </tr>
            <!-- Level 20 -->
            <tr class="hover:bg-white/5">
              <td class="p-3 text-center text-white font-bold">20</td>
              <td class="p-3">
                <span class="text-red-400">Inferno</span> / <span class="text-purple-400">Cursed</span> / <span class="text-yellow-500">Barbarian</span>
              </td>
              <td class="p-3 text-right">
                <div>Archers (Inf) / Riders (Cur)</div>
                <div class="text-xs text-yellow-500 mt-1">Archers (Barb) <span class="text-red-400">*No Flying</span></div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Essential Beginner Strategy (NOVA SEÇÃO DO VÍDEO) -->
    <div class="card-bg p-8 rounded-lg border border-white/10">
      <h2 class="text-3xl font-medieval text-white mb-6 border-b border-medieval-gold/30 pb-4">Essential Beginner Strategy</h2>
      
      <div class="space-y-8">
        
        <!-- Acrônimos -->
        <div>
          <h4 class="text-medieval-gold font-bold uppercase text-sm mb-3">
            <i class="fas fa-book mr-2"></i> Must-Know Acronyms
          </h4>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs text-gray-400">
            <div class="bg-white/5 p-2 rounded border border-white/5"><strong>WS:</strong> Wellspring (Tar)</div>
            <div class="bg-white/5 p-2 rounded border border-white/5"><strong>DM:</strong> Dragon Mound</div>
            <div class="bg-white/5 p-2 rounded border border-white/5"><strong>RoA:</strong> Rise of the Ancients</div>
            <div class="bg-white/5 p-2 rounded border border-white/5"><strong>CoT:</strong> Clash for Throne</div>
            <div class="bg-white/5 p-2 rounded border border-white/5"><strong>RSS:</strong> Resources</div>
            <div class="bg-white/5 p-2 rounded border border-white/5"><strong>KC:</strong> Kingdom Chat</div>
          </div>
        </div>

        <!-- Carter First Strategy -->
        <div class="bg-purple-900/10 border border-purple-500/20 p-4 rounded-lg">
          <h4 class="text-purple-400 font-bold uppercase text-sm mb-2">
            <i class="fas fa-dungeon mr-2"></i> The "Carter First" Rule
          </h4>
          <p class="text-gray-300 text-sm mb-3">
            Crypting is your main source of early growth. <strong>Avoid </strong>building armor for other captains until Carter has good crypt equipment.
          </p>
          <ul class="list-disc pl-5 text-xs text-gray-400 space-y-1">
            <li>Craft Level 3 → 5 → 7 equipment for Carter <strong>first</strong>.</li>
            <li>Focus Research on <strong>Archaeology</strong> (Exploration Efficiency & Tar Capacity).</li>
            <li>Use Gems & Enchantments to boost Tar Production.</li>
          </ul>
        </div>

        <!-- The Daily Power Hour -->
        <div class="bg-yellow-900/10 border border-yellow-500/20 p-4 rounded-lg">
          <h4 class="text-yellow-500 font-bold uppercase text-sm mb-2">
            <i class="fas fa-hourglass-half mr-2"></i> The Daily "Power Hour" Routine
          </h4>
          <p class="text-gray-300 text-sm mb-3">
            Optimize your login routine to maximize bonuses in minimum time:
          </p>
          <ol class="list-decimal pl-5 text-xs text-gray-400 space-y-2">
            <li><strong>Activate VIP:</strong> (1 Hour) enables auto-complete for daily jobs.</li>
            <li><strong>Check Triumphal Missions:</strong> Refresh hard missions. Aim for simple training/building tasks.</li>
            <li><strong>Assign Captains:</strong> Set Aurora (Construction) or Farhad (Research) active <em>before</em> starting tasks.</li>
            <li><strong>Execute:</strong> Do your Daily Quests, collect Clan Gifts, and Help clanmates.</li>
            <li><strong>Pay Taxes:</strong> Send Gold Ingots to the Palace.</li>
          </ol>
        </div>

        <!-- City Placement -->
        <div class="grid md:grid-cols-2 gap-4">
          <div class="bg-black/40 border border-white/10 p-3 rounded">
            <h5 class="text-white font-bold text-xs mb-1">Golden Pass & Helen</h5>
            <p class="text-[10px] text-gray-400">
              The Golden Pass is the best investment for new players. It unlocks <strong>Helen of Troy</strong>, who boosts food production and training speed essential for big armies.
            </p>
          </div>
          <div class="bg-black/40 border border-white/10 p-3 rounded">
            <h5 class="text-white font-bold text-xs mb-1">City Tile Strategy</h5>
            <p class="text-[10px] text-gray-400">
              Always be inside <strong>Clan Territory</strong> for bonuses. Place city on a <strong>Food Bonus Tile</strong> for army upkeep or <strong>Silver Bonus Tile</strong> for production.
            </p>
          </div>
        </div>

      </div>
    </div>

    <!-- Veteran Secrets (Existing) -->
    <div class="card-bg p-8 rounded-lg border border-white/10">
      <h2 class="text-3xl font-medieval text-white mb-6 border-b border-medieval-gold/30 pb-4">Veteran Secrets</h2>
      <ul class="space-y-4">
          <li class="flex gap-3">
            <i class="fas fa-check-circle text-green-500 mt-1"></i>
            <span class="text-gray-300">Never leave your troops in the city when offline without a shield. Send them to a clan fort or to gather far away.</span>
          </li>
          <li class="flex gap-3">
            <i class="fas fa-check-circle text-green-500 mt-1"></i>
            <span class="text-gray-300">Focus on ONLY ONE troop type at the beginning (e.g., Guardsmen or Specialists) to maximize your research.</span>
          </li>
      </ul>
    </div>
  </div>
</template>