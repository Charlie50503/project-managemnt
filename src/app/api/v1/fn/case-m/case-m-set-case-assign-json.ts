/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { CaseAssignAdd } from '../../models/case-assign-add';
import { CaseAssignResult } from '../../models/case-assign-result';

export interface CaseMSetCaseAssign$Json$Params {
  
    /**
     * 儲存參數(必要欄位：)
     */
    body?: CaseAssignAdd
}

export function caseMSetCaseAssign$Json(http: HttpClient, rootUrl: string, params?: CaseMSetCaseAssign$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<CaseAssignResult>> {
  const rb = new RequestBuilder(rootUrl, caseMSetCaseAssign$Json.PATH, 'post');
  if (params) {
    rb.body(params.body, 'application/*+json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'text/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<CaseAssignResult>;
    })
  );
}

caseMSetCaseAssign$Json.PATH = '/eCaseManager/CaseM/SetCaseAssign';
