// Base de dados centralizada para Capitães e Heróis

export const captainsData = [
  {
    tier: "Mythical",
    color: "text-red-500",
    borderColor: "border-red-500/50",
    bg: "bg-red-900/10",
    units: [
      { 
        unit: "Heimdall", 
        desc: "O Guardião da Bifrost. Defesa suprema.",
        tips: "Essencial para proteger sua cidade e reforçar aliados durante o KvK."
      },
      { 
        unit: "Skadi", 
        desc: "Deusa do Inverno. Debuffs massivos em inimigos.",
        tips: "Reduz o ataque inimigo. Ótima para defender contra rallys gigantes."
      },
      { 
        unit: "Beowulf", 
        desc: "Força e saúde do seu exército inteiro.",
        tips: "O general supremo. Use-o como líder principal em qualquer batalha decisiva."
      },
      { 
        unit: "Hércules", 
        desc: "Força e saúde do seu exército contra monstros épicos.",
        tips: "Indispensável para caçar monstros de nível alto em eventos como Ragnarok."
      }
    ]
  },
  {
    tier: "Legendary",
    color: "text-orange-500",
    borderColor: "border-orange-500/50",
    bg: "bg-orange-900/10",
    units: [
      { 
        unit: "Cleópatra", 
        desc: "Força do seu exército inteiro.",
        tips: "Foca puramente em ataque. Combine com Ramsés para um exército equilibrado."
      },
      { 
        unit: "Ramsés II", 
        desc: "Saúde do seu exército inteiro.",
        tips: "Aumenta a durabilidade das tropas. O melhor parceiro para Cleópatra."
      },
      { 
        unit: "Leonidas", 
        desc: "Força e saúde das suas tropas corpo a corpo.",
        tips: "Use apenas se seu exército for focado em Infantaria (Guards/Spearmen)."
      },
      { 
        unit: "Alexandre", 
        desc: "Força e saúde de suas tropas montadas.",
        tips: "Líder ideal para ataques rápidos com cavaleiros."
      },
      { 
        unit: "Wu Zetian", 
        desc: "Força e saúde de suas tropas voadoras.",
        tips: "Potencializa Grifos e Dragões. Excelente para ataques aéreos."
      },
      { 
        unit: "Minamoto", 
        desc: "Força e saúde de seus soldados de longo alcance.",
        tips: "O sniper do jogo. Use com Arqueiros para dano massivo à distância."
      },
      { 
        unit: "Amanitore", 
        desc: "Força/Saúde em marchas de grupo, incursões e reforços.",
        tips: "A capitã de equipe. Use sempre que liderar ou entrar em um Rally (Incursão)."
      },
      { 
        unit: "Helena", 
        desc: "Bônus de Liderança e Tamanho de Marcha.",
        tips: "Permite enviar mais tropas. Use para quebrar defesas fortes."
      }
    ]
  },
  {
    tier: "Epic",
    color: "text-purple-500",
    borderColor: "border-purple-500/50",
    bg: "bg-purple-900/10",
    units: [
      { 
        unit: "Carter", 
        desc: "Eficiência de exploração de Criptas e Capacidade de Alcatrão.",
        tips: "Use EXCLUSIVAMENTE para explorar criptas e economizar Tar."
      },
      { 
        unit: "Stror", 
        desc: "Velocidade de coleta de recursos e Capacidade de carga.",
        tips: "O fazendeiro. Envie-o sempre para coletar recursos no mapa."
      },
      { 
        unit: "Aurora", 
        desc: "Velocidade de construção.",
        tips: "Passivo. Mantenha-a evoluída para reduzir tempo de obras na cidade."
      },
      { 
        unit: "Doria", 
        desc: "Bônus de pontos de Bravura (Valor Points).",
        tips: "Use ao treinar tropas ou caçar para ganhar mais pontos de bravura."
      },
      { 
        unit: "Dustan", 
        desc: "Bônus de pontos de Conquista (Conquest Points).",
        tips: "Essencial para o Clash of Thrones (CoT) para maximizar sua pontuação."
      },
      { 
        unit: "Brunhild", 
        desc: "Força e saúde de suas tropas voadoras.",
        tips: "A versão 'acessível' da Wu Zetian para exércitos aéreos."
      },
      { 
        unit: "Ingrid", 
        desc: "Força e saúde de seus monstros.",
        tips: "Use se o seu foco militar for unidades do tipo Monstro (Gigantes, etc)."
      },
      { 
        unit: "Bernard", 
        desc: "Força e saúde das suas tropas de longo alcance.",
        tips: "Excelente suporte para exércitos de arqueiros."
      },
      { 
        unit: "Lucius", 
        desc: "Força e saúde de suas tropas montadas.",
        tips: "Alternativa para cavalaria se você não tiver Alexandre."
      },
      { 
        unit: "Ye Ho-Sung", 
        desc: "Força e saúde das suas tropas corpo a corpo.",
        tips: "Comandante de linha de frente para infantaria."
      }
    ]
  },
  {
    tier: "Rare",
    color: "text-blue-400",
    borderColor: "border-blue-400/50",
    bg: "bg-blue-900/10",
    units: [
      { 
        unit: "Sofia", 
        desc: "Saúde do seu exército inteiro.",
        tips: "Vital no início do jogo para evitar perdas massivas de tropas."
      },
      { 
        unit: "Tengel", 
        desc: "Velocidade e alcance de marchas.",
        tips: "Obrigatório para alcançar eventos distantes rapidamente."
      },
      { 
        unit: "Farhad", 
        desc: "Velocidade de pesquisa.",
        tips: "Passivo. Evolua-o sempre para reduzir o tempo na Academia."
      },
      { 
        unit: "Aydae", 
        desc: "Força e saúde de seus guardas.",
        tips: "Boa para defesa inicial da cidade com guardas básicos."
      },
      { 
        unit: "Logos", 
        desc: "Força e saúde de seus especialistas.",
        tips: "Fortalece unidades táticas especiais."
      },
      { 
        unit: "Próscope", 
        desc: "Força e saúde de seus batedores.",
        tips: "Aumenta a sobrevivência dos espiões ao investigar inimigos."
      },
      { 
        unit: "Xi Guiying", 
        desc: "Força de tropas de longo alcance e batedores.",
        tips: "Híbrida inicial, boa para PvE básico."
      },
      { 
        unit: "Brann", 
        desc: "Força e saúde das suas tropas de engenheiros.",
        tips: "Útil se você usa muitas catapultas/balistas."
      }
    ]
  }
];

