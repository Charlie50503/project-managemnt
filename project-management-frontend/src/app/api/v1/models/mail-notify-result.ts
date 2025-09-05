/* tslint:disable */
/* eslint-disable */
import { Enum } from '../models/enum';

/**
 * CaseM 返回內容
 */
export interface MailNotifyResult {
  errCode?: Enum;
  errID?: string | null;
  errMessage?: string | null;
  error?: Enum;
  isSuccess?: boolean;
}
