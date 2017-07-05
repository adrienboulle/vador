'use strict';

import { Response, NextFunction } from 'express';
import { CusRequest } from '../tools/CusRequest';

export const redirects = (req: CusRequest, res: Response, next: NextFunction) => {
  if (req.url !== '/' && !req.url.endsWith('/')) {
    return res.redirect(301, req.url + '/');
  }

  next();
};
