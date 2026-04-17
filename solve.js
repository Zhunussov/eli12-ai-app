const $ = (id)=>document.getElementById(id);

const elProblem = $("problem");
const elSolve = $("solveBtn");
const elClear = $("clearBtn");
const elSteps = $("steps");
const elHints = $("hints");
const elEmpty = $("emptyState");
const elOut = $("output");

function detect(p){
  p = p.toLowerCase();
  if(p.includes("sin") || p.includes("π")) return "Math";
  if(p.includes("force") || p.includes("pressure")) return "Physics";
  return "General";
}

function solve(p){
  const t = detect(p);

  if(t === "Math"){
    return {
      steps: [
        "Convert angle using modulo 2π",
        "sin(a - 3π/2) = sin(a + π/2)",
        "Use identity sin(x + π/2) = cos(x)",
        "Answer: cos(a)"
      ],
      hints: ["Remember unit circle", "Shift identities"],
      topic: "Math"
    };
  }

  if(t === "Physics"){
    return {
      steps: [
        "Use p = F / A",
        "Substitute values",
        "Compute result"
      ],
      hints: ["Pressure increases if area decreases"],
      topic: "Physics"
    };
  }

  return {
    steps: ["Read problem", "Apply formula"],
    hints: ["Think step by step"],
    topic: "General"
  };
}

elSolve.onclick = ()=>{
  const p = elProblem.value;
  if(!p) return alert("Enter problem");

  const r = solve(p);

  elSteps.innerHTML = `<ul>${r.steps.map(s=>`<li>${s}</li>`).join("")}</ul>`;
  elHints.innerHTML = `<ul>${r.hints.map(s=>`<li>${s}</li>`).join("")}</ul>`;

  elEmpty.classList.add("hidden");
  elOut.classList.remove("hidden");
};

elClear.onclick = ()=>{
  elProblem.value = "";
  elOut.classList.add("hidden");
  elEmpty.classList.remove("hidden");
};
