/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { CaseAssignInput } from '../../models/case-assign-input';
import { CaseMResult } from '../../models/case-m-result';

export interface CaseMGetCaseAssign$Json$Params {
  
    /**
     * 取得參數(必要欄位：)
     */
    body?: CaseAssignInput
}

export function caseMGetCaseAssign$Json(http: HttpClient, rootUrl: string, params?: CaseMGetCaseAssign$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<CaseMResult>> {
  const rb = new RequestBuilder(rootUrl, caseMGetCaseAssign$Json.PATH, 'post');
  if (params) {
    rb.body(params.body, 'application/*+json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'text/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<CaseMResult>;
    })
  );
}

caseMGetCaseAssign$Json.PATH = '/eCaseManager/CaseM/GetCaseAssign';
