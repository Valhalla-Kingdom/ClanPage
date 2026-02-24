// Base de dados centralizada para o Guia de Eventos

export const ragnarokData = {
  title: "Ragnarök",
  img: "Ragnarok.png",
  duration: "Duration: 2 Days",
  desc: "The ultimate tournament of epic monsters. Receive Jörmungandr Scales and Fenrir Fangs to exchange for coins and craft the special <strong>Ragnarök Warrior</strong> equipment set.",
  fenrir: {
    title: "Fenrir Invasion",
    desc: "Epic Fenrir troops. Can be attacked by <strong>only ONE Captain</strong>."
  },
  jormungandr: {
    title: "Jörmungandr Invasion",
    desc: "Epic Jörmungandr troops. Must be attacked via <strong>Rally (Incursions)</strong>."
  }
};

export const pveEvents = [
  {
    id: "doomsday",
    title: "Doomsday",
    img: "Juizo_Final.png",
    icon: "fa-skull-crossbones",
    desc: "Battle against the \"Doomsday Squad\" (Undead). Don't expect to win, just kill epic monsters to quickly earn massive amounts of Valor and Experience points.",
    ruleTitle: "Golden Rule:",
    ruleDesc: "You can only send <strong>1 Captain</strong>. Choose your best monster specialist (e.g., Carter or Beowulf).",
    theme: {
      border: "border-purple-500/30",
      hoverBorder: "hover:border-purple-500/60",
      headerBg: "bg-purple-900/40",
      headerBorder: "border-purple-500/20",
      iconColor: "text-purple-400",
      ruleBg: "bg-purple-900/60",
      ruleBorder: "border-purple-500/30",
      ruleTitleColor: "text-purple-300"
    }
  },
  {
    id: "arachne",
    title: "Arachne's Swarm",
    img: "Aracne.png",
    icon: "fa-spider",
    desc: "Battle against epic spider swarms. Players are distributed in divisions by level. A unique opportunity to gain Valor and Tournament coins.",
    ruleTitle: "Tactical Advantage:",
    ruleDesc: "Allows sending <strong>multiple Captains (up to 3)</strong> in the same attack. Great for splitting damage and evolving smaller captains.",
    theme: {
      border: "border-yellow-500/30",
      hoverBorder: "hover:border-yellow-500/60",
      headerBg: "bg-yellow-900/40",
      headerBorder: "border-yellow-500/20",
      iconColor: "text-yellow-400",
      ruleBg: "bg-yellow-900/60",
      ruleBorder: "border-yellow-500/30",
      ruleTitleColor: "text-yellow-300"
    }
  },
  {
    id: "greathunt",
    title: "The Great Hunt",
    img: "Grande_cacada.png",
    icon: "fa-paw",
    desc: "Complete monster contracts to receive tournament points for your clan. The top 100 clans receive highly valuable rewards based on results.",
    ruleTitle: "Clan Focus:",
    ruleDesc: "Join your clan to hunt rare monsters and accumulate thousands of clan chests.",
    theme: {
      border: "border-green-500/30",
      hoverBorder: "hover:border-green-500/60",
      headerBg: "bg-green-900/40",
      headerBorder: "border-green-500/20",
      iconColor: "text-green-400",
      ruleBg: "bg-green-900/60",
      ruleBorder: "border-green-500/30",
      ruleTitleColor: "text-green-300"
    }
  },
  {
    id: "shadow",
    title: "Shadow Invasion",
    img: "Invasao_Sombras.png",
    icon: "fa-ghost",
    desc: "Shadows are attacking the realm! Destroy Shadow Fortresses scattered across the map to earn vital <strong>Conquest Points (CP)</strong>.",
    ruleTitle: "Massive Attack:",
    ruleDesc: "Attack with the <strong>Hero + ALL Captains</strong> simultaneously. Maximize your damage in a single hit!",
    theme: {
      border: "border-blue-500/30",
      hoverBorder: "hover:border-blue-500/60",
      headerBg: "bg-blue-900/40",
      headerBorder: "border-blue-500/20",
      iconColor: "text-blue-400",
      ruleBg: "bg-blue-900/60",
      ruleBorder: "border-blue-500/30",
      ruleTitleColor: "text-blue-300"
    }
  }
];

