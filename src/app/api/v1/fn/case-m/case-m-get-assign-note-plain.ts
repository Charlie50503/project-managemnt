/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { AssignNoteInput } from '../../models/assign-note-input';
import { CaseMResult } from '../../models/case-m-result';

export interface CaseMGetAssignNote$Plain$Params {
  
    /**
     * 取得參數(必要欄位：)
     */
    body?: AssignNoteInput
}

export function caseMGetAssignNote$Plain(http: HttpClient, rootUrl: string, params?: CaseMGetAssignNote$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<CaseMResult>> {
  const rb = new RequestBuilder(rootUrl, caseMGetAssignNote$Plain.PATH, 'post');
  if (params) {
    rb.body(params.body, 'application/*+json');
  }

  return http.request(
    rb.build({ responseType: 'text', accept: 'text/plain', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<CaseMResult>;
    })
  );
}

caseMGetAssignNote$Plain.PATH = '/eCaseManager/CaseM/GetAssignNote';
