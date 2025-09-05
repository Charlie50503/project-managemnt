/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { RegisterDto } from '../../models/register-dto';
import { UserInfoResult } from '../../models/user-info-result';

export interface ScheduleScheduleAuthorization$Plain$Params {
  
    /**
     * 登入參數
     */
    body?: RegisterDto
}

export function scheduleScheduleAuthorization$Plain(http: HttpClient, rootUrl: string, params?: ScheduleScheduleAuthorization$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<UserInfoResult>> {
  const rb = new RequestBuilder(rootUrl, scheduleScheduleAuthorization$Plain.PATH, 'post');
  if (params) {
    rb.body(params.body, 'application/*+json');
  }

  return http.request(
    rb.build({ responseType: 'text', accept: 'text/plain', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<UserInfoResult>;
    })
  );
}

scheduleScheduleAuthorization$Plain.PATH = '/api/Schedule/ScheduleAuthorization';
