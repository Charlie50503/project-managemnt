/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { ExtPatchInput } from '../../models/ext-patch-input';
import { ExtPatchResult } from '../../models/ext-patch-result';

export interface CaseMExternalDispatch$Plain$Params {
  
    /**
     * 儲存參數(必要欄位：)
     */
    body?: ExtPatchInput
}

export function caseMExternalDispatch$Plain(http: HttpClient, rootUrl: string, params?: CaseMExternalDispatch$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<ExtPatchResult>> {
  const rb = new RequestBuilder(rootUrl, caseMExternalDispatch$Plain.PATH, 'post');
  if (params) {
    rb.body(params.body, 'application/*+json');
  }

  return http.request(
    rb.build({ responseType: 'text', accept: 'text/plain', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<ExtPatchResult>;
    })
  );
}

caseMExternalDispatch$Plain.PATH = '/eCaseManager/CaseM/ExternalDispatch';
