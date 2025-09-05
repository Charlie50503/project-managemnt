/* tslint:disable */
/* eslint-disable */
import { ECaseDeptM } from '../models/e-case-dept-m';
import { Enum } from '../models/enum';

/**
 * CaseDeptM 返回內容
 */
export interface CaseDeptMResult {

  /**
   * 自定義部門主檔
   */
  caseDeptMs?: Array<ECaseDeptM> | null;
  errCode?: Enum;
  errID?: string | null;
  errMessage?: string | null;
  error?: Enum;
  isSuccess?: boolean;
}
