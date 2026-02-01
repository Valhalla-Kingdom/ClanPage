<script setup>
import { officialChannels, roeRules } from '../data/dataRoe';
</script>

<template>
  <section id="roe" class="py-20 px-6 max-w-6xl mx-auto">
    <div class="text-center mb-16">
      <h2 class="text-4xl font-medieval font-bold mb-4 text-medieval-gold">Rules of Engagement (RoE)</h2>
      <div class="h-1 w-24 bg-medieval-gold mx-auto mb-4"></div>
      <p class="italic text-gray-400 font-bold uppercase tracking-widest text-sm">
        Supreme Law of Kingdom #290
      </p>
    </div>
    
    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div 
        v-for="rule in roeRules" 
        :key="rule.id" 
        :class="[
          'relative p-6 rounded border transition group overflow-hidden',
          rule.highlight 
            ? 'bg-red-900/20 border-red-500/50 md:col-span-2 lg:col-span-3 text-center' 
            : 'bg-black/40 border-white/10 hover:border-medieval-gold/50 hover:bg-white/5'
        ]"
      >
        <i :class="['fas absolute -right-4 -bottom-4 text-6xl opacity-10 transition group-hover:scale-110 group-hover:rotate-12', rule.icon, rule.highlight ? 'text-red-500' : 'text-white']"></i>

        <div class="relative z-10">
          <div class="flex items-center gap-4 mb-3" :class="{ 'justify-center': rule.highlight }">
            <span :class="['text-xl font-bold font-medieval', rule.highlight ? 'text-red-500' : 'text-medieval-gold']">
              #{{ rule.id }}
            </span>
            <h4 class="font-bold text-lg uppercase text-white tracking-wide flex items-center gap-3">
              <i :class="['fas text-sm', rule.icon, rule.highlight ? 'text-red-500' : 'text-medieval-gold']"></i>
              {{ rule.title }}
            </h4>
          </div>
          
          <p :class="['text-sm leading-relaxed', rule.highlight ? 'text-red-200 font-bold' : 'text-gray-400']">
            {{ rule.desc }}
          </p>
        </div>
      </div>
    </div>

    <div class="mt-12 text-center text-xs text-gray-500 uppercase tracking-widest">
      <i class="fas fa-scroll mr-2"></i> Ignorance of the law is no excuse for the penalty.
    </div>
  </section>

  <section id="channels" class="py-20 px-6 max-w-4xl mx-auto border-t border-white/5">
    <div class="text-center mb-12 border-t border-white/10 pt-16">
      <h3 class="text-2xl font-medieval font-bold mb-2 text-medieval-gold uppercase tracking-widest text-shadow-md">Official Kingdom Channels</h3>
      <p class="text-gray-500 text-sm italic">Mandatory communication via Game Chat</p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div v-for="channel in officialChannels" :key="channel.name" 
           class="bg-white/5 border border-white/10 p-5 rounded flex items-start gap-4 hover:bg-medieval-gold/5 transition group">
        <div class="mt-1">
          <div class="w-2 h-2 bg-medieval-gold rotate-45 group-hover:scale-125 transition"></div>
        </div>
        <div>
          <h5 class="font-bold text-medieval-gold text-sm mb-1 tracking-wider">{{ channel.name }}</h5>
          <p class="text-gray-400 text-xs leading-relaxed">{{ channel.purpose }}</p>
        </div>
      </div>
    </div>
  </section>
</template>