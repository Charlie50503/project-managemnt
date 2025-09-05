/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { CaseDeptEmpQuery } from '../../models/case-dept-emp-query';
import { CaseDeptEmpResult } from '../../models/case-dept-emp-result';

export interface CaseMRemoveCaseDeptEmp$Json$Params {
  
    /**
     * 儲存參數(必要欄位：)
     */
    body?: CaseDeptEmpQuery
}

export function caseMRemoveCaseDeptEmp$Json(http: HttpClient, rootUrl: string, params?: CaseMRemoveCaseDeptEmp$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<CaseDeptEmpResult>> {
  const rb = new RequestBuilder(rootUrl, caseMRemoveCaseDeptEmp$Json.PATH, 'post');
  if (params) {
    rb.body(params.body, 'application/*+json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'text/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<CaseDeptEmpResult>;
    })
  );
}

caseMRemoveCaseDeptEmp$Json.PATH = '/eCaseManager/CaseM/RemoveCaseDeptEmp';
