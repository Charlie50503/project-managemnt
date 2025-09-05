/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { MailNotifyInput } from '../../models/mail-notify-input';
import { MailNotifyResult } from '../../models/mail-notify-result';

export interface CaseMCaseMConfirm$Json$Params {
  
    /**
     * 儲存參數(必要欄位：)
     */
    body?: MailNotifyInput
}

export function caseMCaseMConfirm$Json(http: HttpClient, rootUrl: string, params?: CaseMCaseMConfirm$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<MailNotifyResult>> {
  const rb = new RequestBuilder(rootUrl, caseMCaseMConfirm$Json.PATH, 'post');
  if (params) {
    rb.body(params.body, 'application/*+json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'text/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<MailNotifyResult>;
    })
  );
}

caseMCaseMConfirm$Json.PATH = '/eCaseManager/CaseM/CaseMConfirm';
