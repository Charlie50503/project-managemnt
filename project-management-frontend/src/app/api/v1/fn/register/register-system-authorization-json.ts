/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { RegisterDto } from '../../models/register-dto';
import { UserInfoResult } from '../../models/user-info-result';

export interface RegisterSystemAuthorization$Json$Params {
  
    /**
     * 登入參數
     */
    body?: RegisterDto
}

export function registerSystemAuthorization$Json(http: HttpClient, rootUrl: string, params?: RegisterSystemAuthorization$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<UserInfoResult>> {
  const rb = new RequestBuilder(rootUrl, registerSystemAuthorization$Json.PATH, 'post');
  if (params) {
    rb.body(params.body, 'application/*+json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'text/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<UserInfoResult>;
    })
  );
}

registerSystemAuthorization$Json.PATH = '/api/Register/SystemAuthorization';
