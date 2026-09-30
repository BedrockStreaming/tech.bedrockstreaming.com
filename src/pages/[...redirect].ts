import type { APIRoute } from 'astro';
import { absoluteUrl, published } from '../lib/site';

// An endpoint writes each redirect_from path as is: "/hsdo/" becomes hsdo/index.html, like jekyll-redirect-from.
export async function getStaticPaths() {
  const entries = [...(await published('articles')), ...(await published('talks'))];
  return entries.flatMap((entry) =>
    (entry.data.redirect_from ?? []).map((from) => {
      const path = from.replace(/^\//, '');
      return {
        params: { redirect: path.endsWith('/') ? `${path}index.html` : path.endsWith('.html') ? path : `${path}.html` },
        props: { target: absoluteUrl(entry.data.permalink) },
      };
    }),
  );
}

export const GET: APIRoute = ({ props }) => {
  const { target } = props;
  const html = `<!DOCTYPE html>
<html lang="en-US">
  <meta charset="utf-8">
  <title>Redirecting&hellip;</title>
  <link rel="canonical" href="${target}">
  <script>location="${target}"</script>
  <meta http-equiv="refresh" content="0; url=${target}">
  <meta name="robots" content="noindex">
  <h1>Redirecting&hellip;</h1>
  <a href="${target}">Click here if you are not redirected.</a>
</html>
`;
  return new Response(html, { headers: { 'Content-Type': 'text/html' } });
};
