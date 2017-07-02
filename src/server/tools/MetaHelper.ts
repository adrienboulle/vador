// tslint:disable:interface-name

'use strict';

import { CusRequest } from './CusRequest';

import { TradsHelper } from '../../client/shared/tools/TradsHelper';

export const pagesData: any = {
  '/': {
    title: 'meta_title_home',
    description: 'meta_description_home',
  },
  '/contact': {
    title: 'meta_title_contact',
    description: 'meta_description_contact',
  },
};

export namespace MetaHelper {
  export function getPageData(url: any): any {
    let path = url.split('?')[0];

    if (path[0] !== '/') {
      path = '/' + path;
    }

    return pagesData[path];
  }

  export function getMeta(req: CusRequest): any {
    let path = req.url.split('?')[0];

    const pageData = getPageData(path);
    const trads = TradsHelper.getTrads(req.cusContext.lang);

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
        value: 'https://www.adrien.tech' + path,
      },
    ];
  }
}
