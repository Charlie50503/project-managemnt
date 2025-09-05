/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { BranchResult } from '../models/branch-result';
import { BrhDepTeamResult } from '../models/brh-dep-team-result';
import { BrhDeptResult } from '../models/brh-dept-result';
import { DepTeamResult } from '../models/dep-team-result';
import { organizeGetBranch$Json } from '../fn/organize/organize-get-branch-json';
import { OrganizeGetBranch$Json$Params } from '../fn/organize/organize-get-branch-json';
import { organizeGetBranch$Plain } from '../fn/organize/organize-get-branch-plain';
import { OrganizeGetBranch$Plain$Params } from '../fn/organize/organize-get-branch-plain';
import { organizeGetBrhDept$Json } from '../fn/organize/organize-get-brh-dept-json';
import { OrganizeGetBrhDept$Json$Params } from '../fn/organize/organize-get-brh-dept-json';
import { organizeGetBrhDept$Plain } from '../fn/organize/organize-get-brh-dept-plain';
import { OrganizeGetBrhDept$Plain$Params } from '../fn/organize/organize-get-brh-dept-plain';
import { organizeGetBrhDepTeam$Json } from '../fn/organize/organize-get-brh-dep-team-json';
import { OrganizeGetBrhDepTeam$Json$Params } from '../fn/organize/organize-get-brh-dep-team-json';
import { organizeGetBrhDepTeam$Plain } from '../fn/organize/organize-get-brh-dep-team-plain';
import { OrganizeGetBrhDepTeam$Plain$Params } from '../fn/organize/organize-get-brh-dep-team-plain';
import { organizeGetDepTeam$Json } from '../fn/organize/organize-get-dep-team-json';
import { OrganizeGetDepTeam$Json$Params } from '../fn/organize/organize-get-dep-team-json';
import { organizeGetDepTeam$Plain } from '../fn/organize/organize-get-dep-team-plain';
import { OrganizeGetDepTeam$Plain$Params } from '../fn/organize/organize-get-dep-team-plain';
import { organizeGetDeptStaff$Json } from '../fn/organize/organize-get-dept-staff-json';
import { OrganizeGetDeptStaff$Json$Params } from '../fn/organize/organize-get-dept-staff-json';
import { organizeGetDeptStaff$Plain } from '../fn/organize/organize-get-dept-staff-plain';
import { OrganizeGetDeptStaff$Plain$Params } from '../fn/organize/organize-get-dept-staff-plain';
import { organizeGetOrganDept$Json } from '../fn/organize/organize-get-organ-dept-json';
import { OrganizeGetOrganDept$Json$Params } from '../fn/organize/organize-get-organ-dept-json';
import { organizeGetOrganDept$Plain } from '../fn/organize/organize-get-organ-dept-plain';
import { OrganizeGetOrganDept$Plain$Params } from '../fn/organize/organize-get-organ-dept-plain';
import { organizeGetOrganization$Json } from '../fn/organize/organize-get-organization-json';
import { OrganizeGetOrganization$Json$Params } from '../fn/organize/organize-get-organization-json';
import { organizeGetOrganization$Plain } from '../fn/organize/organize-get-organization-plain';
import { OrganizeGetOrganization$Plain$Params } from '../fn/organize/organize-get-organization-plain';
import { organizeGetStaff$Json } from '../fn/organize/organize-get-staff-json';
import { OrganizeGetStaff$Json$Params } from '../fn/organize/organize-get-staff-json';
import { organizeGetStaff$Plain } from '../fn/organize/organize-get-staff-plain';
import { OrganizeGetStaff$Plain$Params } from '../fn/organize/organize-get-staff-plain';
import { OrganResult } from '../models/organ-result';
import { OrgDeptResult } from '../models/org-dept-result';
import { StaffResult } from '../models/staff-result';
import { StaffWithTeamResult } from '../models/staff-with-team-result';

