# ayanbinrafaih.github.io

Personal academic website — plain HTML/CSS/JS, no build step, no
dependencies beyond two Google Fonts links. Designed to go live the
moment GitHub Pages is turned on.

## File structure

```
.
├── index.html        Home + About + Awards & Honours (one page, anchor tabs)
├── research.html     Experience timeline, Publications, Presentations
├── projects.html      Project write-ups
├── css/
│   └── style.css      All styling — colors/fonts are CSS variables at the top
├── js/
│   └── main.js         Mobile nav, scroll-spy, abstract/BibTeX toggles, filters
└── assets/
    └── img/
        └── (add profile.jpg here — see below)
```

## Putting this on GitHub Pages

1. Create a new repository on GitHub.
   - If you name it `ayanbinrafaih.github.io`, the site is served at the
     repo root (`https://ayanbinrafaih.github.io/`) — this is the usual
     choice for a personal site.
   - Any other repo name also works as a **project site**
     (`https://ayanbinrafaih.github.io/REPO-NAME/`) — no file changes
     needed either way, since every link in this project is relative.
2. Push all the files in this folder to the repo's default branch (e.g. `main`).
3. In the repo: **Settings → Pages → Build and deployment → Source:**
   choose **Deploy from a branch**, branch **main**, folder **/ (root)**.
4. Save. GitHub gives you the live URL in the same screen after a minute or two.

No Jekyll config, no `_config.yml`, no build step — it's static HTML, so
it just works once Pages is on.

## What's a placeholder and needs your input

- **`assets/img/profile.jpg`** — add your photo here (square, ~800×800px).
  The homepage shows a small "Add your photo" box until this file exists;
  it switches over automatically once you add it — no HTML edits needed.
- **About Me text** — in `index.html`, the `#about` section has a clearly
  marked dashed box ("Placeholder") — replace that whole block with your
  own writing.
- **Project links** — in `projects.html`, every `Code` / `Demo` pill
  currently points to `#`. Search the file for `TODO` comments and swap
  in your real GitHub/demo URLs.
- **Research extras** — in `research.html`, the Kepler paper has a
  disabled "Poster — add link" pill, and the AstroThink entry shows
  "Preprint — coming soon"; update both once those are public. Feel free
  to add `Slides` / `Video` pills the same way (copy an existing `<a
  class="pill">` and point it at a file under a new `assets/papers/` or
  `assets/slides/` folder, or an external link).

## A note on the CV

Per your instructions, the CV PDF itself has **not** been included
anywhere in this repository or referenced by the site — all of its
content was rewritten directly into the HTML (experience timeline,
projects, publications, etc.) instead of linking or uploading the file.

## Editing colors / fonts

Everything lives in the `:root { ... }` block at the top of `css/style.css` —
change a hex value there and it updates across all three pages.

## Browser support

Plain HTML/CSS/JS with no transpilation — works in any current browser.
The mobile nav and abstract/BibTeX toggles are vanilla JS with no
dependencies.
