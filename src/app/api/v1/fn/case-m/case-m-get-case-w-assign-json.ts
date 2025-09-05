/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { CaseMQuery } from '../../models/case-m-query';
import { CaseWAssignResult } from '../../models/case-w-assign-result';

export interface CaseMGetCaseWAssign$Json$Params {
  
    /**
     * 取得參數(必要欄位：)
     */
    body?: CaseMQuery
}

export function caseMGetCaseWAssign$Json(http: HttpClient, rootUrl: string, params?: CaseMGetCaseWAssign$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<CaseWAssignResult>> {
  const rb = new RequestBuilder(rootUrl, caseMGetCaseWAssign$Json.PATH, 'post');
  if (params) {
    rb.body(params.body, 'application/*+json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'text/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<CaseWAssignResult>;
    })
  );
}

caseMGetCaseWAssign$Json.PATH = '/eCaseManager/CaseM/GetCaseWAssign';
