// Base de dados centralizada para Gifts (Diários, Únicos e Eventos)

// Função ajudante interna para gerar os links
const createGift = (id, title, code, customMobile = null) => {
  const cleanCode = code.trim();
  
  return {
    id,
    name: `${title}`,
    code: cleanCode,
    // Links Web e Triumph atualizados para o padrão ?present=
    browser: `https://totalbattle.com/?present=${cleanCode}`,
    triumph: `https://totalbattle.com/en/triumph/?present=${cleanCode}`,
    
    // Lógica do Mobile:
    // Se você forneceu um link específico (ex: onelink.me ou intent://), usa ele.
    // Se não, tenta gerar o deep link padrão.
    mobile: customMobile || `totalbattle://?cmd=gift&code=${cleanCode}`
  };
};

// --- 1. Links Diários (Fixos) ---
export const dailyGifts = [
  createGift(1, "Monday: 500 Gold", "gold500", "https://totalbattle.onelink.me/Xsl6/h3n9bz4l"),
  createGift(2, "Tuesday: XP Boost", "xp", "https://totalbattle.onelink.me/Xsl6/atjav1j0"), 
  createGift(3, "Wednesday: 1500 Tar", "tar1500", "https://totalbattle.onelink.me/Xsl6/xp7gbljw"),
  createGift(4, "Thursday: 25p Speedups", "speedups25", "https://totalbattle.onelink.me/Xsl6/gbwfnf2t"),
  createGift(5, "Friday: 500 Gold", "gold500", "https://totalbattle.onelink.me/Xsl6/e08dg3he"),
  createGift(6, "Saturday: 4x15m Speedup", "speedups15", "https://totalbattle.onelink.me/Xsl6/shl7uy9z"),
  createGift(7, "Sunday: 3h Speedups", "speedups3", "https://totalbattle.onelink.me/Xsl6/hk7nqk5m"),
];

// --- 2. TB Gifts (Únicos) ---
export const oneTimeGifts = [
  createGift(1, "1k Gold + 2x3h Speedups", "ref3_out_fZ16", "https://totalbattle.onelink.me/Xsl6/ukfounro"),
  createGift(2, "Portals and Teleport", "rm65649016820614116771", "intent://deeplink?&deep_link_value=community_link_rm65649016820614116771#Intent;scheme=totalbattle;end"),
  createGift(3, "5k Building Materials", "rm88699238334633291419", "intent://deeplink?&deep_link_value=community_link_rm88699238334633291419#Intent;scheme=totalbattle;end"),
  createGift(4, "Portal + 20 March Speedups", "rm65718111692502663920", "intent://deeplink?&deep_link_value=community_link_rm65718111692502663920#Intent;scheme=totalbattle;end"),
  createGift(5, "15 Tengel Fragments", "rm88358274959472004847", "intent://deeplink?&deep_link_value=community_link_rm88358274959472004847#Intent;scheme=totalbattle;end"),
  createGift(6, "Bonus Gift 1 - 3K Gold", "merry_christmas2025", "https://totalbattle.onelink.me/Xsl6/t9s8vnio"),
];

// --- 3. Event Links ---
export const eventGifts = [
  createGift(1, "Dragon Roulette Coins", "dragonroulette100", "intent://deeplink?&deep_link_value=community_link_dragonroulette100#Intent;scheme=totalbattle;end"),
  createGift(2, "Lucky Roulette Coins", "luckyroulette100", "intent://deeplink?&deep_link_value=community_link_luckyroulette100#Intent;scheme=totalbattle;end"),
  createGift(3, "Ramses Roulette Coins", "ramsesroulette100", "intent://deeplink?&deep_link_value=community_link_ramsesroulette100#Intent;scheme=totalbattle;end"),
];