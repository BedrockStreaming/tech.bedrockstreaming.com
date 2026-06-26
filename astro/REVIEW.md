# Astro Migration — Manual Pixel-Parity Review Checklist

> This checklist MUST be completed BEFORE the cutover commit (W7 task 63).
> Since automated visual regression was not enabled (per user decision), this is the gating human review.

---

## Pre-Review Setup

1. Build the Astro site:
   ```bash
   cd astro && npm run build
   ```

2. Serve the Astro build locally (pick one):
   ```bash
   cd astro && npx http-server dist -p 8080
   # OR
   cd astro && npx astro preview
   ```

3. Serve the current Jekyll build alongside (in another terminal):
   ```bash
   bundle exec jekyll serve --port 4000
   # OR use Docker
   docker run -it -v $(pwd):/var/content:ro -p 4000:4000 tech-blog:latest
   ```

4. Open BOTH in adjacent browser tabs at:
   - Desktop: 1440 × 900
   - Mobile: 375 × 667 (iPhone 8)

---

## Pre-Cutover Verification (Automated)

Before manual review, run these automated checks:

- [ ] `cd astro && npm run build` exits 0
- [ ] `node astro/scripts/verify-urls.mjs` exits 0 (URL preservation)
- [ ] `xmllint --noout astro/dist/feed.xml` exits 0 (RSS valid)
- [ ] `xmllint --noout astro/dist/sitemap-index.xml` exits 0 (sitemap valid)
- [ ] `grep -q 'bedrockstreaming.matomo.cloud' astro/dist/index.html` (Matomo present in prod build)
- [ ] `cd astro && PUBLIC_MATOMO_ENABLED=false npm run build && ! grep -q 'matomo' astro/dist/index.html` (Matomo absent in preview build)

---

## Manual Visual Review (Side-by-Side Comparison)

### Home page (`/`)

- [ ] Hero banner image visible (`/images/common/banner_xl.jpg`)
- [ ] Header text "Creating Streaming Champions" present
- [ ] Featured post cards count matches Jekyll (10 posts)
- [ ] Post card order identical (newest first)
- [ ] Pagination link to `/blog/page/2/` present
- [ ] No layout shift or missing styles

### Sample blog post (any from 2024+)

Pick one: `/2024/10/03/enhancing-production-monitoring-with-newrelic/`

- [ ] Title, date, author rendered identically
- [ ] Tags pill display matches Jekyll
- [ ] Code blocks: syntax highlighting visually similar (Shiki themes may differ slightly from Pygments — acceptable)
- [ ] Inline images appear in same positions
- [ ] Share buttons present (RSS, Twitter, LinkedIn, Email — per `_data/social.yml`)
- [ ] Click each share button — opens correct social share URL
- [ ] Prev/Next navigation at bottom (if applicable)
- [ ] Author bio rendered correctly
- [ ] No console errors

### Sample post with `color` frontmatter

Pick one: any 2024+ post (167 posts have `color: rgb(251,87,66)`)

- [ ] Post content `a` tags use the post color
- [ ] Share button `a` tags use the post color
- [ ] Tag list links use the post color
- [ ] Post navigation links use the post color
- [ ] Footer links use the post color

### Sample conference post (with slideshare)

Pick a conference with `slideshareKey` (3 total).

- [ ] Event name + date + speaker rendered
- [ ] Slideshare iframe loads
- [ ] If has `youtubeId` — YouTube iframe also loads

### Sample video post (LFT)

Pick any video from `/lft/`.

- [ ] YouTube iframe loads
- [ ] Video autoplay is OFF
- [ ] Video metadata rendered

### Mermaid + KaTeX rendering

- [ ] Open `/2024/11/07/compute-at-edge-personalize-static-pages/`
- [ ] All 3 Mermaid diagrams render as SVG (NOT raw ```mermaid``` text)
- [ ] If KaTeX post exists: math renders, no raw `$$` visible

### Twitter embeds

Open a post with embedded tweets (8 posts have `class="twitter-tweet"`).

- [ ] Tweet renders with Twitter widget styling (script `widgets.js` loaded)

### Dark mode

