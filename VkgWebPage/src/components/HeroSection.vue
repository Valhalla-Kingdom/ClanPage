<template>
  <header id="home" class="hero-gradient h-screen flex flex-col justify-center items-center text-center px-4 relative overflow-hidden">
    <!-- Dark Overlay -->
    <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-[#030508]/80 to-[#030508] pointer-events-none z-0"></div>

    <div class="relative z-10 w-full max-w-4xl mx-auto">
      <div class="animate-bounce mb-6 drop-shadow-[0_0_15px_rgba(148,163,184,0.3)]">
        <img src="../assets/lobo.png" alt="Wolf" class="w-32 h-32 mx-auto">
      </div>
      
      <h1 class="text-5xl md:text-8xl font-medieval font-bold mb-4 text-slate-200 uppercase tracking-widest drop-shadow-2xl">
        [WLF] <span class="text-blue-500 font-light">Wolf</span>
      </h1>
      
      <p class="text-xl md:text-2xl text-slate-400 mb-10 font-light italic border-l-4 border-blue-500/50 pl-4 py-2 bg-slate-900/30 backdrop-blur-sm inline-block text-left">
        "We fight hard.<br>
        We laugh louder.<br>
        We win... more than we should."
      </p>
      
      <div class="flex flex-col sm:flex-row gap-6 justify-center">
        <a href="#about" class="border border-slate-500 text-slate-300 px-10 py-4 font-bold hover:bg-slate-800 hover:text-white transition uppercase tracking-widest shadow-lg">
          Meet the Pack
        </a>
        <a href="#roe" class="bg-blue-600/20 border border-blue-500/40 text-blue-300 hover:bg-blue-600/40 hover:text-white px-10 py-4 font-bold transition uppercase tracking-widest">
          Kingdom Rules
        </a>
      </div>
    </div>
  </header>
</template>

<style scoped>
.hero-gradient {
  /* Fundo de lobos/neve/montanha sombria */
  background: url('../assets/wolf_bg.png') center/cover no-repeat;
}
</style>