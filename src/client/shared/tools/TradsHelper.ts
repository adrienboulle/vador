const RAW_TRADS = {
  meta_title_home: {
    fr: 'Adrien Boullé - Freelance Conception Web | adrien.tech',
    en: 'Adrien Boullé - Freelance Web Conception | adrien.tech',
  },
  meta_description_home: {
    fr: 'Je suis disponible pour vous accompagner tout au long de vos projets web, de la conception à la mise en production.',
    en: 'I\'m available for your web projets, from conception to production.',
  },
  meta_title_contact: {
    fr: 'Contact | adrien.tech',
    en: 'Contact | adrien.tech',
  },
  meta_description_contact: {
    fr: 'Contactez-moi pour toutes vos demandes d\'information, propositions ou établissement de devis gratuit.',
    en: 'Contact me for all kind of requests, propositions or free estimations.',
  },
  home_h1: {
    fr: 'Vous cherchez un développeur polyvalent ?',
    en: 'You need a fullstack developer ?',
  },
  contact_h1: {
    fr: 'Contactez-moi pour toute demande.',
    en: 'Contact me for any request',
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
