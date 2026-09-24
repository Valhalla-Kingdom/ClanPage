<script setup>
import { ref, computed, watch, onMounted } from 'vue';
import { defaultEvents, defaultMemberScores, classificationMaxScores } from '../data/dataEventScores.js';

// --- STATE MANAGEMENT & LOCAL STORAGE ---
const LOCAL_STORAGE_KEY = 'wlf_clan_events_scores_v8';
const LOCAL_STORAGE_EVENTS_KEY = 'wlf_clan_events_list_v8';
const LOCAL_STORAGE_ROSTER_KEY = 'wlf_clan_roster_v8';

const events = computed(() => defaultEvents);
const members = ref([]);
const clanRoster = ref([]);
const activeEventId = ref('dark_omens');

// Filters & Controls
const searchQuery = ref('');
const rankFilter = ref('ALL');
const statusFilter = ref('ALL'); // ALL, COMPLETED, PENDING, ZERO
const viewMode = ref('table'); // 'table' or 'card'
const sortBy = ref('score_desc'); // 'score_desc', 'score_asc', 'name', 'rank'
const hideZeroScores = ref(true); // Oculta pontuação 0 por padrão na lista da página

// Modal states
const showAddModal = ref(false);
const editingMember = ref(null);
const showBatchModal = ref(false);
const showExportModal = ref(false);
const showRosterModal = ref(false);
const showFragmentsModal = ref(false);
const totalFragmentsToDistribute = ref(1580);
const fragmentsSearchQuery = ref('');
const rosterSearchQuery = ref('');
const batchInputText = ref('');
const batchParsePreview = ref([]);
const toastMessage = ref('');

// Member Selector & Add Member States
const isCustomMemberMode = ref(false);
const memberSearchQuery = ref('');
const isMemberDropdownOpen = ref(false);

// Google Sheets Live Integration States
const GOOGLE_SHEET_BASE_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTttvtKwnytCfRbJFeFOeaYDv7z3jJXbEE3alubUU-NExh02zV4fitXcaYj-XOhUp9tMnkgEMeEs1mz';
const GID_MEMBROS = '1891678615'; // Aba Membros com lista oficial, patentes e cargos
const googleSheetCycles = [
  { id: '1091515050', label: 'Set/Out: Olympus Setembro, DO Outubro (Atual)', isDefault: true },
  { id: '673947178', label: 'Ago/Set: Olympus Agosto, DO Setembro (Anterior)', isDefault: false },
];
const selectedSheetGid = ref('1091515050');
const isSyncingSheet = ref(false);
const lastSyncTime = ref('');
const sheetSyncError = ref('');
const sheetSyncStats = ref({ darkOmens: 0, olympus: 0, roster: 0 });

// Sincroniza total de fragmentos com o evento ativo conforme dataEventScores.js
watch(activeEventId, (newId) => {
  const current = defaultEvents.find(e => e.id === newId);
  totalFragmentsToDistribute.value = current?.defaultFragments || 1580;
}, { immediate: true });

// Form state for edit/add member
const memberForm = ref({
  id: null,
  name: '',
  rank: 'G6',
  role: 'Membro do Clã',
  score: 0,
  notes: ''
});

// Helper for Rank / Classification Badges (G - G9)
const getRankBadgeClass = (rank) => {
  switch (rank) {
    case 'G9':
      return 'bg-red-950/80 text-red-300 border-red-500/60 shadow-[0_0_8px_rgba(239,68,68,0.3)] font-black';
    case 'G8':
      return 'bg-orange-950/80 text-orange-300 border-orange-500/60 font-bold';
    case 'G7':
      return 'bg-amber-950/80 text-amber-300 border-amber-500/60 font-bold';
    case 'G6':
      return 'bg-purple-950/80 text-purple-300 border-purple-500/60 font-bold';
    case 'G5':
      return 'bg-blue-950/80 text-blue-300 border-blue-500/60 font-bold';
    case 'G4':
      return 'bg-cyan-950/80 text-cyan-300 border-cyan-500/60 font-bold';
    case 'G3':
      return 'bg-emerald-950/80 text-emerald-300 border-emerald-500/60 font-bold';
    case 'G2':
      return 'bg-slate-800 text-slate-300 border-slate-600 font-bold';
    case 'G':
    case 'G1':
    default:
      return 'bg-slate-900 text-slate-400 border-slate-700';
  }
};

// Valida se o nome representa um guerreiro real do clã (descarta números soltos, fórmulas ou cabeçalhos)
const isValidMemberName = (name) => {
  if (!name || typeof name !== 'string') return false;
  const trimmed = name.trim();
  if (!trimmed) return false;
  // Deve conter pelo menos uma letra válida
  if (!/[a-zA-Z\u00C0-\u00FF]/.test(trimmed)) return false;
  // Não pode ser puramente numérico (ex: "60250", "12.475", "0")
  if (/^\d+([.,]\d+)?$/.test(trimmed)) return false;
  // Não pode ser erro de fórmula do Google Sheets
  if (/^(#REF!|#DIV\/0!|#N\/A|#VALUE!|#NAME\?)$/i.test(trimmed)) return false;
  // Não pode ser cabeçalho de coluna
  if (/^(membro|membros|dark omens|olympus|pontuação|pontuacao|essência|essencia|dragon coins|defesa|guardas|total)$/i.test(trimmed)) return false;
  return true;
};

// Canonical key normalizer for member matching (fixes sheet typos like Ildriilas -> Ildrilas, Morena Moshoeshoe -> Morena, etc.)
const getCanonicalKey = (name) => {
  if (!name) return '';
  let s = name.toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/^br\s+/i, '')
    .replace(/[^a-z0-9]/g, '');

  // Specific sheet typos & nicknames
  if (s === 'ildriilas' || s === 'ildri' || s === 'ildrilias') return 'ildrilas';
  if (s === 'morenamoshoeshoe') return 'morena';
  if (s === 'ladyd') return 'ladydingwall';

  // Reduce consecutive repeating letters (e.g. ildriilas -> ildrilas)
  const reduced = s.replace(/(.)\1+/g, '$1');
  if (reduced === 'ildrilas') return 'ildrilas';

  return s;
};

// Deduplicate members list, merging scores, fragments and retaining official spelling
const deduplicateMembers = (list) => {
  if (!Array.isArray(list)) return [];
  const map = new Map();

  list.forEach(m => {
    if (!m || !m.name || !isValidMemberName(m.name)) return;
    const key = getCanonicalKey(m.name);
    if (!key || /^\d+$/.test(key)) return;

    if (!map.has(key)) {
      map.set(key, {
        ...m,
        scores: { ...(m.scores || {}) },
        fragments: { ...(m.fragments || {}) },
        fragmentsPending: { ...(m.fragmentsPending || {}) }
      });
    } else {
      const existing = map.get(key);

      // Prefer canonical/clean name (e.g. "Ildrilas" over "Ildriilas" or "Ildri")
      if (key === 'ildrilas') {
        existing.name = 'Ildrilas';
      } else if (m.name.length < existing.name.length && m.name.length >= 4) {
        existing.name = m.name;
      }

      // Upgrade rank / role if existing is default
      if (m.rank && m.rank !== 'G' && (!existing.rank || existing.rank === 'G')) {
        existing.rank = m.rank;
      }
      if (m.role && m.role !== 'Membro do Clã' && (!existing.role || existing.role === 'Membro do Clã')) {
        existing.role = m.role;
      }

      // Merge scores
      if (m.scores) {
        Object.keys(m.scores).forEach(evt => {
          const s = Number(m.scores[evt]) || 0;
          const cur = Number(existing.scores[evt]) || 0;
          if (s > cur) existing.scores[evt] = s;
        });
      }

      // Merge fragments
      if (m.fragments) {
        Object.keys(m.fragments).forEach(evt => {
          const f = Number(m.fragments[evt]) || 0;
          const cur = Number(existing.fragments[evt]) || 0;
          if (f > cur) {
            existing.fragments[evt] = f;
            if (existing.fragmentsPending) existing.fragmentsPending[evt] = false;
          }
        });
      }
    }
  });

  return Array.from(map.values());
};

// Load stored data or initialize defaults
const loadData = () => {
  try {
    const storedRoster = localStorage.getItem(LOCAL_STORAGE_ROSTER_KEY);
    if (storedRoster) {
      clanRoster.value = deduplicateMembers(JSON.parse(storedRoster));
    }

    const storedMembers = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedMembers) {
      members.value = deduplicateMembers(JSON.parse(storedMembers));
    } else {
      members.value = deduplicateMembers(JSON.parse(JSON.stringify(defaultMemberScores)));
    }
  } catch (err) {
    console.error('Error loading clan events data from localStorage:', err);
    members.value = JSON.parse(JSON.stringify(defaultMemberScores));
  }
};

const saveData = () => {
  try {
    members.value = deduplicateMembers(members.value);
    clanRoster.value = deduplicateMembers(clanRoster.value);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(members.value));
    localStorage.setItem(LOCAL_STORAGE_ROSTER_KEY, JSON.stringify(clanRoster.value));
  } catch (err) {
    console.error('Error saving clan events data:', err);
  }
};

const resetToDefaults = async () => {
  if (confirm('Deseja restaurar e ressincronizar os dados diretamente da planilha do Google Sheets?')) {
    await syncWithGoogleSheet();
    showToast('Planilha sincronizada e dados atualizados!');
  }
};

// --- GOOGLE SHEETS LIVE SYNC LOGIC ---

// Parse numerical score from spreadsheet string (e.g. "E$ 2.002.000", "313.375", "262375")
const parseScoreValue = (val) => {
  if (val === null || val === undefined) return 0;
  let str = String(val).trim();
  if (!str || str.startsWith('#') || str === '-' || str === '0') return 0;

  // Strip currency / prefix tags like E$, R$, $, pts
  str = str.replace(/^[A-Za-z]{1,2}\$\s*/i, '').replace(/^\$\s*/, '').replace(/\s*pts/i, '').trim();

  // If format like 2.002.000 or 313.375 (thousands separator)
  if (/^\d{1,3}(\.\d{3})+$/.test(str)) {
    str = str.replace(/\./g, '');
  } else if (/^\d{1,3}(,\d{3})+$/.test(str)) {
    str = str.replace(/,/g, '');
  } else if (str.includes(',') && !str.includes('.')) {
    str = str.replace(',', '.');
  }

  const num = parseFloat(str);
  return isNaN(num) ? 0 : Math.round(num);
};

// Parse numerical fragment value directly from spreadsheet cell (NO CALCULATION NEEDED)
const parseFragmentsValue = (val) => {
  if (val === null || val === undefined) return { value: 0, pending: true };
  const str = String(val).trim();
  if (!str || str.startsWith('#') || str === '-' || str.toLowerCase() === 'pendente') {
    return { value: 0, pending: true };
  }

  const clean = str.replace(/\s*frag(s)?/i, '').replace(/\./g, '').replace(',', '.');
  const num = parseFloat(clean);
  if (isNaN(num)) return { value: 0, pending: true };
  return { value: Math.round(num), pending: false };
};

// Parse CSV line considering quotes
const parseCSVLine = (line) => {
  const cells = [];
  let current = '';
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const c = line[i];
    if (c === '"') {
      inQuotes = !inQuotes;
    } else if (c === ',' && !inQuotes) {
      cells.push(current.trim());
      current = '';
    } else {
      current += c;
    }
  }
  cells.push(current.trim());
  return cells;
};

// Match or create member from Google Sheets row (using clanRoster from Membros tab & canonical key)
const findOrCreateMemberFromSheet = (rawName) => {
  if (!isValidMemberName(rawName)) return null;
  const trimmed = rawName.trim();
  if (!trimmed) return null;

  const key = getCanonicalKey(trimmed);

  // 1. Check in current members state by canonical key
  let found = members.value.find(m => getCanonicalKey(m.name) === key);
  if (found) return found;

  // 2. Match from clanRoster (imported dynamically from Membros tab gid=1891678615)
  const rosterEntry = clanRoster.value.find(cm => getCanonicalKey(cm.name) === key);

  if (rosterEntry) {
    const newMember = {
      id: rosterEntry.id || ('m_' + key),
      name: rosterEntry.name, // Always use the canonical official spelling!
      rank: rosterEntry.rank,
      role: rosterEntry.role,
      scores: { dark_omens: 0, olympus: 0, ragnarok: 0, great_hunt: 0, throne: 0 },
      fragments: { dark_omens: 0, olympus: 0, ragnarok: 0, great_hunt: 0, throne: 0 },
      fragmentsPending: { dark_omens: false, olympus: false, ragnarok: false, great_hunt: false, throne: false },
      notes: ''
    };
    members.value.push(newMember);
    return newMember;
  }

  // 3. Create new member if not in roster
  const newMember = {
    id: 'm_' + key,
    name: key === 'ildrilas' ? 'Ildrilas' : trimmed,
    rank: 'G',
    role: 'Membro do Clã',
    scores: { dark_omens: 0, olympus: 0, ragnarok: 0, great_hunt: 0, throne: 0 },
    fragments: { dark_omens: 0, olympus: 0, ragnarok: 0, great_hunt: 0, throne: 0 },
    fragmentsPending: { dark_omens: false, olympus: false, ragnarok: false, great_hunt: false, throne: false },
    notes: 'Google Sheets'
  };
  members.value.push(newMember);
  return newMember;
};


