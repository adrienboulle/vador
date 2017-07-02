'use strict';

import { Response, NextFunction } from 'express';
import { CusRequest } from '../tools/CusRequest';

import { conf } from '../conf';

export const https = (req: CusRequest, res: Response, next: NextFunction) => {
  if (conf.env.site.secure !== req.secure) {
    return res.redirect(conf.env.site.protocol + conf.env.site.port + conf.env.site.hostname + req.url);
  }

  return next();
};
