// Database & Persistent Storage helper for Clan Events Scores (Olympus, Dark Omens, Ragnarok, etc.)
import { clanMembersList, classificationMaxScores } from './clanMembers.js';

export { classificationMaxScores };

export const defaultEvents = [
  {
    id: "dark_omens",
    name: "Dark Omens (Sinais Sombrios)",
    icon: "fa-skull",
    color: "purple",
    defaultFragments: 1580,
    colorClasses: {
      border: "border-purple-500/40",
      bg: "bg-purple-950/30",
      text: "text-purple-400",
      badgeBg: "bg-purple-500/20 text-purple-300 border-purple-500/40",
      buttonBg: "bg-purple-600 hover:bg-purple-500 text-white font-bold",
      glow: "shadow-[0_0_20px_rgba(168,85,247,0.2)]"
    },
    minTarget: 700000,
    unitName: "pontos",
    desc: "Evento de 2 dias com 20 missões obrigatórias por dia para coleta de essência (40 missões no total). Cada missão concede pontos/essência por nível de G (ex: G8-G9 recebe 50.050 por missão, totalizando 2.002.000 em 40 missões). A distribuição utiliza o padrão de 1.580 fragmentos por pontuação proporcional.",
    dailyMissions: [
      { day: 1, name: "Coleta de Essências Cálice 1-4 (Portais Sombrios)", count: "20 Missões Obrigatórias", icon: "fa-vial", color: "text-purple-400" },
      { day: 2, name: "Coleta de Essências Cálice4-7 (Portais Sombrios)", count: "20 Missões Obrigatórias", icon: "fa-vial", color: "text-purple-400" }
    ],
    tips: [
      "Evento de 2 dias: 20 missões obrigatórias/dia (40 missões no total para coleta de essência).",
      "Pontuação por missão por classificação: G8-G9 (50.050 pts/missão = 2.002.000 max), G6 (29.575 pts/missão = 1.183.000 max), G5 (22.750 pts/missão = 910.000 max), G4 (17.500 pts/missão = 700.000 max).",
      "Distribuição de recompensas: Padrão de 1.580 fragmentos pela fórmula de pontuação proporcional.",
      "Ataque os portais no mapa e faça ralis no chat do clã para derrotar os chefes."
    ]
  },

  {
    id: "olympus",
    name: "Olympus (Olímpia)",
    icon: "fa-university",
    color: "amber",
    defaultFragments: 1400,
    colorClasses: {
      border: "border-amber-500/40",
      bg: "bg-amber-950/30",
      text: "text-amber-400",
      badgeBg: "bg-amber-500/20 text-amber-300 border-amber-500/40",
      buttonBg: "bg-amber-600 hover:bg-amber-500 text-slate-900 font-bold",
      glow: "shadow-[0_0_20px_rgba(245,158,11,0.2)]"
    },
    minTarget: 50000,
    unitName: "pontos",
    desc: "Evento de 5 dias com 176 missões totais divididas por objetivos diários específicos. O cálculo de pontuação segue a mesma regra do Dark Omens, atribuído proporcionalmente pelas missões concluídas de acordo com a classificação de Guarda do jogador (G-G9). A distribuição de recompensas utiliza o padrão de 1.400 fragmentos.",
    dailyMissions: [
      { day: 1, name: "RAIDS (Incursões/Ralis de Clã)", count: "35 Missões", icon: "fa-bullseye", color: "text-amber-400" },
      { day: 2, name: "Luta contra Épico usando o Herói", count: "21 Missões", icon: "fa-shield-halved", color: "text-purple-400" },
      { day: 3, name: "Coleta de Recursos", count: "20 Missões", icon: "fa-wheat-awn", color: "text-emerald-400" },
      { day: 4, name: "Exploração de Criptas", count: "20 Missões", icon: "fa-dungeon", color: "text-cyan-400" },
      { day: 5, name: "3 Capitães contra Épico (Briareu)", count: "80 Missões", icon: "fa-skull-crossbones", color: "text-red-400" }
    ],
    tips: [
      "Evento de 5 Dias (176 missões no total): Dia 1 (RAIDS 35m) | Dia 2 (Luta c/ Herói 21m) | Dia 3 (Coleta 20m) | Dia 4 (Criptas 20m) | Dia 5 (3 Capitães c/ Épico 80m).",
      "Cálculo idêntico ao Dark Omens: Pontuação proporcional ao nível de Guarda (G-G9) e missões concluídas. Meta 100%: G8-G9 (2.002.000 pts), G7 (1.540.000 pts), G6 (1.183.000 pts), G5 (910.000 pts), G4 (700.000 pts).",
      "Distribuição de recompensas: Padrão de 1.400 fragmentos divididos proporcionalmente pela pontuação acumulada.",
      "Requisito Vital: Gaste todos os seus Pontos Hermes na Loja comprando Baús de Clã para ajudar os companheiros."
    ]
  },
  {
    id: "ragnarok",
    name: "Ragnarök",
    icon: "fa-dragon",
    color: "red",
    defaultFragments: 1580,
    colorClasses: {
      border: "border-red-500/40",
      bg: "bg-red-950/30",
      text: "text-red-400",
      badgeBg: "bg-red-500/20 text-red-300 border-red-500/40",
      buttonBg: "bg-red-600 hover:bg-red-500 text-white font-bold",
      glow: "shadow-[0_0_20px_rgba(239,68,68,0.2)]"
    },
    minTarget: 1183000,
    unitName: "pontos",
    desc: "Torneio supremo de monstros épicos. Derrote Fenrir (1 Capitão) e Jörmungandr (Incursão/Rally) para adquirir Escamas e Presas preciosas.",
    tips: [
      "Ataque Fenrir com APENAS 1 capitão especializado.",
      "Defina horários de Rali no chat para Jörmungandr.",
      "Troque moedas por Baús de Clã na Loja Ragnarök."
    ]
  },
  {
    id: "great_hunt",
    name: "A Grande Caçada",
    icon: "fa-paw",
    color: "emerald",
    defaultFragments: 1580,
    colorClasses: {
      border: "border-emerald-500/40",
      bg: "bg-emerald-950/30",
      text: "text-emerald-400",
      badgeBg: "bg-emerald-600 hover:bg-emerald-500 text-white font-bold",
      glow: "shadow-[0_0_20px_rgba(16,185,129,0.2)]"
    },
    minTarget: 700000,
    unitName: "pontos",
    desc: "Cumpra contratos de monstros raras. O clã acumula milhares de baús coletivos para alavancar o ranking mundial.",
    tips: [
      "Cace em zonas concentradas perto do território do clã.",
      "Ative bônus de marcha e poções de ataque antes dos ciclos de caça."
    ]
  },
  {
    id: "throne",
    name: "Batalha pelo Trono (CoT)",
    icon: "fa-crown",
    color: "blue",
    defaultFragments: 1580,
    colorClasses: {
      border: "border-blue-500/40",
      bg: "bg-blue-950/30",
      text: "text-blue-400",
      badgeBg: "bg-blue-500/20 text-blue-300 border-blue-500/40",
      buttonBg: "bg-blue-600 hover:bg-blue-500 text-white font-bold",
      glow: "shadow-[0_0_20px_rgba(59,130,246,0.2)]"
    },
    minTarget: 0,
    unitName: "CP",
    desc: "Guerra PvP por Pontos de Conquista (CP). Derrote tropas inimigas para elegermos os Príncipes, Senadores e o Rei de K290!",
    tips: [
      "Use Dustan e equipamentos de CP para dobrar a pontuação.",
      "Atenção: Não é possível ativar Escudo de Paz estando no Top 100!"
    ]
  }
];

// Pontuações oficiais individuais dos membros do clã atribuídas aos eventos (Padrão 0)
export const defaultMemberScores = (clanMembersList || []).map((m) => {
  return {
    id: m.id,
    name: m.name,
    rank: m.rank,
    role: m.role,
    scores: {
      dark_omens: 0,
      olympus: 0,
      ragnarok: 0,
      great_hunt: 0,
      throne: 0
    },
    notes: ""
  };
});

