/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { AssignNoteAdd } from '../../models/assign-note-add';
import { AssignNoteResult } from '../../models/assign-note-result';

export interface CaseMSetAssignNote$Plain$Params {
  
    /**
     * 儲存參數(必要欄位：)
     */
    body?: AssignNoteAdd
}

export function caseMSetAssignNote$Plain(http: HttpClient, rootUrl: string, params?: CaseMSetAssignNote$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<AssignNoteResult>> {
  const rb = new RequestBuilder(rootUrl, caseMSetAssignNote$Plain.PATH, 'post');
  if (params) {
    rb.body(params.body, 'application/*+json');
  }

  return http.request(
    rb.build({ responseType: 'text', accept: 'text/plain', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<AssignNoteResult>;
    })
  );
}

caseMSetAssignNote$Plain.PATH = '/eCaseManager/CaseM/SetAssignNote';
