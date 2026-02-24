<script setup>
import { ref, computed, reactive, watch } from 'vue';
import { unitsDB } from '../../data/data';

// --- DADOS E ESTADO ---
const unitData = unitsDB;

const leadership = ref(150000);
const enemyStacks = ref(1); // Quantos stacks inimigos (define quantos meat shields precisamos)

// Bônus Detalhados
const bonuses = reactive({
  globalHealth: 0,
  globalStrength: 0,
  rangedHealth: 0,
  meleeHealth: 0,
  mountedHealth: 0,
  flyingHealth: 0
});

// Estado de Seleção de Tiers (Expandir/Colapsar)
const expandedTiers = reactive({});

// Estado de Seleção Granular
const selection = reactive({
  guardsmen: {},
  specialists: {},
  monsters: {}
});

// Inicializa a seleção
const initSelection = () => {
  const tiers = ["Especial II", "Especial I", "T7", "T6", "T5", "T4", "T3", "T2", "T1"];
  
  // Guardsmen
  tiers.forEach(tier => {
    selection.guardsmen[tier] = { ranged: false, melee: false, mounted: false, flying: false };
    expandedTiers[tier] = false;
  });
  
  // Specialists
  tiers.forEach(tier => {
    selection.specialists[tier] = { ranged: false, melee: false, mounted: false, flying: false };
  });

  // Monsters
  ["T6", "T5", "T4", "T3"].forEach(tier => {
    selection.monsters[tier] = { ranged: false, melee: false, mounted: false, flying: false };
  });
};
initSelection();

// --- FUNÇÕES AUXILIARES ---

const hasUnitType = (category, tier, type) => {
  const group = unitData[category]?.find(t => t.tier === tier);
  return group?.units.some(u => u.type === type);
};

// Verifica se o tier tem pelo menos uma unidade ativa
const isTierActive = (category, tier) => {
  const sel = selection[category][tier];
  if (!sel) return false;
  return sel.ranged || sel.melee || sel.mounted || sel.flying;
};

// Toggle de linha inteira (Selecionar todos do Tier)
const toggleTier = (category, tier) => {
  const isActive = isTierActive(category, tier);
  const row = selection[category][tier];
  
  if (!isActive) {
    // ATIVAR: Marca todas as unidades DISPONÍVEIS
    if (hasUnitType(category, tier, 'ranged')) row.ranged = true;
    if (hasUnitType(category, tier, 'melee')) row.melee = true;
    if (hasUnitType(category, tier, 'mounted')) row.mounted = true;
    if (hasUnitType(category, tier, 'flying')) row.flying = true;
    expandedTiers[tier] = true; // Expande para mostrar opções
  } else {
    // DESATIVAR: Desmarca tudo
    row.ranged = false;
    row.melee = false;
    row.mounted = false;
    row.flying = false;
    expandedTiers[tier] = false;
  }
};

const toggleExpand = (tier) => {
  expandedTiers[tier] = !expandedTiers[tier];
};

// --- LÓGICA DE CÁLCULO ---

