import { Response } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { AppConfig } from '../config/config';

export class AbstractService {
  constructor(protected _url: string, protected _config: AppConfig) {}

  protected _extractData(res: Response): Promise<any> {
    let body = res.json();

    if (body.status === 'OK')
      return Promise.resolve(body.data);

    if (body.status === 'ERROR')
      return Promise.reject(body);

    return Promise.resolve(body);
  }

  protected _handleError(error: Response | any): any {
    return Promise.reject(error);
  }

  protected getUrl(): string {
    return this._config.URL() + this._url;
  }
}
