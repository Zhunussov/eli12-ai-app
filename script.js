const $ = (id) => document.getElementById(id);

// --- DOM
const elText = $("text");
const elQuestion = $("question");
const elExplain = $("explainBtn");
const elClear = $("clearBtn");
const elCopy = $("copyBtn");
const elDownload = $("downloadBtn");

const elLevel = $("level");
const elLevelBadge = $("levelBadge");
const elMaxWords = $("maxWords");
const elCountBadge = $("countBadge");

const elEmpty = $("emptyState");
const elOut = $("output");

const elExplanation = $("explanation");
const elFormulas = $("formulas");
const elSources = $("sources");
const elLinks = $("links");

const elToast = $("toast");
const elHistory = $("history");

const elLangBtn = $("langBtn");
const elThemeBtn = $("themeBtn");

const elSubjectPill = $("subjectPill");
const elQualityPill = $("qualityPill");

// --- Demo
const DEMO = {
  bio: { q: "What is a neuron?", t: "A neuron is a cell that sends signals in the nervous system." },
  chem: { q: "What is activation energy?", t: "Catalyst lowers activation energy and speeds up reaction." },
  math: { q: "Simplify: sin(a − 3π/2)", t: "Use trig identities." }
};

// --- state
let lang = "en";
let dark = true;
let history = [];

// --- helpers
function toast(msg){
  elToast.textContent = msg;
  elToast.classList.add("show");
  setTimeout(()=> elToast.classList.remove("show"), 900);
}

function wordCount(s){
  const m = (String(s).trim().match(/[A-Za-zА-Яа-яёЁ0-9]+/g) || []);
  return m.length;
}

function escapeHtml(s){
  return String(s)
    .replaceAll("&","&amp;")
    .replaceAll("<","&lt;")
    .replaceAll(">","&gt;")
    .replaceAll('"',"&quot;")
    .replaceAll("'","&#039;");
}

function splitSentences(text){
  return String(text)
    .replace(/\s+/g," ")
    .trim()
    .split(/[.!?]+/)
    .map(s=>s.trim())
    .filter(Boolean);
}

// --- subject detect
function detectSubject(t){
  t = t.toLowerCase();
  if(t.includes("sin") || t.includes("cos") || t.includes("π")) return "Math";
  if(t.includes("reaction") || t.includes("catalyst")) return "Chemistry";
  if(t.includes("neuron") || t.includes("cell")) return "Biology";
  return "General";
}

// --- simplify
function simplify(sentences, level){
  const take = level == 1 ? 5 : level == 2 ? 4 : 3;
  return sentences.slice(0, take);
}

// --- main run
function run(){
  const q = elQuestion.value || "";
  const input = elText.value || "";

  if(!q && !input){
    alert("Enter text or question");
    return;
  }

  const text = input || q;
  const subject = detectSubject(text);
  const lvl = Number(elLevel.value);

  const sentences = splitSentences(text);
  const simple = simplify(sentences, lvl);

  elExplanation.innerHTML = simple.length
    ? `<ul>${simple.map(s=>`<li>${escapeHtml(s)}</li>`).join("")}</ul>`
    : "Too short";

  elFormulas.innerHTML =
    subject === "Math"
      ? "sin(x - 3π/2) = cos(x)"
      : subject === "Chemistry"
      ? "Catalyst lowers activation energy"
      : "No formulas";

  elSources.innerHTML = "No KB yet";
  elLinks.innerHTML = "https://khanacademy.org";

  elSubjectPill.textContent = `Subject: ${subject}`;
  elQualityPill.textContent = `Words: ${wordCount(text)}`;

  elEmpty.classList.add("hidden");
  elOut.classList.remove("hidden");

  history.unshift({q, t: input});
}

// --- events
elExplain.onclick = run;

elClear.onclick = ()=>{
  elText.value = "";
  elQuestion.value = "";
  elOut.classList.add("hidden");
  elEmpty.classList.remove("hidden");
};

elDemoBio?.addEventListener("click", ()=>{ elQuestion.value = DEMO.bio.q; elText.value = DEMO.bio.t; });
elDemoChem?.addEventListener("click", ()=>{ elQuestion.value = DEMO.chem.q; elText.value = DEMO.chem.t; });
elDemoMath?.addEventListener("click", ()=>{ elQuestion.value = DEMO.math.q; elText.value = DEMO.math.t; });
