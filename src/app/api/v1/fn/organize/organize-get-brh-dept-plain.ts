/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { BrhDeptQuery } from '../../models/brh-dept-query';
import { BrhDeptResult } from '../../models/brh-dept-result';

export interface OrganizeGetBrhDept$Plain$Params {
      body?: BrhDeptQuery
}

export function organizeGetBrhDept$Plain(http: HttpClient, rootUrl: string, params?: OrganizeGetBrhDept$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<BrhDeptResult>> {
  const rb = new RequestBuilder(rootUrl, organizeGetBrhDept$Plain.PATH, 'post');
  if (params) {
    rb.body(params.body, 'application/*+json');
  }

  return http.request(
    rb.build({ responseType: 'text', accept: 'text/plain', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<BrhDeptResult>;
    })
  );
}

organizeGetBrhDept$Plain.PATH = '/api/Organize/GetBrhDEPT';
