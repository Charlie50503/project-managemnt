/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { CaseMCount } from '../../models/case-m-count';
import { CaseMCountResult } from '../../models/case-m-count-result';

export interface CaseMCountCaseWAssign$Json$Params {
  
    /**
     * 取得參數(必要欄位：)
     */
    body?: CaseMCount
}

export function caseMCountCaseWAssign$Json(http: HttpClient, rootUrl: string, params?: CaseMCountCaseWAssign$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<CaseMCountResult>> {
  const rb = new RequestBuilder(rootUrl, caseMCountCaseWAssign$Json.PATH, 'post');
  if (params) {
    rb.body(params.body, 'application/*+json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'text/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<CaseMCountResult>;
    })
  );
}

caseMCountCaseWAssign$Json.PATH = '/eCaseManager/CaseM/CountCaseWAssign';
