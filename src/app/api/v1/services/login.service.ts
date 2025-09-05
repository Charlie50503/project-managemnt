/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { AResult } from '../models/a-result';
import { JwtUserInfo } from '../models/jwt-user-info';
import { loginAuthorizeJwtUser$Json } from '../fn/login/login-authorize-jwt-user-json';
import { LoginAuthorizeJwtUser$Json$Params } from '../fn/login/login-authorize-jwt-user-json';
import { loginAuthorizeJwtUser$Plain } from '../fn/login/login-authorize-jwt-user-plain';
import { LoginAuthorizeJwtUser$Plain$Params } from '../fn/login/login-authorize-jwt-user-plain';
import { loginAuthorizeUser$Json } from '../fn/login/login-authorize-user-json';
import { LoginAuthorizeUser$Json$Params } from '../fn/login/login-authorize-user-json';
import { loginAuthorizeUser$Plain } from '../fn/login/login-authorize-user-plain';
import { LoginAuthorizeUser$Plain$Params } from '../fn/login/login-authorize-user-plain';
import { loginAuthorizeWithJwt$Json } from '../fn/login/login-authorize-with-jwt-json';
import { LoginAuthorizeWithJwt$Json$Params } from '../fn/login/login-authorize-with-jwt-json';
import { loginAuthorizeWithJwt$Plain } from '../fn/login/login-authorize-with-jwt-plain';
import { LoginAuthorizeWithJwt$Plain$Params } from '../fn/login/login-authorize-with-jwt-plain';
import { loginCheckJwtAuthorized$Json } from '../fn/login/login-check-jwt-authorized-json';
import { LoginCheckJwtAuthorized$Json$Params } from '../fn/login/login-check-jwt-authorized-json';
import { loginCheckJwtAuthorized$Plain } from '../fn/login/login-check-jwt-authorized-plain';
import { LoginCheckJwtAuthorized$Plain$Params } from '../fn/login/login-check-jwt-authorized-plain';
import { loginCheckWindowsAuthorized$Json } from '../fn/login/login-check-windows-authorized-json';
import { LoginCheckWindowsAuthorized$Json$Params } from '../fn/login/login-check-windows-authorized-json';
import { loginCheckWindowsAuthorized$Plain } from '../fn/login/login-check-windows-authorized-plain';
import { LoginCheckWindowsAuthorized$Plain$Params } from '../fn/login/login-check-windows-authorized-plain';
import { loginTestEnum$Json } from '../fn/login/login-test-enum-json';
import { LoginTestEnum$Json$Params } from '../fn/login/login-test-enum-json';
import { loginTestEnum$Plain } from '../fn/login/login-test-enum-plain';
import { LoginTestEnum$Plain$Params } from '../fn/login/login-test-enum-plain';
import { loginWindowsLogin$Json } from '../fn/login/login-windows-login-json';
import { LoginWindowsLogin$Json$Params } from '../fn/login/login-windows-login-json';
import { loginWindowsLogin$Plain } from '../fn/login/login-windows-login-plain';
import { LoginWindowsLogin$Plain$Params } from '../fn/login/login-windows-login-plain';
import { UserInfo } from '../models/user-info';

