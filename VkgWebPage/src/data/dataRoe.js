// Base de dados centralizada para as Regras de Engajamento (RoE) e Canais Oficiais

export const officialChannels = [
  { name: "K290-ROE", purpose: "Official publication of the Rules of Engagement and updates. READ ONLY CHAT" },
  { name: "K290-WS / K290-DM", purpose: "Mandatory registration for Wellsprings and Dragon Mounds in neutral lands. Use the Y coordinate in the chat message. EX: Y:000 'COORDINATE ONLY CHAT'" },
  { name: "K290-COURT", purpose: "Adjudication of ROE violations by Judges and Diplomats." },
  { name: "K290-OUTLAWS", purpose: "Public list of current Outlaws who have lost ROE protection." },
  { name: "K290-DISPUTES", purpose: "Channel dedicated to resolving minor ROE violations." },
  { name: "K290-CPEXCHANGE", purpose: "Channel for finding other players for CP Exchanges" },
  { name: "K290-HELPDESK", purpose: "Channel for asking and answering general game questions" }
];

export const roeRules = [
  { 
    id: 1, 
    title: "Consequences", 
    desc: "Failure to comply with these rules (RoE) will result in severe punishments.", 
    icon: "fa-gavel",
    highlight: true // Visual highlight for the first rule
  },
  { 
    id: 2, 
    title: "Protection of Minors", 
    desc: "Clanless players with less than 500k power are protected by the RoE.", 
    icon: "fa-shield-heart" 
  },
  { 
    id: 3, 
    title: "Mutual Respect", 
    desc: "Treat everyone with respect. Offenses and toxicity are not tolerated.", 
    icon: "fa-handshake" 
  },
  { 
    id: 4, 
    title: "Clan Identification", 
    desc: "Join a clan. Clans must declare 'Follow RoE' in their public description.", 
    icon: "fa-users" 
  },
  { 
    id: 5, 
    title: "Kingdom Tribute", 
    desc: "Send your Gold Ingots to the Palace daily to assist with Kingdom bonuses.", 
    icon: "fa-coins" 
  },
  { 
    id: 6, 
    title: "Peace Times", 
    desc: "No attacks during peace, except against Outlaws and Poachers. CP Exchanges are permitted.", 
    icon: "fa-dove" 
  },
  { 
    id: 7, 
    title: "Monster Registration (WS/DM)", 
    desc: "Only 1 WS or DM can be registered per player every 24h. Register in K290-DM or K290-WS chats.", 
    icon: "fa-dragon" 
  },
  { 
    id: 8, 
    title: "Resource Protection", 
    desc: "Attacking gathering tiles, stealing tiles created by others, or gathering within another clan's territory is prohibited.", 
    icon: "fa-hammer" 
  },
  { 
    id: 9, 
    title: "Dispute Resolution", 
    desc: "Attempt to resolve disputes between players first. After 24h without a solution, you may take it to court.", 
    icon: "fa-scale-balanced" 
  },
  { 
    id: 10, 
    title: "Portal Rule", 
    desc: "Event portals within 4 squares cannot be attacked unless they are being used to attack others.", 
    icon: "fa-dungeon" 
  },
  { 
    id: 11, 
    title: "Clash of Thrones (CoT)", 
    desc: "In CoT: Attacking players below your power bracket is prohibited. Maximum of 2 attacks on the same player within 6h. CoT is for CP, not for stealing resources.", 
    icon: "fa-crown" 
  }
];