const calculatedStack = computed(() => {
  const stack = [];
  const layersToProcess = [];

  const processCategory = (categoryName, dbCategory) => {
    const tiers = Object.keys(selection[categoryName]).sort((a, b) => {
        const rank = t => {
            if (t.includes('II')) return 9;
            if (t.includes('I')) return 8;
            return parseInt(t.replace('T', ''));
        };
        return rank(b) - rank(a);
    });

    tiers.forEach(tierKey => {
      const tierData = unitData[dbCategory].find(t => t.tier === tierKey);
      if (!tierData) return;

      const sel = selection[categoryName][tierKey];
      const activeUnits = [];

      // Coleta unidades
      let uRanged, uMelee, uMounted, uFlying;

      if (sel.ranged) {
        uRanged = tierData.units.find(u => u.type === 'ranged');
        if(uRanged) activeUnits.push(uRanged);
      }
      if (sel.melee) {
        uMelee = tierData.units.find(u => u.type === 'melee');
        if(uMelee) activeUnits.push(uMelee);
      }
      if (sel.mounted) {
        uMounted = tierData.units.find(u => u.type === 'mounted');
        if(uMounted) activeUnits.push(uMounted);
      }
      if (sel.flying) {
        uFlying = tierData.units.find(u => u.type === 'flying');
        if(uFlying) activeUnits.push(uFlying);
      }

      const validUnits = activeUnits.filter(u => u);

      if (validUnits.length > 0) {
        // Custo Liderança do Set (Mix: 2R + 2M + 1K + 1F)
        // Se a unidade não existe no JSON, usa padrão: M=2, F=20, outros=1
        const getCost = (u) => u.leadership || (u.type === 'mounted' ? 2 : u.type === 'flying' ? 20 : 1);
        
        // Quantidade no Mix Padrão
        const ratio = { ranged: 2, melee: 2, mounted: 1, flying: 1 };

        let setLeadershipCost = 0;
        let setTotalHealth = 0;

        if (uRanged) {
          setLeadershipCost += (ratio.ranged * getCost(uRanged));
          setTotalHealth += (ratio.ranged * uRanged.health * (1 + bonuses.rangedHealth / 100));
        }
        if (uMelee) {
          setLeadershipCost += (ratio.melee * getCost(uMelee));
          setTotalHealth += (ratio.melee * uMelee.health * (1 + bonuses.meleeHealth / 100));
        }
        if (uMounted) {
          setLeadershipCost += (ratio.mounted * getCost(uMounted));
          setTotalHealth += (ratio.mounted * uMounted.health * (1 + bonuses.mountedHealth / 100));
        }
        if (uFlying) {
          setLeadershipCost += (ratio.flying * getCost(uFlying));
          setTotalHealth += (ratio.flying * uFlying.health * (1 + bonuses.flyingHealth / 100));
        }
        
        // Aplica Global Health Bonus ao total
        setTotalHealth *= (1 + bonuses.globalHealth / 100);

        const avgHealthPerLeadership = setTotalHealth / setLeadershipCost;

        layersToProcess.push({
          category: categoryName,
          tier: tierKey,
          avgHealthPerLeadership,
          setLeadershipCost,
          setTotalHealth,
          // Passamos os objetos de unidade para usar no final
          units: { uRanged, uMelee, uMounted, uFlying },
          ratio // Passamos a proporção usada
        });
      }
    });
  };

  processCategory('guardsmen', 'guardsmen');

  if (layersToProcess.length === 0) return [];

  // Algoritmo de Stacking
  const safetyRatio = 1.25;
  let totalLeadershipWeight = 0;
  const topLayerAvgHealth = layersToProcess[0].avgHealthPerLeadership;

  layersToProcess.forEach((layer, index) => {
    const targetFactor = Math.pow(safetyRatio, index);
    const weight = (topLayerAvgHealth * targetFactor) / layer.avgHealthPerLeadership;
    layer.weight = weight;
    totalLeadershipWeight += weight;
  });

  const leadershipMultiplier = Math.floor(leadership.value / totalLeadershipWeight);

  layersToProcess.forEach((layer, index) => {
    const layerLeadershipPoints = Math.floor(layer.weight * leadershipMultiplier);
    const numberOfSets = Math.floor(layerLeadershipPoints / layer.setLeadershipCost);
    
    if (numberOfSets > 0) {
      // Calcula totais individuais para exibição
      const countRanged = layer.units.uRanged ? numberOfSets * layer.ratio.ranged : 0;
      const countMelee = layer.units.uMelee ? numberOfSets * layer.ratio.melee : 0;
      const countMounted = layer.units.uMounted ? numberOfSets * layer.ratio.mounted : 0;
      const countFlying = layer.units.uFlying ? numberOfSets * layer.ratio.flying : 0;

      const totalCount = countRanged + countMelee + countMounted + countFlying;
      const totalHealth = numberOfSets * layer.setTotalHealth;
      
      // Revive Cost
      let reviveCost = 0;
      if (layer.units.uRanged) reviveCost += countRanged * layer.units.uRanged.rez_gold_cost;
      if (layer.units.uMelee) reviveCost += countMelee * layer.units.uMelee.rez_gold_cost;
      if (layer.units.uMounted) reviveCost += countMounted * layer.units.uMounted.rez_gold_cost;
      if (layer.units.uFlying) reviveCost += countFlying * layer.units.uFlying.rez_gold_cost;

      // Role Logic
      let role = 'Core / Damage';
      let progressColor = 'bg-blue-500';
      const distFromBottom = layersToProcess.length - 1 - index;
      
      if (distFromBottom < enemyStacks.value) {
        role = `Primary Shield #${distFromBottom + 1}`;
        progressColor = 'bg-green-500';
      } else if (distFromBottom < enemyStacks.value + 2) {
        role = 'Buffer';
        progressColor = 'bg-yellow-500';
      }

      stack.push({
        tier: layer.tier,
        category: layer.category,
        count: totalCount,
        leadershipUsed: numberOfSets * layer.setLeadershipCost,
        totalHealth,
        reviveCost,
        role,
        progressColor,
        // Detalhes para exibição
        details: {
          ranged: { count: countRanged, name: layer.units.uRanged?.unit },
          melee: { count: countMelee, name: layer.units.uMelee?.unit },
          mounted: { count: countMounted, name: layer.units.uMounted?.unit },
          flying: { count: countFlying, name: layer.units.uFlying?.unit }
        }
      });
    }
  });

  return stack;
});

