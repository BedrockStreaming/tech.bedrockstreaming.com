// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeMermaid from 'rehype-mermaid';
import { unified } from '@astrojs/markdown-remark';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/** @type {Array<{from: string, to: string}>} */
const redirectsData = JSON.parse(
  readFileSync(join(__dirname, 'src/data/redirects.json'), 'utf-8')
);

// Build legacy pagination redirects: /blog/page2 → /blog/page/2
// (last page = ceil(309/10) = 31, so pages 2..31)
const TOTAL_POSTS = 309;
const PAGE_SIZE = 10;
const lastPage = Math.ceil(TOTAL_POSTS / PAGE_SIZE);
const legacyPaginationRedirects = Object.fromEntries(
  Array.from({ length: lastPage - 1 }, (_, i) => i + 2).map(n => [
    `/blog/page${n}`,
    `/blog/page/${n}/`,
  ])
);

// redirect_from entries from migration script
const redirectFromMap = Object.fromEntries(
  redirectsData.map(r => [r.from, r.to])
);

// https://astro.build/config
export default defineConfig({
  site: 'https://tech.bedrockstreaming.com',
  trailingSlash: 'always',
  build: {
    format: 'directory', // emits /path/index.html instead of /path.html
  },
  integrations: [
    sitemap(),
  ],
  markdown: {
    syntaxHighlight: { type: 'shiki', excludeLangs: ['mermaid'] },
    processor: unified({
      remarkPlugins: [remarkMath],
      rehypePlugins: [
        [rehypeKatex, {}],
        [rehypeMermaid, { strategy: 'inline-svg' }],
      ],
    }),
    shikiConfig: {
      themes: {
        light: 'github-light',
        dark: 'github-dark',
      },
      wrap: true,
    },
  },
  redirects: {
    ...legacyPaginationRedirects,
    ...redirectFromMap,
  },
});
