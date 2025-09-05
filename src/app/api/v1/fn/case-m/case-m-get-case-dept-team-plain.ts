/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { CaseDeptTeamQuery } from '../../models/case-dept-team-query';
import { CaseDeptTeamResult } from '../../models/case-dept-team-result';

export interface CaseMGetCaseDeptTeam$Plain$Params {
  
    /**
     * 取得參數(必要欄位：)
     */
    body?: CaseDeptTeamQuery
}

export function caseMGetCaseDeptTeam$Plain(http: HttpClient, rootUrl: string, params?: CaseMGetCaseDeptTeam$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<CaseDeptTeamResult>> {
  const rb = new RequestBuilder(rootUrl, caseMGetCaseDeptTeam$Plain.PATH, 'post');
  if (params) {
    rb.body(params.body, 'application/*+json');
  }

  return http.request(
    rb.build({ responseType: 'text', accept: 'text/plain', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<CaseDeptTeamResult>;
    })
  );
}

caseMGetCaseDeptTeam$Plain.PATH = '/eCaseManager/CaseM/GetCaseDeptTeam';
