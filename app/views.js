// HTML for the deal cards, the list page and the deal detail page. Every
// value from the data is escaped before it goes into the page.

import { checkedLabel, discountPercent, saving, usd, verdict } from "./verdict.js";

const escape = (s) =>
  String(s).replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);

export function dealCard(d) {
  const v = verdict(d);
  return `<article class="card">
  <div class="card-top"><span class="store">${escape(d.store)}</span><span class="cat">${escape(d.category)}</span></div>
  <h3><a href="#/deal/${encodeURIComponent(d.id)}">${escape(d.title)}</a></h3>
  <p class="prices"><span class="sale">${usd(d.price)}</span> <s class="was">${usd(d.was)}</s> <span class="pct">−${discountPercent(d)}%</span></p>
  <p class="save">You save ${usd(saving(d))}</p>
  <p class="verdict ${v.tone}">${escape(v.label)}</p>
  <p class="checked">Checked ${escape(checkedLabel(d.checked))}</p>
  <p class="card-links"><a class="btn" href="${escape(d.url)}" target="_blank" rel="noopener">View at ${escape(d.store)} ↗</a> <a class="details" href="#/deal/${encodeURIComponent(d.id)}">Details</a></p>
</article>`;
}

export function dealRows(deals) {
  if (deals.length === 0) {
    return `<p class="empty">No deal matches those filters. Clear the search or widen a filter.</p>`;
  }
  return `<div class="grid">${deals.map(dealCard).join("")}</div>`;
}

export function listPage(deals, total) {
  return `<p class="count"><strong>${deals.length}</strong> of ${total} deals shown</p>${dealRows(deals)}`;
}

export function dealPage(d, all) {
  const v = verdict(d);
  const same = d.also
    ? `<p class="compare">Same product elsewhere: <strong>${escape(d.also.store)} — ${usd(d.also.price)}</strong>. ${escape(d.also.note)}</p>`
    : "";
  const others = all.filter((x) => x.category === d.category && x.id !== d.id).slice(0, 3);
  const more = others.length
    ? `<h2>More in ${escape(d.category)}</h2><div class="grid">${others.map(dealCard).join("")}</div>`
    : "";
  return `<p><a class="back" href="#/">&larr; All deals</a></p>
<article class="detail">
  <div class="card-top"><span class="store">${escape(d.store)}</span><span class="cat">${escape(d.category)}</span></div>
  <h1>${escape(d.title)}</h1>
  <p class="prices big"><span class="sale">${usd(d.price)}</span> <s class="was">${usd(d.was)}</s> <span class="pct">−${discountPercent(d)}%</span></p>
  <p class="save big">You save ${usd(saving(d))} off the usual price of ${usd(d.was)}.</p>
  <p class="verdict ${v.tone} big">${escape(v.label)} — ${escape(v.blurb)}</p>
  <dl>
    <dt>Store</dt><dd>${escape(d.store)}</dd>
    <dt>Category</dt><dd>${escape(d.category)}</dd>
    <dt>Price checked</dt><dd>${escape(checkedLabel(d.checked))}</dd>
    <dt>Read in</dt><dd>${escape(d.source)}</dd>
    <dt>Evidence</dt><dd>${escape(d.evidence)}</dd>
  </dl>
  ${same}
  <p><a class="btn big" href="${escape(d.url)}" target="_blank" rel="noopener">View it at ${escape(d.store)} ↗</a></p>
  <p class="note">Prices move fast on Black Friday. This price was read at the time above; check the live price at the store before you buy.</p>
</article>
${more}`;
}

export function missingPage() {
  return `<h1>Deal not found</h1><p>There is no deal at that address. <a href="#/">See all deals</a>.</p>`;
}
