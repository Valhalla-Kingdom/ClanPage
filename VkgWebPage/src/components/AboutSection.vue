<template>
  <section id="about" class="py-24 px-6 max-w-7xl mx-auto text-center md:text-left text-slate-300">
    
    <div class="text-center mb-16">
      <h2 class="text-4xl font-medieval font-bold mb-4 text-slate-200">The Wolf Pack (WLF)</h2>
      <div class="h-1 w-24 bg-blue-500 mx-auto"></div>
    </div>

    <!-- Clan Info -->
    <div class="grid lg:grid-cols-2 gap-12 items-center mb-24">
      <div>
        <!-- Dick Mountains Banner -->
        <div class="space-y-4 text-lg border-l-4 border-blue-500 pl-6 py-5 bg-[#0b101a] rounded-r shadow-lg">
          <p class="font-bold text-slate-200 uppercase tracking-widest mb-3 flex items-center gap-2">
            <i class="fas fa-mountain text-slate-500"></i> Dick Mountains (+90% Fortification)
          </p>
          <div class="italic text-slate-400 space-y-2">
            <p>"Yes... the name is real. No... we're not moving."</p>
            <p>"High ground, bad decisions, great results."</p>
          </div>
        </div>
        
        <!-- Rules and Diplomacy -->
        <div class="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="p-5 bg-[#0b101a] border border-slate-800/80 rounded transition hover:border-slate-600">
            <h4 class="text-blue-400 font-bold mb-3 uppercase text-sm tracking-wider"><i class="fas fa-gavel mr-2"></i>The Wolf's Law</h4>
            <ul class="text-sm text-slate-400 space-y-2">
              <li>Teamwork is <strong class="text-slate-200">mandatory</strong>.</li>
              <li>Excuses are <strong class="text-slate-200">optional</strong> (and usually ignored).</li>
            </ul>
          </div>
          <div class="p-5 bg-[#0b101a] border border-slate-800/80 rounded transition hover:border-slate-600">
            <h4 class="text-blue-400 font-bold mb-3 uppercase text-sm tracking-wider"><i class="fas fa-handshake mr-2"></i>Diplomacy</h4>
            <p class="text-sm text-slate-400 mb-2">Playing by: <strong class="text-slate-200">K290 ROE & IKFPA</strong>.</p>
            <p class="text-[10px] text-slate-500 uppercase tracking-widest mt-3">Active NAP with:</p>
            <p class="text-xs text-blue-300 font-mono mt-1">WLF K260, Elite K260,<br> Pup K284, AWO K286</p>
          </div>
        </div>
        <p class="text-xs text-slate-500 italic mt-4 text-center md:text-left">"(Yes, we have friends. We're just still dangerous.)"</p>
      </div>
      
      <!-- Side Image -->
      <div class="relative group">
        <div class="absolute -inset-1 bg-blue-500/20 rounded blur opacity-25 group-hover:opacity-50 transition duration-500"></div>
        <img src="../assets/wolf_side.png" alt="Wolf Pack" class="relative rounded-lg grayscale hover:grayscale-0 transition duration-700 shadow-2xl border border-slate-800">
      </div>
    </div>

    <!-- The WLF Family (4 Clans) -->
    <div class="text-center mb-12">
      <h3 class="text-3xl font-medieval font-bold text-slate-200 mb-3 flex items-center justify-center gap-3">
        <i class="fas fa-sitemap text-slate-600"></i> The WLF Family
      </h3>
      <p class="text-sm text-slate-400 max-w-2xl mx-auto">Four clans united under the same banner. Divided in roles, but unbreakable in battle.</p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      
      <!-- WLF Wolf (Main) -->
      <div class="bg-gradient-to-br from-[#1a150b] to-black border border-yellow-600/30 p-8 rounded-lg text-center group hover:-translate-y-2 transition duration-300 shadow-lg">
        <i class="fas fa-crown text-yellow-500 text-4xl mb-4 group-hover:scale-110 transition duration-300"></i>
        <h4 class="font-bold text-yellow-500 uppercase tracking-widest mb-1 text-lg">WLF Wolf</h4>
        <p class="text-[10px] text-yellow-600/80 uppercase tracking-widest mb-4">The Main Clan</p>
        <p class="text-xs text-gray-400 leading-relaxed">The leadership of the pack. Where the strongest wolves gather to command the kingdom.</p>
      </div>

      <!-- WLF Shadow -->
      <div class="bg-gradient-to-br from-purple-950/30 via-black to-[#0a0a0a] border border-purple-500/30 p-8 rounded-lg text-center group hover:-translate-y-2 transition duration-300 shadow-[0_0_20px_rgba(168,85,247,0.15)]">
        <div class="relative inline-block mb-4">
          <i class="fas fa-moon text-purple-400 text-4xl group-hover:scale-110 transition duration-300 relative z-10"></i>
          <i class="fas fa-moon text-yellow-500 text-4xl absolute inset-0 blur-md opacity-50"></i>
        </div>
        <h4 class="font-bold text-yellow-500 uppercase tracking-widest mb-1 text-lg">WLF Shadow</h4>
        <p class="text-[10px] text-purple-400/80 uppercase tracking-widest mb-4">The Dark Minds</p>
        <p class="text-xs text-gray-400 leading-relaxed">Acting in the shadows, ensuring victory before the battle even begins. Stealthy and lethal.</p>
      </div>

      <!-- WLF Elysium -->
      <div class="bg-gradient-to-br from-slate-700/20 to-black border border-slate-400/30 p-8 rounded-lg text-center group hover:-translate-y-2 transition duration-300 shadow-lg">
        <i class="fas fa-sun text-slate-300 text-4xl mb-4 group-hover:scale-110 transition duration-300 drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]"></i>
        <h4 class="font-bold text-yellow-500 uppercase tracking-widest mb-1 text-lg">WLF Elysium</h4>
        <p class="text-[10px] text-slate-400/80 uppercase tracking-widest mb-4">Paradise of the Brave</p>
        <p class="text-xs text-gray-400 leading-relaxed">The light that guides the pack, keeping the economy, wisdom, and structure of the empire flawless.</p>
      </div>

      <!-- WLF Hellfyre -->
      <div class="bg-gradient-to-br from-red-950/40 to-black border border-red-600/30 p-8 rounded-lg text-center group hover:-translate-y-2 transition duration-300 shadow-lg">
        <i class="fas fa-fire text-red-500 text-4xl mb-4 group-hover:scale-110 transition duration-300 drop-shadow-[0_0_8px_rgba(220,38,38,0.5)]"></i>
        <h4 class="font-bold text-yellow-500 uppercase tracking-widest mb-1 text-lg">WLF Hellfyre</h4>
        <p class="text-[10px] text-red-500/80 uppercase tracking-widest mb-4">The Devouring Fire</p>
        <p class="text-xs text-gray-400 leading-relaxed">The purely aggressive and relentless force that burns our family's enemies to ashes.</p>
      </div>

    </div>

  </section>
</template>