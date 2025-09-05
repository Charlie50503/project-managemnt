/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { AssignNoteResult } from '../models/assign-note-result';
import { CaseAssignResult } from '../models/case-assign-result';
import { CaseDeptEmpResult } from '../models/case-dept-emp-result';
import { CaseDeptMResult } from '../models/case-dept-m-result';
import { CaseDeptTeamResult } from '../models/case-dept-team-result';
import { CaseDeptTeamWEmpResult } from '../models/case-dept-team-w-emp-result';
import { CaseDeptWEmpResult } from '../models/case-dept-w-emp-result';
import { caseMCaseMConfirm$Json } from '../fn/case-m/case-m-case-m-confirm-json';
import { CaseMCaseMConfirm$Json$Params } from '../fn/case-m/case-m-case-m-confirm-json';
import { caseMCaseMConfirm$Plain } from '../fn/case-m/case-m-case-m-confirm-plain';
import { CaseMCaseMConfirm$Plain$Params } from '../fn/case-m/case-m-case-m-confirm-plain';
import { caseMCountCaseWAssign$Json } from '../fn/case-m/case-m-count-case-w-assign-json';
import { CaseMCountCaseWAssign$Json$Params } from '../fn/case-m/case-m-count-case-w-assign-json';
import { caseMCountCaseWAssign$Plain } from '../fn/case-m/case-m-count-case-w-assign-plain';
import { CaseMCountCaseWAssign$Plain$Params } from '../fn/case-m/case-m-count-case-w-assign-plain';
import { CaseMCountResult } from '../models/case-m-count-result';
import { caseMExternalDispatch$Json } from '../fn/case-m/case-m-external-dispatch-json';
import { CaseMExternalDispatch$Json$Params } from '../fn/case-m/case-m-external-dispatch-json';
import { caseMExternalDispatch$Plain } from '../fn/case-m/case-m-external-dispatch-plain';
import { CaseMExternalDispatch$Plain$Params } from '../fn/case-m/case-m-external-dispatch-plain';
import { caseMGetAssignNote$Json } from '../fn/case-m/case-m-get-assign-note-json';
import { CaseMGetAssignNote$Json$Params } from '../fn/case-m/case-m-get-assign-note-json';
import { caseMGetAssignNote$Plain } from '../fn/case-m/case-m-get-assign-note-plain';
import { CaseMGetAssignNote$Plain$Params } from '../fn/case-m/case-m-get-assign-note-plain';
import { caseMGetCaseAssign$Json } from '../fn/case-m/case-m-get-case-assign-json';
import { CaseMGetCaseAssign$Json$Params } from '../fn/case-m/case-m-get-case-assign-json';
import { caseMGetCaseAssign$Plain } from '../fn/case-m/case-m-get-case-assign-plain';
import { CaseMGetCaseAssign$Plain$Params } from '../fn/case-m/case-m-get-case-assign-plain';
import { caseMGetCaseChange$Json } from '../fn/case-m/case-m-get-case-change-json';
import { CaseMGetCaseChange$Json$Params } from '../fn/case-m/case-m-get-case-change-json';
import { caseMGetCaseChange$Plain } from '../fn/case-m/case-m-get-case-change-plain';
import { CaseMGetCaseChange$Plain$Params } from '../fn/case-m/case-m-get-case-change-plain';
import { caseMGetCaseDeptEmp$Json } from '../fn/case-m/case-m-get-case-dept-emp-json';
import { CaseMGetCaseDeptEmp$Json$Params } from '../fn/case-m/case-m-get-case-dept-emp-json';
import { caseMGetCaseDeptEmp$Plain } from '../fn/case-m/case-m-get-case-dept-emp-plain';
import { CaseMGetCaseDeptEmp$Plain$Params } from '../fn/case-m/case-m-get-case-dept-emp-plain';
import { caseMGetCaseDeptM$Json } from '../fn/case-m/case-m-get-case-dept-m-json';
import { CaseMGetCaseDeptM$Json$Params } from '../fn/case-m/case-m-get-case-dept-m-json';
import { caseMGetCaseDeptM$Plain } from '../fn/case-m/case-m-get-case-dept-m-plain';
import { CaseMGetCaseDeptM$Plain$Params } from '../fn/case-m/case-m-get-case-dept-m-plain';
import { caseMGetCaseDeptTeam$Json } from '../fn/case-m/case-m-get-case-dept-team-json';
import { CaseMGetCaseDeptTeam$Json$Params } from '../fn/case-m/case-m-get-case-dept-team-json';
import { caseMGetCaseDeptTeam$Plain } from '../fn/case-m/case-m-get-case-dept-team-plain';
import { CaseMGetCaseDeptTeam$Plain$Params } from '../fn/case-m/case-m-get-case-dept-team-plain';
import { caseMGetCaseDeptTeamWEmp$Json } from '../fn/case-m/case-m-get-case-dept-team-w-emp-json';
import { CaseMGetCaseDeptTeamWEmp$Json$Params } from '../fn/case-m/case-m-get-case-dept-team-w-emp-json';
import { caseMGetCaseDeptTeamWEmp$Plain } from '../fn/case-m/case-m-get-case-dept-team-w-emp-plain';
import { CaseMGetCaseDeptTeamWEmp$Plain$Params } from '../fn/case-m/case-m-get-case-dept-team-w-emp-plain';
import { caseMGetCaseDeptWEmp$Json } from '../fn/case-m/case-m-get-case-dept-w-emp-json';
import { CaseMGetCaseDeptWEmp$Json$Params } from '../fn/case-m/case-m-get-case-dept-w-emp-json';
import { caseMGetCaseDeptWEmp$Plain } from '../fn/case-m/case-m-get-case-dept-w-emp-plain';
import { CaseMGetCaseDeptWEmp$Plain$Params } from '../fn/case-m/case-m-get-case-dept-w-emp-plain';
import { caseMGetCaseMailList$Json } from '../fn/case-m/case-m-get-case-mail-list-json';
import { CaseMGetCaseMailList$Json$Params } from '../fn/case-m/case-m-get-case-mail-list-json';
import { caseMGetCaseMailList$Plain } from '../fn/case-m/case-m-get-case-mail-list-plain';
import { CaseMGetCaseMailList$Plain$Params } from '../fn/case-m/case-m-get-case-mail-list-plain';
import { caseMGetCaseWAssign$Json } from '../fn/case-m/case-m-get-case-w-assign-json';
import { CaseMGetCaseWAssign$Json$Params } from '../fn/case-m/case-m-get-case-w-assign-json';
import { caseMGetCaseWAssign$Plain } from '../fn/case-m/case-m-get-case-w-assign-plain';
import { CaseMGetCaseWAssign$Plain$Params } from '../fn/case-m/case-m-get-case-w-assign-plain';
import { caseMRemoveCaseAssign$Json } from '../fn/case-m/case-m-remove-case-assign-json';
import { CaseMRemoveCaseAssign$Json$Params } from '../fn/case-m/case-m-remove-case-assign-json';
import { caseMRemoveCaseAssign$Plain } from '../fn/case-m/case-m-remove-case-assign-plain';
import { CaseMRemoveCaseAssign$Plain$Params } from '../fn/case-m/case-m-remove-case-assign-plain';
import { caseMRemoveCaseDeptEmp$Json } from '../fn/case-m/case-m-remove-case-dept-emp-json';
import { CaseMRemoveCaseDeptEmp$Json$Params } from '../fn/case-m/case-m-remove-case-dept-emp-json';
import { caseMRemoveCaseDeptEmp$Plain } from '../fn/case-m/case-m-remove-case-dept-emp-plain';
import { CaseMRemoveCaseDeptEmp$Plain$Params } from '../fn/case-m/case-m-remove-case-dept-emp-plain';
import { caseMRemoveCaseDeptM$Json } from '../fn/case-m/case-m-remove-case-dept-m-json';
import { CaseMRemoveCaseDeptM$Json$Params } from '../fn/case-m/case-m-remove-case-dept-m-json';
import { caseMRemoveCaseDeptM$Plain } from '../fn/case-m/case-m-remove-case-dept-m-plain';
import { CaseMRemoveCaseDeptM$Plain$Params } from '../fn/case-m/case-m-remove-case-dept-m-plain';
import { caseMRemoveCaseDeptTeam$Json } from '../fn/case-m/case-m-remove-case-dept-team-json';
import { CaseMRemoveCaseDeptTeam$Json$Params } from '../fn/case-m/case-m-remove-case-dept-team-json';
import { caseMRemoveCaseDeptTeam$Plain } from '../fn/case-m/case-m-remove-case-dept-team-plain';
import { CaseMRemoveCaseDeptTeam$Plain$Params } from '../fn/case-m/case-m-remove-case-dept-team-plain';
import { caseMRemoveCaseM$Json } from '../fn/case-m/case-m-remove-case-m-json';
import { CaseMRemoveCaseM$Json$Params } from '../fn/case-m/case-m-remove-case-m-json';
import { caseMRemoveCaseM$Plain } from '../fn/case-m/case-m-remove-case-m-plain';
import { CaseMRemoveCaseM$Plain$Params } from '../fn/case-m/case-m-remove-case-m-plain';
import { CaseMResult } from '../models/case-m-result';
import { caseMSetAssignNote$Json } from '../fn/case-m/case-m-set-assign-note-json';
import { CaseMSetAssignNote$Json$Params } from '../fn/case-m/case-m-set-assign-note-json';
import { caseMSetAssignNote$Plain } from '../fn/case-m/case-m-set-assign-note-plain';
import { CaseMSetAssignNote$Plain$Params } from '../fn/case-m/case-m-set-assign-note-plain';
import { caseMSetCaseAssign$Json } from '../fn/case-m/case-m-set-case-assign-json';
import { CaseMSetCaseAssign$Json$Params } from '../fn/case-m/case-m-set-case-assign-json';
import { caseMSetCaseAssign$Plain } from '../fn/case-m/case-m-set-case-assign-plain';
import { CaseMSetCaseAssign$Plain$Params } from '../fn/case-m/case-m-set-case-assign-plain';
import { caseMSetCaseDeptEmp$Json } from '../fn/case-m/case-m-set-case-dept-emp-json';
import { CaseMSetCaseDeptEmp$Json$Params } from '../fn/case-m/case-m-set-case-dept-emp-json';
import { caseMSetCaseDeptEmp$Plain } from '../fn/case-m/case-m-set-case-dept-emp-plain';
import { CaseMSetCaseDeptEmp$Plain$Params } from '../fn/case-m/case-m-set-case-dept-emp-plain';
import { caseMSetCaseDeptM$Json } from '../fn/case-m/case-m-set-case-dept-m-json';
import { CaseMSetCaseDeptM$Json$Params } from '../fn/case-m/case-m-set-case-dept-m-json';
import { caseMSetCaseDeptM$Plain } from '../fn/case-m/case-m-set-case-dept-m-plain';
import { CaseMSetCaseDeptM$Plain$Params } from '../fn/case-m/case-m-set-case-dept-m-plain';
import { caseMSetCaseDeptTeam$Json } from '../fn/case-m/case-m-set-case-dept-team-json';
import { CaseMSetCaseDeptTeam$Json$Params } from '../fn/case-m/case-m-set-case-dept-team-json';
import { caseMSetCaseDeptTeam$Plain } from '../fn/case-m/case-m-set-case-dept-team-plain';
import { CaseMSetCaseDeptTeam$Plain$Params } from '../fn/case-m/case-m-set-case-dept-team-plain';
import { caseMSetCaseM$Json } from '../fn/case-m/case-m-set-case-m-json';
import { CaseMSetCaseM$Json$Params } from '../fn/case-m/case-m-set-case-m-json';
import { caseMSetCaseM$Plain } from '../fn/case-m/case-m-set-case-m-plain';
import { CaseMSetCaseM$Plain$Params } from '../fn/case-m/case-m-set-case-m-plain';
import { caseMSetCaseMailList$Json } from '../fn/case-m/case-m-set-case-mail-list-json';
import { CaseMSetCaseMailList$Json$Params } from '../fn/case-m/case-m-set-case-mail-list-json';
import { caseMSetCaseMailList$Plain } from '../fn/case-m/case-m-set-case-mail-list-plain';
import { CaseMSetCaseMailList$Plain$Params } from '../fn/case-m/case-m-set-case-mail-list-plain';
import { CaseWAssignResult } from '../models/case-w-assign-result';
import { ExtPatchResult } from '../models/ext-patch-result';
import { MailListResult } from '../models/mail-list-result';
import { MailNotifyResult } from '../models/mail-notify-result';

