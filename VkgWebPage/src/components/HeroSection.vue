<template>
  <header id="inicio" class="hero-gradient h-screen flex flex-col justify-center items-center text-center px-4 relative">
    <div class="animate-bounce mb-4 text-medieval-gold text-6xl">
      <i class="fas fa-chess-rook"></i>
    </div>
    <h1 class="text-5xl md:text-7xl font-medieval font-bold mb-4 text-white uppercase tracking-widest">Valhalla Kingdom</h1>
    <p class="text-xl md:text-2xl text-medieval-gold/80 mb-8 max-w-2xl font-light italic">
      "Honor, Loyalty and Conquest in the Kingdom #290"
    </p>
    <div class="flex flex-col md:flex-row gap-4">
      <a href="#sobre" class="border-2 border-medieval-gold text-medieval-gold px-8 py-3 font-bold hover:bg-medieval-gold hover:text-black transition uppercase tracking-tighter">Conheça o Clã</a>
      <a href="#roe" class="bg-white/10 hover:bg-white/20 text-white px-8 py-3 font-bold transition uppercase tracking-tighter">Regras do Reino</a>
    </div>
  </header>
</template>

<style scoped>
.hero-gradient {
  background: linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.9)), url('[https://images.unsplash.com/photo-1599408162162-83733076046e?q=80&w=2070&auto=format&fit=crop](https://images.unsplash.com/photo-1599408162162-83733076046e?q=80&w=2070&auto=format&fit=crop)');
  background-size: cover;
  background-position: center;
}
</style>
