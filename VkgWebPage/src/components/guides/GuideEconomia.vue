<template>
  <div class="space-y-8">
    
    <div class="card-bg p-8 rounded-lg border border-white/10">
      <h2 class="text-3xl font-medieval text-white mb-6 border-b border-medieval-gold/30 pb-4">
        Economy & Resources Guide
      </h2>
      
      <div class="grid md:grid-cols-2 gap-6 mb-8">
        <div class="bg-black/40 p-4 rounded border border-white/5">
          <div class="flex items-center gap-3 mb-2">
            <i class="fas fa-book-open text-yellow-500 text-xl"></i>
            <h4 class="font-bold text-white uppercase text-sm tracking-wider">Essential Acronyms</h4>
          </div>
          
          <div class="grid grid-cols-2 gap-x-4 gap-y-2 text-xs text-gray-400">
            <div class="space-y-1">
              <p><strong class="text-white">RSS:</strong> Resources</p>
              <p><strong class="text-white">WS:</strong> Wellspring</p>
              <p><strong class="text-white">DM:</strong> Dragon Mounds</p>
              <p><strong class="text-white">KC:</strong> Kingdom Chat</p>
              <p><strong class="text-white">PM:</strong> Private Message</p>
            </div>
            
            <div class="space-y-1">
              <p><strong class="text-white">VP:</strong> Valor Points</p>
              <p><strong class="text-white">XP:</strong> Experience Points</p>
              <p><strong class="text-white">CP:</strong> Conquest Points</p>
              <p><strong class="text-white">ROE:</strong> Rules of Engagement</p>
            </div>

            <div class="space-y-1 col-span-2 border-t border-white/10 pt-2 mt-1 grid grid-cols-2 gap-x-4">
              <div>
                <p><strong class="text-white">PvP:</strong> Player vs Player</p>
                <p><strong class="text-white">COT:</strong> Clash of Thrones</p>
                <p><strong class="text-white">KvK:</strong> Kingdoms vs Kingdoms</p>
                <p><strong class="text-white">TGH:</strong> The Great Hunt</p>
                <p><strong class="text-white">ATT:</strong> 1:2 - Ancients Treasure (Vaults)</p>
              </div>
              <div>
                <p><strong class="text-white">SMT:</strong> Summon Mastery Tournament</p>
                <p><strong class="text-white">RG:</strong> Royal Guard</p>
                <p><strong class="text-white">SK:</strong> Seasonal Kingdom</p>
                <p><strong class="text-white">RoA:</strong> 2:2 - Rise of Ancient (Tinman)</p>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-black/40 p-4 rounded border border-white/5 relative overflow-hidden flex flex-col justify-center">
          <div class="absolute -right-2 -top-2 text-6xl text-white/5">
            <i class="fas fa-coins"></i>
          </div>
          <div class="flex items-center gap-3 mb-2 relative z-10">
            <i class="fas fa-coins text-gray-300 text-xl"></i>
            <h4 class="font-bold text-white uppercase text-sm tracking-wider">Silver (The Bottleneck)</h4>
          </div>
          <p class="text-xs text-gray-400 leading-relaxed relative z-10">
            The soul of the army. Without it, you cannot train troops.
            <br><strong class="text-white">Tip:</strong> Never leave your silver sitting idle in war times. Spend it before logging off to avoid attacks.
          </p>
        </div>
      </div>

      <h3 class="text-xl text-medieval-gold font-bold mb-3 flex items-center gap-2">
        <i class="fas fa-city"></i> Construction Strategy
      </h3>
      <div class="grid md:grid-cols-2 gap-4 mb-6">
        <div class="bg-green-900/10 p-3 rounded border border-green-500/20">
          <h5 class="text-green-400 font-bold text-sm mb-1">Army Focus (Farms)</h5>
          <p class="text-xs text-gray-400">
            If your clan provides plenty of silver via chests, build more <strong>Farms</strong>. This sustains a larger army and speeds up training.
          </p>
        </div>
        <div class="bg-blue-900/10 p-3 rounded border border-blue-500/20">
          <h5 class="text-blue-400 font-bold text-sm mb-1">Silver Focus (Mansions)</h5>
          <p class="text-xs text-gray-400">
            If you need to be self-sufficient, build more <strong>Mansions</strong>. Essential for reviving troops and trading for mercenaries.
          </p>
        </div>
      </div>

      <div class="bg-purple-900/10 p-4 rounded border border-purple-500/20 mb-6">
        <h4 class="text-purple-400 font-bold uppercase text-xs mb-2">
          <i class="fas fa-map-marker-alt mr-1"></i> Map Positioning (Tiles)
        </h4>
        <p class="text-xs text-gray-300 mb-2">
          Move your city to "tiles" that complement your build.
        </p>
        <ul class="text-xs text-gray-400 list-disc pl-4 space-y-1">
          <li><strong>Terrain Bonus:</strong> Look for tiles with +90% Food or +60% Silver.</li>
          <li><strong>Clan Territory:</strong> Stay INSIDE the borders to receive research bonuses and protection.</li>
        </ul>
      </div>

    </div>

    <div class="card-bg p-8 rounded-lg border border-white/10">
      <h2 class="text-3xl font-medieval text-white mb-6 border-b border-medieval-gold/30 pb-4">
        Acquisition & Conservation
      </h2>

      <div class="space-y-6">
        
        <div class="bg-black/40 border border-white/5 p-4 rounded-lg flex gap-4">
          <div class="text-yellow-600 text-3xl"><i class="fas fa-dungeon"></i></div>
          <div>
            <h4 class="text-white font-bold uppercase text-sm mb-1">The Carter Method (Crypts)</h4>
            <p class="text-xs text-gray-400 leading-relaxed">
              Exploring crypts is vital. Maximize <strong>Captain Carter's</strong> level and gear focusing on "Exploration Efficiency" and "Tar Capacity." This allows you to open high-level crypts while spending less.
            </p>
          </div>
        </div>

        <div class="bg-yellow-900/10 border border-yellow-500/20 p-4 rounded-lg">
          <h4 class="text-yellow-500 font-bold uppercase text-sm mb-2 flex items-center gap-2">
            <i class="fas fa-gift"></i> Passive Resources [RSS and Gold Bars]  
          </h4>
          <ul class="list-disc pl-5 text-xs text-gray-400 space-y-1">
            <li><strong>Taxes:</strong> Pay ALL gold bars daily at the Capitol.</li>
            <li><strong>Gathering Resources Captains:</strong> Use <strong>Stror</strong> (fast mining) and <strong>Helen</strong> (passive production).</li>
          </ul>
        </div>

        <div class="bg-red-900/10 border border-red-500/20 p-4 rounded-lg">
          <h4 class="text-red-400 font-bold uppercase text-sm mb-2 flex items-center gap-2">
            <i class="fas fa-heart-broken"></i> The Golden Rule of Resurrection
          </h4>
          <p class="text-gray-300 text-sm font-bold mb-1">
            Avoid spending Gold to revive regular troops!
          </p>
          <p class="text-xs text-gray-400">
            Use <strong>Holy Potions</strong> (Nectarius helps with production) or wait for events like "Ruthless Slaughter" where the cost changes to Silver. Save gold for Mercenaries or real emergencies.
          </p>
        </div>

        <div class="bg-white/5 p-4 rounded border-t-2 border-medieval-gold">
          <h4 class="text-medieval-gold font-bold text-xs uppercase mb-2">Efficient Daily Summary</h4>
          <ol class="list-decimal pl-5 text-xs text-gray-400 space-y-1">
            <li>Activate VIP.</li>
            <li>Pay taxes at the Capitol.</li>
            <li>Explore Crypts with Carter.</li>
            <li>Complete daily/triumphal quests.</li>
            <li>Attack Epic Monster Events.</li>
          </ol>
        </div>

      </div>
    </div>

  </div>
</template>