const maxTotalHealth = computed(() => {
  if (calculatedStack.value.length === 0) return 0;
  return Math.max(...calculatedStack.value.map(s => s.totalHealth));
});

const formatNum = (n) => new Intl.NumberFormat('en-US').format(Math.round(n));
</script>

<template>
  <div class="bg-[#0a0a0a] border border-medieval-gold/30 rounded-xl shadow-2xl overflow-hidden max-w-7xl mx-auto">
    
    <!-- Top Bar -->
    <div class="bg-black/80 border-b border-white/10 p-6 flex flex-col md:flex-row justify-between items-center gap-6">
      <div class="flex items-center gap-4">
        <div class="w-12 h-12 rounded-full border border-medieval-gold flex items-center justify-center bg-medieval-gold/10">
          <i class="fas fa-chess-rook text-medieval-gold text-xl"></i>
        </div>
        <div>
          <h2 class="text-2xl font-medieval text-white font-bold tracking-wide">Advanced Stack Calculator</h2>
          <p class="text-xs text-gray-400 uppercase tracking-widest">Optimized for Meat Shields</p>
        </div>
      </div>
      
      <div class="flex flex-wrap gap-4 justify-end">
        <div class="input-stat">
          <label>Total Leadership</label>
          <input type="number" v-model="leadership" class="stat-input w-32">
        </div>
        <div class="input-stat">
          <label>Enemy Stacks</label>
          <input type="number" v-model="enemyStacks" class="stat-input w-16 text-center" min="1" max="10">
        </div>
      </div>
    </div>

    <div class="grid lg:grid-cols-12 min-h-[600px]">
      
      <!-- LEFT PANEL: Selection (Accordion Style) -->
      <div class="lg:col-span-6 bg-[#111] border-r border-white/5 p-6 overflow-y-auto max-h-[800px] custom-scrollbar">
        
        <!-- Bonuses Expandable -->
        <div class="mb-8 bg-black/30 border border-white/5 rounded-lg p-4">
          <h4 class="text-medieval-gold text-xs font-bold uppercase mb-3 flex items-center gap-2">
            <i class="fas fa-chart-bar"></i> Health Bonuses %
          </h4>
          <div class="grid grid-cols-3 gap-3">
            <div class="bonus-field">
              <span>Global</span>
              <input type="number" v-model="bonuses.globalHealth">
            </div>
            <div class="bonus-field">
              <span>Ranged</span>
              <input type="number" v-model="bonuses.rangedHealth">
            </div>
            <div class="bonus-field">
              <span>Melee</span>
              <input type="number" v-model="bonuses.meleeHealth">
            </div>
            <div class="bonus-field">
              <span>Mounted</span>
              <input type="number" v-model="bonuses.mountedHealth">
            </div>
            <div class="bonus-field">
              <span>Flying</span>
              <input type="number" v-model="bonuses.flyingHealth">
            </div>
          </div>
        </div>

        <!-- Guards Selection (Accordion) -->
        <div class="space-y-4">
          <label class="text-medieval-gold text-xs font-bold uppercase tracking-wider border-b border-white/10 pb-2 block flex justify-between">
            <span>Guardsmen Selection</span>
            <span class="text-[9px] text-gray-500 font-normal mt-1">Select tiers to stack</span>
          </label>
          
          <div class="space-y-2">
            <!-- Loop Tiers (Reverso) -->
            <div v-for="tier in Object.keys(selection.guardsmen).reverse()" :key="tier" 
                 class="bg-black/30 border border-white/5 rounded transition-all duration-200"
                 :class="{'border-medieval-gold/30 bg-medieval-gold/5': isTierActive('guardsmen', tier)}">
              
              <!-- Cabeçalho do Tier -->
              <div class="flex items-center justify-between p-3 select-none">
                
                <div class="flex items-center gap-3 cursor-pointer flex-grow" @click="toggleTier('guardsmen', tier)">
                  <div class="w-5 h-5 rounded border flex items-center justify-center transition-colors"
                       :class="isTierActive('guardsmen', tier) ? 'bg-medieval-gold border-medieval-gold' : 'border-white/20 bg-black'">
                    <i v-if="isTierActive('guardsmen', tier)" class="fas fa-check text-black text-xs"></i>
                  </div>
                  <span class="text-sm font-bold" :class="isTierActive('guardsmen', tier) ? 'text-white' : 'text-gray-500'">
                    {{ tier }} Guards
                  </span>
                </div>
                
                <div class="flex items-center gap-2 cursor-pointer p-1 hover:bg-white/10 rounded" @click.stop="toggleExpand(tier)">
                  <!-- Mini badges showing active types -->
                  <div class="flex gap-1 text-[8px]" v-if="isTierActive('guardsmen', tier)">
                    <span v-if="selection.guardsmen[tier].ranged" class="bg-blue-900/50 text-blue-300 px-1 rounded">R</span>
                    <span v-if="selection.guardsmen[tier].melee" class="bg-red-900/50 text-red-300 px-1 rounded">M</span>
                    <span v-if="selection.guardsmen[tier].mounted" class="bg-green-900/50 text-green-300 px-1 rounded">K</span>
                    <span v-if="selection.guardsmen[tier].flying" class="bg-purple-900/50 text-purple-300 px-1 rounded">F</span>
                  </div>
                  <i class="fas fa-chevron-down text-gray-600 text-xs transition-transform" 
                     :class="{'rotate-180': expandedTiers[tier]}"></i>
                </div>
              </div>

              <!-- Detalhes Expansíveis -->
              <div v-if="expandedTiers[tier]" class="p-3 border-t border-white/5 bg-black/40 grid grid-cols-4 gap-2">
                
                <label v-if="hasUnitType('guardsmen', tier, 'ranged')" class="unit-toggle group">
                  <input type="checkbox" v-model="selection.guardsmen[tier].ranged" class="hidden">
                  <div class="unit-icon group-hover:bg-blue-500/10" :class="selection.guardsmen[tier].ranged ? 'active-blue' : 'inactive'">
                    <i class="fas fa-bullseye"></i>
                  </div>
                  <span class="unit-label">Ranged</span>
                </label>

                <label v-if="hasUnitType('guardsmen', tier, 'melee')" class="unit-toggle group">
                  <input type="checkbox" v-model="selection.guardsmen[tier].melee" class="hidden">
                  <div class="unit-icon group-hover:bg-red-500/10" :class="selection.guardsmen[tier].melee ? 'active-red' : 'inactive'">
                    <i class="fas fa-shield-alt"></i>
                  </div>
                  <span class="unit-label">Melee</span>
                </label>

                <label v-if="hasUnitType('guardsmen', tier, 'mounted')" class="unit-toggle group">
                  <input type="checkbox" v-model="selection.guardsmen[tier].mounted" class="hidden">
                  <div class="unit-icon group-hover:bg-green-500/10" :class="selection.guardsmen[tier].mounted ? 'active-green' : 'inactive'">
                    <i class="fas fa-horse"></i>
                  </div>
                  <span class="unit-label">Mounted</span>
                </label>

                <label v-if="hasUnitType('guardsmen', tier, 'flying')" class="unit-toggle group">
                  <input type="checkbox" v-model="selection.guardsmen[tier].flying" class="hidden">
                  <div class="unit-icon group-hover:bg-purple-500/10" :class="selection.guardsmen[tier].flying ? 'active-purple' : 'inactive'">
                    <i class="fas fa-dragon"></i>
                  </div>
                  <span class="unit-label">Flying</span>
                </label>

              </div>

            </div>
          </div>
        </div>

      </div>

      <!-- RIGHT PANEL: Result Stack -->
      <div class="lg:col-span-6 bg-black/40 p-6 flex flex-col relative border-l border-white/10">
        
        <div class="flex justify-between items-end mb-6 pb-4 border-b border-white/10">
          <h3 class="text-white font-medieval text-xl">Battle Stack</h3>
          <div class="text-right">
             <div class="text-[10px] text-gray-500 uppercase">Leadership</div>
             <div class="text-white font-bold font-mono">{{ formatNum(calculatedStack.reduce((a,b)=>a+b.leadershipUsed,0)) }} <span class="text-gray-500">/ {{ formatNum(leadership) }}</span></div>
          </div>
        </div>

        <div class="space-y-2 flex-grow overflow-y-auto pr-2 custom-scrollbar">
          <div v-if="calculatedStack.length === 0" class="text-center text-gray-600 py-10">
            Select units to calculate stack.
          </div>

          <div v-for="(layer, index) in calculatedStack" :key="index" 
               class="relative group rounded border border-white/5 bg-black/20 p-2 overflow-hidden hover:border-white/20 transition">
            
            <!-- HP Bar -->
            <div class="absolute inset-0 opacity-20 transition-all duration-700 ease-out origin-left"
                 :class="layer.progressColor"
                 :style="{ width: `${(layer.totalHealth / maxTotalHealth) * 100}%` }">
            </div>

            <div class="relative flex flex-col gap-2 z-10">
              
              <!-- Linha Superior: Info Principal -->
              <div class="flex justify-between items-center">
                <div class="flex items-center gap-3">
                  <div class="w-8 h-8 flex items-center justify-center font-bold text-[10px] bg-black/60 rounded border border-white/10">
                    {{ layer.tier }}
                  </div>
                  <div>
                    <div class="text-white font-bold text-sm">{{ formatNum(layer.count) }} <span class="text-[10px] text-gray-500 font-normal">total units</span></div>
                  </div>
                </div>

                <div class="text-right">
                  <div class="text-xs font-mono font-bold" :class="layer.progressColor.replace('bg-', 'text-')">
                    {{ formatNum(layer.totalHealth) }} HP
                  </div>
                  <div class="text-[9px] uppercase tracking-wider opacity-60">{{ layer.role }}</div>
                </div>
              </div>

              <!-- Linha Inferior: Detalhes de Composição -->
              <div class="flex flex-wrap gap-2 pt-2 border-t border-white/5 mt-1">
                <!-- Ranged -->
                <div v-if="layer.details.ranged.count > 0" class="flex items-center gap-1.5 bg-blue-900/20 px-2 py-1 rounded border border-blue-500/20">
                  <i class="fas fa-bullseye text-blue-400 text-[10px]"></i>
                  <span class="text-blue-200 text-[10px] font-mono">{{ formatNum(layer.details.ranged.count) }}</span>
                </div>
                <!-- Melee -->
                <div v-if="layer.details.melee.count > 0" class="flex items-center gap-1.5 bg-red-900/20 px-2 py-1 rounded border border-red-500/20">
                  <i class="fas fa-shield-alt text-red-400 text-[10px]"></i>
                  <span class="text-red-200 text-[10px] font-mono">{{ formatNum(layer.details.melee.count) }}</span>
                </div>
                <!-- Mounted -->
                <div v-if="layer.details.mounted.count > 0" class="flex items-center gap-1.5 bg-green-900/20 px-2 py-1 rounded border border-green-500/20">
                  <i class="fas fa-horse text-green-400 text-[10px]"></i>
                  <span class="text-green-200 text-[10px] font-mono">{{ formatNum(layer.details.mounted.count) }}</span>
                </div>
                <!-- Flying -->
                <div v-if="layer.details.flying.count > 0" class="flex items-center gap-1.5 bg-purple-900/20 px-2 py-1 rounded border border-purple-500/20">
                  <i class="fas fa-dragon text-purple-400 text-[10px]"></i>
                  <span class="text-purple-200 text-[10px] font-mono">{{ formatNum(layer.details.flying.count) }}</span>
                </div>
              </div>

            </div>
          </div>
        </div>

        <div class="mt-4 pt-4 border-t border-white/10 text-center">
          <div class="text-[10px] text-gray-500 uppercase">Revive Cost</div>
          <div class="text-yellow-500 font-bold font-mono">{{ formatNum(calculatedStack.reduce((a,b)=>a+b.reviveCost,0)) }} G</div>
        </div>

      </div>
    </div>
  </div>
