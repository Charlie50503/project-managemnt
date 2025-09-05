/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { BrhDeptQuery } from '../../models/brh-dept-query';
import { BrhDeptResult } from '../../models/brh-dept-result';

export interface OrganizeGetBrhDept$Json$Params {
      body?: BrhDeptQuery
}

export function organizeGetBrhDept$Json(http: HttpClient, rootUrl: string, params?: OrganizeGetBrhDept$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<BrhDeptResult>> {
  const rb = new RequestBuilder(rootUrl, organizeGetBrhDept$Json.PATH, 'post');
  if (params) {
    rb.body(params.body, 'application/*+json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'text/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<BrhDeptResult>;
    })
  );
}

organizeGetBrhDept$Json.PATH = '/api/Organize/GetBrhDEPT';
