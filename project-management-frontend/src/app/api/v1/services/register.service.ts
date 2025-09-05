/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { registerSystemAuthorization$Json } from '../fn/register/register-system-authorization-json';
import { RegisterSystemAuthorization$Json$Params } from '../fn/register/register-system-authorization-json';
import { registerSystemAuthorization$Plain } from '../fn/register/register-system-authorization-plain';
import { RegisterSystemAuthorization$Plain$Params } from '../fn/register/register-system-authorization-plain';
import { UserInfoResult } from '../models/user-info-result';

@Injectable({ providedIn: 'root' })
export class RegisterService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `registerSystemAuthorization()` */
  static readonly RegisterSystemAuthorizationPath = '/api/Register/SystemAuthorization';

  /**
   * API系統登入驗證.
   *
   * API系統驗證
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `registerSystemAuthorization$Plain()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  registerSystemAuthorization$Plain$Response(params?: RegisterSystemAuthorization$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<UserInfoResult>> {
    return registerSystemAuthorization$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * API系統登入驗證.
   *
   * API系統驗證
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `registerSystemAuthorization$Plain$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  registerSystemAuthorization$Plain(params?: RegisterSystemAuthorization$Plain$Params, context?: HttpContext): Observable<UserInfoResult> {
    return this.registerSystemAuthorization$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<UserInfoResult>): UserInfoResult => r.body)
    );
  }

  /**
   * API系統登入驗證.
   *
   * API系統驗證
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `registerSystemAuthorization$Json()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  registerSystemAuthorization$Json$Response(params?: RegisterSystemAuthorization$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<UserInfoResult>> {
    return registerSystemAuthorization$Json(this.http, this.rootUrl, params, context);
  }

  /**
   * API系統登入驗證.
   *
   * API系統驗證
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `registerSystemAuthorization$Json$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  registerSystemAuthorization$Json(params?: RegisterSystemAuthorization$Json$Params, context?: HttpContext): Observable<UserInfoResult> {
    return this.registerSystemAuthorization$Json$Response(params, context).pipe(
      map((r: StrictHttpResponse<UserInfoResult>): UserInfoResult => r.body)
    );
  }

}
