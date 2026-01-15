<script setup>
import { ref } from 'vue';

const roeRules = ref([
  { title: "Proibido Tile Hitting", desc: "Ataques a pontos de coleta ocupados são terminantemente proibidos no Reino 290." },
  { title: "Proteção de Clãs Acadêmicos", desc: "Clãs com tag de academia de aliados estão sob proteção diplomática." },
  { title: "Regras de Clash of Throne (CoT)", desc: "Durante o evento CoT, todas as regras normais são suspensas, exceto Capital." },
  { title: "Respeito ao Trono", desc: "O clã Rei do reino define as diretrizes temporárias." },
  { title: "Exploração de Ruínas", desc: "Ataques em ruínas seguem a regra de poder mínimo e tempo de ocupação." }
]);
</script>

<template>
  <section id="roe" class="py-20 px-6 max-w-4xl mx-auto">
    <div class="text-center mb-16">
      <h2 class="text-4xl font-medieval font-bold mb-4 text-medieval-gold">RoE #290</h2>
      <div class="h-1 w-24 bg-medieval-gold mx-auto mb-4"></div>
      <p class="italic text-red-500 font-bold uppercase tracking-widest text-sm">Vital para a paz diplomática do reino</p>
    </div>
    
    <div class="space-y-4">
      <div v-for="(rule, index) in roeRules" :key="index" class="border border-white/10 p-6 rounded hover:border-medieval-gold/50 transition bg-black/40">
        <div class="flex gap-4">
          <span class="text-medieval-gold font-bold text-xl">0{{ index + 1 }}.</span>
          <div>
            <h4 class="font-bold text-lg mb-2 uppercase">{{ rule.title }}</h4>
            <p class="text-gray-400 text-sm italic">{{ rule.desc }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
