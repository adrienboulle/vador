// tslint:disable:interface-name

'use strict';

import { Request } from 'express';

export interface CusRequest extends Request {
  cusContext: any;
  session: any;
}
