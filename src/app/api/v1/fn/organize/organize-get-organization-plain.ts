/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { OrganInput } from '../../models/organ-input';
import { OrganResult } from '../../models/organ-result';

export interface OrganizeGetOrganization$Plain$Params {
      body?: OrganInput
}

export function organizeGetOrganization$Plain(http: HttpClient, rootUrl: string, params?: OrganizeGetOrganization$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<OrganResult>> {
  const rb = new RequestBuilder(rootUrl, organizeGetOrganization$Plain.PATH, 'post');
  if (params) {
    rb.body(params.body, 'application/*+json');
  }

  return http.request(
    rb.build({ responseType: 'text', accept: 'text/plain', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<OrganResult>;
    })
  );
}

organizeGetOrganization$Plain.PATH = '/api/Organize/GetOrganization';
