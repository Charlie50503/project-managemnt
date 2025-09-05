/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { CaseDeptTeamQuery } from '../../models/case-dept-team-query';
import { CaseDeptTeamResult } from '../../models/case-dept-team-result';

export interface CaseMRemoveCaseDeptTeam$Json$Params {
  
    /**
     * 儲存參數(必要欄位：)
     */
    body?: CaseDeptTeamQuery
}

export function caseMRemoveCaseDeptTeam$Json(http: HttpClient, rootUrl: string, params?: CaseMRemoveCaseDeptTeam$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<CaseDeptTeamResult>> {
  const rb = new RequestBuilder(rootUrl, caseMRemoveCaseDeptTeam$Json.PATH, 'post');
  if (params) {
    rb.body(params.body, 'application/*+json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'text/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<CaseDeptTeamResult>;
    })
  );
}

caseMRemoveCaseDeptTeam$Json.PATH = '/eCaseManager/CaseM/RemoveCaseDeptTeam';
