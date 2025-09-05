/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { CaseMCount } from '../../models/case-m-count';
import { CaseMCountResult } from '../../models/case-m-count-result';

export interface CaseMCountCaseWAssign$Plain$Params {
  
    /**
     * 取得參數(必要欄位：)
     */
    body?: CaseMCount
}

export function caseMCountCaseWAssign$Plain(http: HttpClient, rootUrl: string, params?: CaseMCountCaseWAssign$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<CaseMCountResult>> {
  const rb = new RequestBuilder(rootUrl, caseMCountCaseWAssign$Plain.PATH, 'post');
  if (params) {
    rb.body(params.body, 'application/*+json');
  }

  return http.request(
    rb.build({ responseType: 'text', accept: 'text/plain', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<CaseMCountResult>;
    })
  );
}

caseMCountCaseWAssign$Plain.PATH = '/eCaseManager/CaseM/CountCaseWAssign';
