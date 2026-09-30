import GithubSlugger from 'github-slugger';

// The kramdown features the Articles still use: `{:toc}`, and `{:target="_blank"}` on links.

const attributeList = /^\{:\s*([^}]*)\}/;

function text(node) {
  if (node.type === 'text' || node.type === 'inlineCode') return node.value;
  return (node.children ?? []).map(text).join('');
}

function applyLinkAttributes(parent) {
  parent.children?.forEach((node, index) => {
    const previous = parent.children[index - 1];
    const match = node.type === 'text' && previous?.type === 'link' && node.value.match(attributeList);
    if (match) {
      const properties = {};
      for (const [, key, value] of match[1].matchAll(/([\w-]+)="([^"]*)"/g)) properties[key] = value;
      previous.data = { ...previous.data, hProperties: { ...previous.data?.hProperties, ...properties } };
      node.value = node.value.slice(match[0].length);
    }
    applyLinkAttributes(node);
  });
}

function isTocMarker(node) {
  return node.type === 'list' && node.children.length === 1 && /^TOC\s*\{:toc\}$/.test(text(node).trim());
}

function tocList(headings) {
  const root = { type: 'list', ordered: false, spread: false, children: [], data: { hProperties: { id: 'markdown-toc' } } };
  const stack = [{ depth: 0, list: root }];
  for (const { depth, id, label } of headings) {
    while (stack.length > 1 && stack.at(-1).depth >= depth) stack.pop();
    const parentList = stack.at(-1).list;
    const item = {
      type: 'listItem',
      spread: false,
      children: [
        {
          type: 'paragraph',
          children: [{ type: 'link', url: `#${id}`, children: [{ type: 'text', value: label }], data: { hProperties: { id: `markdown-toc-${id}` } } }],
        },
      ],
    };
    parentList.children.push(item);
    const list = { type: 'list', ordered: false, spread: false, children: [] };
    item.children.push(list);
    stack.push({ depth, list });
  }
  const prune = (list) => list.children.forEach((item) => {
    const nested = item.children[1];
    if (nested.children.length) prune(nested);
    else item.children.pop();
  });
  prune(root);
  return root;
}

export default function remarkKramdown() {
  return (tree) => {
    // Jekyll parses GFM, so heading ids follow GitHub's slugs; the TOC needs them before Astro assigns them.
    const slugger = new GithubSlugger();
    const headings = [];
    for (const node of tree.children) {
      if (node.type !== 'heading') continue;
      const id = slugger.slug(text(node));
      node.data = { ...node.data, hProperties: { ...node.data?.hProperties, id } };
      headings.push({ depth: node.depth, id, label: text(node) });
    }
    tree.children = tree.children.map((node) => (isTocMarker(node) ? tocList(headings) : node));
    applyLinkAttributes(tree);
  };
}
