import { cpSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { unified } from '@astrojs/markdown-remark';
import { defineConfig } from 'astro/config';
import remarkKramdown from './src/lib/remark-kramdown.mjs';

const repoRoot = new URL('../', import.meta.url);

// assets/ and images/ live at the repository root; Articles link to them by absolute URL.
const copyStaticFolders = {
  name: 'copy-static-folders',
  hooks: {
    'astro:build:done': ({ dir }) => {
      for (const folder of ['assets', 'images']) {
        cpSync(new URL(`${folder}/`, repoRoot), new URL(`${folder}/`, dir), {
          recursive: true,
          filter: (source) => !source.includes('node_modules'),
        });
      }
    },
  },
};

export default defineConfig({
  site: 'https://tech.bedrockstreaming.com',
  integrations: [copyStaticFolders],
  build: { format: 'file' },
  markdown: { processor: unified({ remarkPlugins: [remarkKramdown] }) },
  vite: {
    css: {
      // _sass/ is compiled unchanged: silence its deprecations and strip its old IE hacks (`*zoom`).
      preprocessorOptions: { scss: { silenceDeprecations: ['import', 'slash-div', 'global-builtin'] } },
      lightningcss: { errorRecovery: true },
    },
  },
});
