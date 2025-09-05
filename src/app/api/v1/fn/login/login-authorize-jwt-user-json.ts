/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { JwtUserInfo } from '../../models/jwt-user-info';
import { LoginDto } from '../../models/login-dto';

export interface LoginAuthorizeJwtUser$Json$Params {
      body?: LoginDto
}

export function loginAuthorizeJwtUser$Json(http: HttpClient, rootUrl: string, params?: LoginAuthorizeJwtUser$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<JwtUserInfo>> {
  const rb = new RequestBuilder(rootUrl, loginAuthorizeJwtUser$Json.PATH, 'post');
  if (params) {
    rb.body(params.body, 'application/*+json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'text/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<JwtUserInfo>;
    })
  );
}

loginAuthorizeJwtUser$Json.PATH = '/api/Login/AuthorizeJwtUser';
