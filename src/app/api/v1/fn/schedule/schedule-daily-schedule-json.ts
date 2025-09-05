/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { ScheduleInput } from '../../models/schedule-input';
import { ScheduleResult } from '../../models/schedule-result';

export interface ScheduleDailySchedule$Json$Params {
      body?: ScheduleInput
}

export function scheduleDailySchedule$Json(http: HttpClient, rootUrl: string, params?: ScheduleDailySchedule$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<ScheduleResult>> {
  const rb = new RequestBuilder(rootUrl, scheduleDailySchedule$Json.PATH, 'post');
  if (params) {
    rb.body(params.body, 'application/*+json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'text/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<ScheduleResult>;
    })
  );
}

scheduleDailySchedule$Json.PATH = '/api/Schedule/DailySchedule';
