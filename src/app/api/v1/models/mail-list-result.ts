/* tslint:disable */
/* eslint-disable */
import { ECaseMailList } from '../models/e-case-mail-list';
import { Enum } from '../models/enum';

/**
 * CaseWAssign 返回內容
 */
export interface MailListResult {

  /**
   * 寄送人員主檔
   */
  caseMailLists?: Array<ECaseMailList> | null;
  errCode?: Enum;
  errID?: string | null;
  errMessage?: string | null;
  error?: Enum;
  isSuccess?: boolean;
}
