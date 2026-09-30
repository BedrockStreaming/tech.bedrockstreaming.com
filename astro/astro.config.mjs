import { cpSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'astro/config';

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
});
