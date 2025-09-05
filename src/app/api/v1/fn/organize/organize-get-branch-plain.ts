/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { BranchResult } from '../../models/branch-result';

export interface OrganizeGetBranch$Plain$Params {
}

export function organizeGetBranch$Plain(http: HttpClient, rootUrl: string, params?: OrganizeGetBranch$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<BranchResult>> {
  const rb = new RequestBuilder(rootUrl, organizeGetBranch$Plain.PATH, 'post');
  if (params) {
  }

  return http.request(
    rb.build({ responseType: 'text', accept: 'text/plain', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<BranchResult>;
    })
  );
}

organizeGetBranch$Plain.PATH = '/api/Organize/GetBranch';
