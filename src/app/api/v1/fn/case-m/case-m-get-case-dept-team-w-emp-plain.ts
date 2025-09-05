/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { CaseDeptTeamQuery } from '../../models/case-dept-team-query';
import { CaseDeptTeamWEmpResult } from '../../models/case-dept-team-w-emp-result';

export interface CaseMGetCaseDeptTeamWEmp$Plain$Params {
  
    /**
     * 取得參數(必要欄位：)
     */
    body?: CaseDeptTeamQuery
}

export function caseMGetCaseDeptTeamWEmp$Plain(http: HttpClient, rootUrl: string, params?: CaseMGetCaseDeptTeamWEmp$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<CaseDeptTeamWEmpResult>> {
  const rb = new RequestBuilder(rootUrl, caseMGetCaseDeptTeamWEmp$Plain.PATH, 'post');
  if (params) {
    rb.body(params.body, 'application/*+json');
  }

  return http.request(
    rb.build({ responseType: 'text', accept: 'text/plain', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<CaseDeptTeamWEmpResult>;
    })
  );
}

caseMGetCaseDeptTeamWEmp$Plain.PATH = '/eCaseManager/CaseM/GetCaseDeptTeamWEmp';
