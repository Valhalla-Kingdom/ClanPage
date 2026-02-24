// Centralized database for Captains and Heroes
import unitData from './units.json' assert { type: 'json' };

export const unitsDB = unitData;

export const captainsData = [
  {
    tier: "Mythical",
    color: "text-red-500",
    borderColor: "border-red-500/50",
    bg: "bg-red-900/10",
    units: [
      { 
        unit: "Heimdall", 
        desc: "The Guardian of Bifrost. Supreme defense.",
        tips: "Essential for protecting your city and reinforcing allies during KvK."
      },
      { 
        unit: "Skadi", 
        desc: "Goddess of Winter. Massive debuffs on enemies.",
        tips: "Reduces enemy attack. Great for defending against giant rallies."
      },
      { 
        unit: "Beowulf", 
        desc: "Strength and health for your entire army.",
        tips: "The supreme general. Use him as the primary leader in any decisive battle."
      },
      { 
        unit: "Hércules", 
        desc: "Strength and health for your army against epic monsters.",
        tips: "Indispensable for hunting high-level monsters in events like Ragnarok."
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
        desc: "Strength for your entire army.",
        tips: "Purely focused on attack. Combine with Ramses for a balanced army."
      },
      { 
        unit: "Ramsés II", 
        desc: "Health for your entire army.",
        tips: "Increases troop durability. The best partner for Cleopatra."
      },
      { 
        unit: "Leonidas", 
        desc: "Strength and health for your melee troops.",
        tips: "Use only if your army is focused on Infantry (Guards/Spearmen)."
      },
      { 
        unit: "Alexandre", 
        desc: "Strength and health for your mounted troops.",
        tips: "Ideal leader for fast attacks with cavalry."
      },
      { 
        unit: "Wu Zetian", 
        desc: "Strength and health for your flying troops.",
        tips: "Powers up Griffins and Dragons. Excellent for aerial attacks."
      },
      { 
        unit: "Minamoto", 
        desc: "Strength and health for your long-range soldiers.",
        tips: "The game's sniper. Use with Archers for massive ranged damage."
      },
      { 
        unit: "Amanitore", 
        desc: "Strength/Health in group marches, raids, and reinforcements.",
        tips: "The team captain. Always use when leading or joining a Rally (Raids)."
      },
      { 
        unit: "Helena", 
        desc: "Leadership and March Size bonus.",
        tips: "Allows sending more troops. Use to break strong defenses."
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
        desc: "Crypt exploration efficiency and Tar capacity.",
        tips: "Use EXCLUSIVELY for exploring crypts and saving Tar."
      },
      { 
        unit: "Stror", 
        desc: "Resource gathering speed and Load capacity.",
        tips: "The farmer. Always send him to gather resources on the map."
      },
      { 
        unit: "Aurora", 
        desc: "Construction speed.",
        tips: "Passive. Keep her leveled up to reduce building times in the city."
      },
      { 
        unit: "Doria", 
        desc: "Valor Points bonus.",
        tips: "Use when training troops or hunting to earn more valor points."
      },
      { 
        unit: "Dustan", 
        desc: "Conquest Points bonus.",
        tips: "Essential for Clash of Thrones (CoT) to maximize your score."
      },
      { 
        unit: "Brunhild", 
        desc: "Strength and health for your flying troops.",
        tips: "The 'accessible' version of Wu Zetian for aerial armies."
      },
      { 
        unit: "Ingrid", 
        desc: "Strength and health for your monsters.",
        tips: "Use if your military focus is on Monster-type units (Giants, etc.)."
      },
      { 
        unit: "Bernard", 
        desc: "Strength and health for your long-range troops.",
        tips: "Excellent support for archer armies."
      },
      { 
        unit: "Lucius", 
        desc: "Strength and health for your mounted troops.",
        tips: "Alternative for cavalry if you don't have Alexander."
      },
      { 
        unit: "Ye Ho-Sung", 
        desc: "Strength and health for your melee troops.",
        tips: "Frontline commander for infantry."
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
        desc: "Health for your entire army.",
        tips: "Vital in the early game to avoid massive troop losses."
      },
      { 
        unit: "Tengel", 
        desc: "March speed and range.",
        tips: "Mandatory for reaching distant events quickly."
      },
      { 
        unit: "Farhad", 
        desc: "Research speed.",
        tips: "Passive. Always evolve him to reduce time in the Academy."
      },
      { 
        unit: "Aydae", 
        desc: "Strength and health for your guards.",
        tips: "Good for initial city defense with basic guards."
      },
      { 
        unit: "Logos", 
        desc: "Strength and health for your specialists.",
        tips: "Strengthens special tactical units."
      },
      { 
        unit: "Próscope", 
        desc: "Strength and health for your scouts.",
        tips: "Increases scout survival when investigating enemies."
      },
      { 
        unit: "Xi Guiying", 
        desc: "Strength for long-range troops and scouts.",
        tips: "Early hybrid, good for basic PvE."
      },
      { 
        unit: "Brann", 
        desc: "Strength and health for your engineer troops.",
        tips: "Useful if you use many catapults/ballistas."
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
        desc: "Enemy marches to your City take at least 4 hours without speedups.",
        tips: "The supreme defense. Force the enemy to spend speedups or give up the attack."
      },
      {
        unit: "Thaddeus",
        desc: "+25% to maximum Leadership for your Hero and Captains.",
        tips: "Crucial for large-scale battles where army size determines the winner."
      },
      {
        unit: "Matemhain",
        desc: "+200% strength/health for engineers. Wall restoration reduced to 30s.",
        tips: "Makes your walls nearly immortal and strengthens catapults."
      },
      {
        unit: "Haemon",
        desc: "In a City ruled by Haemon, Clan bonuses are 2x more effective.",
        tips: "Use to maximize production and passive territory benefits."
      },
      {
        unit: "Meriones",
        desc: "Increases the attributes of a full equipment set by 1.5x.",
        tips: "Turns legendary equipment into weapons of mass destruction."
      },
      {
        unit: "Faron",
        desc: "'Grey Eminence' title: +900% for delegates (delegates * 10).",
        tips: "The ultimate hero for those who play reinforcing allies (Garrison)."
      },
      {
        unit: "Thelensia",
        desc: "Every 20 hours, Thelensia receives a gift from her lovers.",
        tips: "A passive source of rare items and resources."
      },
      {
        unit: "Ayrin",
        desc: "Unlimited march time. Can march to other Kingdoms without portals.",
        tips: "Allows global attacks and inter-kingdom wars (RvR) without restrictions."
      },
      {
        unit: "Svyatogor",
        desc: "+50% strength and health for troops under his command without Captains.",
        tips: "Great for sending secondary marches or strong fakes."
      },
      {
        unit: "Ridong",
        desc: "March speed for your army, Hero, and Captains is doubled.",
        tips: "For lightning attacks where the enemy has no time to react."
      },
      {
        unit: "Guan Yu",
        desc: "If initiative is equal, you strike first (if without allies).",
        tips: "Guarantees the first-strike advantage in balanced 1v1 duels."
      },
      {
        unit: "Yamato",
        desc: "After successful scouting, kills one Hero from the City owner (20min cooldown).",
        tips: "Use before attacking to disable enemy hero bonuses."
      },
      {
        unit: "Nectarius",
        desc: "+250 Sacred Potions per hour. +1,500 to maximum capacity.",
        tips: "Essential for reviving troops quickly after large losses."
      },
      {
        unit: "Garvel",
        desc: "Basic avatar.",
        tips: "Default male appearance."
      },
      {
        unit: "Julia",
        desc: "Basic avatar.",
        tips: "Default female appearance."
      }
    ]
  }
];