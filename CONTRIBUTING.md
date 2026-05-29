# Contributing to tech.bedrockstreaming.com

Welcome! This repo is the source of the Bedrock Tech Blog, built with [Astro](https://astro.build).

## Local Development

### Prerequisites

- Node.js 22+
- npm

### Setup

```bash
cd astro
npm ci
npm run dev
```

The dev server runs at `http://localhost:4321`.

### Project Layout

```
astro/
├── astro.config.mjs       # Astro config (site, integrations, redirects)
├── package.json
├── public/                # Static assets (images/, assets/, CNAME, robots.txt)
├── src/
│   ├── content/           # Content collections
│   │   ├── blog/         # Standard blog posts (.md)
│   │   ├── conferences/  # Conference posts
│   │   └── videos/       # LFT video posts
│   ├── content.config.ts  # Content collection schemas (Zod)
│   ├── data/              # Typed data (authors, language, social, icons, conferences, biblio)
│   ├── styles/            # SCSS (Type-on-Strap-inspired)
│   ├── components/        # Shared Astro components
│   ├── layouts/           # Base, Post, Page, Conference, Video layouts
│   └── pages/             # Routes
└── scripts/
    ├── migrate-jekyll.ts  # Historical: Jekyll → Astro migration script
    └── verify-urls.mjs    # CI: verifies URL preservation
```

## Writing a New Post

1. Create a Markdown file in the appropriate collection:
   - `astro/src/content/blog/YYYY-MM-DD-slug.md` for standard posts
   - `astro/src/content/conferences/YYYY-MM-DD-slug.md` for conference recaps
   - `astro/src/content/videos/YYYY-MM-DD-slug.md` for LFT talk recaps

2. Required frontmatter (see `astro/src/content.config.ts` for the full schema):

   For blog posts:
   ```yaml
   ---
   title: Your post title
   description: Short SEO description
   author: your_author_key  # or [author1, author2] for multiple
   tags: [tag1, tag2]
   language: fr  # or 'en'
   thumbnail: /images/posts/<slug>/thumb.jpg  # optional
   ---
   ```

   For conference posts (add):
   ```yaml
   eventName: Forum PHP 2026
   eventUrl: https://event.afup.org/...
   slideshareKey: <key>  # optional
   ```

   For video posts (add):
   ```yaml
   youtubeId: <yt-id>  # REQUIRED
   ```

3. Add yourself to `astro/src/data/authors.ts` if you're a new author.

4. Add images to `astro/public/images/posts/<slug>/`. Reference them as `/images/posts/<slug>/image.jpg`.
   Don't forget to compress them with tools like [TinyPNG](https://tinypng.com/).

5. Test locally: `cd astro && npm run dev`

6. Open a PR. CI will build and verify URLs.

## Features Available in Posts

- **Markdown** — standard CommonMark + GFM
- **MDX** — embed Astro components by using `.mdx` extension instead of `.md`
- **Math** — KaTeX via `$inline$` and `$$block$$`
- **Diagrams** — Mermaid via fenced code blocks: ` ```mermaid `
- **Tweets** — `<blockquote class="twitter-tweet">...</blockquote>` (widgets.js auto-loaded)
- **Slideshare** — set `slideshareKey:` in frontmatter (conference posts)
- **Code highlighting** — fenced code blocks with language identifier
- **Citations** — `<Citation key="ref1" />` (MDX only); add entries to `astro/src/data/biblio.ts`

## Add a LFT Replay

1. Create `astro/src/content/videos/YYYY-MM-DD-slug.md`. Use the date the talk was first given in public.
2. Required frontmatter:
   ```yaml
   ---
   title: Title of your talk
   description: Description of the video
   author: author_key
   tags: [lft, and, other, tags]
   youtubeId: <yt-id>
   ---
   ```
3. Add content below the frontmatter for context.

## Add a Conference

### Just add to the conference list

Add your entry to `astro/src/data/conferences.ts`:

```typescript
{
  title: "Title of the conference",
  date: new Date("1970-01-01"),
  author: "conference_speaker",
  eventName: "Event Name",
  eventUrl: "https://...",         // optional
  youtubeId: "...",                // optional
  slideshareKey: "...",            // optional
  sponsored: true,                 // optional, default false
  hosted: true,                    // optional, default false
}
```

### Create a conference post

1. Create `astro/src/content/conferences/YYYY-MM-DD-slug.md`
2. Required frontmatter:
   ```yaml
   ---
   title: Title of your conference
   description: Description for SEO
   author: conference_speaker
   tags: [example, of, tags]
   eventName: Event Name
   eventUrl: https://...
   slideshareKey: <key>  # optional
   youtubeId: <yt-id>    # optional
   ---
   ```
3. Add content below the frontmatter.

## Add an Author

Edit `astro/src/data/authors.ts` to add an author (sorted alphabetically).

Authors have: `name`, `url` (optional), `avatar` (optional — path under `astro/public/images/avatar/`).

## Migrating Legacy Posts

The Jekyll source is preserved in git history. See:
- `astro/scripts/migrate-jekyll.ts` — the original migration script
- `astro/REVIEW.md` — the pixel-parity review checklist used during cutover
- `ROLLBACK.md` — rollback procedure if cutover needs reversal

## PR Workflow

- All PRs run `integration.yml` CI: `npm ci`, `astro check`, `npm run build`, `verify-urls.mjs`
- On merge to master: `deployment.yml` deploys to GitHub Pages via `withastro/action`
- PR previews are currently being evaluated post-cutover (see `.omo/notes/amplify-decision.md`)

Don't hesitate to share your new post in **#proj-blog-tech-bedrock** Slack to ask for reviews.
When you have 2 approves and no change requested, you can merge your Pull Request.

## Need help?

Open an issue or ping the team on Slack.
