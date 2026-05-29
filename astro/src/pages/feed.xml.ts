import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const [blog, conferences, videos] = await Promise.all([
    getCollection('blog'),
    getCollection('conferences'),
    getCollection('videos'),
  ]);

  const allPosts = [...blog, ...conferences, ...videos]
    .filter(p => p.data.date)
    .sort((a, b) => new Date(b.data.date!).getTime() - new Date(a.data.date!).getTime());

  function getPostUrl(post: (typeof allPosts)[0]): string {
    if (post.data.permalinkOverride) {
      let p = post.data.permalinkOverride;
      if (!p.startsWith('/')) p = '/' + p;
      if (!p.endsWith('/')) p = p + '/';
      return p;
    }
    const date = new Date(post.data.date!);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const slug = post.id.replace(/\.(md|mdx)$/, '').replace(/^\d{4}-\d{2}-\d{2}-/, '');
    return `/${year}/${month}/${day}/${slug}/`;
  }

  return rss({
    title: 'Bedrock Tech Blog',
    description: 'Blog technique de Bedrock',
    site: context.site!,
    items: allPosts.map(post => ({
      title: post.data.title,
      pubDate: new Date(post.data.date!),
      description: post.data.description ?? '',
      link: getPostUrl(post),
    })),
  });
}
