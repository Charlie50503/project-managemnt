/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { StaffWithTeamResult } from '../../models/staff-with-team-result';
import { SuperVisorByCodeInput } from '../../models/super-visor-by-code-input';

export interface OrganizeGetDeptStaff$Plain$Params {
      body?: SuperVisorByCodeInput
}

export function organizeGetDeptStaff$Plain(http: HttpClient, rootUrl: string, params?: OrganizeGetDeptStaff$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<StaffWithTeamResult>> {
  const rb = new RequestBuilder(rootUrl, organizeGetDeptStaff$Plain.PATH, 'post');
  if (params) {
    rb.body(params.body, 'application/*+json');
  }

  return http.request(
    rb.build({ responseType: 'text', accept: 'text/plain', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<StaffWithTeamResult>;
    })
  );
}

organizeGetDeptStaff$Plain.PATH = '/api/Organize/GetDeptSTAFF';
