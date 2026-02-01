<template>
  <div class="space-y-8">
    <div class="card-bg p-8 rounded-lg border border-white/10">
      <h2 class="text-3xl font-medieval text-white mb-6 border-b border-medieval-gold/30 pb-4">Managing Resources</h2>
      
      <div class="grid md:grid-cols-2 gap-6 mb-8">
        <div class="bg-black/40 p-4 rounded border border-white/5">
          <div class="flex items-center gap-3 mb-2">
            <i class="fas fa-cubes text-yellow-500"></i>
            <h4 class="font-bold text-white">Basic Materials</h4>
          </div>
          <p class="text-sm text-gray-400">Wood, Stone, and Iron are vital for construction. Keep your mines constantly gathering.</p>
        </div>
        <div class="bg-black/40 p-4 rounded border border-white/5">
          <div class="flex items-center gap-3 mb-2">
            <i class="fas fa-coins text-gray-400"></i>
            <h4 class="font-bold text-white">Silver</h4>
          </div>
          <p class="text-sm text-gray-400">Silver is the soul of the army. Without it, you cannot train troops. Exchange resources for silver in the Market.</p>
        </div>
      </div>

      <h3 class="text-xl text-medieval-gold font-bold">Production vs Gathering</h3>
      <p class="text-gray-300 mt-2">
        In the beginning, internal city production is low. Your main source of income will be sending your captains to gather on tiles in the world map. Always look for tiles with a level compatible with your gathering bonus.
      </p>
    </div>
  </div>
</template>