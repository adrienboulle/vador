'use strict';

import { Response, NextFunction } from 'express';
import { CusRequest } from '../tools/CusRequest';

export const context = (req: CusRequest, res: Response, next: NextFunction) => {
  const hostname = req.header('host').split(':')[0].toLowerCase();

  req.cusContext = {
    hostname,
    baseHref: '/',
  };

  next();
};