- [ ] Theme toggle button visible in navbar
- [ ] Click toggle → page switches theme immediately
- [ ] Reload page → theme persists (localStorage)
- [ ] No FOUC (flash of unstyled theme) on page load
- [ ] All pages respect theme (especially code blocks)
- [ ] Set OS to dark → fresh visit (incognito) shows dark theme

### Navigation (Navbar + Footer)

- [ ] Navbar links: Jobs, LFT, Meetups/Conferences, OSS, Search, Tags
- [ ] Each link leads to correct page (no 404)
- [ ] Active link styled correctly on each route
- [ ] Mobile menu: hamburger toggle works on 375px viewport
- [ ] Footer social icons: GitHub, LinkedIn (per `_data/icons.yml`)
- [ ] Footer copyright shows current year

### Tag pages

- [ ] `/tags/` lists all unique tags with counts
- [ ] Tags sorted alphabetically (or matching Jekyll order)
- [ ] Sample `/tags/php/` lists php-tagged posts only
- [ ] Tag pills on posts link to correct tag page

### Search

- [ ] `/search/` page loads
- [ ] Pagefind UI renders search input
- [ ] Search "kubernetes" returns ≥3 results
- [ ] Search "performance" returns ≥3 results
- [ ] Search "BFF" returns relevant results
- [ ] Result clicks navigate to correct posts

### Static pages

- [ ] `/oss/` — all OSS project entries visible with images
- [ ] `/jobs/` — content present (redirect to Bedrock careers)
- [ ] `/lft/` — 61 LFT videos listed with thumbnails
- [ ] `/meetup-conference/` — conferences listed (merged data + posts)
- [ ] `/404.html` — renders 404 layout (test with deliberately bad URL)

### SEO / feeds

- [ ] `/feed.xml` opens in browser, shows valid RSS feed with all posts
- [ ] `/sitemap-index.xml` opens, lists sub-sitemaps
- [ ] `/robots.txt` references sitemap URL
- [ ] Pick a random post — view source — confirm:
  - `og:image` present (featureImg/thumbnail/default fallback)
  - `twitter:card content="summary_large_image"` present
  - `twitter:site content="@Bedrock_Tech"` present
  - Canonical link present
  - Matomo `<script>` present (production build)

### Redirects

- [ ] Open `/blog/page5` (legacy URL) → meta-refresh redirects to `/blog/page/5/`
- [ ] Open one known `redirect_from` URL → redirects to canonical post URL
- [ ] (See `astro/src/data/redirects.json` for the 18 known redirects)

---

## Final Sign-Off

- **Reviewer name:** _______________________
- **Review date:** _______________________
- **Astro build version:** _______________________ (`cd astro && npx astro --version`)
- **Notes / Concerns:**

```
(Write any findings, deferrals, or follow-ups here)
```

- **Approval to proceed with cutover (task 63):** [ ] YES / [ ] NO

---

## Rollback Procedure

If issues are discovered AFTER cutover, rollback is straightforward:

1. Identify the cutover commit SHA (will be tagged in PR description):
   ```bash
   git log --oneline | grep cutover
   ```
2. Revert it:
   ```bash
   git revert <cutover-sha>
   ```
3. Push the revert — Jekyll deploy automatically resumes from the previous workflow.

The cutover is an ATOMIC commit specifically designed for easy rollback.

---

## Future Work (Post-Cutover)

These items were deferred per the original migration plan:

### AWS Amplify PR Previews — DEFERRED

The user chose to defer the PR preview workflow decision until post-cutover. See `.omo/notes/amplify-decision.md` for the open question.

**Three options to evaluate:**
1. Update Amplify to build Astro (`amplify.yml` modifications)
2. Switch to GitHub Pages preview workflow (`.github/workflows/pr-preview.yml`)
3. Drop PR previews — reviewers test locally

### Other potential follow-ups

- Visual regression testing (e.g., Playwright + percy.io) — declined initially, can revisit
- Automated E2E tests for URL preservation in CI — currently covered by `verify-urls.mjs` filesystem check
- Performance/Lighthouse CI — declined initially
- Link checker for broken internal/external links — declined initially
- Image optimization (Astro `<Image>` component for in-post images) — declined initially per "verbatim copy" decision
- i18n routing (URL prefixes for FR/EN) — declined per "single collection" decision
