import { unified } from '@astrojs/markdown-remark';
import { defineConfig } from 'astro/config';
import { markdownOptions } from './src/lib/remark-kramdown.mjs';

export default defineConfig({
  site: 'https://tech.bedrockstreaming.com',
  build: { format: 'preserve' },
  markdown: { processor: unified(markdownOptions), shikiConfig: markdownOptions.shikiConfig },
  vite: {
    css: {
      // _sass/ is compiled unchanged: silence its deprecations and strip its old IE hacks (`*zoom`).
      preprocessorOptions: { scss: { silenceDeprecations: ['import', 'slash-div', 'global-builtin'] } },
      lightningcss: { errorRecovery: true },
    },
  },
});
