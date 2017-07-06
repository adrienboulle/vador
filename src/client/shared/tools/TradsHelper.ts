const RAW_TRADS = {
  html_lang: {
    fr: 'fr-FR',
    en: 'en',
  },

  // HOME
  home_meta_title: {
    fr: 'Adrien Boullé - Freelance Conception Web | adrien.tech',
    en: 'Adrien Boullé - Freelance Web Conception | adrien.tech',
  },
  home_meta_description: {
    fr: 'Je suis disponible pour vous accompagner tout au long de vos projets web, de la conception à la mise en production.',
    en: 'I\'m available for your web projets, from conception to production.',
  },
  home_h1: {
    fr: 'Vous cherchez un développeur polyvalent ?',
    en: 'You need a fullstack developer ?',
  },
  home_nav: {
    fr: 'Accueil',
    en: 'Home',
  },
  home_nav_link: {
    fr: '/',
    en: '/',
  },

  // CONTACT
  contact_meta_title: {
    fr: 'Contact | adrien.tech',
    en: 'Contact | adrien.tech',
  },
  contact_meta_description: {
    fr: 'Contactez-moi pour toutes vos demandes d\'information, propositions ou établissement de devis gratuit.',
    en: 'Contact me for all kind of requests, propositions or free estimations.',
  },
  contact_h1: {
    fr: 'Contactez-moi pour toute demande.',
    en: 'Contact me for any request.',
  },
  contact_nav: {
    fr: 'Contact',
    en: 'Contact',
  },
  contact_nav_link: {
    fr: '/contact',
    en: '/contact',
  },

  // SKILLS
  skills_meta_title: {
    fr: 'Compétences | adrien.tech',
    en: 'Skills | adrien.tech',
  },
  skills_meta_description: {
    fr: 'Mes compétences.',
    en: 'My skills.',
  },
  skills_h1: {
    fr: 'Mes compétences.',
    en: 'My skills.',
  },
  skills_nav: {
    fr: 'Compétences',
    en: 'Skills',
  },
  skills_nav_link: {
    fr: '/competences',
    en: '/skills',
  },
};

export namespace TradsHelper {
  export function getTrads(lang: any): any {
    if (RAW_TRADS[lang]) {
      return RAW_TRADS[lang];
    }

    const trads = {};

    Object.keys(RAW_TRADS).forEach(key => {
      trads[key] = RAW_TRADS[key][lang];
    });

    RAW_TRADS[lang] = trads;

    return trads;
  }
}
