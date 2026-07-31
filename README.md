# My Blog

A Jekyll blog starter built for long-term use on GitHub Pages: write posts in
Markdown or raw HTML interchangeably, and get automatic category/tag archive
pages plus client-side search out of the box.

## Project structure

```
my-blog/
├── _config.yml          # Site settings, plugins, permalinks
├── Gemfile               # Ruby dependencies (github-pages gem)
├── _data/
│   ├── navigation.yml     # Top nav links
│   └── categories.yml     # Category names + descriptions
├── _includes/             # Reusable HTML partials (header, footer, post card, search box)
├── _layouts/              # default, post, page, category, tag
├── _posts/                # Blog posts (.md or .html, both work identically)
├── _drafts/               # Unpublished drafts (not built by default)
├── assets/
│   ├── css/main.css
│   └── js/search.js       # Lunr.js-powered client-side search
├── categories/index.html  # Lists all categories
├── tags/index.html        # Lists all tags
├── search.json            # Auto-generated search index (Jekyll template, not raw JSON)
├── index.html             # Homepage
└── about.md               # Example static page
```

## Getting started locally

1. Install Ruby and Bundler (see https://jekyllrb.com/docs/installation/).
2. Install dependencies:
   ```bash
   bundle install
   ```
3. Run the local dev server:
   ```bash
   bundle exec jekyll serve
   ```
4. Open http://localhost:4000

## Writing a new post

Add a file to `_posts/` named `YYYY-MM-DD-your-slug.md` (or `.html`):

```yaml
---
title: "Your Post Title"
date: 2026-03-01
categories: [tech]        # one main category
tags: [jekyll, notes]      # as many tags as useful
excerpt: "One or two sentence summary shown in post lists and SEO."
---

Your content here, in Markdown or HTML.
```

- **Categories** are the small, stable top-level buckets. Add new ones to
  `_data/categories.yml` (with a name + description) whenever you introduce one.
- **Tags** are flexible keywords — no registration needed, just add them to a
  post's front matter and they show up automatically at `/tags/`.

Category and tag archive pages (`/categories/tech/`, `/tags/jekyll/`) are
generated automatically by the `jekyll-archives` plugin — no manual page
creation required as the blog grows.

## Search

`search.json` is a Jekyll-templated file that Jekyll renders into a JSON
array of all posts at build time. `assets/js/search.js` fetches that file and
builds a Lunr.js index in the browser, so search works with zero backend and
zero external services.

## Dark mode

A toggle button (🌙 / ☀️) sits in the header. It:

- Follows the visitor's OS-level preference (`prefers-color-scheme`) by
  default, with no action needed.
- Lets the visitor override that with an explicit click, saved in
  `localStorage` so it persists across visits.
- Applies the saved theme via a small inline script in `_layouts/default.html`
  that runs before the stylesheet loads, avoiding a flash of the wrong theme.

Color variables for both themes live in `assets/css/main.css` under `:root`
(light) and `html[data-theme="dark"]` (dark) — edit those to adjust the
palette. The toggle logic itself is in `assets/js/theme.js`.

## Analytics (visitor tracking)

This starter ships with **Cloudflare Web Analytics** wired up but disabled
by default — it's privacy-friendly (no cookies, no personal data collection)
and free.

### Setup

1. Go to https://dash.cloudflare.com/?to=/:account/web-analytics
2. Click **Add a site**.
3. Enter your blog's hostname (e.g. `yourusername.github.io`).
   - You do **not** need to point your DNS at Cloudflare — choose the
     option for a JS snippet / "I do not have a website on Cloudflare" if
     prompted. This gives you a standalone tracking token.
4. Copy the **token** value from the generated snippet (a string like
   `abcd1234...`, found inside `data-cf-beacon='{"token": "..."}'`).
5. Paste it into `_config.yml`:
   ```yaml
   analytics:
     cloudflare_token: "abcd1234..."
   ```
6. Commit, push, and redeploy. The tracking script is only injected into
   pages when this token is non-empty.

### Viewing stats

Visit https://dash.cloudflare.com/?to=/:account/web-analytics — it shows
page views, unique visitors, top pages, referrers, and countries, updated
in near real-time. Data typically starts appearing within a few minutes of
your first visitor after deploying.

## Linking to a standalone interactive HTML file

If you already have a self-contained HTML file (its own `<style>` and
`<script>`, e.g. a visualization or game), the simplest and most robust way
to include it is to **link to it directly**, so it opens in its own tab —
rather than embedding it inline or via iframe.

1. Copy the file as-is into `assets/interactive/` (no edits needed).
2. In your post, add a link:
   ```html
   <a class="external-demo-link" href="{{ '/assets/interactive/your-file.html' | relative_url }}" target="_blank" rel="noopener">
     ▶ Open the demo (opens in a new tab)
   </a>
   ```

`target="_blank"` opens it in a new tab; `rel="noopener"` is a security best
practice for links that open in new tabs. The `.external-demo-link` class
in `assets/css/main.css` styles it as a button — remove the class if you'd
rather use a plain text link.

This avoids any interaction between the standalone file's CSS/JS and the
blog's own theme entirely, and sidesteps Liquid templating altogether. See
`_posts/2026-03-10-visualizing-matrix-multiplication.md` for a working
example.

## Deploying to GitHub Pages

1. Push this repository to GitHub.
2. In the repo settings, under **Pages**, set the source branch to `main`
   (root folder).
3. GitHub Pages builds and serves the site automatically — no CI config
   needed, since all plugins used here are on GitHub Pages' allowed list.

If you later want plugins that are **not** on GitHub Pages' safelist, switch
to a GitHub Actions workflow that runs `bundle exec jekyll build` and deploys
the `_site/` output instead.

## Customization checklist

- [ ] Update `title`, `url`, `author`, `email` in `_config.yml`
- [ ] Replace the sample posts in `_posts/`
- [ ] Edit `_data/categories.yml` to match your real categories
- [ ] Update `about.md`
- [ ] Adjust colors/fonts in `assets/css/main.css`
