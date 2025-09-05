/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { UserInfoResult } from '../../models/user-info-result';

export interface ScheduleAuthorizeScheduleUser$Json$Params {
}

export function scheduleAuthorizeScheduleUser$Json(http: HttpClient, rootUrl: string, params?: ScheduleAuthorizeScheduleUser$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<UserInfoResult>> {
  const rb = new RequestBuilder(rootUrl, scheduleAuthorizeScheduleUser$Json.PATH, 'post');
  if (params) {
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

scheduleAuthorizeScheduleUser$Json.PATH = '/api/Schedule/AuthorizeScheduleUser';
