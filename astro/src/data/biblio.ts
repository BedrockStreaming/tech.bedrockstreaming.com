export interface BiblioEntry {
  key: string;
  authors: string;
  title: string;
}

export const biblio: Record<string, BiblioEntry> = {
  ref1: {
    key: 'ref1',
    authors: 'John Smith',
    title: 'A Title About Citations',
  },
  highlight: {
    key: 'highlight',
    authors: "Michael's Rose",
    title: '[Minimal Mistakes](https://mmistakes.github.io/minimal-mistakes/markup-syntax-highlighting)',
  },
};
