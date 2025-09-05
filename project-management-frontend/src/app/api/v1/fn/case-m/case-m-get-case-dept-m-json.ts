/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { CaseDeptMQuery } from '../../models/case-dept-m-query';
import { CaseDeptMResult } from '../../models/case-dept-m-result';

export interface CaseMGetCaseDeptM$Json$Params {
  
    /**
     * 取得參數(必要欄位：)
     */
    body?: CaseDeptMQuery
}

export function caseMGetCaseDeptM$Json(http: HttpClient, rootUrl: string, params?: CaseMGetCaseDeptM$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<CaseDeptMResult>> {
  const rb = new RequestBuilder(rootUrl, caseMGetCaseDeptM$Json.PATH, 'post');
  if (params) {
    rb.body(params.body, 'application/*+json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'text/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<CaseDeptMResult>;
    })
  );
}

caseMGetCaseDeptM$Json.PATH = '/eCaseManager/CaseM/GetCaseDeptM';
