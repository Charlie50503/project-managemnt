/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { AssignNoteInput } from '../../models/assign-note-input';
import { CaseMResult } from '../../models/case-m-result';

export interface CaseMGetAssignNote$Json$Params {
  
    /**
     * 取得參數(必要欄位：)
     */
    body?: AssignNoteInput
}

export function caseMGetAssignNote$Json(http: HttpClient, rootUrl: string, params?: CaseMGetAssignNote$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<CaseMResult>> {
  const rb = new RequestBuilder(rootUrl, caseMGetAssignNote$Json.PATH, 'post');
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

caseMGetAssignNote$Json.PATH = '/eCaseManager/CaseM/GetAssignNote';
