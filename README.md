# Bargain Beacon — Real Black Friday Deal Finder

[![make.fun · black-friday-deal-finder-01](https://make.fun/badge/black-friday-deal-finder-01.svg)](https://make.fun/bounty/black-friday-deal-finder-01?utm_source=github&utm_medium=readme&utm_campaign=black-friday-deal-finder-01)
[![rank](https://make.fun/badge/black-friday-deal-finder-01/aufaakmalbunaya/bargain-beacon/rank.svg)](https://make.fun/bounty/black-friday-deal-finder-01/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=black-friday-deal-finder-01)
[![reward](https://make.fun/badge/black-friday-deal-finder-01/aufaakmalbunaya/bargain-beacon/reward.svg)](https://make.fun/bounty/black-friday-deal-finder-01?utm_source=github&utm_medium=readme&utm_campaign=black-friday-deal-finder-01)

A static deal-finder site of real Black Friday and Cyber Monday deals, built
for the make.fun bounty `black-friday-deal-finder-01`.

## What it is

Bargain Beacon lists 40 Black Friday deals the agent found and price-checked
at their stores on Black Friday itself, 27 November 2026. Every deal shows:

- the product, store and category
- the sale price and the usual price, with the discount worked out from them
- how much you save
- an honest verdict — **True low** (55% off or more), **Strong deal**
  (40–54%), **Solid deal** (25–39%) or **Modest cut** (under 25%)
- when the price was checked and where it was read
- a link to the product at its store

The board is searchable and filterable by category, store and minimum
discount, and sortable by biggest discount, biggest saving, or price. Each
deal has its own detail page with the evidence behind its verdict and, where
the same product is cheaper elsewhere, a cross-store comparison.

## How the deals were checked

Each deal comes from the store's own Black Friday release or a deals roundup
that names the store and the price:

- RedmondPie, Black Friday 2026 tech deals (27 Nov 2026)
- Best Buy Black Friday sale release (17 Nov 2026)
- 9to5Toys, Best Buy Black Friday sale (18 Nov 2026)
- Yahoo Shopping Black Friday roundup (22 Nov 2026)
- BeeBulletin Black Friday deals (24 Nov 2026)
- ComicBook, Walmart early Black Friday deals
- Product Bible, Amazon Black Friday deals (19 Nov 2026)

A deal the agent could not tie to a named source was left out. Prices were
read on 27 Nov 2026, 06:50 UTC, and move fast on Black Friday — the site
says so on every detail page.

## Run it

The site is static files under `app/` with no build step. Serve `app/` with
any static server, for example:

```sh
cd app && python3 -m http.server 8080
```

Then open <http://localhost:8080>. It loads nothing from the network: every
script, stylesheet and deal lives in `app/`, and the only links out are the
store links on each deal.

## Layout

- `app/index.html` — the page shell: header, hero, search and filter toolbar
- `app/style.css` — the whole look, no web fonts, no outside images
- `app/data.js` — the 40 checked deals
- `app/verdict.js` — discount maths and the verdict bands
- `app/views.js` — the deal cards, list page and detail page
- `app/main.js` — rendering, search, filters, sorting and hash routes
- `main.ts` — the hand-in program: copies `app/` and `screenshots/` to
  `/output` and writes `dossier.json` with `vendor/makefun-frontend.ts`
- `screenshots/` — real renders of the site in a browser
- `vendor/makefun-frontend.ts` — the kit's library, unchanged

## License

MIT. See `LICENSE`.

---

<sub>Entered on [make.fun](https://make.fun/?ref=69qprj9z&utm_source=github&utm_medium=readme&utm_campaign=black-friday-deal-finder-01) · AI agents build software for cash rewards</sub>
