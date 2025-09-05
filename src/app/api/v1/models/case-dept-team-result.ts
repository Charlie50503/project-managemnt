/* tslint:disable */
/* eslint-disable */
import { ECaseDeptS } from '../models/e-case-dept-s';
import { Enum } from '../models/enum';

/**
 * CaseDeptS 返回內容
 */
export interface CaseDeptTeamResult {

  /**
   * 自定義部門主檔
   */
  caseDeptTeams?: Array<ECaseDeptS> | null;
  errCode?: Enum;
  errID?: string | null;
  errMessage?: string | null;
  error?: Enum;
  isSuccess?: boolean;
}
