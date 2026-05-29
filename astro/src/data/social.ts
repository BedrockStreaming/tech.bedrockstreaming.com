export interface SocialPlatform {
  name: string;
  icon: string;
  urlTemplate: (url: string, title: string) => string;
  enabled: boolean;
}

export const socialPlatforms: SocialPlatform[] = [
  {
    name: 'email',
    icon: 'fas fa-envelope',
    urlTemplate: (url, title) =>
      `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(url)}`,
    enabled: true,
  },
  {
    name: 'linkedin',
    icon: 'fab fa-linkedin',
    urlTemplate: (url, title) =>
      `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}&summary=&source=${encodeURIComponent(url)}`,
    enabled: true,
  },
  {
    name: 'twitter',
    icon: 'fab fa-twitter',
    urlTemplate: (url, title) =>
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}%20${encodeURIComponent(url)}`,
    enabled: true,
  },
  {
    name: 'facebook',
    icon: 'fab fa-facebook-square',
    urlTemplate: (url) => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    enabled: false,
  },
  {
    name: 'tumblr',
    icon: 'fab fa-tumblr-square',
    urlTemplate: (url, title) =>
      `https://www.tumblr.com/share?v=3&u=${encodeURIComponent(url)}&quote=${encodeURIComponent(title)}&s=`,
    enabled: false,
  },
  {
    name: 'pinterest',
    icon: 'fab fa-pinterest-square',
    urlTemplate: (url, title) =>
      `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(url)}&media=&description=${encodeURIComponent(title)}`,
    enabled: false,
  },
  {
    name: 'pocket',
    icon: 'fab fa-get-pocket',
    urlTemplate: (url, title) =>
      `https://getpocket.com/save?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`,
    enabled: false,
  },
  {
    name: 'reddit',
    icon: 'fab fa-reddit-square',
    urlTemplate: (url, title) =>
      `https://www.reddit.com/submit?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`,
    enabled: false,
  },
  {
    name: 'wordpress',
    icon: 'fab fa-wordpress',
    urlTemplate: (url, title) =>
      `https://wordpress.com/press-this.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(title)}&s=`,
    enabled: false,
  },
];

export const rssEnabled = true;
export const feedPath = '/feed.xml';