@Injectable({ providedIn: 'root' })
export class LoginService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `loginCheckWindowsAuthorized()` */
  static readonly LoginCheckWindowsAuthorizedPath = '/api/Login/CheckWindowsAuthorized';

  /**
   * 確認登入(windows).
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `loginCheckWindowsAuthorized$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  loginCheckWindowsAuthorized$Plain$Response(params?: LoginCheckWindowsAuthorized$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<boolean>> {
    return loginCheckWindowsAuthorized$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * 確認登入(windows).
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `loginCheckWindowsAuthorized$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  loginCheckWindowsAuthorized$Plain(params?: LoginCheckWindowsAuthorized$Plain$Params, context?: HttpContext): Observable<boolean> {
    return this.loginCheckWindowsAuthorized$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<boolean>): boolean => r.body)
    );
  }

  /**
   * 確認登入(windows).
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `loginCheckWindowsAuthorized$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  loginCheckWindowsAuthorized$Json$Response(params?: LoginCheckWindowsAuthorized$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<boolean>> {
    return loginCheckWindowsAuthorized$Json(this.http, this.rootUrl, params, context);
  }

  /**
   * 確認登入(windows).
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `loginCheckWindowsAuthorized$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  loginCheckWindowsAuthorized$Json(params?: LoginCheckWindowsAuthorized$Json$Params, context?: HttpContext): Observable<boolean> {
    return this.loginCheckWindowsAuthorized$Json$Response(params, context).pipe(
      map((r: StrictHttpResponse<boolean>): boolean => r.body)
    );
  }

  /** Path part for operation `loginCheckJwtAuthorized()` */
  static readonly LoginCheckJwtAuthorizedPath = '/api/Login/CheckJwtAuthorized';

  /**
   * 確認登入(JWT).
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `loginCheckJwtAuthorized$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  loginCheckJwtAuthorized$Plain$Response(params?: LoginCheckJwtAuthorized$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<boolean>> {
    return loginCheckJwtAuthorized$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * 確認登入(JWT).
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `loginCheckJwtAuthorized$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  loginCheckJwtAuthorized$Plain(params?: LoginCheckJwtAuthorized$Plain$Params, context?: HttpContext): Observable<boolean> {
    return this.loginCheckJwtAuthorized$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<boolean>): boolean => r.body)
    );
  }

  /**
   * 確認登入(JWT).
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `loginCheckJwtAuthorized$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  loginCheckJwtAuthorized$Json$Response(params?: LoginCheckJwtAuthorized$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<boolean>> {
    return loginCheckJwtAuthorized$Json(this.http, this.rootUrl, params, context);
  }

  /**
   * 確認登入(JWT).
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `loginCheckJwtAuthorized$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  loginCheckJwtAuthorized$Json(params?: LoginCheckJwtAuthorized$Json$Params, context?: HttpContext): Observable<boolean> {
    return this.loginCheckJwtAuthorized$Json$Response(params, context).pipe(
      map((r: StrictHttpResponse<boolean>): boolean => r.body)
    );
  }

  /** Path part for operation `loginWindowsLogin()` */
  static readonly LoginWindowsLoginPath = '/api/Login/WindowsLogin';

  /**
   * Windows登入驗證.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `loginWindowsLogin$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  loginWindowsLogin$Plain$Response(params?: LoginWindowsLogin$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<UserInfo>> {
    return loginWindowsLogin$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * Windows登入驗證.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `loginWindowsLogin$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  loginWindowsLogin$Plain(params?: LoginWindowsLogin$Plain$Params, context?: HttpContext): Observable<UserInfo> {
    return this.loginWindowsLogin$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<UserInfo>): UserInfo => r.body)
    );
  }

  /**
   * Windows登入驗證.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `loginWindowsLogin$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  loginWindowsLogin$Json$Response(params?: LoginWindowsLogin$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<UserInfo>> {
    return loginWindowsLogin$Json(this.http, this.rootUrl, params, context);
  }

  /**
   * Windows登入驗證.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `loginWindowsLogin$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  loginWindowsLogin$Json(params?: LoginWindowsLogin$Json$Params, context?: HttpContext): Observable<UserInfo> {
    return this.loginWindowsLogin$Json$Response(params, context).pipe(
      map((r: StrictHttpResponse<UserInfo>): UserInfo => r.body)
    );
  }

  /** Path part for operation `loginAuthorizeUser()` */
  static readonly LoginAuthorizeUserPath = '/api/Login/AuthorizeUser';

  /**
   * 登入驗證.
   *
   * 登入驗證
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `loginAuthorizeUser$Plain()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  loginAuthorizeUser$Plain$Response(params?: LoginAuthorizeUser$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<UserInfo>> {
    return loginAuthorizeUser$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * 登入驗證.
   *
   * 登入驗證
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `loginAuthorizeUser$Plain$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  loginAuthorizeUser$Plain(params?: LoginAuthorizeUser$Plain$Params, context?: HttpContext): Observable<UserInfo> {
    return this.loginAuthorizeUser$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<UserInfo>): UserInfo => r.body)
    );
  }

  /**
   * 登入驗證.
   *
   * 登入驗證
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `loginAuthorizeUser$Json()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  loginAuthorizeUser$Json$Response(params?: LoginAuthorizeUser$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<UserInfo>> {
    return loginAuthorizeUser$Json(this.http, this.rootUrl, params, context);
  }

  /**
   * 登入驗證.
   *
   * 登入驗證
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `loginAuthorizeUser$Json$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  loginAuthorizeUser$Json(params?: LoginAuthorizeUser$Json$Params, context?: HttpContext): Observable<UserInfo> {
    return this.loginAuthorizeUser$Json$Response(params, context).pipe(
      map((r: StrictHttpResponse<UserInfo>): UserInfo => r.body)
    );
  }

  /** Path part for operation `loginAuthorizeJwtUser()` */
  static readonly LoginAuthorizeJwtUserPath = '/api/Login/AuthorizeJwtUser';

  /**
   * 登入驗證.
   *
   * 登入驗證(驗證成功僅傳回Jwt Token)
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `loginAuthorizeJwtUser$Plain()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  loginAuthorizeJwtUser$Plain$Response(params?: LoginAuthorizeJwtUser$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<JwtUserInfo>> {
    return loginAuthorizeJwtUser$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * 登入驗證.
   *
   * 登入驗證(驗證成功僅傳回Jwt Token)
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `loginAuthorizeJwtUser$Plain$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  loginAuthorizeJwtUser$Plain(params?: LoginAuthorizeJwtUser$Plain$Params, context?: HttpContext): Observable<JwtUserInfo> {
    return this.loginAuthorizeJwtUser$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<JwtUserInfo>): JwtUserInfo => r.body)
    );
  }

  /**
   * 登入驗證.
   *
   * 登入驗證(驗證成功僅傳回Jwt Token)
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `loginAuthorizeJwtUser$Json()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  loginAuthorizeJwtUser$Json$Response(params?: LoginAuthorizeJwtUser$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<JwtUserInfo>> {
    return loginAuthorizeJwtUser$Json(this.http, this.rootUrl, params, context);
  }

  /**
   * 登入驗證.
   *
   * 登入驗證(驗證成功僅傳回Jwt Token)
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `loginAuthorizeJwtUser$Json$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  loginAuthorizeJwtUser$Json(params?: LoginAuthorizeJwtUser$Json$Params, context?: HttpContext): Observable<JwtUserInfo> {
    return this.loginAuthorizeJwtUser$Json$Response(params, context).pipe(
      map((r: StrictHttpResponse<JwtUserInfo>): JwtUserInfo => r.body)
    );
  }

  /** Path part for operation `loginAuthorizeWithJwt()` */
  static readonly LoginAuthorizeWithJwtPath = '/api/Login/AuthorizeWithJWT';

  /**
   * 取得登入者資訊.
   *
   * 取得登入者資訊
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `loginAuthorizeWithJwt$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  loginAuthorizeWithJwt$Plain$Response(params?: LoginAuthorizeWithJwt$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<UserInfo>> {
    return loginAuthorizeWithJwt$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * 取得登入者資訊.
   *
   * 取得登入者資訊
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `loginAuthorizeWithJwt$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  loginAuthorizeWithJwt$Plain(params?: LoginAuthorizeWithJwt$Plain$Params, context?: HttpContext): Observable<UserInfo> {
    return this.loginAuthorizeWithJwt$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<UserInfo>): UserInfo => r.body)
    );
  }

  /**
   * 取得登入者資訊.
   *
   * 取得登入者資訊
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `loginAuthorizeWithJwt$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  loginAuthorizeWithJwt$Json$Response(params?: LoginAuthorizeWithJwt$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<UserInfo>> {
    return loginAuthorizeWithJwt$Json(this.http, this.rootUrl, params, context);
  }

  /**
   * 取得登入者資訊.
   *
   * 取得登入者資訊
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `loginAuthorizeWithJwt$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  loginAuthorizeWithJwt$Json(params?: LoginAuthorizeWithJwt$Json$Params, context?: HttpContext): Observable<UserInfo> {
    return this.loginAuthorizeWithJwt$Json$Response(params, context).pipe(
      map((r: StrictHttpResponse<UserInfo>): UserInfo => r.body)
    );
  }

  /** Path part for operation `loginTestEnum()` */
  static readonly LoginTestEnumPath = '/api/Login/TestEnum';

  /**
   * 測試enum的指令.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `loginTestEnum$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  loginTestEnum$Plain$Response(params?: LoginTestEnum$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<AResult>> {
    return loginTestEnum$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * 測試enum的指令.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `loginTestEnum$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  loginTestEnum$Plain(params?: LoginTestEnum$Plain$Params, context?: HttpContext): Observable<AResult> {
    return this.loginTestEnum$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<AResult>): AResult => r.body)
    );
  }

  /**
   * 測試enum的指令.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `loginTestEnum$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  loginTestEnum$Json$Response(params?: LoginTestEnum$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<AResult>> {
    return loginTestEnum$Json(this.http, this.rootUrl, params, context);
  }

  /**
   * 測試enum的指令.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `loginTestEnum$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  loginTestEnum$Json(params?: LoginTestEnum$Json$Params, context?: HttpContext): Observable<AResult> {
    return this.loginTestEnum$Json$Response(params, context).pipe(
      map((r: StrictHttpResponse<AResult>): AResult => r.body)
    );
  }

}
