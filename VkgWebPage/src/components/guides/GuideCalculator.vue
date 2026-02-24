<script setup>
import EpicArmyCalculator from '../tools/EpicArmyCalculator.vue';
</script>

<template>
  <div class="space-y-8">
    
    <!-- Cabeçalho Explicativo -->
    <div class="card-bg p-8 rounded-lg border border-white/10">
      <div class="flex items-center gap-4 mb-6 border-b border-medieval-gold/30 pb-4">
        <div class="bg-medieval-gold/10 p-3 rounded-full border border-medieval-gold/50">
          <i class="fas fa-calculator text-2xl text-medieval-gold"></i>
        </div>
        <div>
          <h2 class="text-3xl font-medieval text-white">Calculadora de Exército Épico</h2>
          <p class="text-sm text-gray-400">Ferramenta avançada para otimização de "Stacking" e "Meat Shields"</p>
        </div>
      </div>

      <div class="prose prose-invert max-w-none text-gray-300 text-sm leading-relaxed space-y-4">
        <p>
          Esta ferramenta ajuda você a calcular a formação ideal de tropas (Stacking) para maximizar sua eficácia em batalhas épicas.
          O objetivo é criar camadas de tropas ("stacks") onde as unidades mais baratas (Guards) tenham mais <strong>Vida Total</strong> do que as unidades caras, forçando o inimigo a atacá-las primeiro.
        </p>
        
        <div class="bg-blue-900/10 border-l-4 border-blue-500 p-4 rounded">
          <h4 class="text-blue-400 font-bold uppercase text-xs mb-1">Como usar:</h4>
          <ul class="list-disc pl-5 space-y-1">
            <li>Insira sua <strong>Liderança Total</strong> (Herói + Capitães + Pesquisas).</li>
            <li>Selecione os <strong>Níveis de Guarda (G)</strong> que você tem desbloqueados.</li>
            <li>A calculadora gerará automaticamente a quantidade ideal de cada tropa para garantir a proteção das suas unidades principais.</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- A Calculadora em si -->
    <EpicArmyCalculator />

  </div>
</template>