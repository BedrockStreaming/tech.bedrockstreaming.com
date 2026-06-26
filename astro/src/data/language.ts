export type Locale = 'fr' | 'en';

type LanguageStrings = {
  str_follow_on: string;
  str_rss_follow: string;
  str_share_on: string;
  str_add_to: string;
  str_email: string;
  str_tweet: string;
  str_pin_it: string;
  str_next_post: string;
  str_previous_post: string;
  str_next_page: string;
  str_previous_page: string;
  str_javascript_required_disqus: string;
  str_no_result_found: string;
  str_cookie_approve: string;
  str_cookie_disclaimer: string;
  str_months: readonly string[];
  cusdis_lang: string;
};

const en: LanguageStrings = {
  str_follow_on: 'Follow on',
  str_rss_follow: 'Follow RSS feed',
  str_share_on: 'Share on',
  str_add_to: 'Add to',
  str_email: 'Email',
  str_tweet: 'Tweet',
  str_pin_it: 'Pin it',
  str_next_post: 'Next post',
  str_previous_post: 'Previous post',
  str_next_page: 'Next',
  str_previous_page: 'Prev',
  str_javascript_required_disqus: 'Please enable JavaScript to view comments.',
  str_no_result_found: 'No result found',
  str_cookie_approve: 'Approve',
  str_cookie_disclaimer:
    'We would like to use third party cookies and scripts to improve the functionality of this website.',
  str_months: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ],
  cusdis_lang: '',
};

const fr: LanguageStrings = {
  str_follow_on: 'Suivre sur',
  str_rss_follow: "S'abonner au flux RSS",
  str_share_on: 'Partager sur',
  str_add_to: 'Ajouter à',
  str_email: 'Email',
  str_tweet: 'Tweeter',
  str_pin_it: 'Épingler',
  str_next_post: 'Article suivant',
  str_previous_post: 'Article précédent',
  str_next_page: 'Suivant',
  str_previous_page: 'Précédent',
  str_javascript_required_disqus: 'Veuillez activer JavaScript pour afficher les commentaires.',
  str_no_result_found: 'Aucun résultat',
  str_cookie_approve: 'Accepter',
  str_cookie_disclaimer:
    'Nous souhaitons utiliser des cookies et scripts tiers pour améliorer les fonctionnalités de ce site.',
  str_months: [
    'Janvier',
    'Février',
    'Mars',
    'Avril',
    'Mai',
    'Juin',
    'Juillet',
    'Août',
    'Septembre',
    'Octobre',
    'Novembre',
    'Décembre',
  ],
  cusdis_lang: 'fr',
};

export { en, fr };

export function t(locale: Locale = 'fr') {
  return locale === 'en' ? en : fr;
}
