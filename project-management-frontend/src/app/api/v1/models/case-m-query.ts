/* tslint:disable */
/* eslint-disable */
import { MyPaginator } from '../models/my-paginator';

/**
 * CaseM 輸入內容
 */
export interface CaseMQuery {

  /**
   * 接案人公司名稱
   */
  brhName?: string | null;

  /**
   * 接案人公司代碼
   */
  brhNo?: string | null;
  caseNo?: string | null;
  cdate?: string | null;

  /**
   * 立案日期(查詢時的迄)
   */
  cdateEnd?: string | null;
  createdBy?: string | null;
  createdDate?: string | null;
  delaytime?: number;

  /**
   * 接案人部門名稱
   */
  deptName?: string | null;

  /**
   * 接案人部門代碼
   */
  deptNo?: string | null;

  /**
   * 接案人Email
   */
  empEmail?: string | null;

  /**
   * 接案人名稱
   */
  empName?: string | null;

  /**
   * 接案人員編
   */
  empNo?: string | null;
  fdate?: string | null;

  /**
   * 預計完成日期(查詢時的迄)
   */
  fdateEnd?: string | null;
  id: number;

  /**
   * 身分別
   */
  idtype?: string | null;
  mContent?: string | null;
  note?: string | null;
  paginator?: MyPaginator;
  ptno?: string | null;
  source?: string | null;
  spotlight?: string | null;
  state?: string | null;

  /**
   * 接案人科組名稱
   */
  teamName?: string | null;

  /**
   * 接案人科組代碼
   */
  teamNo?: string | null;

  /**
   * 接案人單位名稱
   */
  unitName?: string | null;

  /**
   * 接案人單位代碼
   */
  unitNo?: string | null;
  updatedBy?: string | null;
  updatedDate?: string | null;
  upperNo?: string | null;
}
