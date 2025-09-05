/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { CaseAssignAdd } from '../../models/case-assign-add';
import { CaseAssignResult } from '../../models/case-assign-result';

export interface CaseMSetCaseAssign$Plain$Params {
  
    /**
     * 儲存參數(必要欄位：)
     */
    body?: CaseAssignAdd
}

export function caseMSetCaseAssign$Plain(http: HttpClient, rootUrl: string, params?: CaseMSetCaseAssign$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<CaseAssignResult>> {
  const rb = new RequestBuilder(rootUrl, caseMSetCaseAssign$Plain.PATH, 'post');
  if (params) {
    rb.body(params.body, 'application/*+json');
  }

  return http.request(
    rb.build({ responseType: 'text', accept: 'text/plain', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<CaseAssignResult>;
    })
  );
}

caseMSetCaseAssign$Plain.PATH = '/eCaseManager/CaseM/SetCaseAssign';
