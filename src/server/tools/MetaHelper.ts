// tslint:disable:interface-name

'use strict';

import { CusRequest } from './CusRequest';

import { ROUTES_DATA } from '../../shared/routes';

import { RAW_TRADS, TradsHelper } from '../../client/shared/tools/TradsHelper';

export const pagesData: any = {
  '/': {
    title: 'home_meta_title',
    description: 'home_meta_description',
  },
  '/contact': {
    title: 'contact_meta_title',
    description: 'contact_meta_description',
  },
  '/skills': {
    title: 'skills_meta_title',
    description: 'skills_meta_description',
  },
  '/competences': {
    title: 'skills_meta_title',
    description: 'skills_meta_description',
  },
};

export namespace MetaHelper {
  export function getPageData(url: string): any {
    let path = url.split('?')[0];

    if (path.indexOf('/') !== 0) {
      path = '/' + path;
    }

    return pagesData[path];
  }

  export function getMeta(req: CusRequest): any {
    let path = req.url.split('?')[0];

    const pageData = getPageData(path);
    const trads = TradsHelper.getTrads(req.cusContext.lang);

    const canonical = 'https://www.adrien.tech' + req.cusContext.baseHref.slice(0, -1) + path;
    const alternate = [];

    for (let lang in RAW_TRADS.html_lang) {
      if (lang === req.cusContext.lang) {
        continue;
      }

      alternate.push({
        type: 'alternate',
        value: {
          href: 'https://www.adrien.tech/' + (lang === 'fr' ? '' : lang + '/') + ROUTES_DATA[path === '/' ? 'void' : path.substr(1)][lang],
          hreflang: RAW_TRADS.html_lang[lang],
        },
      });
    }

    return [
      {
        type: 'charset',
        value: 'UTF-8',
      },
      {
        type: 'lang',
        value: trads.html_lang,
      },
      {
        type: 'robots',
        value: 'all',
      },
      {
        type: 'title',
        value: trads[pageData.title],
      },
      {
        type: 'description',
        value: trads[pageData.description],
      },
      {
        type: 'author',
        value: 'adrien.tech',
      },
      {
        type: 'canonical',
        value: canonical,
      },
      ...alternate,
    ];
  }
}
