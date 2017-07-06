'use strict';

import { Response, NextFunction } from 'express';

import { CusRequest } from './CusRequest';

export const otherLangs: string[] = [
  'en',
];

export const defaultLang: string = 'fr';

export const langHandler = (req: CusRequest, res: Response, next: NextFunction): boolean => {
  const lang = req.params.lang || defaultLang;

  if (req.params.lang && otherLangs.indexOf(req.params.lang) === -1) {
    next();

    return true;
  }

  req.cusContext.lang = lang;

  if (otherLangs.indexOf(lang) !== -1) {
    req.cusContext.baseHref = '/' + lang + '/';
  }

  if (req.originalUrl.indexOf(req.cusContext.baseHref) !== 0) {
    res.redirect(301, req.originalUrl + '/');

    return true;
  }

  return false;
};
