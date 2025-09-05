/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { CaseMInput } from '../../models/case-m-input';
import { CaseMResult } from '../../models/case-m-result';

export interface CaseMRemoveCaseM$Json$Params {
  
    /**
     * 儲存參數(必要欄位：)
     */
    body?: CaseMInput
}

export function caseMRemoveCaseM$Json(http: HttpClient, rootUrl: string, params?: CaseMRemoveCaseM$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<CaseMResult>> {
  const rb = new RequestBuilder(rootUrl, caseMRemoveCaseM$Json.PATH, 'post');
  if (params) {
    rb.body(params.body, 'application/*+json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'text/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<CaseMResult>;
    })
  );
}

caseMRemoveCaseM$Json.PATH = '/eCaseManager/CaseM/RemoveCaseM';
