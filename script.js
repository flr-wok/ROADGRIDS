const solutionContent = {
  en: {
    adas: { index: "01 / 03", mode: "ADAS / ENERGY", title: "Energy-aware ADAS", copy: "Give commercial vehicles foresight into gradient, curvature, speed limits and heading — enabling predictive powertrain control and lower fuel consumption.", event: "UPHILL / 1.2 KM", kpis: [["4D", "road semantics"], ["1m", "ADAS-grade"]] },
    hd: { index: "02 / 03", mode: "HD / AUTONOMY", title: "Centimeter-grade HD Map", copy: "Lane-level geometry, topology and road furniture give autonomous systems a stable spatial prior — even when onboard perception is challenged.", event: "LANE MERGE / 680 M", kpis: [["<30cm", "feature precision"], ["42", "object layers"]] },
    update: { index: "03 / 03", mode: "CROWD / DELTA", title: "Day-level map freshness", copy: "Crowdsourced observations are orchestrated, fused and validated in the cloud, turning road changes into trusted map deltas at operational speed.", event: "DELTA FOUND / 240 M", kpis: [["T+1", "refresh cycle"], ["24/7", "cloud ingest"]] }
  }
};

const detailContent = {
  "map-engine": {
    kicker: "PLATFORM / MAP ENGINE",
    title: "A living model of the road.",
    copy: "RoadGrids turns survey-grade observations and fleet signals into a unified road graph that machines can understand, query and trust.",
    points: [["ADAS→HD", "Configurable precision"], ["42", "Semantic layers"], ["24/7", "Cloud processing"]]
  },
  "data-pipeline": {
    kicker: "PLATFORM / DATA PIPELINE",
    title: "From raw signal to trusted map.",
    copy: "One continuous workflow covers capture, perception, fusion, quality assurance and delta publishing — with traceability at every stage.",
    points: [["T+1", "Refresh target"], ["AUTO-QA", "Validation flow"], ["DELTA", "Efficient delivery"]]
  },
  "developer-api": {
    kicker: "PLATFORM / DEVELOPER API",
    title: "Road context, ready to integrate.",
    copy: "Access vector tiles, route attributes and custom semantic layers through deployment-ready APIs and datasets designed for cloud and vehicle systems.",
    points: [["REST", "Service access"], ["SDK", "Vehicle integration"], ["CUSTOM", "Output schema"]]
  },
  "adas-map": {
    kicker: "SOLUTIONS / ADAS MAP",
    title: "Give vehicles foresight.",
    copy: "Sub-meter road intelligence adds gradient, curvature, speed limits, heading and lane semantics to commercial-vehicle decision systems.",
    points: [["1m", "ADAS-grade"], ["4D", "Road semantics"], ["AHEAD", "Predictive context"]]
  },
  "hd-map": {
    kicker: "SOLUTIONS / HD MAP",
    title: "A precise spatial prior.",
    copy: "Centimeter-grade geometry, topology and road furniture help autonomous systems localize, plan and operate when onboard perception is challenged.",
    points: [["<30cm", "Feature precision"], ["LANE", "Level topology"], ["FUSED", "Multi-sensor data"]]
  },
  "fleet-intelligence": {
    kicker: "SOLUTIONS / FLEET INTELLIGENCE",
    title: "Turn road context into efficiency.",
    copy: "Deliver upcoming slope, curvature and traffic-rule context to fleet platforms and powertrain controllers for safer, smoother commercial mobility.",
    points: [["ENERGY", "Predictive control"], ["SAFETY", "Beyond line of sight"], ["T+1", "Operational freshness"]]
  },
  about: {
    kicker: "COMPANY / ABOUT",
    title: "AI-native road intelligence.",
    copy: "RoadGrids is an AI mapping company built around proven high-precision mapping, automated cartography and crowdsourced update capabilities.",
    points: [["AI", "Spatial perception"], ["MAP", "Production expertise"], ["GLOBAL", "Delivery mindset"]]
  },
  privacy: {
    kicker: "LEGAL / PRIVACY",
    title: "Privacy, by design.",
    copy: "This concept site only collects information that you choose to submit through the demo form. A production release should connect this experience to an approved privacy policy and secure data processor.",
    points: [["MINIMAL", "Necessary data only"], ["SECURE", "Protected handling"], ["CONTROL", "User-led requests"]],
    legal: true
  },
  terms: {
    kicker: "LEGAL / TERMS",
    title: "Clear terms for a concept site.",
    copy: "This ROADGRIDS website concept presents real product capabilities through an international brand experience and should be legally reviewed before commercial publication.",
    points: [["CONCEPT", "Demo experience"], ["REVIEW", "Before publishing"], ["2026", "Current edition"]],
    legal: true
  }
};

