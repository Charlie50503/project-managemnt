/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { BranchResult } from '../../models/branch-result';

export interface OrganizeGetBranch$Json$Params {
}

export function organizeGetBranch$Json(http: HttpClient, rootUrl: string, params?: OrganizeGetBranch$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<BranchResult>> {
  const rb = new RequestBuilder(rootUrl, organizeGetBranch$Json.PATH, 'post');
  if (params) {
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'text/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<BranchResult>;
    })
  );
}

organizeGetBranch$Json.PATH = '/api/Organize/GetBranch';