// Sincronizar com a Planilha Publicada do Google Drive (Aba Membros + Aba do Ciclo de Eventos)
const syncWithGoogleSheet = async (targetGid = null) => {
  const gid = targetGid || selectedSheetGid.value;
  isSyncingSheet.value = true;
  sheetSyncError.value = '';

  try {
    // 1. SINCRONIZAR ABA DE MEMBROS (gid=1891678615) - LISTA OFICIAL DO CLÃ COM PATENTES E CARGOS
    try {
      const membrosUrl = `${GOOGLE_SHEET_BASE_URL}/pub?gid=${GID_MEMBROS}&single=true&output=csv`;
      const membrosRes = await fetch(membrosUrl);
      if (membrosRes.ok) {
        const membrosCsv = await membrosRes.text();
        const membrosLines = membrosCsv.split('\n');
        const parsedRoster = [];
        let currentRole = 'Membro do Clã';

        membrosLines.forEach(line => {
          const cells = parseCSVLine(line);
          if (cells.length < 2) return;
          const col0 = cells[0].trim();
          const col1 = cells[1].trim();

          const lowerCol1 = col1.toLowerCase();
          if (!col0 && col1) {
            if (lowerCol1.includes('líder') || lowerCol1.includes('lider')) {
              currentRole = 'Líder';
            } else if (lowerCol1.includes('superior') || lowerCol1.includes('liderança')) {
              currentRole = 'Superior';
            } else if (lowerCol1.includes('oficial')) {
              currentRole = 'Oficial';
            } else if (lowerCol1.includes('veterano')) {
              currentRole = 'Veterano';
            } else if (lowerCol1.includes('soldado')) {
              currentRole = 'Soldado';
            }
            return;
          }

          if (/^G\d?$/i.test(col0) && col1) {
            parsedRoster.push({
              id: 'cm_' + col1.toLowerCase().replace(/[^a-z0-9]/g, ''),
              name: col1,
              rank: col0.toUpperCase(),
              role: currentRole
            });
          }
        });

        if (parsedRoster.length > 0) {
          clanRoster.value = deduplicateMembers(parsedRoster);
          // Atualiza dados de patente/cargo para os membros existentes no estado
          parsedRoster.forEach(r => {
            const rKey = getCanonicalKey(r.name);
            let existing = members.value.find(m => getCanonicalKey(m.name) === rKey);
            if (existing) {
              existing.name = r.name; // Preserva grafia oficial
              existing.rank = r.rank;
              existing.role = r.role;
            } else {
              members.value.push({
                id: r.id,
                name: r.name,
                rank: r.rank,
                role: r.role,
                scores: { dark_omens: 0, olympus: 0, ragnarok: 0, great_hunt: 0, throne: 0 },
                fragments: { dark_omens: 0, olympus: 0, ragnarok: 0, great_hunt: 0, throne: 0 },
                fragmentsPending: { dark_omens: false, olympus: false, ragnarok: false, great_hunt: false, throne: false },
                notes: ''
              });
            }
          });
        }
      }
    } catch (rosterErr) {
      console.warn('Aviso: Não foi possível sincronizar aba de Membros, prosseguindo com evento:', rosterErr);
    }

    // 2. SINCRONIZAR ABA DO CICLO DE EVENTOS (Dark Omens & Olympus com fragmentos)
    const url = `${GOOGLE_SHEET_BASE_URL}/pub?gid=${gid}&single=true&output=csv`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Erro ao acessar planilha (${response.status})`);
    }
    const csv = await response.text();
    const lines = csv.split('\n');

    let countDarkOmens = 0;
    let countOlympus = 0;

    // Detectar colunas da aba de eventos dinamicamente
    let doScoreCol = 0, doMemberCol = 1, doFragCol = 2;
    let olyScoreCol = 3, olyMemberCol = 4, olyFragCol = 5;

    // Varre as primeiras 3 linhas para achar onde estão as colunas de "Membros"
    for (let h = 0; h < Math.min(3, lines.length); h++) {
      const hCells = parseCSVLine(lines[h]);
      const memberCols = [];
      hCells.forEach((c, idx) => {
        if (c.toLowerCase().trim().includes('membro')) {
          memberCols.push(idx);
        }
      });
      if (memberCols.length >= 2) {
        doMemberCol = memberCols[0];
        doScoreCol = Math.max(0, doMemberCol - 1);
        doFragCol = doMemberCol + 1;

        olyMemberCol = memberCols[1];
        olyScoreCol = Math.max(0, olyMemberCol - 1);
        olyFragCol = olyMemberCol + 1;
        break;
      }
    }

    // Ler linha de cabeçalhos de totais (Row 1)
    if (lines.length > 1) {
      const row1Cells = parseCSVLine(lines[1]);
      row1Cells.forEach((c, idx) => {
        const n = parseInt(c);
        if (n === 1580) {
          doFragCol = idx;
          if (activeEventId.value === 'dark_omens') totalFragmentsToDistribute.value = 1580;
        }
        if (n === 1400) {
          olyFragCol = idx;
          if (activeEventId.value === 'olympus') totalFragmentsToDistribute.value = 1400;
        }
      });
    }

    // Iterar linhas de dados (a partir da linha 2)
    for (let r = 2; r < lines.length; r++) {
      const cells = parseCSVLine(lines[r]);
      if (cells.length < 2) continue;

      // Dark Omens
      const doScoreRaw = cells[doScoreCol] || '';
      const doMemberRaw = cells[doMemberCol] || '';
      const doFragRaw = cells[doFragCol] || '';

      if (doMemberRaw && isValidMemberName(doMemberRaw)) {
        const score = parseScoreValue(doScoreRaw);
        const fragInfo = parseFragmentsValue(doFragRaw);
        const member = findOrCreateMemberFromSheet(doMemberRaw);
        if (member) {
          if (!member.scores) member.scores = {};
          if (!member.fragments) member.fragments = {};
          if (!member.fragmentsPending) member.fragmentsPending = {};

          member.scores['dark_omens'] = score;
          member.fragments['dark_omens'] = fragInfo.value;
          member.fragmentsPending['dark_omens'] = fragInfo.pending;
          countDarkOmens++;
        }
      }

      // Olympus
      const olyScoreRaw = cells[olyScoreCol] || '';
      const olyMemberRaw = cells[olyMemberCol] || '';
      const olyFragRaw = cells[olyFragCol] || '';

      if (olyMemberRaw && isValidMemberName(olyMemberRaw)) {
        const score = parseScoreValue(olyScoreRaw);
        const fragInfo = parseFragmentsValue(olyFragRaw);
        const member = findOrCreateMemberFromSheet(olyMemberRaw);
        if (member) {
          if (!member.scores) member.scores = {};
          if (!member.fragments) member.fragments = {};
          if (!member.fragmentsPending) member.fragmentsPending = {};

          member.scores['olympus'] = score;
          member.fragments['olympus'] = fragInfo.value;
          member.fragmentsPending['olympus'] = fragInfo.pending;
          countOlympus++;
        }
      }
    }

    members.value = deduplicateMembers(members.value);
    clanRoster.value = deduplicateMembers(clanRoster.value);
    saveData();
    const now = new Date();
    lastSyncTime.value = now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    sheetSyncStats.value = { darkOmens: countDarkOmens, olympus: countOlympus, roster: clanRoster.value.length };
    showToast(`Google Sheets sincronizado! ${countDarkOmens} em Dark Omens e ${countOlympus} em Olympus.`);
  } catch (err) {
    console.error('Falha ao sincronizar com Google Sheets:', err);
    sheetSyncError.value = 'Não foi possível sincronizar com o Google Sheets no momento. Usando dados locais.';
    showToast('Falha na sincronização com a planilha.');
  } finally {
    isSyncingSheet.value = false;
  }
};

onMounted(async () => {
  localStorage.removeItem(LOCAL_STORAGE_EVENTS_KEY);
  loadData();
  saveData();
  // Auto-sync com a planilha do Google Drive em segundo plano
  await syncWithGoogleSheet();
});

// --- COMPUTED PROPERTIES ---

// Active Event Object
const activeEvent = computed(() => {
  return defaultEvents.find(e => e.id === activeEventId.value) || defaultEvents[0] || {};
});

// Total Clan Score for active event
const totalClanScore = computed(() => {
  const currentEvtId = activeEventId.value;
  return members.value.reduce((acc, m) => {
    const s = m.scores && m.scores[currentEvtId] !== undefined ? Number(m.scores[currentEvtId]) : 0;
    return acc + s;
  }, 0);
});

// Formatted Members list for active event with Direct Fragment Display from Spreadsheet (NO formula recalculation!)
const processedMembers = computed(() => {
  const currentEvtId = activeEventId.value;
  const evtMinTarget = activeEvent.value.minTarget || 50000;
  const totScore = totalClanScore.value;

  return members.value.filter(m => isValidMemberName(m && m.name)).map(m => {
    const rawScore = m.scores && m.scores[currentEvtId] !== undefined ? Number(m.scores[currentEvtId]) : 0;
    const target = activeEvent.value.minTarget || 50000;
    const progressPct = target > 0 ? Math.min(Math.round((rawScore / target) * 100), 999) : 0;
    const isCompleted = rawScore >= target;

    // DIRECT SPREADSHEET FRAGMENTS:
    const hasSheetFrags = m.fragments && m.fragments[currentEvtId] !== undefined;
    const isPending = m.fragmentsPending && m.fragmentsPending[currentEvtId];
    const fragmentsAllocated = hasSheetFrags ? m.fragments[currentEvtId] : 0;

    const shareRatio = totScore > 0 ? (rawScore / totScore) : 0;
    const sharePctStr = (shareRatio * 100).toFixed(2) + '%';

    return {
      ...m,
      currentScore: rawScore,
      targetScore: target,
      progressPct: progressPct,
      isCompleted: isCompleted,
      shareRatio: shareRatio,
      sharePctStr: sharePctStr,
      fragmentsAllocated: fragmentsAllocated,
      fragmentsPending: isPending
    };
  });
});


// Membros com pontuação (> 0) no evento ativo
const activeScorers = computed(() => {
  return processedMembers.value.filter(m => m.currentScore > 0);
});

// Quantidade de membros com pontuação 0 no evento ativo
const zeroScorersCount = computed(() => {
  return processedMembers.value.filter(m => m.currentScore === 0).length;
});

// Filtered & Sorted Members
const filteredMembers = computed(() => {
  let list = [...processedMembers.value];

  // Mostra apenas quem teve algum valor em pontuação (> 0)
  if (hideZeroScores.value && statusFilter.value !== 'ZERO') {
    list = list.filter(m => m.currentScore > 0);
  }

  // Search filter
  if (searchQuery.value.trim()) {
    const q = searchQuery.value.toLowerCase().trim();
    list = list.filter(m => m.name.toLowerCase().includes(q) || (m.notes && m.notes.toLowerCase().includes(q)));
  }

  // Rank filter
  if (rankFilter.value !== 'ALL') {
    list = list.filter(m => m.rank === rankFilter.value);
  }

  // Status filter
  if (statusFilter.value === 'COMPLETED') {
    list = list.filter(m => m.isCompleted);
  } else if (statusFilter.value === 'PENDING') {
    list = list.filter(m => !m.isCompleted);
  } else if (statusFilter.value === 'ZERO') {
    list = list.filter(m => m.currentScore === 0);
  }

  // Sort
  list.sort((a, b) => {
    if (sortBy.value === 'score_desc') return b.currentScore - a.currentScore;
    if (sortBy.value === 'score_asc') return a.currentScore - b.currentScore;
    if (sortBy.value === 'name') return a.name.localeCompare(b.name);
    if (sortBy.value === 'rank') {
      const rankOrder = { G9: 9, G8: 8, G7: 7, G6: 6, G5: 5, G4: 4, G3: 3, G2: 2, G1: 1, G: 1 };
      return (rankOrder[b.rank] || 0) - (rankOrder[a.rank] || 0);
    }
    return 0;
  });

  return list;
});

// Clan Aggregate Metrics
const totalDistributedFragments = computed(() => {
  return processedMembers.value.reduce((acc, m) => acc + m.fragmentsAllocated, 0);
});

const averageMemberScore = computed(() => {
  if (processedMembers.value.length === 0) return 0;
  return Math.round(totalClanScore.value / processedMembers.value.length);
});

const completedCount = computed(() => {
  return processedMembers.value.filter(m => m.isCompleted).length;
});

const completedPercentage = computed(() => {
  if (processedMembers.value.length === 0) return 0;
  return Math.round((completedCount.value / processedMembers.value.length) * 100);
});

const topScorer = computed(() => {
  if (processedMembers.value.length === 0) return null;
  const sorted = [...processedMembers.value].sort((a, b) => b.currentScore - a.currentScore);
  return sorted[0].currentScore > 0 ? sorted[0] : null;
});

// Format Numbers nicely (e.g. 42,500,000 or 42.5M)
const formatNumber = (num) => {
  if (num === null || num === undefined) return '0';
  return num.toLocaleString('pt-BR');
};

const formatShortNumber = (num) => {
  if (!num || num === 0) return '0';
  if (num >= 1000000000) return (num / 1000000000).toFixed(2) + 'B';
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
  if (num >= 1000) return (num / 1000).toFixed(0) + 'K';
  return num.toString();
};

// Toast message helper
const showToast = (msg) => {
  toastMessage.value = msg;
  setTimeout(() => {
    if (toastMessage.value === msg) toastMessage.value = '';
  }, 3500);
};

// --- ACTIONS & MODAL HANDLERS ---

// Helper to check if a member is in the roster from Membros tab
const isMemberFromOfficialList = (name) => {
  if (!name) return false;
  return clanRoster.value.some(m => m.name.toLowerCase().trim() === name.toLowerCase().trim());
};

// Full list of available members for the selector: merges clanRoster (Membros tab) with any custom members in state
const selectorMemberList = computed(() => {
  const currentEvtId = activeEventId.value;
  const currentMembersMap = new Map();
  members.value.forEach(m => {
    currentMembersMap.set(m.name.toLowerCase().trim(), m);
  });

  const list = [];
  const addedNames = new Set();

  // 1. Members from clanRoster (Membros tab)
  clanRoster.value.forEach(cm => {
    const lower = cm.name.toLowerCase().trim();
    addedNames.add(lower);
    const existing = currentMembersMap.get(lower);
    const scoreVal = existing && existing.scores && existing.scores[currentEvtId] !== undefined
      ? Number(existing.scores[currentEvtId])
      : 0;

    list.push({
      id: existing ? existing.id : cm.id,
      name: cm.name,
      rank: existing?.rank || cm.rank,
      role: existing?.role || cm.role,
      isOfficial: true,
      existingScore: scoreVal,
      existingMember: existing || null
    });
  });

  // 2. Any additional custom members in members.value
  members.value.forEach(m => {
    const lower = m.name.toLowerCase().trim();
    if (!addedNames.has(lower)) {
      addedNames.add(lower);
      const scoreVal = m.scores && m.scores[currentEvtId] !== undefined ? Number(m.scores[currentEvtId]) : 0;
      list.push({
        id: m.id,
        name: m.name,
        rank: m.rank,
        role: m.role || 'Membro do Clã',
        isOfficial: false,
        existingScore: scoreVal,
        existingMember: m
      });
    }
  });

  return list;
});

// Filtered members for the search dropdown
const filteredSelectorMembers = computed(() => {
  const query = memberSearchQuery.value.toLowerCase().trim();
  if (!query) {
    return selectorMemberList.value;
  }
  return selectorMemberList.value.filter(m => {
    return m.name.toLowerCase().includes(query) ||
           (m.rank && m.rank.toLowerCase().includes(query)) ||
           (m.role && m.role.toLowerCase().includes(query));
  });
});

// Handler when a member is selected from the dropdown
const selectMemberFromList = (m) => {
  const currentEvtId = activeEventId.value;
  const existing = members.value.find(item => item.id === m.id || item.name.toLowerCase().trim() === m.name.toLowerCase().trim());

  const currentScore = existing && existing.scores && existing.scores[currentEvtId] !== undefined
    ? Number(existing.scores[currentEvtId])
    : (m.existingScore || 0);

  memberForm.value = {
    id: existing ? existing.id : m.id,
    name: m.name,
    rank: existing?.rank || m.rank || 'G6',
    role: existing?.role || m.role || 'Membro do Clã',
    score: currentScore,
    notes: existing?.notes || ''
  };

  editingMember.value = existing || null;
  isCustomMemberMode.value = false;
  isMemberDropdownOpen.value = false;
  memberSearchQuery.value = '';
};

// Clear member selection to choose another
const clearSelectedMember = () => {
  memberForm.value.name = '';
  memberForm.value.id = null;
  editingMember.value = null;
  isMemberDropdownOpen.value = true;
  memberSearchQuery.value = '';
};

// Toggle between selecting from list and creating a new custom member
const toggleCustomMemberMode = () => {
  isCustomMemberMode.value = !isCustomMemberMode.value;
  isMemberDropdownOpen.value = false;
  if (isCustomMemberMode.value) {
    memberForm.value.id = null;
    editingMember.value = null;
    if (memberSearchQuery.value.trim() && !memberForm.value.name) {
      memberForm.value.name = memberSearchQuery.value.trim();
    }
  }
};

const enableCustomMemberMode = (initialName = '') => {
  isCustomMemberMode.value = true;
  isMemberDropdownOpen.value = false;
  memberForm.value.id = null;
  editingMember.value = null;
  if (initialName && typeof initialName === 'string') {
    memberForm.value.name = initialName.trim();
  }
};

// Set score to target max of currently selected rank
const setScoreToRankMax = () => {
  const max = (classificationMaxScores && classificationMaxScores[memberForm.value.rank])
    ? classificationMaxScores[memberForm.value.rank]
    : (activeEvent.value.minTarget || 700000);
  memberForm.value.score = max;
};

// Add / Edit Member Modal
const openAddMemberModal = (member = null) => {
  memberSearchQuery.value = '';
  isMemberDropdownOpen.value = false;

  if (member) {
    editingMember.value = member;
    isCustomMemberMode.value = false;
    memberForm.value = {
      id: member.id,
      name: member.name,
      rank: member.rank || 'G6',
      role: member.role || 'Membro do Clã',
      score: member.currentScore !== undefined ? member.currentScore : (member.scores && member.scores[activeEventId.value] ? member.scores[activeEventId.value] : 0),
      notes: member.notes || ''
    };
  } else {
    editingMember.value = null;
    isCustomMemberMode.value = false;
    memberForm.value = {
      id: null,
      name: '',
      rank: 'G6',
      role: 'Membro do Clã',
      score: 0,
      notes: ''
    };
  }
  showAddModal.value = true;
};

const saveMemberForm = () => {
  const nameTrimmed = memberForm.value.name.trim();
  if (!nameTrimmed) {
    alert('Por favor, informe ou selecione o nome do membro do clã.');
    return;
  }

  const currentEvtId = activeEventId.value;
  const scoreVal = Number(memberForm.value.score) || 0;

  // Check if member already exists in members.value (by id or case-insensitive name)
  let existingIdx = -1;
  if (editingMember.value && editingMember.value.id) {
    existingIdx = members.value.findIndex(m => m.id === editingMember.value.id);
  }
  if (existingIdx === -1 && memberForm.value.id) {
    existingIdx = members.value.findIndex(m => m.id === memberForm.value.id);
  }
  if (existingIdx === -1) {
    existingIdx = members.value.findIndex(m => m.name.toLowerCase().trim() === nameTrimmed.toLowerCase());
  }

  if (existingIdx !== -1) {
    // Update existing member
    members.value[existingIdx].name = nameTrimmed;
    members.value[existingIdx].rank = memberForm.value.rank;
    members.value[existingIdx].role = memberForm.value.role.trim();
    members.value[existingIdx].notes = memberForm.value.notes.trim();
    if (!members.value[existingIdx].scores) members.value[existingIdx].scores = {};
    members.value[existingIdx].scores[currentEvtId] = scoreVal;

    showToast(`Pontuação de ${nameTrimmed} atualizada (${formatNumber(scoreVal)} pts)!`);
  } else {
    // Create new member
    const newId = memberForm.value.id || ('m_' + Date.now());
    const newMember = {
      id: newId,
      name: nameTrimmed,
      rank: memberForm.value.rank,
      role: memberForm.value.role.trim() || 'Membro do Clã',
      scores: {
        [currentEvtId]: scoreVal
      },
      notes: memberForm.value.notes.trim()
    };
    members.value.unshift(newMember);
    showToast(`Membro ${nameTrimmed} adicionado ao clã com sucesso!`);
  }

  saveData();
  showAddModal.value = false;
};

const deleteMember = (member) => {
  if (confirm(`Deseja remover ${member.name} da lista de pontuações do clã?`)) {
    members.value = members.value.filter(m => m.id !== member.id);
    saveData();
    showToast(`Membro ${member.name} removido.`);
  }
};

// Batch Import Parser - Supports both "Pontuação Nome" (ex: 262375 Foli) and "Nome Pontuação" (ex: Foli 262375)
const parseBatchText = () => {
  const text = batchInputText.value.trim();
  if (!text) {
    batchParsePreview.value = [];
    return;
  }

  const lines = text.split('\n');
  const parsed = [];

  lines.forEach(line => {
    let trimmed = line.trim();
    if (!trimmed) return;

    // Strip prefix symbols like E$ or R$ or $ (ex: E$ 2.002.000 -> 2.002.000)
    trimmed = trimmed.replace(/^[A-Za-z]{1,2}\$\s*/i, '').replace(/^\$\s*/, '');

    let rawScoreStr = '';
    let name = '';

    // Formato 1: "<Pontuação> <Nome>" (ex: "262375 Foli", "155.650 Elanin", "26.2M - Foli")
    const matchScoreFirst = trimmed.match(/^([0-9\.,kKmMbB]+)\s*[:=\-\t\s]+\s*([A-Za-z0-9_\[\]\s\-\.\'\"]+)$/);

    // Formato 2: "<Nome> <Pontuação>" (ex: "Foli 262375", "Elanin: 155650")
    const matchNameFirst = trimmed.match(/^([A-Za-z0-9_\[\]\s\-\.\'\"]+?)\s*[:=\-\t\s]+\s*([0-9\.,kKmMbB]+)$/);

    if (matchScoreFirst) {
      rawScoreStr = matchScoreFirst[1].trim();
      name = matchScoreFirst[2].trim();
    } else if (matchNameFirst) {
      name = matchNameFirst[1].trim();
      rawScoreStr = matchNameFirst[2].trim();
    }

    if (name && rawScoreStr) {
      let multiplier = 1;
      let lowerScore = rawScoreStr.toLowerCase();

      if (lowerScore.endsWith('b')) {
        multiplier = 1000000000;
        lowerScore = lowerScore.replace('b', '');
      } else if (lowerScore.endsWith('m')) {
        multiplier = 1000000;
        lowerScore = lowerScore.replace('m', '');
      } else if (lowerScore.endsWith('k')) {
        multiplier = 1000;
        lowerScore = lowerScore.replace('k', '');
      }

      // Limpeza do número
      lowerScore = lowerScore.replace(/\s+/g, '');

      // Se contiver pontos ou vírgulas (ex: 262.375 ou 1.500.000 ou 12,5)
      if (lowerScore.includes('.') || lowerScore.includes(',')) {
        if (/^\d{1,3}([\.,]\d{3})+$/.test(lowerScore)) {
          lowerScore = lowerScore.replace(/[\.,]/g, '');
        } else {
          lowerScore = lowerScore.replace(',', '.');
        }
      }

      const numericScore = Math.round(parseFloat(lowerScore) * multiplier) || 0;

      if (name && !isNaN(numericScore)) {
        parsed.push({ name, score: numericScore });
      }
    }
  });

  batchParsePreview.value = parsed;
};

const applyBatchImport = () => {
  if (batchParsePreview.value.length === 0) {
    alert('Nenhuma pontuação válida detectada no texto. Formato recomendado: 262375 Foli ou Foli 262375');
    return;
  }

  const currentEvtId = activeEventId.value;
  let countUpdated = 0;
  let countAdded = 0;

  batchParsePreview.value.forEach(item => {
    const existing = members.value.find(m => m.name.toLowerCase() === item.name.toLowerCase());
    if (existing) {
      if (!existing.scores) existing.scores = {};
      existing.scores[currentEvtId] = item.score;
      countUpdated++;
    } else {
      members.value.push({
        id: 'm_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4),
        name: item.name,
        rank: 'G',
        role: 'Membro',
        scores: {
          [currentEvtId]: item.score
        },
        notes: 'Importado em lote'
      });
      countAdded++;
    }
  });

  saveData();
  showToast(`Importação concluída! ${countUpdated} atualizados, ${countAdded} novos membros adicionados.`);
  showBatchModal.value = false;
  batchInputText.value = '';
  batchParsePreview.value = [];
};

// Export Scoreboard for Total Battle In-Game Chat / Discord
const formattedChatExport = computed(() => {
  const currentEvt = activeEvent.value;
  const target = currentEvt.minTarget || 10000000;
  const sorted = [...processedMembers.value].sort((a, b) => b.currentScore - a.currentScore);

  let text = `[WLF] Wolf - Placar de Evento: ${currentEvt.name}\n`;
  text += `Meta do Clã: ${formatShortNumber(target)} ${currentEvt.unitName || 'pts'}\n`;
  text += `Total do Clã: ${formatShortNumber(totalClanScore.value)} (${completedCount.value}/${processedMembers.value.length} metas cumpridas)\n\n`;
  text += `--- TOP RANKING DO CLÃ ---\n`;

  const scorersOnly = sorted.filter(m => m.currentScore > 0);
  scorersOnly.forEach((m, idx) => {
    const rankNum = idx + 1;
    const badge = m.isCompleted ? '[META OK]' : '[PENDENTE]';
    text += `${rankNum}. ${m.name} (${m.rank}) - ${formatShortNumber(m.currentScore)} ${badge}\n`;
  });

  text += `\nAforça da alcatéia é a união de todos! Ahooo!`;
  return text;
});

const copyChatExport = async () => {
  try {
    await navigator.clipboard.writeText(formattedChatExport.value);
    showToast('Placar copiado para a área de transferência!');
  } catch (err) {
    // Fallback
    const textArea = document.createElement('textarea');
    textArea.value = formattedChatExport.value;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
    showToast('Placar copiado para a área de transferência!');
  }
};

// Export Full Roster of Members
const formattedRosterExport = computed(() => {
  const listToExport = clanRoster.value.length > 0 ? clanRoster.value : members.value;
  return listToExport.map((m, idx) => `${idx + 1}. ${m.name} (${m.rank}) - ${m.role || 'Membro'}`).join('\n');
});

const copyRosterText = async () => {
  try {
    await navigator.clipboard.writeText(formattedRosterExport.value);
    showToast('Lista oficial de membros copiada!');
  } catch (err) {
    const textArea = document.createElement('textarea');
    textArea.value = formattedRosterExport.value;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
    showToast('Lista oficial de membros copiada!');
  }
};

// Export Fragment Reward Distribution directly from Google Sheets
const formattedFragmentsExport = computed(() => {
  const currentEvt = activeEvent.value;
  const totalFrags = Number(totalFragmentsToDistribute.value || 0);
  const sorted = [...processedMembers.value].sort((a, b) => (b.fragmentsAllocated - a.fragmentsAllocated) || (b.currentScore - a.currentScore));

  let text = `[WLF] Wolf - Distribuição de Fragmentos (${currentEvt.name})\n`;
  text += `Total de Fragmentos: ${formatNumber(totalFrags)}\n`;
  text += `Total Distribuído: ${formatNumber(totalDistributedFragments.value)} frag\n`;
  text += `Fonte: Planilha Oficial do Clã\n\n`;
  text += `--- RECOMPENSAS POR GUERREIRO ---\n`;

  let rankNum = 1;
  sorted.forEach((m) => {
    if (m.fragmentsAllocated > 0) {
      text += `${rankNum}. ${m.name} (${m.rank}) - ${formatNumber(m.fragmentsAllocated)} frag\n`;
      rankNum++;
    }
  });

  text += `\nA força da alcatéia é a união de todos! Ahooo!`;
  return text;
});

const copyFragmentsText = async () => {
  try {
    await navigator.clipboard.writeText(formattedFragmentsExport.value);
    showToast('Distribuição de fragmentos copiada!');
  } catch (err) {
    const textArea = document.createElement('textarea');
    textArea.value = formattedFragmentsExport.value;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
    showToast('Distribuição de fragmentos copiada!');
  }
};
</script>

<template>
  <div class="pt-24 min-h-screen bg-[#030508] pb-24 font-sans text-slate-300">

    <!-- Toast Notification -->
    <Transition name="fade">
      <div v-if="toastMessage" class="fixed bottom-6 right-6 z-50 bg-blue-600 text-white font-bold px-6 py-3 rounded-lg shadow-2xl border border-blue-400 flex items-center gap-3">
        <i class="fas fa-check-circle text-xl text-blue-200"></i>
        <span>{{ toastMessage }}</span>
      </div>
    </Transition>

    <!-- Header Section -->
    <header class="text-center py-14 px-6 bg-gradient-to-b from-[#0a0f1a] to-transparent border-b border-slate-800/50 relative overflow-hidden">
      <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/10 via-transparent to-transparent pointer-events-none"></div>
      <div class="relative z-10 max-w-4xl mx-auto">
        <div class="inline-flex items-center justify-center p-3 bg-blue-900/30 border border-blue-500/30 rounded-full mb-4 text-blue-400">
          <i class="fas fa-trophy text-3xl"></i>
        </div>
        <h1 class="text-3xl md:text-5xl font-medieval text-slate-100 mb-3 tracking-wider uppercase drop-shadow-md">
          Portal de <span class="text-blue-400 font-light">Eventos do Clã</span>
        </h1>
        <p class="text-slate-400 text-sm md:text-base max-w-2xl mx-auto italic">
          Acompanhamento individual e coletivo da pontuação dos guerreiros da alcatéia em <strong class="text-slate-200">Olímpia</strong>, <strong class="text-slate-200">Sinais Sombrios</strong>, <strong class="text-slate-200">Ragnarök</strong> e torneios do Total Battle.
        </p>
      </div>
    </header>

    <main class="max-w-7xl mx-auto px-4 md:px-6 mt-8 space-y-8">

      <!-- 0. GOOGLE SHEETS LIVE SYNC BANNER -->
      <section class="bg-gradient-to-r from-emerald-950/40 via-[#0b101a] to-blue-950/40 border border-emerald-500/30 rounded-xl p-4 shadow-xl backdrop-blur-md">
        <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          
          <!-- Status & Info -->
          <div class="flex items-center gap-3.5">
            <div class="w-11 h-11 rounded-lg bg-emerald-500/15 border border-emerald-500/40 flex items-center justify-center text-emerald-400 text-2xl shrink-0 shadow-[0_0_12px_rgba(16,185,129,0.25)]">
              <i class="fas fa-file-excel"></i>
            </div>
            <div>
              <div class="flex items-center gap-2 flex-wrap">
                <span class="inline-block w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <h3 class="text-sm font-bold text-slate-100 uppercase tracking-wider">
                  Sincronização em Tempo Real (Google Sheets)
                </h3>
                <span class="text-[10px] font-bold uppercase bg-emerald-950 text-emerald-300 border border-emerald-500/40 px-2 py-0.5 rounded shadow-sm">
                  Nuvem Conectada
                </span>
              </div>
              <p class="text-xs text-slate-400 mt-1">
                Planilha: <strong class="text-slate-200">Shadow Points</strong>
                <span v-if="lastSyncTime" class="text-slate-500 ml-1.5">• Sincronizado às {{ lastSyncTime }}</span>
                <span v-if="sheetSyncStats.darkOmens || sheetSyncStats.olympus" class="text-emerald-400/90 ml-1.5 hidden sm:inline">
                  ({{ sheetSyncStats.darkOmens }} Dark Omens, {{ sheetSyncStats.olympus }} Olympus)
                </span>
              </p>
            </div>
          </div>

          <!-- Controls: Cycle Dropdown, Sync Button & Sheet Link -->
          <div class="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
            
            <!-- Seletor de Ciclo / Mês -->
            <select 
              v-model="selectedSheetGid" 
              @change="syncWithGoogleSheet()" 
              class="bg-[#0a0f1a] border border-slate-700 hover:border-emerald-500/50 rounded-lg px-3 py-2 text-xs text-slate-200 outline-none transition font-medium focus:border-emerald-500"
            >
              <option v-for="cycle in googleSheetCycles" :key="cycle.id" :value="cycle.id">
                {{ cycle.label }}
              </option>
            </select>

            <!-- Botão Sincronizar Agora -->
            <button 
              @click="syncWithGoogleSheet()" 
              :disabled="isSyncingSheet" 
              class="bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-800 disabled:text-slate-500 text-white px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition flex items-center gap-2 shadow-[0_0_12px_rgba(16,185,129,0.25)] shrink-0"
            >
              <i class="fas fa-rotate" :class="{ 'fa-spin text-emerald-200': isSyncingSheet }"></i>
              <span>{{ isSyncingSheet ? 'Sincronizando...' : 'Sincronizar Planilha' }}</span>
            </button>

            <!-- Link Externo para a Planilha -->
            <a 
              href="https://docs.google.com/spreadsheets/d/e/2PACX-1vTttvtKwnytCfRbJFeFOeaYDv7z3jJXbEE3alubUU-NExh02zV4fitXcaYj-XOhUp9tMnkgEMeEs1mz/pubhtml" 
              target="_blank" 
              rel="noopener noreferrer" 
              class="text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white px-3 py-2 rounded-lg transition border border-slate-700 flex items-center gap-1.5 shrink-0"
              title="Abrir Planilha Oficial no Google Drive"
            >
              <i class="fas fa-arrow-up-right-from-square text-[10px]"></i>
              <span class="hidden lg:inline">Ver Planilha</span>
            </a>

          </div>

        </div>
      </section>

      <!-- 1. EVENT SELECTOR TABS -->
      <section class="bg-[#0b101a]/90 border border-slate-800 rounded-xl p-3 md:p-4 backdrop-blur-md shadow-xl">
        <div class="flex items-center justify-between mb-3 px-2">
          <span class="text-xs font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2">
            <i class="fas fa-calendar-star text-blue-400"></i> Selecionar Evento Ativo
          </span>
          <span class="text-xs text-slate-500">
            Evento Selecionado: <strong class="text-blue-400">{{ activeEvent.name }}</strong>
          </span>
        </div>

        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          <button 
            v-for="evt in events" 
            :key="evt.id"
            @click="activeEventId = evt.id"
            class="flex flex-col items-center justify-center p-3 rounded-lg border transition-all duration-300 relative group overflow-hidden"
            :class="[
              activeEventId === evt.id 
                ? 'bg-slate-800/90 border-blue-500 text-white shadow-[0_0_15px_rgba(59,130,246,0.3)] ring-1 ring-blue-400' 
                : 'bg-[#0a0f1a]/70 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200 hover:bg-slate-800/40'
            ]"
          >
            <i :class="['fas', evt.icon, 'text-2xl mb-2 transition-transform duration-300 group-hover:scale-110', activeEventId === evt.id ? 'text-blue-400' : 'text-slate-500']"></i>
            <span class="font-bold text-xs uppercase tracking-wide text-center leading-tight">
              {{ evt.name.split(' (')[0] }}
            </span>
            <span class="text-[10px] text-slate-500 mt-1">
              Meta: {{ formatShortNumber(evt.minTarget) }}
            </span>
          </button>
        </div>
      </section>

      <!-- 2. AGGREGATE STATS & EVENT METRICS CARDS -->
      <section class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <!-- Total Score -->
        <div class="bg-[#0b101a]/80 border border-slate-700/50 p-5 rounded-xl flex items-center gap-4 relative overflow-hidden shadow-lg">
          <div class="w-12 h-12 rounded-lg bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 text-2xl shrink-0">
            <i class="fas fa-chart-line"></i>
          </div>
          <div>
            <p class="text-xs font-bold uppercase tracking-wider text-slate-400">Pontuação Total</p>
            <p class="text-2xl font-bold text-slate-100 tracking-tight">{{ formatShortNumber(totalClanScore) }}</p>
            <p class="text-[11px] text-slate-500">{{ formatNumber(totalClanScore) }} {{ activeEvent.unitName }}</p>
          </div>
        </div>

        <!-- Meta Cumprida -->
        <div class="bg-[#0b101a]/80 border border-slate-700/50 p-5 rounded-xl flex items-center gap-4 relative overflow-hidden shadow-lg">
          <div class="w-12 h-12 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 text-2xl shrink-0">
            <i class="fas fa-check-circle"></i>
          </div>
          <div class="flex-grow">
            <div class="flex justify-between items-baseline">
              <p class="text-xs font-bold uppercase tracking-wider text-slate-400">Metas Atingidas</p>
              <span class="text-xs font-bold text-emerald-400">{{ completedPercentage }}%</span>
            </div>
            <p class="text-2xl font-bold text-slate-100 tracking-tight">{{ completedCount }} / {{ processedMembers.length }}</p>
            <div class="w-full bg-slate-800 h-1.5 rounded-full mt-1.5 overflow-hidden">
              <div class="bg-emerald-500 h-full transition-all duration-500" :style="{ width: completedPercentage + '%' }"></div>
            </div>
          </div>
        </div>

        <!-- Média do Clã -->
        <div class="bg-[#0b101a]/80 border border-slate-700/50 p-5 rounded-xl flex items-center gap-4 relative overflow-hidden shadow-lg">
          <div class="w-12 h-12 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 text-2xl shrink-0">
            <i class="fas fa-calculator"></i>
          </div>
          <div>
            <p class="text-xs font-bold uppercase tracking-wider text-slate-400">Média por Membro</p>
            <p class="text-2xl font-bold text-slate-100 tracking-tight">{{ formatShortNumber(averageMemberScore) }}</p>
            <p class="text-[11px] text-slate-500">Média individual atual</p>
          </div>
        </div>

        <!-- Top Scorer MVP -->
        <div class="bg-[#0b101a]/80 border border-amber-500/30 p-5 rounded-xl flex items-center gap-4 relative overflow-hidden shadow-lg bg-gradient-to-r from-amber-950/20 to-transparent">
          <div class="w-12 h-12 rounded-lg bg-amber-500/20 border border-amber-500/50 flex items-center justify-center text-amber-400 text-2xl shrink-0 shadow-[0_0_10px_rgba(245,158,11,0.3)]">
            <i class="fas fa-crown"></i>
          </div>
          <div class="overflow-hidden">
            <p class="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1">
              <span>MVP do Evento</span> 🥇
            </p>
            <p class="text-xl font-bold text-slate-100 truncate">{{ topScorer ? topScorer.name : 'Nenhum' }}</p>
            <p class="text-xs text-amber-300 font-semibold truncate">
              {{ topScorer ? formatShortNumber(topScorer.currentScore) + ' ' + (activeEvent.unitName || 'pts') : '-' }}
            </p>
          </div>
        </div>

      </section>

      <!-- 3. EVENT DETAILS & RULES BANNER -->
      <section class="bg-[#0b101a]/80 border border-slate-700/50 rounded-xl p-6 shadow-xl backdrop-blur-sm relative overflow-hidden">
        <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-800 pb-4 mb-4">
          <div class="flex items-center gap-3">
            <i :class="['fas', activeEvent.icon, 'text-3xl text-blue-400']"></i>
            <div>
              <h2 class="text-xl font-bold text-slate-100 uppercase tracking-wider">{{ activeEvent.name }}</h2>
              <p class="text-xs text-slate-400">Meta individual mínima exigida: <span class="text-blue-400 font-bold">{{ formatNumber(activeEvent.minTarget) }} {{ activeEvent.unitName }}</span></p>
            </div>
          </div>
          <div class="flex flex-wrap items-center gap-2">
            <button @click="showExportModal = true" class="bg-blue-600/20 border border-blue-500/40 hover:bg-blue-600 text-blue-300 hover:text-white px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition flex items-center gap-2 shadow-[0_0_10px_rgba(59,130,246,0.15)]">
              <i class="fas fa-share-nodes"></i> Exportar Placar para Chat
            </button>
          </div>
        </div>

        <p class="text-sm text-slate-300 leading-relaxed mb-4">
          {{ activeEvent.desc }}
        </p>

        <!-- Cronograma Diário de Missões -->
        <div v-if="activeEvent.dailyMissions && activeEvent.dailyMissions.length" class="mb-4 bg-[#0a0f1a]/90 border border-amber-500/30 rounded-xl p-4 shadow-inner">
          <div class="flex justify-between items-center mb-3">
            <h4 class="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-2">
              <i class="fas fa-calendar-week text-amber-400"></i> Cronograma Diário de Missões ({{ activeEvent.dailyMissions.reduce((acc, m) => acc + (parseInt(m.count) || 0), 0) }} Missões Totais):
            </h4>
            <span class="text-[11px] text-slate-400 font-mono bg-slate-800 px-2 py-0.5 rounded border border-slate-700">
              {{ activeEvent.dailyMissions.length }} Dias de Evento
            </span>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            <div 
              v-for="dm in activeEvent.dailyMissions" 
              :key="activeEvent.id + '_dia_' + dm.day" 
              class="bg-slate-900/90 border border-slate-800 rounded-lg p-3 flex flex-col justify-between hover:border-amber-500/50 transition duration-200 group relative overflow-hidden"
            >
              <div class="flex items-center justify-between mb-2">
                <span class="text-[10px] font-bold uppercase tracking-wider bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded border border-amber-500/30">Dia {{ dm.day }}</span>
                <i :class="['fas', dm.icon || 'fa-tasks', dm.color || 'text-amber-400', 'text-base group-hover:scale-110 transition-transform']"></i>
              </div>
              <p class="text-xs font-bold text-slate-200 mb-2 leading-snug">{{ dm.name }}</p>
              <div class="mt-auto pt-2 border-t border-slate-800/80 flex items-center justify-between">
                <span class="text-[11px] font-bold text-amber-400 font-mono flex items-center gap-1">
                  <i class="fas fa-check-double text-[9px]"></i> {{ dm.count }}
                </span>
                <span class="text-[9px] uppercase font-bold text-slate-500">Obrigatório</span>
              </div>
            </div>
          </div>
        </div>

        <div v-if="activeEvent.tips && activeEvent.tips.length" class="bg-slate-900/60 border border-slate-800 rounded-lg p-4">
          <h4 class="text-xs font-bold uppercase tracking-wider text-blue-400 mb-2 flex items-center gap-2">
            <i class="fas fa-lightbulb"></i> Diretrizes Táticas da Alcatéia:
          </h4>
          <ul class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 text-xs text-slate-300">
            <li v-for="(tip, idx) in activeEvent.tips" :key="idx" class="flex items-start gap-2">
              <span class="bg-blue-500/20 text-blue-400 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">{{ idx + 1 }}</span>
              <span class="leading-snug">{{ tip }}</span>
            </li>
          </ul>
        </div>
      </section>

      <!-- 4. CONTROLS, SEARCH & ACTIONS BAR -->
      <section class="bg-[#0b101a]/90 border border-slate-800 rounded-xl p-4 shadow-lg space-y-4">
        <div class="flex flex-col lg:flex-row justify-between gap-4">
          
          <!-- Search Input -->
          <div class="relative flex-grow max-w-md">
            <i class="fas fa-search absolute left-3 top-3 text-slate-500 text-sm"></i>
            <input 
              v-model="searchQuery" 
              type="text" 
              placeholder="Buscar membro por nome ou notas..." 
              class="w-full bg-[#0a0f1a] border border-slate-700 rounded-lg pl-9 pr-4 py-2 text-sm text-slate-200 focus:border-blue-500 outline-none transition"
            >
          </div>

          <!-- Filters & View Toggle -->
          <div class="flex flex-wrap items-center gap-3">
            
            <!-- Filter by Classification (G - G9) -->
            <select v-model="rankFilter" class="bg-[#0a0f1a] border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-200 focus:border-blue-500 outline-none">
              <option value="ALL">Todas as Classificações (G - G9)</option>
              <option value="G9">G9 (Guarda 9)</option>
              <option value="G8">G8 (Guarda 8)</option>
              <option value="G7">G7 (Guarda 7)</option>
              <option value="G6">G6 (Guarda 6)</option>
              <option value="G5">G5 (Guarda 5)</option>
              <option value="G4">G4 (Guarda 4)</option>
              <option value="G3">G3 (Guarda 3)</option>
              <option value="G2">G2 (Guarda 2)</option>
              <option value="G">G (Guarda 1)</option>
            </select>

            <!-- Filter by Status -->
            <select v-model="statusFilter" class="bg-[#0a0f1a] border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-200 focus:border-blue-500 outline-none">
              <option value="ALL">Todos os Status</option>
              <option value="COMPLETED">Meta Atingida (≥ 100%)</option>
              <option value="PENDING">Pendente (Pontuou < 100%)</option>
              <option value="ZERO">Sem Pontuação (Pontuação = 0)</option>
            </select>

            <!-- Sort By -->
            <select v-model="sortBy" class="bg-[#0a0f1a] border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-200 focus:border-blue-500 outline-none">
              <option value="score_desc">Maior Pontuação</option>
              <option value="score_asc">Menor Pontuação</option>
              <option value="rank">Por Classificação (G9 -> G)</option>
              <option value="name">Nome (A-Z)</option>
            </select>

            <!-- Toggle Ocultar Pontuação 0 -->
            <button 
              @click="hideZeroScores = !hideZeroScores" 
              type="button"
              class="px-3 py-2 rounded-lg text-xs font-semibold border transition flex items-center gap-1.5 select-none"
              :class="hideZeroScores 
                ? 'bg-blue-600/20 border-blue-500/60 text-blue-300 shadow-[0_0_8px_rgba(59,130,246,0.2)]' 
                : 'bg-[#0a0f1a] border-slate-700 text-slate-400 hover:text-slate-200'"
              :title="hideZeroScores ? 'Clique para exibir também membros com pontuação 0' : 'Clique para ocultar membros com pontuação 0'"
            >
              <i :class="hideZeroScores ? 'fas fa-eye-slash text-blue-400' : 'fas fa-eye text-slate-500'"></i>
              <span>{{ hideZeroScores ? 'Apenas com Pontuação' : 'Exibir Todos (incl. 0)' }}</span>
            </button>

            <!-- View Mode Switch -->
            <div class="bg-[#0a0f1a] border border-slate-700 rounded-lg p-1 flex gap-1">
              <button 
                @click="viewMode = 'table'" 
                class="px-2.5 py-1 rounded text-xs transition"
                :class="viewMode === 'table' ? 'bg-blue-600 text-white font-bold' : 'text-slate-400 hover:text-slate-200'"
                title="Tabela Detalhada"
              >
                <i class="fas fa-list"></i>
              </button>
              <button 
                @click="viewMode = 'card'" 
                class="px-2.5 py-1 rounded text-xs transition"
                :class="viewMode === 'card' ? 'bg-blue-600 text-white font-bold' : 'text-slate-400 hover:text-slate-200'"
                title="Visual em Cards"
              >
                <i class="fas fa-th-large"></i>
              </button>
            </div>

          </div>
        </div>

        <!-- Action Buttons Bar -->
        <div class="flex flex-wrap items-center justify-between gap-3 border-t border-slate-800 pt-3">
          <div class="flex flex-wrap items-center gap-2">
            <button @click="openAddMemberModal()" class="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition flex items-center gap-2 shadow-[0_0_10px_rgba(59,130,246,0.2)]">
              <i class="fas fa-user-plus"></i> + Adicionar Pontuação / Membro
            </button>
            <button @click="showBatchModal = true" class="bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-600 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition flex items-center gap-2">
              <i class="fas fa-file-import"></i> Importação em Lote
            </button>
            <button @click="showRosterModal = true" class="bg-[#0a0f1a] border border-blue-500/40 text-blue-300 hover:bg-blue-600 hover:text-white px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition flex items-center gap-2 shadow-[0_0_10px_rgba(59,130,246,0.15)]">
              <i class="fas fa-users"></i> Membros ({{ clanRoster.length || members.length }})
            </button>
            <button @click="showFragmentsModal = true" class="bg-amber-600/20 border border-amber-500/50 text-amber-300 hover:bg-amber-600 hover:text-slate-900 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition flex items-center gap-2 shadow-[0_0_10px_rgba(245,158,11,0.2)]">
              <i class="fas fa-gem"></i> Fragmentos da Planilha
            </button>
          </div>

          <button @click="resetToDefaults()" class="text-slate-500 hover:text-red-400 text-xs transition flex items-center gap-1">
            <i class="fas fa-rotate-left"></i> Restaurar Padrão
          </button>
        </div>
      </section>

      <!-- 5. SCOREBOARD DISPLAY (TABLE OR CARDS) -->
      <div class="flex flex-wrap justify-between items-center gap-2 px-1 text-xs">
        <div class="text-slate-400 flex items-center gap-2">
          <span>
            Exibindo <strong class="text-blue-400 font-mono">{{ filteredMembers.length }}</strong> guerreiro(s) na lista
          </span>
          <span v-if="hideZeroScores && zeroScorersCount > 0" class="text-slate-500 text-[11px] bg-[#0a0f1a] px-2 py-0.5 rounded border border-slate-800">
            <i class="fas fa-info-circle mr-1 text-slate-400"></i>{{ zeroScorersCount }} com pontuação 0 ocultados da lista
          </span>
        </div>
      </div>

      <!-- TABLE VIEW -->
      <div v-if="viewMode === 'table'" class="bg-[#0b101a]/90 border border-slate-800 rounded-xl overflow-hidden shadow-2xl">
        <div class="overflow-x-auto">
          <table class="w-full text-left text-sm border-collapse">
            <thead>
              <tr class="bg-[#0a0f1a] border-b border-slate-800 text-xs uppercase tracking-wider text-slate-400 font-bold">
                <th class="py-4 px-4 w-16 text-center">Pos</th>
                <th class="py-4 px-4">Guerreiro do Clã</th>
                <th class="py-4 px-4 text-center">Classificação</th>
                <th class="py-4 px-4 text-right">Pontuação</th>
                <th class="py-4 px-4 text-right font-bold text-amber-400">Fragmentos</th>
                <!-- <th class="py-4 px-4 w-40">Progresso da Meta</th> -->
                <!-- <th class="py-4 px-4 text-center">Status</th> -->
                <th class="py-4 px-4 text-right">Ações</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-800/60">
              <tr 
                v-for="(m, idx) in filteredMembers" 
                :key="m.id"
                class="hover:bg-slate-800/40 transition duration-150 group"
                :class="[
                  idx === 0 ? 'bg-amber-950/10' : idx === 1 ? 'bg-slate-800/20' : idx === 2 ? 'bg-orange-950/10' : ''
                ]"
              >
                <!-- Pos Badge -->
                <td class="py-3 px-4 text-center font-bold">
                  <span v-if="idx === 0" class="inline-flex items-center justify-center w-7 h-7 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/40 shadow-[0_0_8px_rgba(245,158,11,0.3)]">🥇</span>
                  <span v-else-if="idx === 1" class="inline-flex items-center justify-center w-7 h-7 rounded-full bg-slate-400/20 text-slate-300 border border-slate-400/40">🥈</span>
                  <span v-else-if="idx === 2" class="inline-flex items-center justify-center w-7 h-7 rounded-full bg-amber-700/20 text-amber-500 border border-amber-700/40">🥉</span>
                  <span v-else class="text-slate-500 text-xs">#{{ idx + 1 }}</span>
                </td>

                <!-- Member Name & Role -->
                <td class="py-3 px-4">
                  <div class="font-bold text-slate-100 flex items-center gap-2">
                    <span>{{ m.name }}</span>
                    <span v-if="m.notes" class="text-[11px] font-normal text-slate-500 italic">({{ m.notes }})</span>
                  </div>
                  <div class="text-[11px] text-slate-500">{{ m.role || 'Membro do Clã' }}</div>
                </td>

                <!-- Classificação Tag -->
                <td class="py-3 px-4 text-center">
                  <span 
                    class="px-2.5 py-0.5 rounded text-[11px] font-mono border"
                    :class="getRankBadgeClass(m.rank)"
                  >
                    {{ m.rank }}
                  </span>
                </td>

                <!-- Score -->
                <td class="py-3 px-4 text-right font-mono font-bold text-slate-100">
                  {{ formatNumber(m.currentScore) }}
                </td>

                <!-- Fragment Allocation (Direto da Planilha) -->
                <td class="py-3 px-4 text-right font-mono">
                  <div v-if="m.fragmentsPending" class="text-xs text-slate-500 italic">Pendente</div>
                  <div v-else class="font-bold text-amber-300 text-xs">{{ formatNumber(m.fragmentsAllocated) }} frag</div>
                  <div v-if="m.sharePctStr && !m.fragmentsPending" class="text-[10px] text-slate-500">{{ m.sharePctStr }}</div>
                </td>

                <!-- Progress Bar -->
                <!-- <td class="py-3 px-4">
                  <div class="space-y-1">
                    <div class="flex justify-between text-[11px]">
                      <span class="text-slate-400 font-mono">{{ m.progressPct }}%</span>
                      <span class="text-slate-500 text-[10px]">{{ formatShortNumber(m.currentScore) }} / {{ formatShortNumber(activeEvent.minTarget) }}</span>
                    </div>
                    <div class="w-full bg-slate-900 h-2 rounded-full overflow-hidden border border-slate-800">
                      <div 
                        class="h-full transition-all duration-500"
                        :class="[
                          m.isCompleted ? 'bg-gradient-to-r from-emerald-500 to-teal-400' : 'bg-gradient-to-r from-blue-600 to-indigo-500'
                        ]"
                        :style="{ width: Math.min(m.progressPct, 100) + '%' }"
                      ></div>
                    </div>
                  </div>
                </td> -->

                <!-- Status Badge -->
                <!-- <td class="py-3 px-4 text-center">
                  <span 
                    v-if="m.isCompleted" 
                    class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"
                  >
                    <i class="fas fa-check text-[10px]"></i> Meta OK
                  </span>
                  <span 
                    v-else 
                    class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/30"
                  >
                    <i class="fas fa-hourglass-half text-[10px]"></i> Pendente
                  </span>
                </td> -->

                <!-- Actions -->
                <td class="py-3 px-4 text-right">
                  <div class="flex justify-end gap-2">
                    <button v-if="activeEvent.dailyMissions" @click="openMissionCalcModal(m)" class="text-amber-400 hover:text-amber-300 p-1 transition" title="Calcular Missões Diárias">
                      <i class="fas fa-calculator"></i>
                    </button>
                    <button @click="openAddMemberModal(m)" class="text-slate-400 hover:text-blue-400 p-1 transition" title="Editar Pontuação">
                      <i class="fas fa-edit"></i>
                    </button>
                    <button @click="deleteMember(m)" class="text-slate-500 hover:text-red-400 p-1 transition" title="Excluir">
                      <i class="fas fa-trash-alt"></i>
                    </button>
                  </div>
                </td>
              </tr>

              <tr v-if="filteredMembers.length === 0">
                <td colspan="8" class="py-12 text-center text-slate-500">
                  <i class="fas fa-user-slash text-3xl mb-2 block"></i>
                  Nenhum guerreiro com pontuação encontrado com os filtros selecionados.
                  <div v-if="hideZeroScores && zeroScorersCount > 0" class="mt-2">
                    <button @click="hideZeroScores = false" class="text-xs text-blue-400 hover:underline">
                      Exibir os {{ zeroScorersCount }} membros com pontuação 0
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- CARD VIEW -->
      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div 
          v-for="(m, idx) in filteredMembers" 
          :key="m.id"
          class="bg-[#0b101a]/90 border rounded-xl p-5 shadow-xl backdrop-blur-md relative flex flex-col justify-between transition-all duration-300 hover:border-blue-500/60"
          :class="[
            idx === 0 ? 'border-amber-500/50 bg-gradient-to-b from-amber-950/20 to-[#0b101a]' :
            m.isCompleted ? 'border-emerald-500/30' : 'border-slate-800'
          ]"
        >
          <!-- Top Row Header -->
          <div class="flex justify-between items-start gap-2 mb-3">
            <div class="flex items-center gap-2">
              <span v-if="idx === 0" class="text-xl">🥇</span>
              <span v-else-if="idx === 1" class="text-xl">🥈</span>
              <span v-else-if="idx === 2" class="text-xl">🥉</span>
              <span v-else class="text-xs font-bold text-slate-500">#{{ idx + 1 }}</span>
              <div>
                <h3 class="font-bold text-slate-100 text-base leading-tight">{{ m.name }}</h3>
                <span class="text-xs text-slate-500">{{ m.role || 'Membro do Clã' }}</span>
              </div>
            </div>

            <span 
              class="px-2.5 py-0.5 rounded text-[10px] font-mono border"
              :class="getRankBadgeClass(m.rank)"
            >
              {{ m.rank }}
            </span>
          </div>

          <!-- Score Card Body -->
          <div class="bg-[#0a0f1a] p-3 rounded-lg border border-slate-800/80 mb-3 space-y-2">
            <div class="flex justify-between items-baseline">
              <span class="text-xs text-slate-400 uppercase font-bold tracking-wider">Pontuação</span>
              <span class="text-lg font-mono font-bold text-slate-100">{{ formatNumber(m.currentScore) }}</span>
            </div>

            <!-- Fragment Allocation Badge -->
            <div class="flex justify-between items-baseline pt-1 border-t border-slate-800/60">
              <span class="text-[11px] text-amber-400 font-bold flex items-center gap-1">
                <i class="fas fa-gem"></i> Fragmentos:
              </span>
              <span v-if="m.fragmentsPending" class="text-xs text-slate-500 italic">Pendente</span>
              <span v-else class="text-xs font-mono font-bold text-amber-300">{{ formatNumber(m.fragmentsAllocated) }} <span class="text-[10px] text-slate-500 font-normal">({{ m.sharePctStr }})</span></span>
            </div>

            <!-- Progress Bar -->
            <!-- <div class="space-y-1">
              <div class="flex justify-between text-[11px]">
                <span class="text-slate-400">Progresso Meta</span>
                <span class="font-bold text-blue-400">{{ m.progressPct }}%</span>
              </div>
              <div class="w-full bg-slate-900 h-2 rounded-full overflow-hidden border border-slate-800">
                <div 
                  class="h-full transition-all duration-500"
                  :class="[m.isCompleted ? 'bg-emerald-500' : 'bg-blue-500']"
                  :style="{ width: Math.min(m.progressPct, 100) + '%' }"
                ></div>
              </div>
            </div> -->
          </div>

          <!-- Card Footer -->
          <!-- <div class="flex justify-between items-center text-xs pt-2 border-t border-slate-800">
            <span v-if="m.isCompleted" class="text-emerald-400 font-bold flex items-center gap-1">
              <i class="fas fa-check-circle"></i> Meta Atingida
            </span>
            <span v-else class="text-amber-400 font-bold flex items-center gap-1">
              <i class="fas fa-hourglass-half"></i> Pendente
            </span>

            <div class="flex gap-2">
              <button v-if="activeEvent.dailyMissions" @click="openMissionCalcModal(m)" class="text-amber-400 hover:text-amber-300 p-1" title="Calcular Missões Diárias">
                <i class="fas fa-calculator"></i>
              </button>
              <button @click="openAddMemberModal(m)" class="text-slate-400 hover:text-blue-400 p-1" title="Editar">
                <i class="fas fa-edit"></i>
              </button>
              <button @click="deleteMember(m)" class="text-slate-500 hover:text-red-400 p-1" title="Excluir">
                <i class="fas fa-trash-alt"></i>
              </button>
            </div>
          </div> -->
        </div>
      </div>

    </main>

    <!-- === MODAL 1: ADICIONAR / EDITAR PONTUAÇÃO DE MEMBRO === -->
    <Transition name="fade">
      <div v-if="showAddModal" class="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
        <!-- Overlay para fechar dropdown ao clicar fora -->
        <div v-if="isMemberDropdownOpen" @click="isMemberDropdownOpen = false" class="fixed inset-0 z-10"></div>

        <div class="bg-[#0b101a] border border-slate-700 rounded-xl max-w-lg w-full p-6 shadow-2xl space-y-4 relative z-20">
          <div class="flex justify-between items-center border-b border-slate-800 pb-3">
            <h3 class="text-lg font-bold text-slate-100 uppercase tracking-wider flex items-center gap-2">
              <i class="fas fa-user-edit text-blue-400"></i>
              {{ editingMember ? 'Editar Pontuação de Membro' : 'Adicionar Pontuação / Membro' }}
            </h3>
            <button @click="showAddModal = false" class="text-slate-500 hover:text-slate-200">
              <i class="fas fa-times text-xl"></i>
            </button>
          </div>

          <div class="space-y-4">

            <!-- SELETOR DE MEMBRO / NOVO MEMBRO -->
            <div class="relative">
              <div class="flex items-center justify-between mb-1.5">
                <label class="text-xs font-bold uppercase tracking-wider text-blue-400 flex items-center gap-1.5">
                  <i class="fas fa-user-shield text-blue-400"></i>
                  <span>Guerreiro do Clã</span>
                  <span class="text-[10px] text-slate-500 font-normal lowercase">(clãMembers.js)</span>
                </label>

                <!-- Alternar entre Seletor e Novo Membro -->
                <button 
                  type="button"
                  @click="toggleCustomMemberMode()" 
                  class="text-[11px] font-bold transition flex items-center gap-1.5 px-2.5 py-1 rounded border shadow-sm"
                  :class="isCustomMemberMode 
                    ? 'bg-blue-950/60 border-blue-500/50 text-blue-300 hover:bg-blue-900/60' 
                    : 'bg-emerald-950/50 border-emerald-500/40 text-emerald-300 hover:bg-emerald-900/60'"
                >
                  <i :class="isCustomMemberMode ? 'fas fa-users' : 'fas fa-user-plus'"></i>
                  <span>{{ isCustomMemberMode ? 'Selecionar da Lista Oficial' : '+ Cadastrar Novo Membro' }}</span>
                </button>
              </div>

              <!-- MODO 1: SELETOR DE MEMBROS (clãMembers.js + cadastrados) -->
              <div v-if="!isCustomMemberMode" class="relative">
                
                <!-- Membro Selecionado Box -->
                <div v-if="memberForm.name" class="flex items-center justify-between bg-slate-900/90 border border-blue-500/50 rounded-lg p-2.5 shadow-inner">
                  <div class="flex items-center gap-2.5 min-w-0">
                    <span class="px-2 py-0.5 rounded text-[11px] font-mono border shrink-0" :class="getRankBadgeClass(memberForm.rank)">
                      {{ memberForm.rank }}
                    </span>
                    <div class="truncate">
                      <span class="font-bold text-slate-100 text-sm block truncate">{{ memberForm.name }}</span>
                      <span class="text-[11px] text-slate-400 block truncate">{{ memberForm.role || 'Membro do Clã' }}</span>
                    </div>
                  </div>
                  <div class="flex items-center gap-2 shrink-0">
                    <span v-if="isMemberFromOfficialList(memberForm.name)" class="text-[10px] uppercase font-bold text-blue-400 bg-blue-950/70 border border-blue-500/30 px-2 py-0.5 rounded">
                      Oficial
                    </span>
                    <button 
                      type="button" 
                      @click="clearSelectedMember()" 
                      class="text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white px-2.5 py-1 rounded transition flex items-center gap-1 border border-slate-700" 
                      title="Alterar membro selecionado"
                    >
                      <i class="fas fa-rotate text-[10px]"></i> Trocar
                    </button>
                  </div>
                </div>

                <!-- Input de Busca quando nenhum membro está selecionado -->
                <div v-else class="relative">
                  <div class="relative flex items-center">
                    <i class="fas fa-search absolute left-3 text-slate-500 text-sm pointer-events-none"></i>
                    <input 
                      v-model="memberSearchQuery" 
                      type="text" 
                      @focus="isMemberDropdownOpen = true"
                      @click="isMemberDropdownOpen = true"
                      placeholder="Buscar membro na lista oficial (ex: Foli, Elanin, White Fang)..." 
                      class="w-full bg-[#0a0f1a] border border-slate-700 rounded-lg pl-9 pr-10 py-2.5 text-sm text-slate-100 outline-none focus:border-blue-500 transition"
                    >
                    <button 
                      type="button" 
                      @click="isMemberDropdownOpen = !isMemberDropdownOpen" 
                      class="absolute right-3 text-slate-400 hover:text-slate-200 p-1"
                    >
                      <i :class="isMemberDropdownOpen ? 'fas fa-chevron-up' : 'fas fa-chevron-down'"></i>
                    </button>
                  </div>

                  <!-- Dropdown de Membros -->
                  <div 
                    v-if="isMemberDropdownOpen" 
                    class="absolute left-0 right-0 top-full mt-1.5 z-50 bg-[#0c121e] border border-slate-700 rounded-xl shadow-2xl overflow-hidden max-h-60 flex flex-col"
                  >
                    <!-- Header do Dropdown -->
                    <div class="bg-slate-900/90 px-3 py-2 border-b border-slate-800 flex items-center justify-between text-xs text-slate-400">
                      <span>{{ filteredSelectorMembers.length }} membros disponíveis</span>
                      <button 
                        type="button" 
                        @click="enableCustomMemberMode(memberSearchQuery)" 
                        class="text-emerald-400 hover:text-emerald-300 font-bold flex items-center gap-1 text-[11px]"
                      >
                        <i class="fas fa-plus"></i> Novo Membro
                      </button>
                    </div>

                    <!-- Lista com Scroll -->
                    <div class="overflow-y-auto custom-scrollbar divide-y divide-slate-800/60">
                      <button 
                        type="button"
                        v-for="m in filteredSelectorMembers" 
                        :key="m.id"
                        @click="selectMemberFromList(m)"
                        class="w-full text-left px-3 py-2 hover:bg-blue-900/25 transition flex items-center justify-between group"
                      >
                        <div class="flex items-center gap-2.5 overflow-hidden pr-2">
                          <span class="px-2 py-0.5 rounded text-[10px] font-mono border shrink-0" :class="getRankBadgeClass(m.rank)">
                            {{ m.rank }}
                          </span>
                          <div class="truncate">
                            <span class="font-bold text-slate-200 text-xs group-hover:text-blue-300 transition block truncate">{{ m.name }}</span>
                            <span class="text-[10px] text-slate-400 block truncate">{{ m.role || 'Membro do Clã' }}</span>
                          </div>
                        </div>
                        <div class="text-right shrink-0 text-[11px] font-mono">
                          <span v-if="m.existingScore > 0" class="text-amber-400 font-bold">
                            {{ formatShortNumber(m.existingScore) }} pts
                          </span>
                          <span v-else class="text-slate-600 text-[10px]">
                            0 pts
                          </span>
                        </div>
                      </button>

                      <!-- Se não encontrar correspondência -->
                      <div v-if="filteredSelectorMembers.length === 0" class="p-4 text-center text-xs text-slate-400 space-y-2">
                        <p>Nenhum guerreiro encontrado com "<span class="text-slate-200 font-bold">{{ memberSearchQuery }}</span>".</p>
                        <button 
                          type="button"
                          @click="enableCustomMemberMode(memberSearchQuery)"
                          class="bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-1.5 rounded-lg text-xs font-bold uppercase transition inline-flex items-center gap-1.5 shadow-lg"
                        >
                          <i class="fas fa-user-plus"></i> Adicionar "{{ memberSearchQuery }}" como novo membro
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              <!-- MODO 2: DIGITAR NOVO MEMBRO (quando não está na lista oficial) -->
              <div v-else class="space-y-1">
                <div class="relative">
                  <input 
                    v-model="memberForm.name" 
                    type="text" 
                    placeholder="Digite o nome do novo guerreiro..." 
                    class="w-full bg-[#0a0f1a] border border-emerald-500/50 rounded-lg p-2.5 text-sm text-slate-100 outline-none focus:border-emerald-400 transition"
                  >
                  <span class="absolute right-2.5 top-2.5 text-[10px] font-bold uppercase text-emerald-400 bg-emerald-950/80 border border-emerald-700/50 px-2 py-0.5 rounded">
                    Novo Membro
                  </span>
                </div>
                <p class="text-[11px] text-slate-400">
                  Este jogador não consta em clãMembers.js e será adicionado ao registro do clã.
                </p>
              </div>

            </div>

            <!-- CLASSIFICAÇÃO E CARGO -->
            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="block text-xs font-bold uppercase tracking-wider text-blue-400 mb-1">Classificação (G - G9)</label>
                <select v-model="memberForm.rank" class="w-full bg-[#0a0f1a] border border-slate-700 rounded-lg p-2.5 text-sm text-slate-100 outline-none focus:border-blue-500 font-mono">
                  <option value="G9">G9 (Guarda 9)</option>
                  <option value="G8">G8 (Guarda 8)</option>
                  <option value="G7">G7 (Guarda 7)</option>
                  <option value="G6">G6 (Guarda 6)</option>
                  <option value="G5">G5 (Guarda 5)</option>
                  <option value="G4">G4 (Guarda 4)</option>
                  <option value="G3">G3 (Guarda 3)</option>
                  <option value="G2">G2 (Guarda 2)</option>
                  <option value="G">G (Guarda 1)</option>
                </select>
              </div>

              <div>
                <label class="block text-xs font-bold uppercase tracking-wider text-blue-400 mb-1">Função / Cargo</label>
                <input v-model="memberForm.role" type="text" placeholder="Ex: Oficial Militar" class="w-full bg-[#0a0f1a] border border-slate-700 rounded-lg p-2.5 text-sm text-slate-100 outline-none focus:border-blue-500">
              </div>
            </div>

            <!-- PONTUAÇÃO DO EVENTO ATIVO -->
            <div>
              <div class="flex items-center justify-between mb-1">
                <label class="text-xs font-bold uppercase tracking-wider text-blue-400">
                  Pontuação em {{ activeEvent.name }}
                </label>
                <button 
                  type="button" 
                  @click="setScoreToRankMax()" 
                  class="text-[10px] font-bold text-amber-400 hover:text-amber-300 bg-amber-950/40 border border-amber-500/30 px-2 py-0.5 rounded transition"
                  title="Definir pontuação para a meta máxima deste nível de Guarda"
                >
                  <i class="fas fa-bullseye"></i> Meta 100% ({{ formatShortNumber(classificationMaxScores[memberForm.rank] || activeEvent.minTarget) }})
                </button>
              </div>
              <input v-model.number="memberForm.score" type="number" min="0" placeholder="Ex: 1500000" class="w-full bg-[#0a0f1a] border border-slate-700 rounded-lg p-2.5 text-sm font-mono text-slate-100 outline-none focus:border-blue-500">
              <div class="flex justify-between items-center text-[11px] text-slate-500 mt-1">
                <span>Formatado: <strong class="text-slate-200">{{ formatNumber(memberForm.score || 0) }}</strong> {{ activeEvent.unitName }}</span>
                <span :class="Number(memberForm.score || 0) >= (classificationMaxScores[memberForm.rank] || activeEvent.minTarget) ? 'text-emerald-400 font-bold' : 'text-amber-400'">
                  {{ Number(memberForm.score || 0) >= (classificationMaxScores[memberForm.rank] || activeEvent.minTarget) ? '✓ Meta Atingida' : 'Pendente' }}
                </span>
              </div>
            </div>

            <!-- OBSERVAÇÕES -->
            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-blue-400 mb-1">Observações (Opcional)</label>
              <input v-model="memberForm.notes" type="text" placeholder="Ex: Meta atingida / Destaque de ralis" class="w-full bg-[#0a0f1a] border border-slate-700 rounded-lg p-2.5 text-sm text-slate-100 outline-none focus:border-blue-500">
            </div>
          </div>

          <div class="flex justify-end gap-3 border-t border-slate-800 pt-3">
            <button @click="showAddModal = false" class="px-4 py-2 rounded-lg text-xs font-bold text-slate-400 hover:text-slate-200">
              Cancelar
            </button>
            <button @click="saveMemberForm()" class="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition shadow-[0_0_10px_rgba(59,130,246,0.3)]">
              Salvar Registro
            </button>
          </div>
        </div>
      </div>
    </Transition>

    <!-- === MODAL 2: IMPORTAÇÃO EM LOTE === -->
    <Transition name="fade">
      <div v-if="showBatchModal" class="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
        <div class="bg-[#0b101a] border border-slate-700 rounded-xl max-w-xl w-full p-6 shadow-2xl space-y-4">
          <div class="flex justify-between items-center border-b border-slate-800 pb-3">
            <h3 class="text-lg font-bold text-slate-100 uppercase tracking-wider flex items-center gap-2">
              <i class="fas fa-file-import text-blue-400"></i> Importar Pontuações em Lote
            </h3>
            <button @click="showBatchModal = false" class="text-slate-500 hover:text-slate-200">
              <i class="fas fa-times text-xl"></i>
            </button>
          </div>

          <p class="text-xs text-slate-400">
            Cole as pontuações copiadas do Total Battle ou Discord (uma por linha). Aceita tanto <strong>Pontuação Nome</strong> quanto <strong>Nome Pontuação</strong>.
            <br><span class="text-blue-400 font-bold">Exemplos aceitos:</span> <code>262375 Foli</code> ou <code>155.650 Elanin</code> ou <code>42.5M - White Fang</code> ou <code>FenrirSlayer 44M</code>
          </p>

          <textarea 
            v-model="batchInputText" 
            @input="parseBatchText()" 
            rows="6" 
            placeholder="262375    Foli&#10;155650    Elanin&#10;120000    White Fang&#10;96612    Delalen&#10;93875    Perinn"
            class="w-full bg-[#0a0f1a] border border-slate-700 rounded-lg p-3 text-xs font-mono text-slate-200 outline-none focus:border-blue-500 custom-scrollbar resize-none"
          ></textarea>

          <!-- Parser Preview -->
          <div v-if="batchParsePreview.length > 0" class="bg-slate-900/80 border border-slate-800 rounded-lg p-3 max-h-40 overflow-y-auto custom-scrollbar space-y-1">
            <p class="text-[11px] font-bold uppercase text-emerald-400 mb-2">
              <i class="fas fa-check-circle"></i> {{ batchParsePreview.length }} registros detectados:
            </p>
            <div v-for="(item, idx) in batchParsePreview" :key="idx" class="flex justify-between text-xs font-mono py-0.5 border-b border-slate-800/50">
              <span class="text-slate-300">{{ item.name }}</span>
              <span class="text-blue-400 font-bold">{{ formatNumber(item.score) }} {{ activeEvent.unitName }}</span>
            </div>
          </div>

          <div class="flex justify-end gap-3 border-t border-slate-800 pt-3">
            <button @click="showBatchModal = false" class="px-4 py-2 rounded-lg text-xs font-bold text-slate-400 hover:text-slate-200">
              Cancelar
            </button>
            <button @click="applyBatchImport()" class="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition shadow-[0_0_10px_rgba(59,130,246,0.3)]">
              Aplicar Importação
            </button>
          </div>
        </div>
      </div>
    </Transition>

    <!-- === MODAL 3: EXPORTAR CHAT SUMMARY === -->
    <Transition name="fade">
      <div v-if="showExportModal" class="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
        <div class="bg-[#0b101a] border border-slate-700 rounded-xl max-w-lg w-full p-6 shadow-2xl space-y-4">
          <div class="flex justify-between items-center border-b border-slate-800 pb-3">
            <h3 class="text-lg font-bold text-slate-100 uppercase tracking-wider flex items-center gap-2">
              <i class="fas fa-copy text-blue-400"></i> Resumo para Chat do Jogo
            </h3>
            <button @click="showExportModal = false" class="text-slate-500 hover:text-slate-200">
              <i class="fas fa-times text-xl"></i>
            </button>
          </div>

          <p class="text-xs text-slate-400">
            Resumo formatado em texto simples pronto para ser postado no chat do Total Battle ou no Discord do clã:
          </p>

          <textarea 
            readonly 
            :value="formattedChatExport" 
            rows="10" 
            class="w-full bg-[#0a0f1a] border border-slate-800 rounded-lg p-3 text-xs font-mono text-slate-300 outline-none custom-scrollbar resize-none leading-relaxed"
          ></textarea>

          <div class="flex justify-end gap-3 border-t border-slate-800 pt-3">
            <button @click="showExportModal = false" class="px-4 py-2 rounded-lg text-xs font-bold text-slate-400 hover:text-slate-200">
              Fechar
            </button>
            <button @click="copyChatExport()" class="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition shadow-[0_0_10px_rgba(59,130,246,0.3)] flex items-center gap-2">
              <i class="fas fa-copy"></i> Copiar Mensagem
            </button>
          </div>
        </div>
      </div>
    </Transition>

    <!-- === MODAL 4: LISTA OFICIAL DE MEMBROS DO CLÃ === -->
    <Transition name="fade">
      <div v-if="showRosterModal" class="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
        <div class="bg-[#0b101a] border border-slate-700 rounded-xl max-w-2xl w-full p-6 shadow-2xl space-y-4">
          <div class="flex justify-between items-center border-b border-slate-800 pb-3">
            <div>
              <h3 class="text-lg font-bold text-slate-100 uppercase tracking-wider flex items-center gap-2">
                <i class="fas fa-users text-blue-400"></i> Roster Oficial de Membros do Clã
              </h3>
              <p class="text-xs text-slate-400">Total cadastrado: <strong class="text-blue-400">{{ members.length }}</strong> de 100 membros</p>
            </div>
            <button @click="showRosterModal = false" class="text-slate-500 hover:text-slate-200">
              <i class="fas fa-times text-xl"></i>
            </button>
          </div>

          <!-- Roster Search -->
          <div class="relative">
            <i class="fas fa-search absolute left-3 top-3 text-slate-500 text-sm"></i>
            <input 
              v-model="rosterSearchQuery" 
              type="text" 
              placeholder="Filtrar membro na lista oficial..." 
              class="w-full bg-[#0a0f1a] border border-slate-700 rounded-lg pl-9 pr-4 py-2 text-xs text-slate-200 focus:border-blue-500 outline-none"
            >
          </div>

          <!-- Roster Grid -->
          <div class="bg-[#0a0f1a] border border-slate-800 rounded-lg p-3 max-h-80 overflow-y-auto custom-scrollbar grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div 
              v-for="(m, idx) in members.filter(item => !rosterSearchQuery || item.name.toLowerCase().includes(rosterSearchQuery.toLowerCase()))" 
              :key="m.id"
              class="flex items-center justify-between bg-slate-900/60 border border-slate-800/80 p-2 rounded text-xs"
            >
              <div class="flex items-center gap-2 overflow-hidden pr-2">
                <span class="text-slate-500 font-mono text-[10px] w-6">#{{ idx + 1 }}</span>
                <span class="font-bold text-slate-200 truncate">{{ m.name }}</span>
              </div>
              <span class="px-2 py-0.5 rounded text-[10px] font-mono border shrink-0" :class="getRankBadgeClass(m.rank)">
                {{ m.rank }}
              </span>
            </div>
          </div>

          <div class="flex justify-between items-center border-t border-slate-800 pt-3">
            <button @click="copyRosterText()" class="bg-slate-800 border border-slate-600 text-slate-200 hover:bg-slate-700 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition flex items-center gap-2">
              <i class="fas fa-copy"></i> Copiar Lista de Membros
            </button>
            <button @click="showRosterModal = false" class="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition">
              Fechar
            </button>
          </div>
        </div>
      </div>
    </Transition>

    <!-- === MODAL 5: CALCULADORA DE DISTRIBUIÇÃO DE FRAGMENTOS === -->
    <Transition name="fade">
      <div v-if="showFragmentsModal" class="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
        <div class="bg-[#0b101a] border border-amber-500/40 rounded-xl max-w-3xl w-full p-6 shadow-2xl space-y-5">
          <div class="flex justify-between items-center border-b border-slate-800 pb-3">
            <div>
              <h3 class="text-lg font-bold text-slate-100 uppercase tracking-wider flex items-center gap-2">
                <i class="fas fa-gem text-amber-400"></i> Distribuição Proporcional de Fragmentos
              </h3>
              <p class="text-xs text-slate-400">Fórmula de cálculo: <code class="text-amber-300 bg-slate-900 px-2 py-0.5 rounded font-mono">=ROUND(Pontuação / TotalClã * TotalFragmentos)</code></p>
            </div>
            <button @click="showFragmentsModal = false" class="text-slate-500 hover:text-slate-200">
              <i class="fas fa-times text-xl"></i>
            </button>
          </div>

          <!-- Fragment Controls Bar -->
          <div class="bg-[#0a0f1a] border border-slate-800 p-4 rounded-xl space-y-3">
            <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <label class="block text-xs font-bold uppercase tracking-wider text-amber-400 mb-1">Total de Fragmentos a Distribuir ($E$1)</label>
                <div class="flex items-center gap-2">
                  <input 
                    v-model.number="totalFragmentsToDistribute" 
                    type="number" 
                    min="0"
                    placeholder="Ex: 1580" 
                    class="bg-[#030508] border border-amber-500/50 rounded-lg px-3 py-2 text-base font-mono font-bold text-slate-100 outline-none focus:border-amber-400 w-44"
                  >
                  <span class="text-xs text-slate-400">fragmentos</span>
                </div>
              </div>

              <!-- Quick Presets -->
              <div class="flex flex-wrap items-center gap-1.5">
                <span class="text-[11px] text-slate-500 mr-1">Atalhos:</span>
                <button v-for="preset in [1000, 1580, 2500, 5000, 10000]" :key="preset" @click="totalFragmentsToDistribute = preset" class="px-2.5 py-1 bg-slate-800 hover:bg-amber-600 hover:text-slate-900 border border-slate-700 text-slate-300 text-xs font-bold font-mono rounded transition">
                  {{ formatNumber(preset) }}
                </button>
              </div>
            </div>

            <div class="grid grid-cols-3 gap-3 pt-2 border-t border-slate-800/80 text-center">
              <div class="bg-slate-900/80 p-2 rounded border border-slate-800">
                <span class="text-[10px] text-slate-500 uppercase font-bold">Total Clã</span>
                <p class="text-sm font-mono font-bold text-slate-200">{{ formatShortNumber(totalClanScore) }}</p>
              </div>
              <div class="bg-slate-900/80 p-2 rounded border border-slate-800">
                <span class="text-[10px] text-slate-500 uppercase font-bold">Total Distribuído</span>
                <p class="text-sm font-mono font-bold text-amber-400">{{ formatNumber(totalDistributedFragments) }} frag</p>
              </div>
              <div class="bg-slate-900/80 p-2 rounded border border-slate-800">
                <span class="text-[10px] text-slate-500 uppercase font-bold">Membros Elegíveis</span>
                <p class="text-sm font-mono font-bold text-emerald-400">{{ members.filter(m => (m.scores && m.scores[activeEventId] > 0)).length }}</p>
              </div>
            </div>
          </div>

          <!-- Fragment Search & Filter -->
          <div class="relative">
            <i class="fas fa-search absolute left-3 top-3 text-slate-500 text-sm"></i>
            <input 
              v-model="fragmentsSearchQuery" 
              type="text" 
              placeholder="Buscar guerreiro na distribuição..." 
              class="w-full bg-[#0a0f1a] border border-slate-700 rounded-lg pl-9 pr-4 py-2 text-xs text-slate-200 focus:border-amber-500 outline-none"
            >
          </div>

          <!-- Fragment Table -->
          <div class="bg-[#0a0f1a] border border-slate-800 rounded-lg overflow-hidden max-h-72 overflow-y-auto custom-scrollbar">
            <table class="w-full text-left text-xs">
              <thead class="bg-slate-900 border-b border-slate-800 font-bold uppercase tracking-wider text-slate-400">
                <tr>
                  <th class="py-2.5 px-3 w-12 text-center">Pos</th>
                  <th class="py-2.5 px-3">Guerreiro</th>
                  <th class="py-2.5 px-3 text-center">Classificação</th>
                  <th class="py-2.5 px-3 text-right">Pontuação</th>
                  <th class="py-2.5 px-3 text-right">% do Clã</th>
                  <th class="py-2.5 px-3 text-right text-amber-400">Fragmentos (=ROUND)</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-800/50">
                <tr 
                  v-for="(m, idx) in processedMembers.filter(item => !fragmentsSearchQuery || item.name.toLowerCase().includes(fragmentsSearchQuery.toLowerCase())).sort((a,b) => b.currentScore - a.currentScore)" 
                  :key="m.id"
                  class="hover:bg-slate-800/40 font-mono"
                >
                  <td class="py-2 px-3 text-center text-slate-500 font-sans">#{{ idx + 1 }}</td>
                  <td class="py-2 px-3 font-sans font-bold text-slate-200">{{ m.name }}</td>
                  <td class="py-2 px-3 text-center">
                    <span class="px-2 py-0.5 rounded text-[10px] border" :class="getRankBadgeClass(m.rank)">{{ m.rank }}</span>
                  </td>
                  <td class="py-2 px-3 text-right text-slate-300">{{ formatNumber(m.currentScore) }}</td>
                  <td class="py-2 px-3 text-right text-slate-400">{{ m.sharePctStr }}</td>
                  <td class="py-2 px-3 text-right font-bold text-amber-300 bg-amber-950/20">{{ formatNumber(m.fragmentsAllocated) }}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="flex justify-between items-center border-t border-slate-800 pt-3">
            <button @click="copyFragmentsText()" class="bg-amber-600/20 border border-amber-500/50 text-amber-300 hover:bg-amber-600 hover:text-slate-900 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition flex items-center gap-2 shadow-[0_0_10px_rgba(245,158,11,0.2)]">
              <i class="fas fa-copy"></i> Copiar Distribuição para Chat/Discord
            </button>
            <button @click="showFragmentsModal = false" class="bg-slate-800 hover:bg-slate-700 text-slate-300 px-5 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition">
              Fechar
            </button>
          </div>
        </div>
      </div>
    </Transition>

  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.3);
  border-radius: 4px;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(148, 163, 184, 0.3);
  border-radius: 4px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: rgba(59, 130, 246, 0.6);
}
</style>
