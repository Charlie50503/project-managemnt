/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { MailListQuery } from '../../models/mail-list-query';
import { MailListResult } from '../../models/mail-list-result';

export interface CaseMSetCaseMailList$Plain$Params {
  
    /**
     * 儲存參數(必要欄位：)
     */
    body?: MailListQuery
}

export function caseMSetCaseMailList$Plain(http: HttpClient, rootUrl: string, params?: CaseMSetCaseMailList$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<MailListResult>> {
  const rb = new RequestBuilder(rootUrl, caseMSetCaseMailList$Plain.PATH, 'post');
  if (params) {
    rb.body(params.body, 'application/*+json');
  }

  return http.request(
    rb.build({ responseType: 'text', accept: 'text/plain', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<MailListResult>;
    })
  );
}

caseMSetCaseMailList$Plain.PATH = '/eCaseManager/CaseM/SetCaseMailList';