</template>

<style scoped>
.input-stat label {
  @apply block text-[10px] text-gray-500 uppercase font-bold mb-1 text-right;
}
.stat-input {
  @apply bg-transparent text-right text-lg font-mono text-medieval-gold font-bold outline-none border-b border-medieval-gold/30 focus:border-medieval-gold bg-white/5 rounded px-2;
}
.bonus-field {
  @apply flex flex-col bg-black/40 p-2 rounded border border-white/5;
}
.bonus-field span {
  @apply text-[9px] text-gray-400 uppercase font-bold mb-1;
}
.bonus-field input {
  @apply bg-transparent text-white font-mono text-sm outline-none border-b border-white/10 focus:border-medieval-gold;
}
/* Unit Toggle Styles */
.unit-toggle {
  @apply flex flex-col items-center gap-1 cursor-pointer p-2 rounded hover:bg-white/5 transition;
}
.unit-icon {
  @apply w-8 h-8 rounded-full border flex items-center justify-center transition-colors text-sm;
}
.unit-label {
  @apply text-[9px] uppercase font-bold transition-colors;
}
.inactive {
  @apply border-gray-700 text-gray-700;
}
.active-blue { @apply bg-blue-500/20 border-blue-500 text-blue-400; }
.active-red { @apply bg-red-500/20 border-red-500 text-red-400; }
.active-green { @apply bg-green-500/20 border-green-500 text-green-400; }
.active-purple { @apply bg-purple-500/20 border-purple-500 text-purple-400; }

.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: #0f0f0f;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #333;
  border-radius: 3px;
}
</style>