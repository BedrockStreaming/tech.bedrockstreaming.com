function metaRaw(meta) {
  if (!meta) return '';
  if (typeof meta === 'string') return meta;
  return meta.__raw ?? '';
}

function highlightedLines(raw) {
  const lines = new Set();
  const match = raw.match(/\{([0-9,\-\s]+)\}/);
  if (!match) return lines;
  for (const part of match[1].split(',')) {
    const [start, end] = part.split('-').map((value) => Number(value.trim()));
    if (!Number.isFinite(start)) continue;
    const last = Number.isFinite(end) ? end : start;
    for (let line = start; line <= last; line += 1) lines.add(line);
  }
  return lines;
}

// Filename bar, copy button, and `{1,3-5}` / `[!code highlight]` lines.
export function bedrockCode() {
  return {
    name: 'bedrock-code',
    preprocess(code, options) {
      const highlights = highlightedLines(metaRaw(options.meta));
      const cleaned = code.split('\n').map((line, index) => {
        if (!/\[!code highlight\]/.test(line)) return line;
        highlights.add(index + 1);
        return line.replace(/\s*(?:\/\/|#|--)\s*\[!code highlight\]/, '');
      });
      this.highlighted = highlights;
      return cleaned.join('\n');
    },
    line(node, line) {
      if (!this.highlighted?.has(line)) return;
      const current = node.properties.class;
      const list = Array.isArray(current) ? current : String(current ?? 'line').split(/\s+/).filter(Boolean);
      node.properties.class = [...list, 'highlighted'];
    },
    pre(node) {
      const raw = metaRaw(this.options.meta);
      const title = raw.match(/(?:title|filename)="([^"]+)"/)?.[1];
      const lang = this.options.lang && this.options.lang !== 'plaintext' ? this.options.lang : 'text';
      return {
        type: 'element',
        tagName: 'figure',
        properties: { class: 'code-block' },
        children: [
          {
            type: 'element',
            tagName: 'figcaption',
            properties: { class: 'code-bar' },
            children: [
              {
                type: 'element',
                tagName: 'span',
                properties: { class: 'code-name' },
                children: [{ type: 'text', value: title || lang }],
              },
              {
                type: 'element',
                tagName: 'button',
                properties: { class: 'code-copy', type: 'button' },
                children: [{ type: 'text', value: 'Copy' }],
              },
            ],
          },
          node,
        ],
      };
    },
  };
}