@Injectable({ providedIn: 'root' })
export class CaseMService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `caseMGetCaseWAssign()` */
  static readonly CaseMGetCaseWAssignPath = '/eCaseManager/CaseM/GetCaseWAssign';

  /**
   * 取得 CaseM.
   *
   * 回覆 CaseM
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `caseMGetCaseWAssign$Plain()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  caseMGetCaseWAssign$Plain$Response(params?: CaseMGetCaseWAssign$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<CaseWAssignResult>> {
    return caseMGetCaseWAssign$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * 取得 CaseM.
   *
   * 回覆 CaseM
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `caseMGetCaseWAssign$Plain$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  caseMGetCaseWAssign$Plain(params?: CaseMGetCaseWAssign$Plain$Params, context?: HttpContext): Observable<CaseWAssignResult> {
    return this.caseMGetCaseWAssign$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<CaseWAssignResult>): CaseWAssignResult => r.body)
    );
  }

  /**
   * 取得 CaseM.
   *
   * 回覆 CaseM
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `caseMGetCaseWAssign$Json()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  caseMGetCaseWAssign$Json$Response(params?: CaseMGetCaseWAssign$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<CaseWAssignResult>> {
    return caseMGetCaseWAssign$Json(this.http, this.rootUrl, params, context);
  }

  /**
   * 取得 CaseM.
   *
   * 回覆 CaseM
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `caseMGetCaseWAssign$Json$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  caseMGetCaseWAssign$Json(params?: CaseMGetCaseWAssign$Json$Params, context?: HttpContext): Observable<CaseWAssignResult> {
    return this.caseMGetCaseWAssign$Json$Response(params, context).pipe(
      map((r: StrictHttpResponse<CaseWAssignResult>): CaseWAssignResult => r.body)
    );
  }

  /** Path part for operation `caseMCountCaseWAssign()` */
  static readonly CaseMCountCaseWAssignPath = '/eCaseManager/CaseM/CountCaseWAssign';

  /**
   * 統計 CaseM.
   *
   * 回覆 CaseM
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `caseMCountCaseWAssign$Plain()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  caseMCountCaseWAssign$Plain$Response(params?: CaseMCountCaseWAssign$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<CaseMCountResult>> {
    return caseMCountCaseWAssign$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * 統計 CaseM.
   *
   * 回覆 CaseM
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `caseMCountCaseWAssign$Plain$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  caseMCountCaseWAssign$Plain(params?: CaseMCountCaseWAssign$Plain$Params, context?: HttpContext): Observable<CaseMCountResult> {
    return this.caseMCountCaseWAssign$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<CaseMCountResult>): CaseMCountResult => r.body)
    );
  }

  /**
   * 統計 CaseM.
   *
   * 回覆 CaseM
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `caseMCountCaseWAssign$Json()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  caseMCountCaseWAssign$Json$Response(params?: CaseMCountCaseWAssign$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<CaseMCountResult>> {
    return caseMCountCaseWAssign$Json(this.http, this.rootUrl, params, context);
  }

  /**
   * 統計 CaseM.
   *
   * 回覆 CaseM
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `caseMCountCaseWAssign$Json$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  caseMCountCaseWAssign$Json(params?: CaseMCountCaseWAssign$Json$Params, context?: HttpContext): Observable<CaseMCountResult> {
    return this.caseMCountCaseWAssign$Json$Response(params, context).pipe(
      map((r: StrictHttpResponse<CaseMCountResult>): CaseMCountResult => r.body)
    );
  }

  /** Path part for operation `caseMSetCaseM()` */
  static readonly CaseMSetCaseMPath = '/eCaseManager/CaseM/SetCaseM';

  /**
   * 儲存 CaseM.
   *
   * 儲存 CaseM
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `caseMSetCaseM$Plain()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  caseMSetCaseM$Plain$Response(params?: CaseMSetCaseM$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<CaseMResult>> {
    return caseMSetCaseM$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * 儲存 CaseM.
   *
   * 儲存 CaseM
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `caseMSetCaseM$Plain$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  caseMSetCaseM$Plain(params?: CaseMSetCaseM$Plain$Params, context?: HttpContext): Observable<CaseMResult> {
    return this.caseMSetCaseM$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<CaseMResult>): CaseMResult => r.body)
    );
  }

  /**
   * 儲存 CaseM.
   *
   * 儲存 CaseM
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `caseMSetCaseM$Json()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  caseMSetCaseM$Json$Response(params?: CaseMSetCaseM$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<CaseMResult>> {
    return caseMSetCaseM$Json(this.http, this.rootUrl, params, context);
  }

  /**
   * 儲存 CaseM.
   *
   * 儲存 CaseM
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `caseMSetCaseM$Json$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  caseMSetCaseM$Json(params?: CaseMSetCaseM$Json$Params, context?: HttpContext): Observable<CaseMResult> {
    return this.caseMSetCaseM$Json$Response(params, context).pipe(
      map((r: StrictHttpResponse<CaseMResult>): CaseMResult => r.body)
    );
  }

  /** Path part for operation `caseMRemoveCaseM()` */
  static readonly CaseMRemoveCaseMPath = '/eCaseManager/CaseM/RemoveCaseM';

  /**
   * 刪除 CaseM.
   *
   * 刪除 CaseM
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `caseMRemoveCaseM$Plain()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  caseMRemoveCaseM$Plain$Response(params?: CaseMRemoveCaseM$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<CaseMResult>> {
    return caseMRemoveCaseM$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * 刪除 CaseM.
   *
   * 刪除 CaseM
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `caseMRemoveCaseM$Plain$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  caseMRemoveCaseM$Plain(params?: CaseMRemoveCaseM$Plain$Params, context?: HttpContext): Observable<CaseMResult> {
    return this.caseMRemoveCaseM$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<CaseMResult>): CaseMResult => r.body)
    );
  }

  /**
   * 刪除 CaseM.
   *
   * 刪除 CaseM
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `caseMRemoveCaseM$Json()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  caseMRemoveCaseM$Json$Response(params?: CaseMRemoveCaseM$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<CaseMResult>> {
    return caseMRemoveCaseM$Json(this.http, this.rootUrl, params, context);
  }

  /**
   * 刪除 CaseM.
   *
   * 刪除 CaseM
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `caseMRemoveCaseM$Json$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  caseMRemoveCaseM$Json(params?: CaseMRemoveCaseM$Json$Params, context?: HttpContext): Observable<CaseMResult> {
    return this.caseMRemoveCaseM$Json$Response(params, context).pipe(
      map((r: StrictHttpResponse<CaseMResult>): CaseMResult => r.body)
    );
  }

  /** Path part for operation `caseMGetCaseAssign()` */
  static readonly CaseMGetCaseAssignPath = '/eCaseManager/CaseM/GetCaseAssign';

  /**
   * 取得 CaseAssign.
   *
   * 回覆 CaseAssign
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `caseMGetCaseAssign$Plain()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  caseMGetCaseAssign$Plain$Response(params?: CaseMGetCaseAssign$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<CaseMResult>> {
    return caseMGetCaseAssign$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * 取得 CaseAssign.
   *
   * 回覆 CaseAssign
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `caseMGetCaseAssign$Plain$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  caseMGetCaseAssign$Plain(params?: CaseMGetCaseAssign$Plain$Params, context?: HttpContext): Observable<CaseMResult> {
    return this.caseMGetCaseAssign$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<CaseMResult>): CaseMResult => r.body)
    );
  }

  /**
   * 取得 CaseAssign.
   *
   * 回覆 CaseAssign
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `caseMGetCaseAssign$Json()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  caseMGetCaseAssign$Json$Response(params?: CaseMGetCaseAssign$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<CaseMResult>> {
    return caseMGetCaseAssign$Json(this.http, this.rootUrl, params, context);
  }

  /**
   * 取得 CaseAssign.
   *
   * 回覆 CaseAssign
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `caseMGetCaseAssign$Json$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  caseMGetCaseAssign$Json(params?: CaseMGetCaseAssign$Json$Params, context?: HttpContext): Observable<CaseMResult> {
    return this.caseMGetCaseAssign$Json$Response(params, context).pipe(
      map((r: StrictHttpResponse<CaseMResult>): CaseMResult => r.body)
    );
  }

  /** Path part for operation `caseMSetCaseAssign()` */
  static readonly CaseMSetCaseAssignPath = '/eCaseManager/CaseM/SetCaseAssign';

  /**
   * 儲存 CaseAssign.
   *
   * 儲存 CaseAssign
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `caseMSetCaseAssign$Plain()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  caseMSetCaseAssign$Plain$Response(params?: CaseMSetCaseAssign$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<CaseAssignResult>> {
    return caseMSetCaseAssign$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * 儲存 CaseAssign.
   *
   * 儲存 CaseAssign
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `caseMSetCaseAssign$Plain$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  caseMSetCaseAssign$Plain(params?: CaseMSetCaseAssign$Plain$Params, context?: HttpContext): Observable<CaseAssignResult> {
    return this.caseMSetCaseAssign$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<CaseAssignResult>): CaseAssignResult => r.body)
    );
  }

  /**
   * 儲存 CaseAssign.
   *
   * 儲存 CaseAssign
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `caseMSetCaseAssign$Json()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  caseMSetCaseAssign$Json$Response(params?: CaseMSetCaseAssign$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<CaseAssignResult>> {
    return caseMSetCaseAssign$Json(this.http, this.rootUrl, params, context);
  }

  /**
   * 儲存 CaseAssign.
   *
   * 儲存 CaseAssign
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `caseMSetCaseAssign$Json$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  caseMSetCaseAssign$Json(params?: CaseMSetCaseAssign$Json$Params, context?: HttpContext): Observable<CaseAssignResult> {
    return this.caseMSetCaseAssign$Json$Response(params, context).pipe(
      map((r: StrictHttpResponse<CaseAssignResult>): CaseAssignResult => r.body)
    );
  }

  /** Path part for operation `caseMRemoveCaseAssign()` */
  static readonly CaseMRemoveCaseAssignPath = '/eCaseManager/CaseM/RemoveCaseAssign';

  /**
   * 刪除 CaseAssign.
   *
   * 刪除 CaseAssign
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `caseMRemoveCaseAssign$Plain()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  caseMRemoveCaseAssign$Plain$Response(params?: CaseMRemoveCaseAssign$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<CaseAssignResult>> {
    return caseMRemoveCaseAssign$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * 刪除 CaseAssign.
   *
   * 刪除 CaseAssign
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `caseMRemoveCaseAssign$Plain$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  caseMRemoveCaseAssign$Plain(params?: CaseMRemoveCaseAssign$Plain$Params, context?: HttpContext): Observable<CaseAssignResult> {
    return this.caseMRemoveCaseAssign$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<CaseAssignResult>): CaseAssignResult => r.body)
    );
  }

  /**
   * 刪除 CaseAssign.
   *
   * 刪除 CaseAssign
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `caseMRemoveCaseAssign$Json()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  caseMRemoveCaseAssign$Json$Response(params?: CaseMRemoveCaseAssign$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<CaseAssignResult>> {
    return caseMRemoveCaseAssign$Json(this.http, this.rootUrl, params, context);
  }

  /**
   * 刪除 CaseAssign.
   *
   * 刪除 CaseAssign
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `caseMRemoveCaseAssign$Json$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  caseMRemoveCaseAssign$Json(params?: CaseMRemoveCaseAssign$Json$Params, context?: HttpContext): Observable<CaseAssignResult> {
    return this.caseMRemoveCaseAssign$Json$Response(params, context).pipe(
      map((r: StrictHttpResponse<CaseAssignResult>): CaseAssignResult => r.body)
    );
  }

  /** Path part for operation `caseMCaseMConfirm()` */
  static readonly CaseMCaseMConfirmPath = '/eCaseManager/CaseM/CaseMConfirm';

  /**
   * 案件確認 CaseConfirm.
   *
   * 案件確認 CaseConfirm
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `caseMCaseMConfirm$Plain()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  caseMCaseMConfirm$Plain$Response(params?: CaseMCaseMConfirm$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<MailNotifyResult>> {
    return caseMCaseMConfirm$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * 案件確認 CaseConfirm.
   *
   * 案件確認 CaseConfirm
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `caseMCaseMConfirm$Plain$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  caseMCaseMConfirm$Plain(params?: CaseMCaseMConfirm$Plain$Params, context?: HttpContext): Observable<MailNotifyResult> {
    return this.caseMCaseMConfirm$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<MailNotifyResult>): MailNotifyResult => r.body)
    );
  }

  /**
   * 案件確認 CaseConfirm.
   *
   * 案件確認 CaseConfirm
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `caseMCaseMConfirm$Json()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  caseMCaseMConfirm$Json$Response(params?: CaseMCaseMConfirm$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<MailNotifyResult>> {
    return caseMCaseMConfirm$Json(this.http, this.rootUrl, params, context);
  }

  /**
   * 案件確認 CaseConfirm.
   *
   * 案件確認 CaseConfirm
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `caseMCaseMConfirm$Json$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  caseMCaseMConfirm$Json(params?: CaseMCaseMConfirm$Json$Params, context?: HttpContext): Observable<MailNotifyResult> {
    return this.caseMCaseMConfirm$Json$Response(params, context).pipe(
      map((r: StrictHttpResponse<MailNotifyResult>): MailNotifyResult => r.body)
    );
  }

  /** Path part for operation `caseMExternalDispatch()` */
  static readonly CaseMExternalDispatchPath = '/eCaseManager/CaseM/ExternalDispatch';

  /**
   * 外部連結分派.
   *
   * 外部連結分派
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `caseMExternalDispatch$Plain()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  caseMExternalDispatch$Plain$Response(params?: CaseMExternalDispatch$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<ExtPatchResult>> {
    return caseMExternalDispatch$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * 外部連結分派.
   *
   * 外部連結分派
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `caseMExternalDispatch$Plain$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  caseMExternalDispatch$Plain(params?: CaseMExternalDispatch$Plain$Params, context?: HttpContext): Observable<ExtPatchResult> {
    return this.caseMExternalDispatch$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<ExtPatchResult>): ExtPatchResult => r.body)
    );
  }

  /**
   * 外部連結分派.
   *
   * 外部連結分派
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `caseMExternalDispatch$Json()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  caseMExternalDispatch$Json$Response(params?: CaseMExternalDispatch$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<ExtPatchResult>> {
    return caseMExternalDispatch$Json(this.http, this.rootUrl, params, context);
  }

  /**
   * 外部連結分派.
   *
   * 外部連結分派
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `caseMExternalDispatch$Json$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  caseMExternalDispatch$Json(params?: CaseMExternalDispatch$Json$Params, context?: HttpContext): Observable<ExtPatchResult> {
    return this.caseMExternalDispatch$Json$Response(params, context).pipe(
      map((r: StrictHttpResponse<ExtPatchResult>): ExtPatchResult => r.body)
    );
  }

  /** Path part for operation `caseMGetCaseChange()` */
  static readonly CaseMGetCaseChangePath = '/eCaseManager/CaseM/GetCaseChange';

  /**
   * 取得 異動列表(CaseChange).
   *
   * 回覆 異動列表(CaseChange)
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `caseMGetCaseChange$Plain()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  caseMGetCaseChange$Plain$Response(params?: CaseMGetCaseChange$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<CaseMResult>> {
    return caseMGetCaseChange$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * 取得 異動列表(CaseChange).
   *
   * 回覆 異動列表(CaseChange)
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `caseMGetCaseChange$Plain$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  caseMGetCaseChange$Plain(params?: CaseMGetCaseChange$Plain$Params, context?: HttpContext): Observable<CaseMResult> {
    return this.caseMGetCaseChange$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<CaseMResult>): CaseMResult => r.body)
    );
  }

  /**
   * 取得 異動列表(CaseChange).
   *
   * 回覆 異動列表(CaseChange)
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `caseMGetCaseChange$Json()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  caseMGetCaseChange$Json$Response(params?: CaseMGetCaseChange$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<CaseMResult>> {
    return caseMGetCaseChange$Json(this.http, this.rootUrl, params, context);
  }

  /**
   * 取得 異動列表(CaseChange).
   *
   * 回覆 異動列表(CaseChange)
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `caseMGetCaseChange$Json$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  caseMGetCaseChange$Json(params?: CaseMGetCaseChange$Json$Params, context?: HttpContext): Observable<CaseMResult> {
    return this.caseMGetCaseChange$Json$Response(params, context).pipe(
      map((r: StrictHttpResponse<CaseMResult>): CaseMResult => r.body)
    );
  }

  /** Path part for operation `caseMGetAssignNote()` */
  static readonly CaseMGetAssignNotePath = '/eCaseManager/CaseM/GetAssignNote';

  /**
   * 取得 說明列表(AssignNote).
   *
   * 回覆 說明列表(AssignNote)
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `caseMGetAssignNote$Plain()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  caseMGetAssignNote$Plain$Response(params?: CaseMGetAssignNote$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<CaseMResult>> {
    return caseMGetAssignNote$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * 取得 說明列表(AssignNote).
   *
   * 回覆 說明列表(AssignNote)
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `caseMGetAssignNote$Plain$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  caseMGetAssignNote$Plain(params?: CaseMGetAssignNote$Plain$Params, context?: HttpContext): Observable<CaseMResult> {
    return this.caseMGetAssignNote$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<CaseMResult>): CaseMResult => r.body)
    );
  }

  /**
   * 取得 說明列表(AssignNote).
   *
   * 回覆 說明列表(AssignNote)
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `caseMGetAssignNote$Json()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  caseMGetAssignNote$Json$Response(params?: CaseMGetAssignNote$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<CaseMResult>> {
    return caseMGetAssignNote$Json(this.http, this.rootUrl, params, context);
  }

  /**
   * 取得 說明列表(AssignNote).
   *
   * 回覆 說明列表(AssignNote)
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `caseMGetAssignNote$Json$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  caseMGetAssignNote$Json(params?: CaseMGetAssignNote$Json$Params, context?: HttpContext): Observable<CaseMResult> {
    return this.caseMGetAssignNote$Json$Response(params, context).pipe(
      map((r: StrictHttpResponse<CaseMResult>): CaseMResult => r.body)
    );
  }

  /** Path part for operation `caseMSetAssignNote()` */
  static readonly CaseMSetAssignNotePath = '/eCaseManager/CaseM/SetAssignNote';

  /**
   * 儲存 說明列表(AssignNote).
   *
   * 儲存 說明列表(AssignNote)
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `caseMSetAssignNote$Plain()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  caseMSetAssignNote$Plain$Response(params?: CaseMSetAssignNote$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<AssignNoteResult>> {
    return caseMSetAssignNote$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * 儲存 說明列表(AssignNote).
   *
   * 儲存 說明列表(AssignNote)
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `caseMSetAssignNote$Plain$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  caseMSetAssignNote$Plain(params?: CaseMSetAssignNote$Plain$Params, context?: HttpContext): Observable<AssignNoteResult> {
    return this.caseMSetAssignNote$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<AssignNoteResult>): AssignNoteResult => r.body)
    );
  }

  /**
   * 儲存 說明列表(AssignNote).
   *
   * 儲存 說明列表(AssignNote)
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `caseMSetAssignNote$Json()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  caseMSetAssignNote$Json$Response(params?: CaseMSetAssignNote$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<AssignNoteResult>> {
    return caseMSetAssignNote$Json(this.http, this.rootUrl, params, context);
  }

  /**
   * 儲存 說明列表(AssignNote).
   *
   * 儲存 說明列表(AssignNote)
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `caseMSetAssignNote$Json$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  caseMSetAssignNote$Json(params?: CaseMSetAssignNote$Json$Params, context?: HttpContext): Observable<AssignNoteResult> {
    return this.caseMSetAssignNote$Json$Response(params, context).pipe(
      map((r: StrictHttpResponse<AssignNoteResult>): AssignNoteResult => r.body)
    );
  }

  /** Path part for operation `caseMGetCaseMailList()` */
  static readonly CaseMGetCaseMailListPath = '/eCaseManager/CaseM/GetCaseMailList';

  /**
   * 取得 CaseMailList.
   *
   * 回覆 CaseMailList
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `caseMGetCaseMailList$Plain()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  caseMGetCaseMailList$Plain$Response(params?: CaseMGetCaseMailList$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<MailListResult>> {
    return caseMGetCaseMailList$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * 取得 CaseMailList.
   *
   * 回覆 CaseMailList
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `caseMGetCaseMailList$Plain$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  caseMGetCaseMailList$Plain(params?: CaseMGetCaseMailList$Plain$Params, context?: HttpContext): Observable<MailListResult> {
    return this.caseMGetCaseMailList$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<MailListResult>): MailListResult => r.body)
    );
  }

  /**
   * 取得 CaseMailList.
   *
   * 回覆 CaseMailList
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `caseMGetCaseMailList$Json()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  caseMGetCaseMailList$Json$Response(params?: CaseMGetCaseMailList$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<MailListResult>> {
    return caseMGetCaseMailList$Json(this.http, this.rootUrl, params, context);
  }

  /**
   * 取得 CaseMailList.
   *
   * 回覆 CaseMailList
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `caseMGetCaseMailList$Json$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  caseMGetCaseMailList$Json(params?: CaseMGetCaseMailList$Json$Params, context?: HttpContext): Observable<MailListResult> {
    return this.caseMGetCaseMailList$Json$Response(params, context).pipe(
      map((r: StrictHttpResponse<MailListResult>): MailListResult => r.body)
    );
  }

  /** Path part for operation `caseMSetCaseMailList()` */
  static readonly CaseMSetCaseMailListPath = '/eCaseManager/CaseM/SetCaseMailList';

  /**
   * 儲存 CaseMailList.
   *
   * 儲存 CaseMailList
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `caseMSetCaseMailList$Plain()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  caseMSetCaseMailList$Plain$Response(params?: CaseMSetCaseMailList$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<MailListResult>> {
    return caseMSetCaseMailList$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * 儲存 CaseMailList.
   *
   * 儲存 CaseMailList
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `caseMSetCaseMailList$Plain$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  caseMSetCaseMailList$Plain(params?: CaseMSetCaseMailList$Plain$Params, context?: HttpContext): Observable<MailListResult> {
    return this.caseMSetCaseMailList$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<MailListResult>): MailListResult => r.body)
    );
  }

  /**
   * 儲存 CaseMailList.
   *
   * 儲存 CaseMailList
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `caseMSetCaseMailList$Json()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  caseMSetCaseMailList$Json$Response(params?: CaseMSetCaseMailList$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<MailListResult>> {
    return caseMSetCaseMailList$Json(this.http, this.rootUrl, params, context);
  }

  /**
   * 儲存 CaseMailList.
   *
   * 儲存 CaseMailList
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `caseMSetCaseMailList$Json$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  caseMSetCaseMailList$Json(params?: CaseMSetCaseMailList$Json$Params, context?: HttpContext): Observable<MailListResult> {
    return this.caseMSetCaseMailList$Json$Response(params, context).pipe(
      map((r: StrictHttpResponse<MailListResult>): MailListResult => r.body)
    );
  }

  /** Path part for operation `caseMGetCaseDeptWEmp()` */
  static readonly CaseMGetCaseDeptWEmpPath = '/eCaseManager/CaseM/GetCaseDeptWEmp';

  /**
   * 取得 CaseDeptM.
   *
   * 回覆 CaseDeptM
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `caseMGetCaseDeptWEmp$Plain()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  caseMGetCaseDeptWEmp$Plain$Response(params?: CaseMGetCaseDeptWEmp$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<CaseDeptWEmpResult>> {
    return caseMGetCaseDeptWEmp$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * 取得 CaseDeptM.
   *
   * 回覆 CaseDeptM
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `caseMGetCaseDeptWEmp$Plain$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  caseMGetCaseDeptWEmp$Plain(params?: CaseMGetCaseDeptWEmp$Plain$Params, context?: HttpContext): Observable<CaseDeptWEmpResult> {
    return this.caseMGetCaseDeptWEmp$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<CaseDeptWEmpResult>): CaseDeptWEmpResult => r.body)
    );
  }

  /**
   * 取得 CaseDeptM.
   *
   * 回覆 CaseDeptM
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `caseMGetCaseDeptWEmp$Json()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  caseMGetCaseDeptWEmp$Json$Response(params?: CaseMGetCaseDeptWEmp$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<CaseDeptWEmpResult>> {
    return caseMGetCaseDeptWEmp$Json(this.http, this.rootUrl, params, context);
  }

  /**
   * 取得 CaseDeptM.
   *
   * 回覆 CaseDeptM
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `caseMGetCaseDeptWEmp$Json$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  caseMGetCaseDeptWEmp$Json(params?: CaseMGetCaseDeptWEmp$Json$Params, context?: HttpContext): Observable<CaseDeptWEmpResult> {
    return this.caseMGetCaseDeptWEmp$Json$Response(params, context).pipe(
      map((r: StrictHttpResponse<CaseDeptWEmpResult>): CaseDeptWEmpResult => r.body)
    );
  }

  /** Path part for operation `caseMGetCaseDeptM()` */
  static readonly CaseMGetCaseDeptMPath = '/eCaseManager/CaseM/GetCaseDeptM';

  /**
   * 取得 CaseDeptM.
   *
   * 回覆 CaseDeptM
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `caseMGetCaseDeptM$Plain()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  caseMGetCaseDeptM$Plain$Response(params?: CaseMGetCaseDeptM$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<CaseDeptMResult>> {
    return caseMGetCaseDeptM$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * 取得 CaseDeptM.
   *
   * 回覆 CaseDeptM
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `caseMGetCaseDeptM$Plain$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  caseMGetCaseDeptM$Plain(params?: CaseMGetCaseDeptM$Plain$Params, context?: HttpContext): Observable<CaseDeptMResult> {
    return this.caseMGetCaseDeptM$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<CaseDeptMResult>): CaseDeptMResult => r.body)
    );
  }

  /**
   * 取得 CaseDeptM.
   *
   * 回覆 CaseDeptM
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `caseMGetCaseDeptM$Json()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  caseMGetCaseDeptM$Json$Response(params?: CaseMGetCaseDeptM$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<CaseDeptMResult>> {
    return caseMGetCaseDeptM$Json(this.http, this.rootUrl, params, context);
  }

  /**
   * 取得 CaseDeptM.
   *
   * 回覆 CaseDeptM
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `caseMGetCaseDeptM$Json$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  caseMGetCaseDeptM$Json(params?: CaseMGetCaseDeptM$Json$Params, context?: HttpContext): Observable<CaseDeptMResult> {
    return this.caseMGetCaseDeptM$Json$Response(params, context).pipe(
      map((r: StrictHttpResponse<CaseDeptMResult>): CaseDeptMResult => r.body)
    );
  }

  /** Path part for operation `caseMSetCaseDeptM()` */
  static readonly CaseMSetCaseDeptMPath = '/eCaseManager/CaseM/SetCaseDeptM';

  /**
   * 儲存 CaseDeptM.
   *
   * 儲存 CaseDeptM
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `caseMSetCaseDeptM$Plain()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  caseMSetCaseDeptM$Plain$Response(params?: CaseMSetCaseDeptM$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<CaseDeptMResult>> {
    return caseMSetCaseDeptM$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * 儲存 CaseDeptM.
   *
   * 儲存 CaseDeptM
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `caseMSetCaseDeptM$Plain$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  caseMSetCaseDeptM$Plain(params?: CaseMSetCaseDeptM$Plain$Params, context?: HttpContext): Observable<CaseDeptMResult> {
    return this.caseMSetCaseDeptM$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<CaseDeptMResult>): CaseDeptMResult => r.body)
    );
  }

  /**
   * 儲存 CaseDeptM.
   *
   * 儲存 CaseDeptM
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `caseMSetCaseDeptM$Json()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  caseMSetCaseDeptM$Json$Response(params?: CaseMSetCaseDeptM$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<CaseDeptMResult>> {
    return caseMSetCaseDeptM$Json(this.http, this.rootUrl, params, context);
  }

  /**
   * 儲存 CaseDeptM.
   *
   * 儲存 CaseDeptM
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `caseMSetCaseDeptM$Json$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  caseMSetCaseDeptM$Json(params?: CaseMSetCaseDeptM$Json$Params, context?: HttpContext): Observable<CaseDeptMResult> {
    return this.caseMSetCaseDeptM$Json$Response(params, context).pipe(
      map((r: StrictHttpResponse<CaseDeptMResult>): CaseDeptMResult => r.body)
    );
  }

  /** Path part for operation `caseMRemoveCaseDeptM()` */
  static readonly CaseMRemoveCaseDeptMPath = '/eCaseManager/CaseM/RemoveCaseDeptM';

  /**
   * 刪除 CaseDeptM.
   *
   * 刪除 CaseDeptM
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `caseMRemoveCaseDeptM$Plain()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  caseMRemoveCaseDeptM$Plain$Response(params?: CaseMRemoveCaseDeptM$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<CaseDeptMResult>> {
    return caseMRemoveCaseDeptM$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * 刪除 CaseDeptM.
   *
   * 刪除 CaseDeptM
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `caseMRemoveCaseDeptM$Plain$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  caseMRemoveCaseDeptM$Plain(params?: CaseMRemoveCaseDeptM$Plain$Params, context?: HttpContext): Observable<CaseDeptMResult> {
    return this.caseMRemoveCaseDeptM$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<CaseDeptMResult>): CaseDeptMResult => r.body)
    );
  }

  /**
   * 刪除 CaseDeptM.
   *
   * 刪除 CaseDeptM
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `caseMRemoveCaseDeptM$Json()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  caseMRemoveCaseDeptM$Json$Response(params?: CaseMRemoveCaseDeptM$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<CaseDeptMResult>> {
    return caseMRemoveCaseDeptM$Json(this.http, this.rootUrl, params, context);
  }

  /**
   * 刪除 CaseDeptM.
   *
   * 刪除 CaseDeptM
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `caseMRemoveCaseDeptM$Json$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  caseMRemoveCaseDeptM$Json(params?: CaseMRemoveCaseDeptM$Json$Params, context?: HttpContext): Observable<CaseDeptMResult> {
    return this.caseMRemoveCaseDeptM$Json$Response(params, context).pipe(
      map((r: StrictHttpResponse<CaseDeptMResult>): CaseDeptMResult => r.body)
    );
  }

  /** Path part for operation `caseMGetCaseDeptTeamWEmp()` */
  static readonly CaseMGetCaseDeptTeamWEmpPath = '/eCaseManager/CaseM/GetCaseDeptTeamWEmp';

  /**
   * 取得 CaseDeptS With Emp.
   *
   * 回覆 CaseDeptS With Emp
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `caseMGetCaseDeptTeamWEmp$Plain()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  caseMGetCaseDeptTeamWEmp$Plain$Response(params?: CaseMGetCaseDeptTeamWEmp$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<CaseDeptTeamWEmpResult>> {
    return caseMGetCaseDeptTeamWEmp$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * 取得 CaseDeptS With Emp.
   *
   * 回覆 CaseDeptS With Emp
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `caseMGetCaseDeptTeamWEmp$Plain$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  caseMGetCaseDeptTeamWEmp$Plain(params?: CaseMGetCaseDeptTeamWEmp$Plain$Params, context?: HttpContext): Observable<CaseDeptTeamWEmpResult> {
    return this.caseMGetCaseDeptTeamWEmp$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<CaseDeptTeamWEmpResult>): CaseDeptTeamWEmpResult => r.body)
    );
  }

  /**
   * 取得 CaseDeptS With Emp.
   *
   * 回覆 CaseDeptS With Emp
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `caseMGetCaseDeptTeamWEmp$Json()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  caseMGetCaseDeptTeamWEmp$Json$Response(params?: CaseMGetCaseDeptTeamWEmp$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<CaseDeptTeamWEmpResult>> {
    return caseMGetCaseDeptTeamWEmp$Json(this.http, this.rootUrl, params, context);
  }

  /**
   * 取得 CaseDeptS With Emp.
   *
   * 回覆 CaseDeptS With Emp
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `caseMGetCaseDeptTeamWEmp$Json$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  caseMGetCaseDeptTeamWEmp$Json(params?: CaseMGetCaseDeptTeamWEmp$Json$Params, context?: HttpContext): Observable<CaseDeptTeamWEmpResult> {
    return this.caseMGetCaseDeptTeamWEmp$Json$Response(params, context).pipe(
      map((r: StrictHttpResponse<CaseDeptTeamWEmpResult>): CaseDeptTeamWEmpResult => r.body)
    );
  }

  /** Path part for operation `caseMGetCaseDeptTeam()` */
  static readonly CaseMGetCaseDeptTeamPath = '/eCaseManager/CaseM/GetCaseDeptTeam';

  /**
   * 取得 CaseDeptS.
   *
   * 回覆 CaseDeptS
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `caseMGetCaseDeptTeam$Plain()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  caseMGetCaseDeptTeam$Plain$Response(params?: CaseMGetCaseDeptTeam$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<CaseDeptTeamResult>> {
    return caseMGetCaseDeptTeam$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * 取得 CaseDeptS.
   *
   * 回覆 CaseDeptS
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `caseMGetCaseDeptTeam$Plain$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  caseMGetCaseDeptTeam$Plain(params?: CaseMGetCaseDeptTeam$Plain$Params, context?: HttpContext): Observable<CaseDeptTeamResult> {
    return this.caseMGetCaseDeptTeam$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<CaseDeptTeamResult>): CaseDeptTeamResult => r.body)
    );
  }

  /**
   * 取得 CaseDeptS.
   *
   * 回覆 CaseDeptS
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `caseMGetCaseDeptTeam$Json()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  caseMGetCaseDeptTeam$Json$Response(params?: CaseMGetCaseDeptTeam$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<CaseDeptTeamResult>> {
    return caseMGetCaseDeptTeam$Json(this.http, this.rootUrl, params, context);
  }

  /**
   * 取得 CaseDeptS.
   *
   * 回覆 CaseDeptS
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `caseMGetCaseDeptTeam$Json$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  caseMGetCaseDeptTeam$Json(params?: CaseMGetCaseDeptTeam$Json$Params, context?: HttpContext): Observable<CaseDeptTeamResult> {
    return this.caseMGetCaseDeptTeam$Json$Response(params, context).pipe(
      map((r: StrictHttpResponse<CaseDeptTeamResult>): CaseDeptTeamResult => r.body)
    );
  }

  /** Path part for operation `caseMSetCaseDeptTeam()` */
  static readonly CaseMSetCaseDeptTeamPath = '/eCaseManager/CaseM/SetCaseDeptTeam';

  /**
   * 儲存 CaseDeptS.
   *
   * 儲存 CaseDeptS
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `caseMSetCaseDeptTeam$Plain()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  caseMSetCaseDeptTeam$Plain$Response(params?: CaseMSetCaseDeptTeam$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<CaseDeptTeamResult>> {
    return caseMSetCaseDeptTeam$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * 儲存 CaseDeptS.
   *
   * 儲存 CaseDeptS
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `caseMSetCaseDeptTeam$Plain$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  caseMSetCaseDeptTeam$Plain(params?: CaseMSetCaseDeptTeam$Plain$Params, context?: HttpContext): Observable<CaseDeptTeamResult> {
    return this.caseMSetCaseDeptTeam$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<CaseDeptTeamResult>): CaseDeptTeamResult => r.body)
    );
  }

  /**
   * 儲存 CaseDeptS.
   *
   * 儲存 CaseDeptS
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `caseMSetCaseDeptTeam$Json()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  caseMSetCaseDeptTeam$Json$Response(params?: CaseMSetCaseDeptTeam$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<CaseDeptTeamResult>> {
    return caseMSetCaseDeptTeam$Json(this.http, this.rootUrl, params, context);
  }

  /**
   * 儲存 CaseDeptS.
   *
   * 儲存 CaseDeptS
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `caseMSetCaseDeptTeam$Json$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  caseMSetCaseDeptTeam$Json(params?: CaseMSetCaseDeptTeam$Json$Params, context?: HttpContext): Observable<CaseDeptTeamResult> {
    return this.caseMSetCaseDeptTeam$Json$Response(params, context).pipe(
      map((r: StrictHttpResponse<CaseDeptTeamResult>): CaseDeptTeamResult => r.body)
    );
  }

  /** Path part for operation `caseMRemoveCaseDeptTeam()` */
  static readonly CaseMRemoveCaseDeptTeamPath = '/eCaseManager/CaseM/RemoveCaseDeptTeam';

  /**
   * 刪除 CaseDeptS.
   *
   * 刪除 CaseDeptS
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `caseMRemoveCaseDeptTeam$Plain()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  caseMRemoveCaseDeptTeam$Plain$Response(params?: CaseMRemoveCaseDeptTeam$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<CaseDeptTeamResult>> {
    return caseMRemoveCaseDeptTeam$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * 刪除 CaseDeptS.
   *
   * 刪除 CaseDeptS
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `caseMRemoveCaseDeptTeam$Plain$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  caseMRemoveCaseDeptTeam$Plain(params?: CaseMRemoveCaseDeptTeam$Plain$Params, context?: HttpContext): Observable<CaseDeptTeamResult> {
    return this.caseMRemoveCaseDeptTeam$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<CaseDeptTeamResult>): CaseDeptTeamResult => r.body)
    );
  }

  /**
   * 刪除 CaseDeptS.
   *
   * 刪除 CaseDeptS
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `caseMRemoveCaseDeptTeam$Json()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  caseMRemoveCaseDeptTeam$Json$Response(params?: CaseMRemoveCaseDeptTeam$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<CaseDeptTeamResult>> {
    return caseMRemoveCaseDeptTeam$Json(this.http, this.rootUrl, params, context);
  }

  /**
   * 刪除 CaseDeptS.
   *
   * 刪除 CaseDeptS
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `caseMRemoveCaseDeptTeam$Json$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  caseMRemoveCaseDeptTeam$Json(params?: CaseMRemoveCaseDeptTeam$Json$Params, context?: HttpContext): Observable<CaseDeptTeamResult> {
    return this.caseMRemoveCaseDeptTeam$Json$Response(params, context).pipe(
      map((r: StrictHttpResponse<CaseDeptTeamResult>): CaseDeptTeamResult => r.body)
    );
  }

  /** Path part for operation `caseMGetCaseDeptEmp()` */
  static readonly CaseMGetCaseDeptEmpPath = '/eCaseManager/CaseM/GetCaseDeptEmp';

  /**
   * 取得 CaseDeptEmp.
   *
   * 回覆 CaseDeptEmp
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `caseMGetCaseDeptEmp$Plain()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  caseMGetCaseDeptEmp$Plain$Response(params?: CaseMGetCaseDeptEmp$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<CaseDeptEmpResult>> {
    return caseMGetCaseDeptEmp$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * 取得 CaseDeptEmp.
   *
   * 回覆 CaseDeptEmp
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `caseMGetCaseDeptEmp$Plain$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  caseMGetCaseDeptEmp$Plain(params?: CaseMGetCaseDeptEmp$Plain$Params, context?: HttpContext): Observable<CaseDeptEmpResult> {
    return this.caseMGetCaseDeptEmp$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<CaseDeptEmpResult>): CaseDeptEmpResult => r.body)
    );
  }

  /**
   * 取得 CaseDeptEmp.
   *
   * 回覆 CaseDeptEmp
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `caseMGetCaseDeptEmp$Json()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  caseMGetCaseDeptEmp$Json$Response(params?: CaseMGetCaseDeptEmp$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<CaseDeptEmpResult>> {
    return caseMGetCaseDeptEmp$Json(this.http, this.rootUrl, params, context);
  }

  /**
   * 取得 CaseDeptEmp.
   *
   * 回覆 CaseDeptEmp
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `caseMGetCaseDeptEmp$Json$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  caseMGetCaseDeptEmp$Json(params?: CaseMGetCaseDeptEmp$Json$Params, context?: HttpContext): Observable<CaseDeptEmpResult> {
    return this.caseMGetCaseDeptEmp$Json$Response(params, context).pipe(
      map((r: StrictHttpResponse<CaseDeptEmpResult>): CaseDeptEmpResult => r.body)
    );
  }

  /** Path part for operation `caseMSetCaseDeptEmp()` */
  static readonly CaseMSetCaseDeptEmpPath = '/eCaseManager/CaseM/SetCaseDeptEmp';

  /**
   * 儲存 CaseDeptEmp.
   *
   * 儲存 CaseDeptEmp
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `caseMSetCaseDeptEmp$Plain()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  caseMSetCaseDeptEmp$Plain$Response(params?: CaseMSetCaseDeptEmp$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<CaseDeptEmpResult>> {
    return caseMSetCaseDeptEmp$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * 儲存 CaseDeptEmp.
   *
   * 儲存 CaseDeptEmp
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `caseMSetCaseDeptEmp$Plain$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  caseMSetCaseDeptEmp$Plain(params?: CaseMSetCaseDeptEmp$Plain$Params, context?: HttpContext): Observable<CaseDeptEmpResult> {
    return this.caseMSetCaseDeptEmp$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<CaseDeptEmpResult>): CaseDeptEmpResult => r.body)
    );
  }

  /**
   * 儲存 CaseDeptEmp.
   *
   * 儲存 CaseDeptEmp
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `caseMSetCaseDeptEmp$Json()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  caseMSetCaseDeptEmp$Json$Response(params?: CaseMSetCaseDeptEmp$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<CaseDeptEmpResult>> {
    return caseMSetCaseDeptEmp$Json(this.http, this.rootUrl, params, context);
  }

  /**
   * 儲存 CaseDeptEmp.
   *
   * 儲存 CaseDeptEmp
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `caseMSetCaseDeptEmp$Json$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  caseMSetCaseDeptEmp$Json(params?: CaseMSetCaseDeptEmp$Json$Params, context?: HttpContext): Observable<CaseDeptEmpResult> {
    return this.caseMSetCaseDeptEmp$Json$Response(params, context).pipe(
      map((r: StrictHttpResponse<CaseDeptEmpResult>): CaseDeptEmpResult => r.body)
    );
  }

  /** Path part for operation `caseMRemoveCaseDeptEmp()` */
  static readonly CaseMRemoveCaseDeptEmpPath = '/eCaseManager/CaseM/RemoveCaseDeptEmp';

  /**
   * 刪除 CaseDeptEmp.
   *
   * 刪除 CaseDeptEmp
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `caseMRemoveCaseDeptEmp$Plain()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  caseMRemoveCaseDeptEmp$Plain$Response(params?: CaseMRemoveCaseDeptEmp$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<CaseDeptEmpResult>> {
    return caseMRemoveCaseDeptEmp$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * 刪除 CaseDeptEmp.
   *
   * 刪除 CaseDeptEmp
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `caseMRemoveCaseDeptEmp$Plain$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  caseMRemoveCaseDeptEmp$Plain(params?: CaseMRemoveCaseDeptEmp$Plain$Params, context?: HttpContext): Observable<CaseDeptEmpResult> {
    return this.caseMRemoveCaseDeptEmp$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<CaseDeptEmpResult>): CaseDeptEmpResult => r.body)
    );
  }

  /**
   * 刪除 CaseDeptEmp.
   *
   * 刪除 CaseDeptEmp
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `caseMRemoveCaseDeptEmp$Json()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  caseMRemoveCaseDeptEmp$Json$Response(params?: CaseMRemoveCaseDeptEmp$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<CaseDeptEmpResult>> {
    return caseMRemoveCaseDeptEmp$Json(this.http, this.rootUrl, params, context);
  }

  /**
   * 刪除 CaseDeptEmp.
   *
   * 刪除 CaseDeptEmp
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `caseMRemoveCaseDeptEmp$Json$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  caseMRemoveCaseDeptEmp$Json(params?: CaseMRemoveCaseDeptEmp$Json$Params, context?: HttpContext): Observable<CaseDeptEmpResult> {
    return this.caseMRemoveCaseDeptEmp$Json$Response(params, context).pipe(
      map((r: StrictHttpResponse<CaseDeptEmpResult>): CaseDeptEmpResult => r.body)
    );
  }

}
