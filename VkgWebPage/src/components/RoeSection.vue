<script setup>
import { ref } from 'vue';
import { officialChannels, roeRules } from '../data/dataRoe';

// Dados do Acordo IKFPA inseridos diretamente no componente
const ikfpaRules = ref([
  {
    title: "General Conduct & Protected Targets",
    icon: "fa-shield-halved",
    items: [
      "No hate speech is allowed.",
      "No attacks on <strong>clan buildings</strong>.",
      "No attacks on <strong>memorial portals</strong>.",
      "No attacks on players under <strong>100K might</strong>."
    ]
  },
  {
    title: "RSS Tiles & Events",
    icon: "fa-hammer",
    items: [
      "All resource tiles are protected <strong>except during PvP events</strong>.",
      "PvP events include: Clash of Thrones, KvK, War Tools, War Games, Gold Rush, Silver Rush, and Lava Trials.",
      "<span class='text-red-400 font-bold'>Ruthless Slaughter is NOT included.</span>"
    ]
  },
  {
    title: "Rogue Behavior & Support",
    icon: "fa-skull",
    items: [
      "If a clan/player repeatedly attacks clan buildings and communication fails, a multi-kingdom coordinated response may occur.",
      "Support may include: RSS assistance (including silver), attacks on the offending clan/player, and strategic advice.",
      "The type of support depends on proximity, available resources, and existing agreements."
    ]
  },
  {
    title: "Violations & Compensation",
    icon: "fa-scale-balanced",
    items: [
      "Compensation must be agreed upon within <strong>48 hours</strong>. Failure to resolve may result in removal from the agreement.",
      "<strong>Recommended compensation for forts:</strong> 300M silver per attack, 50M wood/stone/iron per fort, plus troop losses.",
      "Compensation for other violations must be agreed upon by the parties involved."
    ]
  }
]);
</script>