export const heroesData = [
  {
    tier: "Avatar",
    color: "text-yellow-400",
    borderColor: "border-yellow-400/50",
    bg: "bg-yellow-900/10",
    units: [
      {
        unit: "Alrick",
        desc: "Marchas inimigas em sua Cidade levam pelo menos 4 horas sem acelerações.",
        tips: "A defesa suprema. Force o inimigo a gastar speedups ou desistir do ataque."
      },
      {
        unit: "Thaddeus",
        desc: "+25% no máximo de Liderança para seu Herói e Capitães.",
        tips: "Crucial para batalhas de larga escala onde o tamanho do exército define o vencedor."
      },
      {
        unit: "Matemhain",
        desc: "+200% força/saúde de engenheiros. Restauração de Muros reduzida para 30s.",
        tips: "Torna seus muros quase imortais e fortalece catapultas."
      },
      {
        unit: "Haemon",
        desc: "Em uma Cidade governada por Haemon, os bônus do Clã são 2x mais eficazes.",
        tips: "Use para maximizar produção e benefícios passivos do território."
      },
      {
        unit: "Meriones",
        desc: "Aumenta os atributos de um conjunto completo de equipamentos em 1,5x.",
        tips: "Transforma equipamentos lendários em armas de destruição em massa."
      },
      {
        unit: "Faron",
        desc: "Título 'Eminência Parda': +900% para os delegados (delegados * 10).",
        tips: "O herói definitivo para quem joga reforçando aliados (Garrison)."
      },
      {
        unit: "Thelensia",
        desc: "A cada 20 horas, Thelensia recebe um presente de seus amantes.",
        tips: "Uma fonte passiva de itens e recursos raros."
      },
      {
        unit: "Ayrin",
        desc: "Tempo ilimitado de marcha. Pode marchar para outros Reinos sem portais.",
        tips: "Permite ataques globais e guerras entre reinos (RvR) sem restrições."
      },
      {
        unit: "Svyatogor",
        desc: "+50% na força e saúde de tropas sob seu comando sem Capitães.",
        tips: "Ótimo para enviar marchas secundárias ou fakes fortes."
      },
      {
        unit: "Ridong",
        desc: "A velocidade de marcha do seu exército, Herói e Capitães é dobrada.",
        tips: "Para ataques relâmpago onde o inimigo não tem tempo de reagir."
      },
      {
        unit: "Guan Yu",
        desc: "Se a iniciativa for igual, você dá o primeiro golpe (se sem aliados).",
        tips: "Garante a vantagem do primeiro ataque em duelos x1 equilibrados."
      },
      {
        unit: "Yamato",
        desc: "Após espionagem bem sucedida, mata um Herói do dono da Cidade (20min cooldown).",
        tips: "Use antes de atacar para desativar os bônus do herói inimigo."
      },
      {
        unit: "Nectarius",
        desc: "+250 Poções Sagradas por hora. +1.500 na capacidade máxima.",
        tips: "Essencial para reviver tropas rapidamente após grandes perdas."
      },
      {
        unit: "Garvel",
        desc: "Avatar básico.",
        tips: "Visual padrão masculino."
      },
      {
        unit: "Julia",
        desc: "Avatar básico.",
        tips: "Visual padrão feminino."
      }
    ]
  }
];