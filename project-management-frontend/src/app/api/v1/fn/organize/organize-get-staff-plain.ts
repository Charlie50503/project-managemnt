/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { StaffInput } from '../../models/staff-input';
import { StaffResult } from '../../models/staff-result';

export interface OrganizeGetStaff$Plain$Params {
      body?: StaffInput
}

export function organizeGetStaff$Plain(http: HttpClient, rootUrl: string, params?: OrganizeGetStaff$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<StaffResult>> {
  const rb = new RequestBuilder(rootUrl, organizeGetStaff$Plain.PATH, 'post');
  if (params) {
    rb.body(params.body, 'application/*+json');
  }

  return http.request(
    rb.build({ responseType: 'text', accept: 'text/plain', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<StaffResult>;
    })
  );
}

organizeGetStaff$Plain.PATH = '/api/Organize/GetStaff';
