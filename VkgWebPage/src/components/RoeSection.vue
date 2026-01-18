<script setup>
import { ref } from 'vue';

const officialChannels = ref([
  { name: "K290-ROE", purpose: "Official publication of the Rules of Engagement and updates." },
  { name: "K290-WS / K290-DM", purpose: "Mandatory registration for Wellsprings and Dragon Mounds in neutral lands." },
  { name: "K290-COURT", purpose: "Adjudication of ROE violations by Judges and Diplomats." },
  { name: "K290-OUTLAWS", purpose: "Public list of current Outlaws who have lost ROE protection." },
  { name: "K290-DISPUTES", purpose: "Channel dedicated to resolving minor ROE violations." }
]);

const roeRules = ref([
  { 
    title: "General Governance & Respect", 
    desc: "All players must remain respectful in chats and PMs; harassment or racism is strictly prohibited. Clans must display 'we follow K290 ROE' in their description to receive protection. Players under 100k might are protected from attacks unless they are outlaws or initiate combat." 
  },
  { 
    title: "Resource Gathering & Territory", 
    desc: "Resources, Dragon Mounds (DM), and Wellsprings (WS) inside clan territory are private property. In the wild, DM and WS must be registered in official chats; ownership is forfeited if not occupied within 10 minutes. Illegal occupiers in foreign territory can be forcibly removed after a 3-minute warning." 
  },
  { 
    title: "Clash of Thrones (CoT) Protocol", 
    desc: "During CoT, you may only attack players at least half your size; attacking anyone under 50% of your might is prohibited. Standard peace rules are suspended except for the 100k might protection. The use of Captain Faron to boost votes is strictly forbidden and results in outlaw status." 
  },
  { 
    title: "Royal Court & Royal Guard", 
    desc: "The King, Queen, and Hand of the King oversee kingdom bonuses and ingot collection. The Royal Guard (RG) is authorized to attack ROE violators to retrieve unpaid compensation or remove intruders from registered resource nodes." 
  },
  { 
    title: "Violations & Outlaw Status", 
    desc: "ROE violations must be reported to clan diplomats; if unresolved within 24 hours, the case goes to the Kingdom Court. Players declared Outlaws lose all ROE protection and become free targets. Clans must expel outlaws within 24 hours or be classified as an outlaw clan themselves." 
  },
  { 
    title: "Peacetime & Resource Security", 
    desc: "Peacetime is active outside of CoT; attacks on players or portals are strictly forbidden except for outlaws or illegal occupiers. Resources (RSS), Dragon Mounds (DM), and Wellsprings (WS) within clan territory are private property and do not require registration. Rare crypts belong to the player who unlocks them; while theft is a violation, compensation is recommended but may be hard to enforce without battle reports (BR)." 
  }
]);
</script>

<template>
  <section id="roe" class="py-20 px-6 max-w-4xl mx-auto">
    <div class="text-center mb-16">
      <h2 class="text-4xl font-medieval font-bold mb-4 text-medieval-gold">RoE #290</h2>
      <div class="h-1 w-24 bg-medieval-gold mx-auto mb-4"></div>
      <p class="italic text-red-500 font-bold uppercase tracking-widest text-sm">Vital for the diplomatic peace of the kingdom.</p>
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
    
    <div class="mt-16 p-6 bg-red-900/10 border border-red-500/20 rounded-lg text-center">
      <p class="text-red-400 text-xs font-bold uppercase tracking-widest mb-1">Warning</p>
      <p class="text-gray-400 text-xs italic leading-relaxed">
        "Failure to comply with official registration rules may result in immediate loss of resource ownership and protection."
      </p>
    </div>
  </section>
</template>