@Injectable({ providedIn: 'root' })
export class OrganizeService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `organizeGetStaff()` */
  static readonly OrganizeGetStaffPath = '/api/Organize/GetStaff';

  /**
   * 取得(員工)架構.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `organizeGetStaff$Plain()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  organizeGetStaff$Plain$Response(params?: OrganizeGetStaff$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<StaffResult>> {
    return organizeGetStaff$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * 取得(員工)架構.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `organizeGetStaff$Plain$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  organizeGetStaff$Plain(params?: OrganizeGetStaff$Plain$Params, context?: HttpContext): Observable<StaffResult> {
    return this.organizeGetStaff$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<StaffResult>): StaffResult => r.body)
    );
  }

  /**
   * 取得(員工)架構.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `organizeGetStaff$Json()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  organizeGetStaff$Json$Response(params?: OrganizeGetStaff$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<StaffResult>> {
    return organizeGetStaff$Json(this.http, this.rootUrl, params, context);
  }

  /**
   * 取得(員工)架構.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `organizeGetStaff$Json$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  organizeGetStaff$Json(params?: OrganizeGetStaff$Json$Params, context?: HttpContext): Observable<StaffResult> {
    return this.organizeGetStaff$Json$Response(params, context).pipe(
      map((r: StrictHttpResponse<StaffResult>): StaffResult => r.body)
    );
  }

  /** Path part for operation `organizeGetDeptStaff()` */
  static readonly OrganizeGetDeptStaffPath = '/api/Organize/GetDeptSTAFF';

  /**
   * 取得組織(員工)架構.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `organizeGetDeptStaff$Plain()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  organizeGetDeptStaff$Plain$Response(params?: OrganizeGetDeptStaff$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<StaffWithTeamResult>> {
    return organizeGetDeptStaff$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * 取得組織(員工)架構.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `organizeGetDeptStaff$Plain$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  organizeGetDeptStaff$Plain(params?: OrganizeGetDeptStaff$Plain$Params, context?: HttpContext): Observable<StaffWithTeamResult> {
    return this.organizeGetDeptStaff$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<StaffWithTeamResult>): StaffWithTeamResult => r.body)
    );
  }

  /**
   * 取得組織(員工)架構.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `organizeGetDeptStaff$Json()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  organizeGetDeptStaff$Json$Response(params?: OrganizeGetDeptStaff$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<StaffWithTeamResult>> {
    return organizeGetDeptStaff$Json(this.http, this.rootUrl, params, context);
  }

  /**
   * 取得組織(員工)架構.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `organizeGetDeptStaff$Json$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  organizeGetDeptStaff$Json(params?: OrganizeGetDeptStaff$Json$Params, context?: HttpContext): Observable<StaffWithTeamResult> {
    return this.organizeGetDeptStaff$Json$Response(params, context).pipe(
      map((r: StrictHttpResponse<StaffWithTeamResult>): StaffWithTeamResult => r.body)
    );
  }

  /** Path part for operation `organizeGetOrganDept()` */
  static readonly OrganizeGetOrganDeptPath = '/api/Organize/GetOrganDEPT';

  /**
   * 取得組織(部門)架構.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `organizeGetOrganDept$Plain()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  organizeGetOrganDept$Plain$Response(params?: OrganizeGetOrganDept$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<OrgDeptResult>> {
    return organizeGetOrganDept$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * 取得組織(部門)架構.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `organizeGetOrganDept$Plain$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  organizeGetOrganDept$Plain(params?: OrganizeGetOrganDept$Plain$Params, context?: HttpContext): Observable<OrgDeptResult> {
    return this.organizeGetOrganDept$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<OrgDeptResult>): OrgDeptResult => r.body)
    );
  }

  /**
   * 取得組織(部門)架構.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `organizeGetOrganDept$Json()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  organizeGetOrganDept$Json$Response(params?: OrganizeGetOrganDept$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<OrgDeptResult>> {
    return organizeGetOrganDept$Json(this.http, this.rootUrl, params, context);
  }

  /**
   * 取得組織(部門)架構.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `organizeGetOrganDept$Json$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  organizeGetOrganDept$Json(params?: OrganizeGetOrganDept$Json$Params, context?: HttpContext): Observable<OrgDeptResult> {
    return this.organizeGetOrganDept$Json$Response(params, context).pipe(
      map((r: StrictHttpResponse<OrgDeptResult>): OrgDeptResult => r.body)
    );
  }

  /** Path part for operation `organizeGetOrganization()` */
  static readonly OrganizeGetOrganizationPath = '/api/Organize/GetOrganization';

  /**
   * 取得組織架構.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `organizeGetOrganization$Plain()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  organizeGetOrganization$Plain$Response(params?: OrganizeGetOrganization$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<OrganResult>> {
    return organizeGetOrganization$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * 取得組織架構.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `organizeGetOrganization$Plain$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  organizeGetOrganization$Plain(params?: OrganizeGetOrganization$Plain$Params, context?: HttpContext): Observable<OrganResult> {
    return this.organizeGetOrganization$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<OrganResult>): OrganResult => r.body)
    );
  }

  /**
   * 取得組織架構.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `organizeGetOrganization$Json()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  organizeGetOrganization$Json$Response(params?: OrganizeGetOrganization$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<OrganResult>> {
    return organizeGetOrganization$Json(this.http, this.rootUrl, params, context);
  }

  /**
   * 取得組織架構.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `organizeGetOrganization$Json$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  organizeGetOrganization$Json(params?: OrganizeGetOrganization$Json$Params, context?: HttpContext): Observable<OrganResult> {
    return this.organizeGetOrganization$Json$Response(params, context).pipe(
      map((r: StrictHttpResponse<OrganResult>): OrganResult => r.body)
    );
  }

  /** Path part for operation `organizeGetBranch()` */
  static readonly OrganizeGetBranchPath = '/api/Organize/GetBranch';

  /**
   * 取得組織(公司)架構.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `organizeGetBranch$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  organizeGetBranch$Plain$Response(params?: OrganizeGetBranch$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<BranchResult>> {
    return organizeGetBranch$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * 取得組織(公司)架構.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `organizeGetBranch$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  organizeGetBranch$Plain(params?: OrganizeGetBranch$Plain$Params, context?: HttpContext): Observable<BranchResult> {
    return this.organizeGetBranch$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<BranchResult>): BranchResult => r.body)
    );
  }

  /**
   * 取得組織(公司)架構.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `organizeGetBranch$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  organizeGetBranch$Json$Response(params?: OrganizeGetBranch$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<BranchResult>> {
    return organizeGetBranch$Json(this.http, this.rootUrl, params, context);
  }

  /**
   * 取得組織(公司)架構.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `organizeGetBranch$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  organizeGetBranch$Json(params?: OrganizeGetBranch$Json$Params, context?: HttpContext): Observable<BranchResult> {
    return this.organizeGetBranch$Json$Response(params, context).pipe(
      map((r: StrictHttpResponse<BranchResult>): BranchResult => r.body)
    );
  }

  /** Path part for operation `organizeGetBrhDept()` */
  static readonly OrganizeGetBrhDeptPath = '/api/Organize/GetBrhDEPT';

  /**
   * 取得組織(公司+部門)架構.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `organizeGetBrhDept$Plain()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  organizeGetBrhDept$Plain$Response(params?: OrganizeGetBrhDept$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<BrhDeptResult>> {
    return organizeGetBrhDept$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * 取得組織(公司+部門)架構.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `organizeGetBrhDept$Plain$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  organizeGetBrhDept$Plain(params?: OrganizeGetBrhDept$Plain$Params, context?: HttpContext): Observable<BrhDeptResult> {
    return this.organizeGetBrhDept$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<BrhDeptResult>): BrhDeptResult => r.body)
    );
  }

  /**
   * 取得組織(公司+部門)架構.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `organizeGetBrhDept$Json()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  organizeGetBrhDept$Json$Response(params?: OrganizeGetBrhDept$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<BrhDeptResult>> {
    return organizeGetBrhDept$Json(this.http, this.rootUrl, params, context);
  }

  /**
   * 取得組織(公司+部門)架構.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `organizeGetBrhDept$Json$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  organizeGetBrhDept$Json(params?: OrganizeGetBrhDept$Json$Params, context?: HttpContext): Observable<BrhDeptResult> {
    return this.organizeGetBrhDept$Json$Response(params, context).pipe(
      map((r: StrictHttpResponse<BrhDeptResult>): BrhDeptResult => r.body)
    );
  }

  /** Path part for operation `organizeGetBrhDepTeam()` */
  static readonly OrganizeGetBrhDepTeamPath = '/api/Organize/GetBrhDepTEAM';

  /**
   * 取得組織(公司+部門+科組)架構.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `organizeGetBrhDepTeam$Plain()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  organizeGetBrhDepTeam$Plain$Response(params?: OrganizeGetBrhDepTeam$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<BrhDepTeamResult>> {
    return organizeGetBrhDepTeam$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * 取得組織(公司+部門+科組)架構.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `organizeGetBrhDepTeam$Plain$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  organizeGetBrhDepTeam$Plain(params?: OrganizeGetBrhDepTeam$Plain$Params, context?: HttpContext): Observable<BrhDepTeamResult> {
    return this.organizeGetBrhDepTeam$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<BrhDepTeamResult>): BrhDepTeamResult => r.body)
    );
  }

  /**
   * 取得組織(公司+部門+科組)架構.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `organizeGetBrhDepTeam$Json()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  organizeGetBrhDepTeam$Json$Response(params?: OrganizeGetBrhDepTeam$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<BrhDepTeamResult>> {
    return organizeGetBrhDepTeam$Json(this.http, this.rootUrl, params, context);
  }

  /**
   * 取得組織(公司+部門+科組)架構.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `organizeGetBrhDepTeam$Json$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  organizeGetBrhDepTeam$Json(params?: OrganizeGetBrhDepTeam$Json$Params, context?: HttpContext): Observable<BrhDepTeamResult> {
    return this.organizeGetBrhDepTeam$Json$Response(params, context).pipe(
      map((r: StrictHttpResponse<BrhDepTeamResult>): BrhDepTeamResult => r.body)
    );
  }

  /** Path part for operation `organizeGetDepTeam()` */
  static readonly OrganizeGetDepTeamPath = '/api/Organize/GetDepTEAM';

  /**
   * 取得組織(部門+科組)架構.
   *
   * 注意事項："teamcd": 如果輸入1碼，"0"則查出處， "1~9"則為科組
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `organizeGetDepTeam$Plain()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  organizeGetDepTeam$Plain$Response(params?: OrganizeGetDepTeam$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<DepTeamResult>> {
    return organizeGetDepTeam$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * 取得組織(部門+科組)架構.
   *
   * 注意事項："teamcd": 如果輸入1碼，"0"則查出處， "1~9"則為科組
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `organizeGetDepTeam$Plain$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  organizeGetDepTeam$Plain(params?: OrganizeGetDepTeam$Plain$Params, context?: HttpContext): Observable<DepTeamResult> {
    return this.organizeGetDepTeam$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<DepTeamResult>): DepTeamResult => r.body)
    );
  }

  /**
   * 取得組織(部門+科組)架構.
   *
   * 注意事項："teamcd": 如果輸入1碼，"0"則查出處， "1~9"則為科組
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `organizeGetDepTeam$Json()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  organizeGetDepTeam$Json$Response(params?: OrganizeGetDepTeam$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<DepTeamResult>> {
    return organizeGetDepTeam$Json(this.http, this.rootUrl, params, context);
  }

  /**
   * 取得組織(部門+科組)架構.
   *
   * 注意事項："teamcd": 如果輸入1碼，"0"則查出處， "1~9"則為科組
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `organizeGetDepTeam$Json$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  organizeGetDepTeam$Json(params?: OrganizeGetDepTeam$Json$Params, context?: HttpContext): Observable<DepTeamResult> {
    return this.organizeGetDepTeam$Json$Response(params, context).pipe(
      map((r: StrictHttpResponse<DepTeamResult>): DepTeamResult => r.body)
    );
  }

}
