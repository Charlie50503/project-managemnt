/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { BrhDepTeamResult } from '../../models/brh-dep-team-result';
import { BrhDeptQuery } from '../../models/brh-dept-query';

export interface OrganizeGetBrhDepTeam$Json$Params {
      body?: BrhDeptQuery
}

export function organizeGetBrhDepTeam$Json(http: HttpClient, rootUrl: string, params?: OrganizeGetBrhDepTeam$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<BrhDepTeamResult>> {
  const rb = new RequestBuilder(rootUrl, organizeGetBrhDepTeam$Json.PATH, 'post');
  if (params) {
    rb.body(params.body, 'application/*+json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'text/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<BrhDepTeamResult>;
    })
  );
}

organizeGetBrhDepTeam$Json.PATH = '/api/Organize/GetBrhDepTEAM';
