/* tslint:disable */
/* eslint-disable */
import { CountCaseWithAssign } from '../models/count-case-with-assign';
import { Enum } from '../models/enum';

/**
 * CaseM 統計返回內容
 */
export interface CaseMCountResult {

  /**
   * 案件追蹤統計
   */
  countCaseMs?: Array<CountCaseWithAssign> | null;
  errCode?: Enum;
  errID?: string | null;
  errMessage?: string | null;
  error?: Enum;
  isSuccess?: boolean;
}