<template>
  <!-- 1. K290 RoE Section -->
  <section id="roe" class="py-20 px-6 max-w-6xl mx-auto">
    <div class="text-center mb-16">
      <h2 class="text-4xl font-medieval font-bold mb-4 text-slate-200">Rules of Engagement (RoE)</h2>
      <div class="h-1 w-24 bg-blue-500 mx-auto mb-4"></div>
      <p class="italic text-slate-400 font-bold uppercase tracking-widest text-sm">
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
            ? 'bg-blue-900/20 border-blue-500/50 md:col-span-2 lg:col-span-3 text-center shadow-[0_0_15px_rgba(59,130,246,0.15)]' 
            : 'bg-[#0b101a] border-slate-800 hover:border-blue-500/50 hover:bg-slate-800/50'
        ]"
      >
        <!-- Background Icon (Watermark) -->
        <i :class="['fas absolute -right-4 -bottom-4 text-6xl opacity-5 transition group-hover:scale-110 group-hover:rotate-12', rule.icon, rule.highlight ? 'text-blue-500' : 'text-slate-300']"></i>

        <div class="relative z-10">
          <div class="flex items-center gap-4 mb-3" :class="{ 'justify-center': rule.highlight }">
            <span :class="['text-xl font-bold font-medieval', rule.highlight ? 'text-blue-400' : 'text-slate-500']">
              #{{ rule.id }}
            </span>
            <h4 class="font-bold text-lg uppercase text-slate-200 tracking-wide flex items-center gap-3">
              <i :class="['fas text-sm', rule.icon, rule.highlight ? 'text-blue-400' : 'text-slate-400']"></i>
              {{ rule.title }}
            </h4>
          </div>
          
          <p :class="['text-sm leading-relaxed', rule.highlight ? 'text-blue-200 font-bold' : 'text-slate-400']">
            {{ rule.desc }}
          </p>
        </div>
      </div>
    </div>

    <!-- RoE Footer Note -->
    <div class="mt-12 text-center text-xs text-slate-500 uppercase tracking-widest">
      <i class="fas fa-scroll mr-2"></i> Ignorance of the law is no excuse for the penalty.
    </div>
  </section>

  <!-- 2. IKFPA Section (NOVA SEÇÃO) -->
  <section id="ikfpa" class="py-20 px-6 max-w-6xl mx-auto border-t border-slate-800/50 relative overflow-hidden">
    <!-- Decorative background glow -->
    <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/10 via-transparent to-transparent pointer-events-none"></div>

    <div class="text-center mb-16 relative z-10">
      <div class="inline-block p-4 rounded-full bg-blue-900/20 mb-4 border border-blue-500/30 shadow-[0_0_15px_rgba(59,130,246,0.2)]">
        <i class="fas fa-globe text-4xl text-blue-400"></i>
      </div>
      <h2 class="text-3xl md:text-4xl font-medieval font-bold mb-4 text-slate-200">Inter-Kingdom FairPlay Agreement</h2>
      <p class="italic text-blue-400 font-bold uppercase tracking-widest text-sm mb-2">
        IKFPA
      </p>
      <p class="text-slate-400 text-sm max-w-2xl mx-auto">
        This is <strong class="text-slate-200">NOT</strong> a NAP or alliance. It is a FairPlay agreement between participating kingdoms to protect clan structures and ensure healthy growth.
      </p>
    </div>

    <div class="grid md:grid-cols-2 gap-6 relative z-10">
      <div v-for="(section, index) in ikfpaRules" :key="index" class="bg-[#0b101a] border border-slate-800 p-6 rounded-lg hover:border-blue-900/50 transition group">
        <h4 class="text-blue-300 font-bold text-lg mb-4 uppercase tracking-wider flex items-center gap-3 border-b border-slate-800 pb-3">
          <i :class="['fas', section.icon, 'text-slate-500 group-hover:text-blue-400 transition']"></i>
          {{ section.title }}
        </h4>
        <ul class="space-y-3">
          <li v-for="(item, i) in section.items" :key="i" class="flex items-start gap-3 text-sm text-slate-400 leading-relaxed">
            <i class="fas fa-angle-right text-blue-500 mt-1"></i>
            <span v-html="item"></span>
          </li>
        </ul>
      </div>
    </div>

    <!-- IKFPA Admins & Kingdom Rules -->
    <div class="mt-8 bg-slate-900/50 border border-slate-700/50 p-6 rounded-lg relative z-10">
      <div class="grid md:grid-cols-2 gap-8">
        <div>
          <h4 class="text-slate-200 font-bold text-sm uppercase tracking-wider mb-2"><i class="fas fa-chess-king text-blue-400 mr-2"></i>Kingdom Inclusion Rule</h4>
          <p class="text-sm text-slate-400 leading-relaxed">
            All participating kingdoms must include in their ROE that attacking forts results in the player being declared an outlaw and reported in the chat: <br>
            <strong class="text-red-400 font-mono mt-2 inline-block bg-red-900/20 px-2 py-1 rounded">Wanted - Outlaws000</strong>
          </p>
        </div>
        <div>
          <h4 class="text-slate-200 font-bold text-sm uppercase tracking-wider mb-2"><i class="fas fa-users-cog text-blue-400 mr-2"></i>Agreement Admin Team</h4>
          <p class="text-sm text-slate-400 leading-relaxed mb-2">
            Proposed changes can be discussed in the agreement chat. Final decisions are made by:
          </p>
          <ul class="text-xs font-mono text-blue-300 space-y-1">
            <li>• SweetLikeHoney (K166)</li>
            <li>• Wild Fury (K166)</li>
            <li>• Stealth Condor (K199)</li>
          </ul>
        </div>
      </div>
    </div>
  </section>

  <!-- 3. Official Channels -->
  <section id="channels" class="py-20 px-6 max-w-4xl mx-auto border-t border-slate-800/50">
    <div class="text-center mb-12 border-t border-slate-800/50 pt-16">
      <h3 class="text-2xl font-medieval font-bold mb-2 text-slate-200 uppercase tracking-widest">Official Kingdom Channels</h3>
      <p class="text-slate-500 text-sm italic">Mandatory communication via Game Chat</p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div v-for="channel in officialChannels" :key="channel.name" 
           class="bg-[#0b101a] border border-slate-800 p-5 rounded flex items-start gap-4 hover:bg-slate-800/50 hover:border-blue-900/50 transition group">
        <div class="mt-1">
          <!-- Blue Diamond Decoration -->
          <div class="w-2 h-2 bg-blue-500 rotate-45 group-hover:scale-125 transition shadow-[0_0_5px_rgba(59,130,246,0.8)]"></div>
        </div>
        <div>
          <h5 class="font-bold text-blue-300 text-sm mb-1 tracking-wider">{{ channel.name }}</h5>
          <p class="text-slate-400 text-xs leading-relaxed">{{ channel.purpose }}</p>
        </div>
      </div>
    </div>
  </section>
</template>