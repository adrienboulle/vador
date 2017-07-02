// tslint:disable:interface-name

'use strict';

import { CusRequest } from './CusRequest';

const pages: any = {
  '/': {
    title: {
      fr: 'Adrien Boullé - freelance conception web | adrien.tech',
      en: 'Adrien Boullé - freelance web conception | adrien.tech',
    },
    description: {
      fr: 'Je suis disponible pour vous accompagner tout au long de vos projets web, de la conception à la mise en production.',
      en: 'I\'m available for your web projets, from, conception to production.',
    },
  },
  '/contact': {
    title: {
      fr: 'Contact | adrien.tech',
      en: 'Contact | adrien.tech',
    },
    description: {
      fr: 'Contactez-moi pour toutes vos demandes d\'information, propositions ou d\'établissement de devis gratuit.',
      en: 'Contact me for all kind of requests, propositions or free estimations.',
    },
  },
};

export function getPageData(url: string, lang: string = 'fr'): any {
  url = url.split('?')[0];

  if (url[0] !== '/') {
    url = '/' + url;
  }

  const pageData = {};

  Object.keys(pages[url]).forEach(key => {
    pageData[key] = pages[url][key][lang];
  });

  return pageData;
}

export namespace MetaHelper {
  export function getMeta(req: CusRequest): any {
    const path = req.url.split('?')[0];
    const pageData = getPageData(path, req.cusContext.lang);

    return [
      {
        type: 'charset',
        value: 'UTF-8',
      },
      {
        type: 'robots',
        value: 'all',
      },
      {
        type: 'title',
        value: pageData.title,
      },
      {
        type: 'description',
        value: pageData.description,
      },
      {
        type: 'author',
        value: 'adrien.tech',
      },
      {
        type: 'canonical',
        value: 'https://www.adrien.tech' + path,
      },
    ];
  }
}
