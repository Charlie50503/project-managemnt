/* tslint:disable */
/* eslint-disable */
import { ECaseAssign } from '../models/e-case-assign';
import { ECaseAssignNote } from '../models/e-case-assign-note';
import { ECaseChange } from '../models/e-case-change';
import { ECaseM } from '../models/e-case-m';
import { ECaseSendLog } from '../models/e-case-send-log';
import { Enum } from '../models/enum';

/**
 * CaseM 輸入內容
 */
export interface CaseMResult {

  /**
   * 異動說明
   */
  assignNotes?: Array<ECaseAssignNote> | null;

  /**
   * 案件追蹤_歸屬
   */
  caseAssigns?: Array<ECaseAssign> | null;

  /**
   * 案件變更
   */
  caseChanges?: Array<ECaseChange> | null;

  /**
   * 案件追蹤主檔
   */
  caseMs?: Array<ECaseM> | null;

  /**
   * 寄送通知
   */
  caseSendLogs?: Array<ECaseSendLog> | null;
  errCode?: Enum;
  errID?: string | null;
  errMessage?: string | null;
  error?: Enum;
  isSuccess?: boolean;
}
