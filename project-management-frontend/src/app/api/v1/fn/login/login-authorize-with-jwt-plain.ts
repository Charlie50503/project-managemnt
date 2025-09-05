/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { UserInfo } from '../../models/user-info';

export interface LoginAuthorizeWithJwt$Plain$Params {
}

export function loginAuthorizeWithJwt$Plain(http: HttpClient, rootUrl: string, params?: LoginAuthorizeWithJwt$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<UserInfo>> {
  const rb = new RequestBuilder(rootUrl, loginAuthorizeWithJwt$Plain.PATH, 'get');
  if (params) {
  }

  return http.request(
    rb.build({ responseType: 'text', accept: 'text/plain', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<UserInfo>;
    })
  );
}

loginAuthorizeWithJwt$Plain.PATH = '/api/Login/AuthorizeWithJWT';
