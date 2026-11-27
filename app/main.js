// Bargain Beacon: render, search, filter and sort. The deals live in data.js,
// so the site needs no network to show them; each deal links out to its store.
//
//   #/            the board, with search and filters
//   #/deal/<id>   one deal, with its evidence and cross-store check
//
// window.__shotReady is false while a page renders and true once it is on
// screen, so a screenshot script knows when to capture.

import { deals } from "./data.js";
import { discountPercent, saving } from "./verdict.js";
import { dealPage, listPage, missingPage } from "./views.js";

const app = document.getElementById("app");
const countEl = document.getElementById("result-count");

const state = { q: "", category: "All", store: "All", minOff: 0, sort: "discount" };

function applyFilters() {
  const q = state.q.trim().toLowerCase();
  let shown = deals.filter((d) => {
    if (state.category !== "All" && d.category !== state.category) return false;
    if (state.store !== "All" && d.store !== state.store) return false;
    if (discountPercent(d) < state.minOff) return false;
    if (q && !`${d.title} ${d.store} ${d.category}`.toLowerCase().includes(q)) return false;
    return true;
  });
  if (state.sort === "discount") shown.sort((a, b) => discountPercent(b) - discountPercent(a));
  if (state.sort === "saving") shown.sort((a, b) => saving(b) - saving(a));
  if (state.sort === "price-low") shown.sort((a, b) => a.price - b.price);
  if (state.sort === "price-high") shown.sort((a, b) => b.price - a.price);
  return shown;
}

function fillOptions(select, values) {
  select.innerHTML = values.map((v) => `<option>${v}</option>`).join("");
}

function render() {
  window.__shotReady = false;
  const match = location.hash.match(/^#\/deal\/([^/?]+)/);
  document.body.classList.toggle("detail-view", Boolean(match));
  if (match) {
    const found = deals.find((d) => d.id === decodeURIComponent(match[1]));
    document.title = `${found ? found.title : "Not found"} | Bargain Beacon`;
    app.innerHTML = found ? dealPage(found, deals) : missingPage();
    if (countEl) countEl.textContent = "";
  } else {
    document.title = "Bargain Beacon — Real Black Friday deals, checked today";
    const shown = applyFilters();
    app.innerHTML = listPage(shown, deals.length);
    if (countEl) countEl.textContent = `${shown.length} of ${deals.length} deals`;
  }
  window.scrollTo(0, 0);
  window.__shotReady = true;
}

function wireToolbar() {
  const search = document.getElementById("search");
  const category = document.getElementById("filter-category");
  const store = document.getElementById("filter-store");
  const minOff = document.getElementById("filter-discount");
  const sort = document.getElementById("sort");
  fillOptions(category, ["All", ...new Set(deals.map((d) => d.category))]);
  fillOptions(store, ["All", ...new Set(deals.map((d) => d.store))]);
  search.addEventListener("input", () => { state.q = search.value; render(); });
  category.addEventListener("change", () => { state.category = category.value; render(); });
  store.addEventListener("change", () => { state.store = store.value; render(); });
  minOff.addEventListener("change", () => { state.minOff = Number(minOff.value); render(); });
  sort.addEventListener("change", () => { state.sort = sort.value; render(); });
}

function renderStats() {
  const totalSaved = deals.reduce((sum, d) => sum + saving(d), 0);
  const best = Math.max(...deals.map((d) => discountPercent(d)));
  const stats = document.getElementById("stats");
  if (!stats) return;
  stats.innerHTML =
    `<span><strong>${deals.length}</strong> deals checked</span>` +
    `<span><strong>${new Set(deals.map((d) => d.store)).size}</strong> stores</span>` +
    `<span><strong>${new Set(deals.map((d) => d.category)).size}</strong> categories</span>` +
    `<span><strong>up to ${best}% off</strong></span>` +
    `<span><strong>$${Math.round(totalSaved).toLocaleString("en-US")}</strong> total savings</span>`;
}

wireToolbar();
renderStats();
window.addEventListener("hashchange", render);
render();