export const throneData = {
  title: "Battle for the Throne (CoT)",
  img: "Batalha_Trono.png",
  desc: "Earn <strong>Conquest Points (CP)</strong> to climb the tournament rankings. The best way to score massively is by defeating other players' troops. The higher the unit quality and leadership, the higher the score.",
  election: {
    title: "Titles and Election",
    items: [
      "<strong>1st Place:</strong> Receives the title of <span class='text-yellow-400 font-bold'>Prince</span> (25 votes for King).",
      "<strong>Top 2 to 100:</strong> Receive the title of <span class='text-blue-300 font-bold'>Senator</span> (10 votes for King).",
      "<i class='fas fa-exclamation-triangle text-red-400'></i> Peace Shields cannot be activated while in the Top 100!"
    ]
  },
  king: {
    title: "The King",
    desc: "Princes and Senators vote for the new King. The elected gains these massive bonuses and an exclusive city skin:",
    bonuses: [
      "+25% Valor Points",
      "+25% Experience Points",
      "+25% Leadership (Army Size)"
    ]
  }
};

export const ruthlessData = {
  title: "Ruthless Slaughter",
  img: "Matanca_imp.png",
  desc: "During this event, troops killed during an attack can be revived by <strong>spending SILVER instead of GOLD</strong>. This is the moment veterans wait for!",
  items: [
    "Save your suicide battles (high-level Crypts) for this event. You can sacrifice millions of \"Meat Shield\" troops without bankrupting your Gold.",
    "<strong>1st Place:</strong> <span class='text-red-300 font-bold'>Gladiator</span> (+10% Leadership).",
    "<strong>Top 2-100:</strong> <span class='text-gray-300 font-bold'>Legionary</span> (+5% Leadership).",
    "<i class='fas fa-exclamation-triangle text-yellow-500'></i> Exception: Troops lost against epic monsters still cost Gold/Potions."
  ]
};

export const resurrectionEvents = [
  {
    id: "fever",
    title: "Annihilation Fever",
    img: "Febre_aniquilacao.png",
    icon: "fa-fire-alt",
    desc: "PvP hell! <strong>50% discount on Gold cost</strong> to revive troops killed in battles against other players.",
    rewards: [
      { rank: "1st:", text: "Polemarch (+25% Leadership)", color: "text-orange-300" },
      { rank: "Top 100:", text: "Hoplite (+10% Leadership)", color: "text-gray-400" }
    ],
    theme: { border: "border-orange-500/40", iconColor: "text-orange-400" }
  },
  {
    id: "resurgence",
    title: "Conquerors' Resurgence",
    img: "Ressurgimento_Conquistador.png",
    icon: "fa-fist-raised",
    desc: "Use Gold/Potions to revive troops killed while attacking <strong>other players</strong> and receive points and rare rewards (PvP war cashback).",
    rewards: [],
    theme: { border: "border-green-500/40", iconColor: "text-green-400" }
  },
  {
    id: "immortal",
    title: "Immortal Essence",
    img: "Essencia_imortal.png",
    icon: "fa-vial",
    desc: "Focused on general healing. Revive troops to accumulate points and get precious items back. <em>Only counts troops that died during the event.</em>",
    rewards: [],
    theme: { border: "border-purple-500/40", iconColor: "text-purple-400" }
  }
];

export const devTournaments = [
  {
    id: "castle",
    title: "Castle Development",
    img: "Desenvolvimento do Castelo.png",
    icon: "fa-hammer",
    desc: "Build and upgrade city structures.",
    rewards: [
      { rank: "1st:", text: "Grand Master (+25% Const. Speed)", color: "text-blue-300" },
      { rank: "Top 100:", text: "Creator (+10% Const. Speed)", color: "text-gray-400" }
    ]
  },
  {
    id: "science",
    title: "Scientific Advance",
    img: "avanco_cientifico.png",
    icon: "fa-flask",
    desc: "Unlock and research technologies in the Academy.",
    rewards: [
      { rank: "1st:", text: "Mastermind (+25% Research Spd)", color: "text-blue-300" },
      { rank: "Top 100:", text: "Scientist (+10% Research Spd)", color: "text-gray-400" }
    ]
  },
  {
    id: "capital",
    title: "Capital Challenge",
    img: "Desafio_Capital.png",
    icon: "fa-landmark",
    desc: "Send resources to the Capitol. Silver is worth double, food is half.",
    rewards: [
      { rank: "1st:", text: "Guild Master (+200% Gathering Spd)", color: "text-blue-300" },
      { rank: "Top 100:", text: "Benefactor (+50% Gathering Spd)", color: "text-gray-400" }
    ]
  },
  {
    id: "crypt",
    title: "Crypt Raiders",
    img: "Invasores_Cripta.png",
    icon: "fa-dungeon",
    desc: "Explore crypts. Material/gem quality increases points.",
    rewards: [
      { rank: "1st:", text: "Fortune Seeker (+25% Crypt Eff.)", color: "text-blue-300" },
      { rank: "Top 100:", text: "Crypt Thief (+10%)", color: "text-gray-400" }
    ]
  },
  {
    id: "duty",
    title: "Call of Duty",
    img: "Chamada_Dever.png",
    icon: "fa-users",
    desc: "Train your army. Higher leadership/quality = more points.",
    rewards: [
      { rank: "1st:", text: "Soldier Master (+25% Army Health)", color: "text-blue-300" },
      { rank: "Top 100:", text: "Field Marshal (+10% Army Str.)", color: "text-gray-400" }
    ]
  },
  {
    id: "wargames",
    title: "War Games",
    img: "Jogos_Guerra.png",
    icon: "fa-swords",
    desc: "Defeat other players' troops (PvP).",
    rewards: [
      { rank: "1st:", text: "War Hero (+25% Health/Str.)", color: "text-blue-300" },
      { rank: "Top 100:", text: "Blade Master (+10% Health/Str.)", color: "text-gray-400" }
    ]
  },
  {
    id: "officer",
    title: "Officer Academy",
    img: "Academia_Oficiais.png",
    icon: "fa-graduation-cap",
    desc: "Earn experience points with your Hero and Captains.",
    rewards: [
      { rank: "1st:", text: "Legendary Commander (+25% Army Str.)", color: "text-blue-300" },
      { rank: "Top 100:", text: "Headhunter (+10% Army Str.)", color: "text-gray-400" }
    ]
  },
  {
    id: "beast",
    title: "Beast Slayer",
    img: "Matador_Feras.png",
    icon: "fa-dragon",
    desc: "Defeat common and rare monsters on the map.",
    rewards: [
      { rank: "1st:", text: "Dark Knight (+25% Health/Str.)", color: "text-blue-300" },
      { rank: "Top 100:", text: "Daredevil (+10% Health/Str.)", color: "text-gray-400" }
    ]
  }
];

