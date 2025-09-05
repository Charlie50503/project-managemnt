/* tslint:disable */
/* eslint-disable */
import { ECaseAssign } from '../models/e-case-assign';
import { ECaseWAssign } from '../models/e-case-w-assign';
import { Enum } from '../models/enum';

/**
 * CaseWAssign 返回內容
 */
export interface CaseWAssignResult {

  /**
   * 案件追蹤_歸屬
   */
  caseAssigns?: Array<ECaseAssign> | null;

  /**
   * 案件追蹤主檔
   */
  caseMs?: Array<ECaseWAssign> | null;
  errCode?: Enum;
  errID?: string | null;
  errMessage?: string | null;
  error?: Enum;
  isSuccess?: boolean;
}
