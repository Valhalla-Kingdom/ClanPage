<template>
  <div class="space-y-8">
    <div class="card-bg p-8 rounded-lg border border-white/10">
      <h2 class="text-3xl font-medieval text-white mb-6 border-b border-medieval-gold/30 pb-4">Grand Tournaments</h2>
      <p class="text-gray-300 mb-8 leading-relaxed">
        Cyclic tournaments are the main source of rare equipment, valor, and clan materials.
        Each one has unique engagement rules. Knowing them is the difference between victory and defeat.
      </p>
      
      <div class="space-y-8">

        <div class="bg-black/40 border border-red-500/30 rounded-lg overflow-hidden group">
          <div class="bg-red-900/20 p-4 flex items-center gap-4 border-b border-red-500/20">
            <div class="bg-red-500/10 p-3 rounded-full text-red-500 border border-red-500/20">
              <i class="fas fa-dragon text-2xl"></i>
            </div>
            <div>
              <h3 class="text-xl font-medieval text-white font-bold">Ragnarök</h3>
              <p class="text-xs text-gray-400 uppercase tracking-wider">Duration: 2 Days</p>
            </div>
          </div>
          <div class="p-6 space-y-4">
            <p class="text-gray-300 text-sm leading-relaxed">
              The ultimate tournament of epic monsters. Receive Jörmungandr Scales and Fenrir Fangs to exchange for coins and craft the special <strong>Ragnarök Warrior</strong> equipment set.
            </p>
            
            <div class="grid md:grid-cols-2 gap-4">
              <div class="bg-white/5 p-4 rounded border-l-2 border-red-500">
                <h4 class="text-white font-bold text-sm mb-2"><i class="fas fa-skull mr-2"></i>Fenrir Invasion</h4>
                <p class="text-xs text-gray-400">Epic Fenrir troops. Can be attacked by <strong>only ONE Captain</strong>.</p>
              </div>
              <div class="bg-white/5 p-4 rounded border-l-2 border-green-500">
                <h4 class="text-white font-bold text-sm mb-2"><i class="fas fa-users mr-2"></i>Jörmungandr Invasion</h4>
                <p class="text-xs text-gray-400">Epic Jörmungandr troops. Must be attacked via <strong>Rally</strong>.</p>
              </div>
            </div>

            <div class="mt-4 bg-black/50 p-3 rounded text-xs text-gray-400 border border-white/5">
              <strong class="text-medieval-gold">Tournament Store:</strong> Coins are saved between events. Offers depend on your troop level and refresh at the start of the event.
            </div>
          </div>
        </div>

        <div class="grid md:grid-cols-2 gap-6">
          
          <div class="bg-black/40 border border-purple-500/30 rounded-lg overflow-hidden flex flex-col">
            <div class="bg-purple-900/20 p-4 flex items-center gap-3 border-b border-purple-500/20">
              <i class="fas fa-skull-crossbones text-purple-400 text-xl"></i>
              <h3 class="text-lg font-medieval text-white font-bold">Doomsday</h3>
            </div>
            <div class="p-5 flex-grow space-y-3">
              <p class="text-gray-300 text-xs leading-relaxed">
                Battle against the "Doomsday Squad" (Undead). Grants a large amount of Valor points and Experience.
              </p>
              <div class="bg-purple-500/10 p-3 rounded border border-purple-500/20">
                <span class="text-purple-300 font-bold text-xs uppercase block mb-1">Golden Rule:</span>
                <span class="text-gray-400 text-xs">You can only send <strong>1 Captain</strong> to lead the attack. Choose your best monster specialist (e.g., Carter or Beowulf).</span>
              </div>
            </div>
          </div>

          <div class="bg-black/40 border border-yellow-500/30 rounded-lg overflow-hidden flex flex-col">
            <div class="bg-yellow-900/20 p-4 flex items-center gap-3 border-b border-yellow-500/20">
              <i class="fas fa-spider text-yellow-400 text-xl"></i>
              <h3 class="text-lg font-medieval text-white font-bold">Arachne's Swarm</h3>
            </div>
            <div class="p-5 flex-grow space-y-3">
              <p class="text-gray-300 text-xs leading-relaxed">
                Battle against swarms of spiders. Considered "easier" and accessible for smaller players to level up captains.
              </p>
              <div class="bg-yellow-500/10 p-3 rounded border border-yellow-500/20">
                <span class="text-yellow-300 font-bold text-xs uppercase block mb-1">Tactical Advantage:</span>
                <span class="text-gray-400 text-xs">Allows you to send <strong>all 3 Captains</strong> (or more) in the same attack. Great for splitting damage and leveling secondary captains.</span>
              </div>
            </div>
          </div>

        </div>

        <div class="bg-black/40 border border-blue-500/30 rounded-lg overflow-hidden">
          <div class="bg-blue-900/20 p-4 flex items-center gap-4 border-b border-blue-500/20">
            <div class="bg-blue-500/10 p-3 rounded-full text-blue-500 border border-blue-500/20">
              <i class="fas fa-gem text-2xl"></i>
            </div>
            <div>
              <h3 class="text-xl font-medieval text-white font-bold">Ancients' Cycle</h3>
              <p class="text-xs text-gray-400 uppercase tracking-wider">Clan Event (2 Days)</p>
            </div>
          </div>
          
          <div class="p-6 grid md:grid-cols-2 gap-8 relative">
            <div class="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-blue-500/30 text-2xl">
              <i class="fas fa-chevron-right"></i>
            </div>

            <div class="space-y-3">
              <h4 class="text-blue-400 font-bold uppercase text-sm border-b border-blue-500/30 pb-2">Day 1: Treasure of the Ancients</h4>
              <ul class="text-xs text-gray-400 space-y-2 list-disc pl-4">
                <li><strong>Objective:</strong> Collect 6 map fragments through Daily Quests.</li>
                <li><strong>Action:</strong> Combine the map to reveal a <em>Vault</em> and start a Clan Rally.</li>
                <li><strong>Prize:</strong> Ancient Coins to evolve Clan Artifacts.</li>
              </ul>
            </div>

            <div class="space-y-3">
              <h4 class="text-blue-400 font-bold uppercase text-sm border-b border-blue-500/30 pb-2">Day 2: Ascension of the Ancients</h4>
              <ul class="text-xs text-gray-400 space-y-2 list-disc pl-4">
                <li><strong>Objective:</strong> Defeat the "Golden Guardian" (Tinman).</li>
                <li><strong>Action:</strong> The Clan Leader summons the monster. The entire clan attacks together.</li>
                <li><strong>Strategy:</strong> Battle bonuses depend on the Artifacts evolved on Day 1 (Book, Figurine, Watch).</li>
              </ul>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>