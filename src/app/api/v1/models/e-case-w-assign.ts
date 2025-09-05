/* tslint:disable */
/* eslint-disable */

/**
 * 案件主檔加上主辦
 */
export interface ECaseWAssign {
  caseNo?: string | null;
  cdate?: string | null;
  createdBy?: string | null;
  createdDate?: string | null;
  delaytime?: number;

  /**
   * (協辦)Email
   */
  emp1Email?: string | null;

  /**
   * (協辦)名稱
   */
  emp1Name?: string | null;

  /**
   * (主辦)Email
   */
  empEmail?: string | null;

  /**
   * (主辦)名稱
   */
  empName?: string | null;

  /**
   * 展開
   */
  expanded?: boolean | null;
  fdate?: string | null;
  id: number;

  /**
   * 身分別
   */
  idtype?: string | null;
  mContent?: string | null;
  note?: string | null;
  ptno?: string | null;
  source?: string | null;
  spotlight?: string | null;
  state?: string | null;

  /**
   * (協辦)單位名稱
   */
  unit1Name?: string | null;

  /**
   * (協辦)單位代號
   */
  unit1No?: string | null;

  /**
   * (主辦)單位名稱
   */
  unitName?: string | null;

  /**
   * (主辦)單位代號
   */
  unitNo?: string | null;
  updatedBy?: string | null;
  updatedDate?: string | null;
  upperNo?: string | null;
}
