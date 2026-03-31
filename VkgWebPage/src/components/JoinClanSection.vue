<template>
  <section id="recruitment" class=" wolfCall relative py-24 px-6 overflow-hidden bg-[#030508]">
    <!-- Fundo Decorativo Geral -->
    <div class="absolute inset-0 z-0">
      <div class="absolute inset-0 bg-[#030508]/80 z-10"></div>
      <img src="../assets/wolf_bg.png" 
           alt="Wolf Pack Background" 
           class="w-full h-full object-cover opacity-20 grayscale hover:grayscale-0 transition duration-[3s]">
    </div>

    <div class="relative z-20 max-w-5xl mx-auto text-center">
      
      <!-- Cabeçalho com o novo background -->
      <div class="mb-12  wolfCall py-12 rounded-2xl border border-slate-800/50 shadow-2xl relative overflow-hidden">
        <!-- Overlay escuro para garantir a leitura do texto sobre a imagem -->
        <div class="absolute inset-0 bg-[#030508]/60 z-0"></div>
        
        <div class="relative z-10">
          <i class="fas fa-paw text-blue-500 text-6xl mb-6 drop-shadow-[0_0_15px_rgba(59,130,246,0.3)] animate-pulse"></i>
          <h2 class="text-4xl md:text-6xl font-medieval font-bold text-slate-200 mb-4 uppercase tracking-widest drop-shadow-md">
            The Wolf Pack Calls
          </h2>
          <div class="h-1 w-32 bg-purple-600 mx-auto shadow-[0_0_10px_rgba(147,51,234,0.5)]"></div>
        </div>
      </div>

      <!-- Texto Principal -->
      <div class="prose prose-lg prose-invert mx-auto mb-16">
        <p class="text-xl md:text-2xl text-slate-400 font-light italic leading-relaxed">
          "The lone wolf dies in winter, but the pack survives. 
          We seek warriors who fight not just for themselves, but for their brothers."
        </p>
        
        <p class="text-lg text-blue-400 mt-8 font-bold uppercase tracking-widest">
          We need fresh blood to strengthen our shadows.
        </p>
      </div>

      <!-- Requisitos (Grid) -->
      <div class="grid md:grid-cols-3 gap-8 mb-16 text-left">
        
        <!-- Card 1: Atividade -->
        <div class="bg-[#0b101a]/80 border border-blue-900/30 p-8 rounded hover:border-blue-500/50 transition group backdrop-blur-sm shadow-lg">
          <div class="flex items-center gap-4 mb-4">
            <i class="fas fa-fire text-blue-500 text-3xl group-hover:scale-110 transition"></i>
            <h3 class="text-xl font-medieval font-bold text-slate-200 uppercase">Hunger for the Hunt</h3>
          </div>
          <p class="text-slate-400 text-sm leading-relaxed">
            We don't want ghosts. We demand daily presence in events, attacks, and territory defense. 
            <span class="text-blue-400">Inactivity weakens the pack.</span>
          </p>
        </div>

        <!-- Card 2: RoE -->
        <div class="bg-[#0b101a]/80 border border-blue-900/30 p-8 rounded hover:border-blue-500/50 transition group backdrop-blur-sm shadow-lg">
          <div class="flex items-center gap-4 mb-4">
            <i class="fas fa-scroll text-blue-500 text-3xl group-hover:scale-110 transition"></i>
            <h3 class="text-xl font-medieval font-bold text-slate-200 uppercase">The Jungle Law</h3>
          </div>
          <p class="text-slate-400 text-sm leading-relaxed">
            Strength without control is chaos. We strictly respect the <strong class="text-slate-200">Rules of Engagement (RoE)</strong> of Kingdom 290. Breaking diplomacy is treason.
          </p>
        </div>

        <!-- Card 3: Contribuição -->
        <div class="bg-[#0b101a]/80 border border-purple-900/30 p-8 rounded hover:border-purple-500/50 transition group backdrop-blur-sm shadow-lg">
          <div class="flex items-center gap-4 mb-4">
            <i class="fas fa-users text-purple-400 text-3xl group-hover:scale-110 transition"></i>
            <h3 class="text-xl font-medieval font-bold text-slate-200 uppercase">Brotherhood</h3>
          </div>
          <p class="text-slate-400 text-sm leading-relaxed">
            No one hunts alone. We donate resources, speed up constructions, and die for each other. 
            <span class="text-purple-400">Your growth strengthens everyone.</span>
          </p>
        </div>

      </div>

      <!-- Call to Action (Botão) -->
      <div class="flex flex-col items-center gap-6">
        <a href="#" target="_blank" 
           class="relative inline-flex items-center justify-center px-12 py-4 overflow-hidden font-medieval font-bold text-white transition-all duration-300 bg-blue-600/20 border border-blue-500/50 rounded hover:bg-blue-600 group shadow-[0_0_15px_rgba(59,130,246,0.3)]">
          <span class="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-black"></span>
          <span class="relative flex items-center gap-3 text-lg uppercase tracking-widest">
            <i class="fab fa-discord text-2xl"></i> Join our Discord
          </span>
        </a>
        <p class="text-xs text-slate-500 uppercase tracking-widest">
          Only for Kingdom #290 players
        </p>
      </div>

    </div>
  </section>
</template>

<style scoped>
.wolfCall {
  background: url('../assets/wolf_call.jpg') center/cover no-repeat;
}
</style>