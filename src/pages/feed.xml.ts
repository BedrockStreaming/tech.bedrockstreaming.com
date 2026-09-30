import type { APIRoute } from 'astro';
import { absoluteUrl, articlePages, excerpt, site } from '../lib/site';

const escape = (text: string) =>
  text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');
const plain = (html: string) => html.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
const time = (date: Date) => date.toISOString().replace('.000Z', '+00:00');

// Same shape as the Jekyll feed.xml; entry ids stay the permalink without .html so readers don't see duplicates.
export const GET: APIRoute = async () => {
  const [articles] = await articlePages();
  const entries = await Promise.all(
    articles.map(async (article) => {
      const link = absoluteUrl(article.data.permalink);
      const summary = article.data.description || plain(await excerpt(article));
      return `  <entry>
    <title type="html">${escape(plain(article.data.title))}</title>
    <link href="${link}" rel="alternate" type="text/html" title="${escape(article.data.title)}" />
    <published>${time(article.data.date)}</published>
    <updated>${time(article.data.date)}</updated>
    <id>${escape(link.replace(/\.html$/, ''))}</id>
    <content type="html" xml:base="${escape(link)}">${escape((article.rendered?.html ?? '').trim())}</content>
${summary ? `    <summary type="html">${escape(summary)}</summary>\n` : ''}  </entry>`;
    }),
  );
  const feed = `<?xml version="1.0" encoding="utf-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <generator uri="https://astro.build/">Astro</generator>
  <link href="${absoluteUrl('feed.xml')}" rel="self" type="application/atom+xml" />
  <link href="${absoluteUrl('')}" rel="alternate" type="text/html" />
  <updated>${time(new Date(new Date().setMilliseconds(0)))}</updated>
  <id>${absoluteUrl('feed.xml')}</id>
  <title type="html">${escape(site.title)}</title>
  <subtitle>${escape(site.description)}</subtitle>
${entries.join('\n')}
</feed>
`;
  return new Response(feed, { headers: { 'Content-Type': 'application/atom+xml' } });
};
