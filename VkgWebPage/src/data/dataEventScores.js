// Database and persistent storage helper for clan event scores (Olympus, Dark Omens, Ragnarok, etc.)
import { clanMembersList, classificationMaxScores } from './clanMembers.js';

export { classificationMaxScores };

export const defaultEvents = [
  {
    id: "dark_omens",
    name: "Dark Omens",
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
    unitName: "points",
    desc: "A 2-day event with 20 mandatory missions per day for essence collection (40 missions in total). Each mission grants points/essence according to the Guard level (for example, G8-G9 receives 50,050 per mission, totaling 2,002,000 across 40 missions). Distribution uses the standard 1,580 fragments based on proportional scores.",
    dailyMissions: [
      { day: 1, name: "Essence Collection Chalice 1-4 (Dark Portals)", count: "20 Mandatory Missions", icon: "fa-vial", color: "text-purple-400" },
      { day: 2, name: "Essence Collection Chalice 4-7 (Dark Portals)", count: "20 Mandatory Missions", icon: "fa-vial", color: "text-purple-400" }
    ],
    tips: [
      "2-day event: 20 mandatory missions per day (40 missions in total for essence collection).",
      "Points per mission by Guard rank: G8-G9 (50,050 pts/mission = 2,002,000 maximum), G6 (29,575 pts/mission = 1,183,000 maximum), G5 (22,750 pts/mission = 910,000 maximum), G4 (17,500 pts/mission = 700,000 maximum).",
      "Reward distribution: standard 1,580 fragments based on the proportional score formula.",
      "Attack portals on the map and organize rallies in clan chat to defeat the bosses."
    ]
  },

  {
    id: "olympus",
    name: "Olympus",
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
    unitName: "points",
    desc: "A 5-day event with 176 total missions divided into specific daily objectives. Scoring follows the same rule as Dark Omens and is assigned proportionally according to completed missions and the player's Guard rank (G-G9). Reward distribution uses the standard 1,400 fragments.",
    dailyMissions: [
      { day: 1, name: "RAIDS (Clan Incursions/Rallies)", count: "35 Missions", icon: "fa-bullseye", color: "text-amber-400" },
      { day: 2, name: "Fight an Epic Using the Hero", count: "21 Missions", icon: "fa-shield-halved", color: "text-purple-400" },
      { day: 3, name: "Resource Collection", count: "20 Missions", icon: "fa-wheat-awn", color: "text-emerald-400" },
      { day: 4, name: "Crypt Exploration", count: "20 Missions", icon: "fa-dungeon", color: "text-cyan-400" },
      { day: 5, name: "3 Captains Against an Epic (Briareus)", count: "80 Missions", icon: "fa-skull-crossbones", color: "text-red-400" }
    ],
    tips: [
      "5-day event (176 missions in total): Day 1 (RAIDS 35m) | Day 2 (Fight with Hero 21m) | Day 3 (Collection 20m) | Day 4 (Crypts 20m) | Day 5 (3 Captains with Epic 80m).",
      "Same calculation as Dark Omens: score is proportional to Guard rank (G-G9) and completed missions. 100% target: G8-G9 (2,002,000 pts), G7 (1,540,000 pts), G6 (1,183,000 pts), G5 (910,000 pts), G4 (700,000 pts).",
      "Reward distribution: standard 1,400 fragments divided proportionally according to accumulated score.",
      "Vital requirement: spend all your Hermes Points in the Shop buying Clan Chests to help your companions."
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
    minTarget: 5,
    unitName: "chests",
    metricLabel: "Purchased chests",
    isChestEvent: true,
    desc: "For Ragnarök, the clan indicator is the number of chests purchased in the Ragnarök Shop. Five chests is ideal; more than five is excellent, and zero is poor.",
    tips: [
      "0 chests: poor. 5 chests: ideal. More than 5 chests: excellent.",
      "Chests are counted only in the Set/Oct cycle (September Olympus and October Dark Omens).",
      "Attack Fenrir with ONLY 1 specialized captain.",
      "Schedule rally times in chat for Jörmungandr.",
      "Exchange coins for Clan Chests in the Ragnarök Shop."
    ]
  }
];

// Official individual member scores assigned to events (default: 0)
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

