# lenrui.net

Personal site for **Lén Rui** — a hand-built static site (no build step, no framework).
Evolved from the original ukiyo-e / warm-paper look with a real navigation bar,
bigger type, animated cards, and a lightweight snowfall effect.

## Pages
| File | What it is |
|------|------------|
| `index.html` | Home — hero, featured video, "find me" links |
| `projects.html` | Things you've built (card grid) |
| `commissions.html` | Work made for other people (gallery) |
| `about.html` | About you |
| `404.html` | Not-found page (GitHub Pages serves this automatically) |

Shared pieces live in:
- `css/styles.css` — all styling + the design tokens (colors, fonts) at the top
- `js/main.js` — mobile nav, scroll-reveal, snowfall
- `assets/` — images + the `souvnrl.ttf` display font

## Editing content
Everything you need to change is plain HTML with comments marking where to edit.

**Projects / Commissions:** each item is one `<article class="card">…</article>` block.
Duplicate a block to add an item; delete one to remove it. Inside a card:
- `card__media img` → set `src` to an image in `assets/` (or keep the empty placeholder box)
- `card__title` → the name
- `card__desc` → a sentence or two
- `card__tags` → add/remove `<span class="tag">` chips
- `card__link` → link to the live thing/repo
- Remove the `card--placeholder` class once a card has real content (it hides the
  "placeholder — edit me" label).

**About:** edit the text inside each `<div class="about-block">`. Change the skill
`<span class="chip">` items to your real tools.

**Colors / fonts:** tweak the `:root { --… }` variables at the top of `css/styles.css`.

## Preview locally
Any static server works, e.g. with Node installed:
```
npx serve site
```
then open the printed URL.

## Deploy (GitHub Pages)
This is served from the `Lenrul/Lenrul.github.io` repo with the custom domain
`lenrui.net` (see `CNAME`). To publish:

1. Copy the **contents** of this `site/` folder into the root of the
   `Lenrul.github.io` repo (replacing the old files, keeping `CNAME`).
2. Commit and push to the default branch.
3. GitHub Pages redeploys automatically; `lenrui.net` updates within a minute or two.

The old Next.js-exported files (and the `cafe/` sub-site) are no longer needed and
can be deleted from the repo once you're happy with this version.
