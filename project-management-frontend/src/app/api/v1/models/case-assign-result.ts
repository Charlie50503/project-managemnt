/* tslint:disable */
/* eslint-disable */
import { ECaseAssign } from '../models/e-case-assign';
import { ECaseChange } from '../models/e-case-change';
import { Enum } from '../models/enum';

/**
 * CaseAssign 返回內容
 */
export interface CaseAssignResult {

  /**
   * 案件追蹤_歸屬
   */
  caseAssigns?: Array<ECaseAssign> | null;

  /**
   * 案件變更
   */
  caseChanges?: Array<ECaseChange> | null;
  errCode?: Enum;
  errID?: string | null;
  errMessage?: string | null;
  error?: Enum;
  isSuccess?: boolean;
}
