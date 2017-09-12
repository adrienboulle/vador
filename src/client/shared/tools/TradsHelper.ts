export const RAW_TRADS = {
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
    fr: 'Je réalise vos projets !',
    en: 'I make your projects a reality!',
  },
  home_h2_prop: {
    fr: 'Vous cherchez un développeur polyvalent ?',
    en: 'You need a fullstack developer ?',
  },
  home_p_prop: {
    fr: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi non quis exercitationem culpa nesciunt nihil aut nostrum explicabo reprehenderit optio amet ab temporibus asperiores quasi cupiditate. Voluptatum ducimus voluptates voluptas?',
    en: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi non quis exercitationem culpa nesciunt nihil aut nostrum explicabo reprehenderit optio amet ab temporibus asperiores quasi cupiditate. Voluptatum ducimus voluptates voluptas?',
  },
  home_h2_price: {
    fr: 'Tarif',
    en: 'Price',
  },
  home_p_price_1: {
    fr: 'A ce jour j\'ai un statut d\'auto-entrepreneur.',
    en: 'My status allow me not to charge VAT.',
  },
  home_p_price_2: {
    fr: 'Mon tarif est de 350€ par jour',
    en: 'I charge 350€ a day',
  },
  home_h2_project: {
    fr: 'Vos projets',
    en: 'Your project',
  },
  home_p_project: {
    fr: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi non quis exercitationem culpa nesciunt nihil aut nostrum explicabo reprehenderit optio amet ab temporibus asperiores quasi cupiditate. Voluptatum ducimus voluptates voluptas?',
    en: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi non quis exercitationem culpa nesciunt nihil aut nostrum explicabo reprehenderit optio amet ab temporibus asperiores quasi cupiditate. Voluptatum ducimus voluptates voluptas?',
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

  // AJS
  ajs_meta_title: {
    fr: 'AJS | adrien.tech',
    en: 'AJS | adrien.tech',
  },
  ajs_meta_description: {
    fr: 'AJS bac à sable.',
    en: 'AJS sandbox.',
  },
  ajs_h1: {
    fr: 'Testez AJS !',
    en: 'test AJS!',
  },
  ajs_nav_link: {
    fr: '/ajs',
    en: '/ajs',
  },

  // FOOTER
  footer_about_h5: {
    fr: 'A propos',
    en: 'About me',
  },
  footer_about_p: {
    fr: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi non quis exercitationem culpa nesciunt nihil aut nostrum explicabo reprehenderit optio amet ab temporibus asperiores quasi cupiditate. Voluptatum ducimus voluptates voluptas?',
    en: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi non quis exercitationem culpa nesciunt nihil aut nostrum explicabo reprehenderit optio amet ab temporibus asperiores quasi cupiditate. Voluptatum ducimus voluptates voluptas?',
  },
  footer_langs_h5: {
    fr: 'Autres langues',
    en: 'Other languages',
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
