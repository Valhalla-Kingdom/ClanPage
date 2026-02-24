<script setup>
import { 
  ragnarokData, 
  pveEvents, 
  throneData, 
  ruthlessData, 
  resurrectionEvents, 
  devTournaments, 
  specialDevEvents, 
  triumphalData 
} from '../../data/dataEventos';

// Função para carregar as imagens da pasta assets dinamicamente
const getImageUrl = (name) => {
  return new URL(`../../assets/imgEvents/${name}`, import.meta.url).href;
};
</script>

<template>
  <div class="space-y-12">
    
    <!-- HEADER & PVE EVENTS -->
    <div class="card-bg p-8 rounded-lg border border-white/10">
      <h2 class="text-3xl font-medieval text-white mb-6 border-b border-medieval-gold/30 pb-4">Grand Tournaments & Invasions (PvE)</h2>
      <p class="text-gray-300 mb-8 leading-relaxed">
        Cyclical tournaments are the primary source of rare equipment, valor, and Conquest Points. 
        Each has unique rules of engagement. Knowing them is the difference between victory and defeat.
      </p>
      
      <div class="space-y-8">

        <!-- 1. RAGNARÖK -->
        <div class="relative rounded-lg border border-red-500/30 overflow-hidden group bg-[#0a0a0a]">
          <!-- Imagem com altura controlada no mobile e fade-out -->
          <div class="absolute top-0 left-0 w-full h-56 md:h-full">
            <img :src="getImageUrl(ragnarokData.img)" :alt="ragnarokData.title" class="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition duration-500">
            <div class="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0a0a0a] md:hidden"></div>
          </div>
          <!-- Gradiente Desktop -->
          <div class="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent hidden md:block"></div>
          
          <div class="relative z-10 bg-red-900/40 p-4 flex items-center gap-4 border-b border-red-500/20 backdrop-blur-sm">
            <div class="bg-red-500/10 p-3 rounded-full text-red-500 border border-red-500/20">
              <i class="fas fa-dragon text-2xl"></i>
            </div>
            <div>
              <h3 class="text-xl font-medieval text-white font-bold">{{ ragnarokData.title }}</h3>
              <p class="text-xs text-gray-300 uppercase tracking-wider">{{ ragnarokData.duration }}</p>
            </div>
          </div>
          <div class="relative z-10 p-6 space-y-4 mt-8 md:mt-0">
            <p class="text-gray-100 text-sm leading-relaxed drop-shadow-md font-semibold" v-html="ragnarokData.desc"></p>
            
            <div class="grid md:grid-cols-2 gap-4">
              <div class="bg-black/60 p-4 rounded border-l-2 border-red-500 backdrop-blur-md">
                <h4 class="text-white font-bold text-sm mb-2"><i class="fas fa-skull mr-2"></i>{{ ragnarokData.fenrir.title }}</h4>
                <p class="text-xs text-gray-200" v-html="ragnarokData.fenrir.desc"></p>
              </div>
              <div class="bg-black/60 p-4 rounded border-l-2 border-green-500 backdrop-blur-md">
                <h4 class="text-white font-bold text-sm mb-2"><i class="fas fa-users mr-2"></i>{{ ragnarokData.jormungandr.title }}</h4>
                <p class="text-xs text-gray-200" v-html="ragnarokData.jormungandr.desc"></p>
              </div>
            </div>
          </div>
        </div>

        <!-- 2. OTHER PVE EVENTS (DYNAMIC) -->
        <div class="grid md:grid-cols-2 gap-6">
          <div v-for="event in pveEvents" :key="event.id" 
               :class="['relative rounded-lg border overflow-hidden flex flex-col transition duration-500 group bg-[#0a0a0a]', event.theme.border, event.theme.hoverBorder]">
            
            <template v-if="event.img">
              <div class="absolute top-0 left-0 w-full h-48 md:h-full">
                <img :src="getImageUrl(event.img)" :alt="event.title" class="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition duration-500">
                <div class="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0a0a0a] md:hidden"></div>
              </div>
              <div class="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent hidden md:block"></div>
            </template>
            
            <div :class="['relative z-10 p-4 flex items-center gap-3 border-b backdrop-blur-sm', event.theme.headerBg, event.theme.headerBorder]">
              <i :class="['fas text-xl', event.icon, event.theme.iconColor]"></i>
              <h3 class="text-lg font-medieval text-white font-bold">{{ event.title }}</h3>
            </div>
            
            <div :class="['relative z-10 p-5 flex-grow flex flex-col', event.img ? 'mt-8 md:mt-0' : '']">
              <p :class="['text-gray-100 text-xs leading-relaxed mb-4 font-semibold', event.img ? 'drop-shadow-md' : '']" v-html="event.desc"></p>
              <div :class="['p-3 rounded border mt-auto', event.img ? 'backdrop-blur-md' : '', event.theme.ruleBg, event.theme.ruleBorder]">
                <span :class="['font-bold text-[10px] uppercase block mb-1', event.theme.ruleTitleColor]">{{ event.ruleTitle }}</span>
                <span class="text-gray-200 text-xs" v-html="event.ruleDesc"></span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>

    <!-- BATTLE FOR THE THRONE (PvP Highlight) -->
    <div class="relative rounded-lg border border-yellow-500/50 shadow-[0_0_20px_rgba(234,179,8,0.2)] overflow-hidden group bg-[#0a0a0a]">
      <div class="absolute top-0 left-0 w-full h-56 md:h-full">
        <img :src="getImageUrl(throneData.img)" :alt="throneData.title" class="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition duration-700">
        <div class="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0a0a0a] md:hidden"></div>
      </div>
      <div class="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent hidden md:block"></div>
      
      <div class="relative z-10 p-8 w-full md:w-3/4 mt-12 md:mt-0">
        <h2 class="text-4xl font-medieval text-yellow-500 mb-4 drop-shadow-lg flex items-center gap-4">
          <i class="fas fa-crown"></i> {{ throneData.title }}
        </h2>
        <p class="text-gray-100 text-sm leading-relaxed mb-6 drop-shadow-md font-semibold" v-html="throneData.desc"></p>
        
        <div class="grid md:grid-cols-2 gap-4">
          <div class="bg-yellow-900/60 border border-yellow-500/30 p-4 rounded backdrop-blur-md">
            <h4 class="text-yellow-400 font-bold text-sm mb-2"><i class="fas fa-gavel mr-2"></i>{{ throneData.election.title }}</h4>
            <ul class="text-xs text-gray-200 space-y-1">
              <li v-for="(item, index) in throneData.election.items" :key="index" v-html="item"></li>
            </ul>
          </div>
          <div class="bg-yellow-900/60 border border-yellow-500/30 p-4 rounded backdrop-blur-md">
            <h4 class="text-yellow-400 font-bold text-sm mb-2"><i class="fas fa-chess-king mr-2"></i>{{ throneData.king.title }}</h4>
            <p class="text-xs text-gray-200 mb-2">{{ throneData.king.desc }}</p>
            <ul class="text-[10px] font-mono text-yellow-200">
              <li v-for="(bonus, index) in throneData.king.bonuses" :key="index">{{ bonus }}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <!-- RESURRECTION EVENTS (CRITICAL) -->
    <div class="card-bg p-8 rounded-lg border border-red-500/30 relative overflow-hidden">
      <div class="absolute right-0 top-0 w-64 h-64 bg-red-500/5 rounded-full blur-3xl pointer-events-none"></div>

      <h2 class="text-3xl font-medieval text-white mb-2 flex items-center gap-3 relative z-10">
        <i class="fas fa-heartbeat text-red-500"></i> Resurrection & Economy Events
      </h2>
      <p class="text-gray-300 mb-8 text-sm relative z-10">Knowing <strong>WHEN</strong> to sacrifice your troops is the key to a perfect economy.</p>

      <div class="space-y-6 relative z-10">
        
        <!-- Ruthless Slaughter (Most Important) -->
        <div class="relative rounded-lg shadow-lg overflow-hidden group border border-red-500/50 bg-[#0a0a0a]">
          <div class="absolute top-0 left-0 w-full h-56 md:h-full">
            <img :src="getImageUrl(ruthlessData.img)" :alt="ruthlessData.title" class="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition duration-500">
            <div class="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0a0a0a] md:hidden"></div>
          </div>
          <div class="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent hidden md:block"></div>
          
          <div class="relative p-6 mt-12 md:mt-0">
            <div class="flex justify-between items-start mb-3">
              <h3 class="text-2xl font-bold text-red-400 uppercase tracking-widest drop-shadow-lg"><i class="fas fa-skull text-white mr-2"></i>{{ ruthlessData.title }}</h3>
              <span class="bg-red-500 text-white text-[10px] px-2 py-1 rounded font-bold animate-pulse shadow-md">Crucial Event</span>
            </div>
            <p class="text-gray-100 text-sm leading-relaxed mb-4 max-w-2xl drop-shadow-md font-semibold" v-html="ruthlessData.desc"></p>
            <ul class="list-disc pl-5 text-xs text-gray-200 space-y-1 max-w-xl drop-shadow">
              <li v-for="(item, index) in ruthlessData.items" :key="index" v-html="item"></li>
            </ul>
          </div>
        </div>

        <!-- Other Resurrection Events (Dynamic) -->
        <div class="grid md:grid-cols-3 gap-4">
          <div v-for="event in resurrectionEvents" :key="event.id" class="relative rounded overflow-hidden border group transition duration-300 bg-[#0a0a0a]" :class="event.theme.border">
            <div class="absolute top-0 left-0 w-full h-40 md:h-full">
              <img :src="getImageUrl(event.img)" :alt="event.title" class="w-full h-full object-cover opacity-50 group-hover:opacity-70 transition">
              <div class="absolute inset-0 bg-black/40 md:hidden"></div>
              <div class="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0a0a0a] md:hidden"></div>
            </div>
            <div class="absolute inset-0 bg-black/60 hidden md:block"></div>
            
            <div class="relative p-4 z-10 mt-8 md:mt-0">
              <h4 :class="['font-bold text-sm mb-2 drop-shadow', event.theme.iconColor]">
                <i :class="['fas mr-2', event.icon]"></i>{{ event.title }}
              </h4>
              <p class="text-[11px] text-gray-100 mb-2 font-medium drop-shadow" v-html="event.desc"></p>
              
              <div v-if="event.rewards.length > 0" class="text-[9px] text-gray-200 border-t border-white/20 pt-2 space-y-1">
                <span v-for="(rew, index) in event.rewards" :key="index" class="block">
                   <span :class="rew.color">{{ rew.rank }}</span> {{ rew.text }}
                </span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>

    <!-- REGULAR DEVELOPMENT TOURNAMENTS (DYNAMIC GRID) -->
    <div class="card-bg p-8 rounded-lg border border-white/10">
      <h2 class="text-2xl font-medieval text-white mb-6 border-b border-medieval-gold/30 pb-4">Development Tournaments & Titles</h2>
      <p class="text-gray-300 mb-6 text-sm">Daily events that reward basic empire activities. Winning grants powerful palace titles for 7 days.</p>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        
        <div v-for="dev in devTournaments" :key="dev.id" class="relative rounded border border-white/10 overflow-hidden transition group p-4 bg-[#0a0a0a]">
          <template v-if="dev.img">
            <div class="absolute top-0 left-0 w-full h-32 md:h-full">
              <img :src="getImageUrl(dev.img)" :alt="dev.title" class="w-full h-full object-cover opacity-40 group-hover:opacity-60 transition">
              <div class="absolute inset-0 bg-black/40 md:hidden"></div>
              <div class="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0a0a0a] md:hidden"></div>
            </div>
            <div class="absolute inset-0 bg-black/60 hidden md:block"></div>
          </template>

          <div class="relative z-10 mt-8 md:mt-0">
            <h4 class="text-medieval-gold font-bold text-sm mb-1"><i :class="['fas mr-1', dev.icon]"></i> {{ dev.title }}</h4>
            <p :class="['text-[10px] text-gray-200 mb-2', dev.img ? 'drop-shadow' : '']">{{ dev.desc }}</p>
            <div :class="['text-[9px] text-gray-200 rounded', dev.img ? 'bg-black/60 p-2 backdrop-blur-sm border border-white/5' : 'bg-black/50 p-2']">
               <div v-for="(rew, index) in dev.rewards" :key="index">
                 <span :class="rew.color">{{ rew.rank }}</span> {{ rew.text }}
               </div>
            </div>
          </div>
        </div>

        <!-- Special Joined Card for Decrees & Summoning -->
        <div v-for="(sp, index) in specialDevEvents" :key="'sp_'+index" class="relative rounded border border-white/10 overflow-hidden transition group p-4 bg-[#0a0a0a]">
          <template v-if="sp.img">
            <div class="absolute top-0 left-0 w-full h-32 md:h-full">
              <img :src="getImageUrl(sp.img)" :alt="sp.title" class="w-full h-full object-cover opacity-40 group-hover:opacity-60 transition">
              <div class="absolute inset-0 bg-black/40 md:hidden"></div>
              <div class="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0a0a0a] md:hidden"></div>
            </div>
            <div class="absolute inset-0 bg-black/60 hidden md:block"></div>
          </template>
          
          <div class="relative z-10 mt-8 md:mt-0">
            <h4 class="text-medieval-gold font-bold text-sm mb-1">{{ sp.title }}</h4>
            <p class="text-[10px] text-gray-200 drop-shadow leading-relaxed" v-html="sp.desc"></p>
          </div>
        </div>

      </div>
    </div>

    <!-- TRIUMPHAL CHALLENGE & MAXIMIZATION (DYNAMIC) -->
    <div class="card-bg p-8 rounded-lg border border-white/10">
      <h2 class="text-3xl font-medieval text-white mb-6 border-b border-medieval-gold/30 pb-4">Triumphal Challenge & Event Maximization</h2>
      
      <div class="space-y-8">
        
        <!-- 1. Triumphal Challenge Strategy -->
        <div class="relative overflow-hidden rounded-lg border border-white/10 group bg-[#0a0a0a]">
          <div class="absolute top-0 left-0 w-full h-56 md:h-full">
            <img :src="getImageUrl(triumphalData.strategy.img)" alt="Triumphal Challenge" class="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition duration-700">
            <div class="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0a0a0a] md:hidden"></div>
          </div>
          <div class="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent hidden md:block"></div>
          
          <div class="relative z-10 p-6 mt-12 md:mt-0">
            <div class="flex items-center gap-3 mb-4">
              <div class="bg-medieval-gold text-black w-8 h-8 rounded flex items-center justify-center font-bold">1</div>
              <h3 class="text-xl font-bold text-medieval-gold drop-shadow-md">{{ triumphalData.strategy.title }}</h3>
            </div>
            <p class="text-gray-100 text-sm mb-6 drop-shadow font-semibold" v-html="triumphalData.strategy.desc"></p>
            
            <div class="grid md:grid-cols-2 gap-4">
              <div class="bg-black/60 p-4 rounded border border-white/10 backdrop-blur-md">
                <h4 class="text-white font-bold text-sm mb-2"><i :class="['fas mr-2', triumphalData.strategy.tasks.icon]"></i>{{ triumphalData.strategy.tasks.title }}</h4>
                <ul class="text-xs text-gray-200 list-disc pl-4 space-y-1 drop-shadow">
                  <li v-for="(item, i) in triumphalData.strategy.tasks.items" :key="i" v-html="item"></li>
                </ul>
              </div>
              <div class="bg-black/60 p-4 rounded border border-white/10 backdrop-blur-md">
                <h4 class="text-white font-bold text-sm mb-2"><i :class="['fas mr-2', triumphalData.strategy.pass.icon]"></i>{{ triumphalData.strategy.pass.title }}</h4>
                <ul class="text-xs text-gray-200 list-disc pl-4 space-y-1 drop-shadow">
                  <li v-for="(item, i) in triumphalData.strategy.pass.items" :key="i" v-html="item"></li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <!-- 2. Combat Tactics -->
        <div class="relative overflow-hidden rounded-lg border border-red-500/30 group bg-[#0a0a0a]">
          <div class="absolute top-0 left-0 w-full h-56 md:h-full">
            <img :src="getImageUrl(triumphalData.tactics.img)" alt="Combat Tactics" class="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition duration-700">
            <div class="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0a0a0a] md:hidden"></div>
          </div>
          <div class="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent hidden md:block"></div>
          
          <div class="relative z-10 p-6 md:w-3/4 mt-12 md:mt-0">
            <div class="flex items-center gap-3 mb-4">
              <div class="bg-medieval-gold text-black w-8 h-8 rounded flex items-center justify-center font-bold">2</div>
              <h3 class="text-xl font-bold text-medieval-gold drop-shadow-md">{{ triumphalData.tactics.title }}</h3>
            </div>
            
            <div class="bg-red-900/60 border border-red-500/30 p-5 rounded-lg backdrop-blur-md">
              <h4 class="text-red-400 font-bold text-sm mb-2"><i class="fas fa-layer-group mr-2"></i>The Art of "Stacking"</h4>
              <p class="text-xs text-gray-100 mb-3 font-semibold drop-shadow" v-html="triumphalData.tactics.desc"></p>
              <ul class="text-xs text-gray-200 list-disc pl-4 space-y-2 drop-shadow">
                <li v-for="(item, i) in triumphalData.tactics.items" :key="i" v-html="item"></li>
              </ul>
            </div>
          </div>
        </div>

        <!-- 3. Rise of the Ancients -->
        <div class="relative overflow-hidden rounded-lg border border-blue-500/30 group bg-[#0a0a0a]">
          <div class="absolute top-0 left-0 w-full h-56 md:h-full">
            <img :src="getImageUrl(triumphalData.ancients.img)" alt="Rise of the Ancients" class="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition duration-500">
            <div class="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0a0a0a] md:hidden"></div>
          </div>
          <div class="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent hidden md:block"></div>

          <div class="relative z-10 p-6 w-full md:w-2/3 mt-12 md:mt-0">
            <div class="flex items-center gap-3 mb-4">
              <div class="bg-medieval-gold text-black w-8 h-8 rounded flex items-center justify-center font-bold">3</div>
              <h3 class="text-xl font-bold text-medieval-gold drop-shadow-md">{{ triumphalData.ancients.title }}</h3>
            </div>

            <div class="bg-blue-900/60 border border-blue-500/30 p-4 rounded backdrop-blur-md">
              <ul class="text-xs text-gray-100 space-y-3 drop-shadow font-medium">
                <li v-for="(item, i) in triumphalData.ancients.items" :key="i" v-html="item"></li>
              </ul>
            </div>
          </div>
        </div>

      </div>
    </div>

  </div>
</template>