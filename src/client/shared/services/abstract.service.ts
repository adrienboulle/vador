import { HttpResponse } from '@angular/common/http';

import 'rxjs/add/operator/toPromise';

import { AppConfig } from '../config/config';

export class AbstractService {
  constructor(protected _url: string, protected _config: AppConfig) {}

  protected _extractData(res: HttpResponse<any>): Promise<any> {
    if (res.body.status === 'OK')
      return Promise.resolve(res.body.data);

    if (res.body.status === 'ERROR')
      return Promise.reject(res.body);

    return Promise.resolve(res.body);
  }

  protected _handleError(error: Response | any): any {
    return Promise.reject(error);
  }

  protected getUrl(): string {
    return this._config.URL() + this._url;
  }
}