let currentSolution = "adas";

function updateSolution(key) {
  currentSolution = key;
  const content = solutionContent.en[key];
  document.querySelector(".solution-index").textContent = content.index;
  document.querySelector("#solution-mode").textContent = content.mode;
  document.querySelector("#solution-title").textContent = content.title;
  document.querySelector("#solution-copy").textContent = content.copy;
  document.querySelector("#demo-event").textContent = content.event;
  document.querySelector("#road-demo").dataset.mode = key;
  document.querySelector("#solution-kpis").innerHTML = content.kpis.map(([value, label]) => `<div><strong>${value}</strong><span>${label}</span></div>`).join("");
  document.querySelectorAll(".solution-tab").forEach((tab) => {
    const active = tab.dataset.solution === key;
    tab.classList.toggle("is-active", active);
    tab.setAttribute("aria-selected", String(active));
  });
}

document.querySelectorAll(".solution-tab").forEach((tab) => tab.addEventListener("click", () => updateSolution(tab.dataset.solution)));

const menuToggle = document.querySelector(".menu-toggle");
const mobileMenu = document.querySelector(".mobile-menu");
menuToggle.addEventListener("click", () => {
  const open = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!open));
  mobileMenu.classList.toggle("is-open", !open);
});
mobileMenu.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
  menuToggle.setAttribute("aria-expanded", "false");
  mobileMenu.classList.remove("is-open");
}));

const modal = document.querySelector("#demo-modal");
const modalGrid = modal.querySelector(".modal-grid");
const form = modal.querySelector("#demo-form");
const success = modal.querySelector(".form-success");

function openDemo() {
  modalGrid.classList.remove("is-success");
  success.classList.remove("is-visible");
  success.setAttribute("aria-hidden", "true");
  form.reset();
  modal.showModal();
  document.body.classList.add("modal-open");
}

document.querySelectorAll(".js-open-modal").forEach((button) => button.addEventListener("click", openDemo));

function closeModal() {
  modal.close();
  document.body.classList.remove("modal-open");
}
modal.querySelector(".modal-close").addEventListener("click", closeModal);
modal.querySelector(".modal-done").addEventListener("click", closeModal);
modal.addEventListener("click", (event) => { if (event.target === modal) closeModal(); });
modal.addEventListener("close", () => document.body.classList.remove("modal-open"));

form.addEventListener("submit", (event) => {
  event.preventDefault();
  modalGrid.classList.add("is-success");
  success.classList.add("is-visible");
  success.setAttribute("aria-hidden", "false");
});

const detailModal = document.querySelector("#detail-modal");
const detailKicker = detailModal.querySelector("#detail-kicker");
const detailTitle = detailModal.querySelector("#detail-title");
const detailCopy = detailModal.querySelector("#detail-copy");
const detailPoints = detailModal.querySelector("#detail-points");

function openDetail(key) {
  const content = detailContent[key];
  if (!content) return;
  detailKicker.textContent = content.kicker;
  detailTitle.textContent = content.title;
  detailCopy.textContent = content.copy;
  detailPoints.innerHTML = content.points.map(([value, label]) => `<div class="detail-point"><strong>${value}</strong><span>${label}</span></div>`).join("");
  detailModal.classList.toggle("is-legal", Boolean(content.legal));
  detailModal.showModal();
  document.body.classList.add("modal-open");
}

function closeDetail() {
  detailModal.close();
  document.body.classList.remove("modal-open");
}

document.querySelectorAll("[data-detail]").forEach((button) => button.addEventListener("click", () => openDetail(button.dataset.detail)));
detailModal.querySelector(".detail-close").addEventListener("click", closeDetail);
detailModal.addEventListener("click", (event) => { if (event.target === detailModal) closeDetail(); });
detailModal.addEventListener("close", () => document.body.classList.remove("modal-open"));
detailModal.querySelector(".js-detail-demo").addEventListener("click", () => {
  closeDetail();
  openDemo();
});

const reveals = document.querySelectorAll(".reveal");
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add("is-visible"); revealObserver.unobserve(entry.target); } });
}, { threshold: 0.12 });
reveals.forEach((element) => revealObserver.observe(element));

const steps = [...document.querySelectorAll(".pipeline-step")];
let stepIndex = 0;
function activateStep(index) {
  steps.forEach((step, i) => step.classList.toggle("is-active", i === index));
  stepIndex = index;
}
steps.forEach((step, index) => {
  step.addEventListener("mouseenter", () => activateStep(index));
  step.addEventListener("focus", () => activateStep(index));
});
setInterval(() => activateStep((stepIndex + 1) % steps.length), 5000);

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && modal.open) closeModal();
  if (event.key === "Escape" && detailModal.open) closeDetail();
});
