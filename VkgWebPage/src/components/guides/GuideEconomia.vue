<template>
  <div class="space-y-8">
    
    <!-- Introdução Visual -->
    <div class="card-bg p-8 rounded-lg border border-white/10">
      <h2 class="text-3xl font-medieval text-white mb-6 border-b border-medieval-gold/30 pb-4">
        Managing Resources
      </h2>
      
      <div class="grid md:grid-cols-2 gap-6 mb-8">
        <!-- Basic Materials -->
        <div class="bg-black/40 p-4 rounded border border-white/5">
          <div class="flex items-center gap-3 mb-2">
            <i class="fas fa-cubes text-yellow-500 text-xl"></i>
            <h4 class="font-bold text-white uppercase text-sm tracking-wider">Basic Materials</h4>
          </div>
          <p class="text-xs text-gray-400 leading-relaxed">
            Wood, Stone, Iron, and Food. Essential for buildings and troop upkeep.
            <br><span class="text-yellow-500">Tip:</span> Keep your warehouse level high to protect them from raids.
          </p>
        </div>

        <!-- Silver -->
        <div class="bg-black/40 p-4 rounded border border-white/5 relative overflow-hidden">
          <div class="absolute -right-2 -top-2 text-6xl text-white/5">
            <i class="fas fa-coins"></i>
          </div>
          <div class="flex items-center gap-3 mb-2 relative z-10">
            <i class="fas fa-coins text-gray-300 text-xl"></i>
            <h4 class="font-bold text-white uppercase text-sm tracking-wider">Silver (The Bottleneck)</h4>
          </div>
          <p class="text-xs text-gray-400 leading-relaxed relative z-10">
            The soul of the army. You need massive amounts for Research and high-tier troop training.
            <br><strong class="text-white">Never let your silver idle. Spend it before you sleep.</strong>
          </p>
        </div>
      </div>

      <!-- Production vs Gathering -->
      <h3 class="text-xl text-medieval-gold font-bold mb-3 flex items-center gap-2">
        <i class="fas fa-pickaxe"></i> Production vs Gathering
      </h3>
      <p class="text-gray-300 text-sm leading-relaxed mb-4">
        In the beginning, internal city production is negligible. Your main source of income will be sending captains to gather on the world map.
      </p>
      
      <ul class="space-y-2 text-sm text-gray-400 mb-6">
        <li class="flex items-start gap-2">
          <i class="fas fa-check text-green-500 mt-1"></i>
          <span>Always send <strong>Stror</strong> or <strong>Cleopatra</strong> to gather. They have passive bonuses for speed and load.</span>
        </li>
        <li class="flex items-start gap-2">
          <i class="fas fa-check text-green-500 mt-1"></i>
          <span>Target <strong>Lvl 4+ Tiles</strong> during events like "Gold Rush" to maximize points.</span>
        </li>
      </ul>
    </div>

    <!-- Advanced Reddit & Video Tips -->
    <div class="card-bg p-8 rounded-lg border border-white/10">
      <h2 class="text-3xl font-medieval text-white mb-6 border-b border-medieval-gold/30 pb-4">
        Advanced Economy Tips
      </h2>

      <div class="space-y-6">
        
        <!-- The Silver Exchange Trick -->
        <div class="bg-blue-900/10 border border-blue-500/20 p-4 rounded-lg">
          <h4 class="text-blue-400 font-bold uppercase text-sm mb-2 flex items-center gap-2">
            <i class="fas fa-exchange-alt"></i> The Market Exchange Strategy
          </h4>
          <p class="text-gray-300 text-sm mb-3">
            Is your city producing too much Food or Wood but zero Silver? Use the <strong>Market</strong>!
          </p>
          <ul class="list-disc pl-5 text-xs text-gray-400 space-y-1">
            <li>Send Caravans to clanmates to exchange basic resources for Silver.</li>
            <li>Create "Bank" accounts in your clan (alts) that focus purely on Silver production (Mansions only) to feed the main fighters.</li>
          </ul>
        </div>

        <!-- Clan Territory Bonus -->
        <div class="bg-purple-900/10 border border-purple-500/20 p-4 rounded-lg">
          <h4 class="text-purple-400 font-bold uppercase text-sm mb-2 flex items-center gap-2">
            <i class="fas fa-map-marked-alt"></i> Territory Matters
          </h4>
          <p class="text-gray-300 text-sm">
            Gathering inside your Clan's Territory gives a massive <strong>Speed Bonus</strong>. 
            Gathering in neutral lands is slower and risky. Always teleport your city to the edge of a resource belt (level 5-6 tiles) if possible.
          </p>
        </div>

        <!-- The 'Upkeep' Myth -->
        <div class="bg-red-900/10 border border-red-500/20 p-4 rounded-lg">
          <h4 class="text-red-400 font-bold uppercase text-sm mb-2 flex items-center gap-2">
            <i class="fas fa-utensils"></i> Don't Fear Upkeep
          </h4>
          <p class="text-gray-300 text-sm">
            Your troops consume food (Upkeep). Many new players are scared when their food hits 0.
            <br><strong class="text-white">Relax. Your troops will NOT die from starvation.</strong>
            <br>The only penalty is that you can't train new troops or start builds that require food until you gather more.
            <span class="text-gray-500 italic block mt-1">Pro Tip: Keep food items in your inventory (backpack) and use them only when you need to start a build.</span>
          </p>
        </div>

      </div>
    </div>

  </div>
</template>