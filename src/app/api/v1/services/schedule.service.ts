/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { scheduleAuthorizeScheduleUser$Json } from '../fn/schedule/schedule-authorize-schedule-user-json';
import { ScheduleAuthorizeScheduleUser$Json$Params } from '../fn/schedule/schedule-authorize-schedule-user-json';
import { scheduleAuthorizeScheduleUser$Plain } from '../fn/schedule/schedule-authorize-schedule-user-plain';
import { ScheduleAuthorizeScheduleUser$Plain$Params } from '../fn/schedule/schedule-authorize-schedule-user-plain';
import { scheduleDailySchedule$Json } from '../fn/schedule/schedule-daily-schedule-json';
import { ScheduleDailySchedule$Json$Params } from '../fn/schedule/schedule-daily-schedule-json';
import { scheduleDailySchedule$Plain } from '../fn/schedule/schedule-daily-schedule-plain';
import { ScheduleDailySchedule$Plain$Params } from '../fn/schedule/schedule-daily-schedule-plain';
import { ScheduleResult } from '../models/schedule-result';
import { scheduleScheduleAuthorization$Json } from '../fn/schedule/schedule-schedule-authorization-json';
import { ScheduleScheduleAuthorization$Json$Params } from '../fn/schedule/schedule-schedule-authorization-json';
import { scheduleScheduleAuthorization$Plain } from '../fn/schedule/schedule-schedule-authorization-plain';
import { ScheduleScheduleAuthorization$Plain$Params } from '../fn/schedule/schedule-schedule-authorization-plain';
import { UserInfoResult } from '../models/user-info-result';

@Injectable({ providedIn: 'root' })
export class ScheduleService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `scheduleScheduleAuthorization()` */
  static readonly ScheduleScheduleAuthorizationPath = '/api/Schedule/ScheduleAuthorization';

  /**
   * API排程登入驗證.
   *
   * API排程驗證
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `scheduleScheduleAuthorization$Plain()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  scheduleScheduleAuthorization$Plain$Response(params?: ScheduleScheduleAuthorization$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<UserInfoResult>> {
    return scheduleScheduleAuthorization$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * API排程登入驗證.
   *
   * API排程驗證
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `scheduleScheduleAuthorization$Plain$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  scheduleScheduleAuthorization$Plain(params?: ScheduleScheduleAuthorization$Plain$Params, context?: HttpContext): Observable<UserInfoResult> {
    return this.scheduleScheduleAuthorization$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<UserInfoResult>): UserInfoResult => r.body)
    );
  }

  /**
   * API排程登入驗證.
   *
   * API排程驗證
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `scheduleScheduleAuthorization$Json()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  scheduleScheduleAuthorization$Json$Response(params?: ScheduleScheduleAuthorization$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<UserInfoResult>> {
    return scheduleScheduleAuthorization$Json(this.http, this.rootUrl, params, context);
  }

  /**
   * API排程登入驗證.
   *
   * API排程驗證
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `scheduleScheduleAuthorization$Json$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  scheduleScheduleAuthorization$Json(params?: ScheduleScheduleAuthorization$Json$Params, context?: HttpContext): Observable<UserInfoResult> {
    return this.scheduleScheduleAuthorization$Json$Response(params, context).pipe(
      map((r: StrictHttpResponse<UserInfoResult>): UserInfoResult => r.body)
    );
  }

  /** Path part for operation `scheduleDailySchedule()` */
  static readonly ScheduleDailySchedulePath = '/api/Schedule/DailySchedule';

  /**
   * 日執行排程.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `scheduleDailySchedule$Plain()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  scheduleDailySchedule$Plain$Response(params?: ScheduleDailySchedule$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<ScheduleResult>> {
    return scheduleDailySchedule$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * 日執行排程.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `scheduleDailySchedule$Plain$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  scheduleDailySchedule$Plain(params?: ScheduleDailySchedule$Plain$Params, context?: HttpContext): Observable<ScheduleResult> {
    return this.scheduleDailySchedule$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<ScheduleResult>): ScheduleResult => r.body)
    );
  }

  /**
   * 日執行排程.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `scheduleDailySchedule$Json()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  scheduleDailySchedule$Json$Response(params?: ScheduleDailySchedule$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<ScheduleResult>> {
    return scheduleDailySchedule$Json(this.http, this.rootUrl, params, context);
  }

  /**
   * 日執行排程.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `scheduleDailySchedule$Json$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  scheduleDailySchedule$Json(params?: ScheduleDailySchedule$Json$Params, context?: HttpContext): Observable<ScheduleResult> {
    return this.scheduleDailySchedule$Json$Response(params, context).pipe(
      map((r: StrictHttpResponse<ScheduleResult>): ScheduleResult => r.body)
    );
  }

  /** Path part for operation `scheduleAuthorizeScheduleUser()` */
  static readonly ScheduleAuthorizeScheduleUserPath = '/api/Schedule/AuthorizeScheduleUser';

  /**
   * API排程登入驗證.
   *
   * API排程驗證
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `scheduleAuthorizeScheduleUser$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  scheduleAuthorizeScheduleUser$Plain$Response(params?: ScheduleAuthorizeScheduleUser$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<UserInfoResult>> {
    return scheduleAuthorizeScheduleUser$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * API排程登入驗證.
   *
   * API排程驗證
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `scheduleAuthorizeScheduleUser$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  scheduleAuthorizeScheduleUser$Plain(params?: ScheduleAuthorizeScheduleUser$Plain$Params, context?: HttpContext): Observable<UserInfoResult> {
    return this.scheduleAuthorizeScheduleUser$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<UserInfoResult>): UserInfoResult => r.body)
    );
  }

  /**
   * API排程登入驗證.
   *
   * API排程驗證
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `scheduleAuthorizeScheduleUser$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  scheduleAuthorizeScheduleUser$Json$Response(params?: ScheduleAuthorizeScheduleUser$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<UserInfoResult>> {
    return scheduleAuthorizeScheduleUser$Json(this.http, this.rootUrl, params, context);
  }

  /**
   * API排程登入驗證.
   *
   * API排程驗證
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `scheduleAuthorizeScheduleUser$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  scheduleAuthorizeScheduleUser$Json(params?: ScheduleAuthorizeScheduleUser$Json$Params, context?: HttpContext): Observable<UserInfoResult> {
    return this.scheduleAuthorizeScheduleUser$Json$Response(params, context).pipe(
      map((r: StrictHttpResponse<UserInfoResult>): UserInfoResult => r.body)
    );
  }

}