export const specialDevEvents = [
  {
    title: "Regular Decrees",
    img: "Decretos_Regulares.png",
    desc: "Complete daily tasks. 1st: Administrator (+25% Health), Top 100: Chief (+10%)."
  },
  {
    title: "Summoning Master",
    img: "Mestre_Invocacao.png",
    desc: "Obtain fragments in the Circle. Common=1 pt, Elite=10 pts."
  }
];

export const triumphalData = {
  strategy: {
    title: "Triumphal Challenge Strategies",
    img: "Desafio_triunfante.png",
    desc: "The goal is to accumulate <strong>Triumph Scrolls</strong> (30 per level) to climb the battle pass.",
    tasks: {
      title: "Task Management",
      icon: "fa-tasks text-blue-400",
      items: [
        "Check the 7 daily tasks as soon as you log in.",
        "<strong>Refresh Unwanted Tasks:</strong> Use the 3 free refreshes to swap expensive missions for easier ones.",
        "<strong>Closing the Gap:</strong> Focus on \"Indomitable\" and \"Seasonal\" tasks. Defeat monsters to earn Armor Fragments and speed up your progress."
      ]
    },
    pass: {
      title: "Golden Pass & Union",
      icon: "fa-ticket-alt text-yellow-500",
      items: [
        "Unlocks massive rewards (millions of silver/gold and powerful mercenaries).",
        "<strong>Triumphal Union:</strong> Gain cumulative clan bonuses (speed, silver) if many members purchase the pass.",
        "Vital source of fragments to unlock the captain <strong>Helen of Troy</strong>."
      ]
    }
  },
  tactics: {
    title: "Combat Tactics & Mercenaries",
    img: "Taticas_Combate.png",
    desc: "Epic monsters attack the troop with the <strong>HIGHEST TOTAL HEALTH (HP)</strong> first, not the one with the strongest attack.",
    items: [
      "<strong>Cannon Fodder (Meat Shield):</strong> Structure your army so that troops that are cheap to revive (Guardsmen) have a higher total health pool to absorb the first massive impact.",
      "<strong>Mercenary Usage:</strong> Always use mercenaries earned from the pass. They deal extreme damage and are significantly cheaper and faster to revive than regular T7+ troops.",
      "<strong>Activate Bonuses:</strong> Never launch a giant attack without activating your VIP, Strength potions, Health potions, and Valor/Conquest point boosters."
    ]
  },
  ancients: {
    title: "Rise of the Ancients",
    img: "Tesouro_Anciao.png",
    items: [
      "<strong class='text-blue-300'>Day 1 (Treasure):</strong> Complete daily map fragments to find Vaults. Reviving troops in vaults is 10x cheaper. The Ancient Coins obtained are essential to improve Clan artifacts.",
      "<strong class='text-blue-300'>Artifacts:</strong> The Clan Leader should focus strictly on upgrading the \"Tome of Knowledge\" to multiply the Valor points gained on the following day.",
      "<strong class='text-blue-300'>Day 2 (Ascension):</strong> The Clan Leader summons the epic ancient monster (the \"Tin Man\"). Attack via Rally to earn brutal amounts of Golden Guardian and Valor points."
    ]
  }
};