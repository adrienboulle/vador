'use strict';

import { Response, NextFunction } from 'express';
import { CusRequest } from '../tools/CusRequest';

export const letsencrypt = (req: CusRequest, res: Response, next: NextFunction) => {
  if (req.url.indexOf('.well-know') !== -1) {
    return res.sendFile(req.url, { root: '.' });
  }

  next();
};
