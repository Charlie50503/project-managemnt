/* tslint:disable */
/* eslint-disable */
import { ECaseDeptTeamWEmp } from '../models/e-case-dept-team-w-emp';
import { Enum } from '../models/enum';

/**
 * CaseDeptTeam 返回內容
 */
export interface CaseDeptTeamWEmpResult {

  /**
   * 自定義部門主檔
   */
  caseDeptTeamWEmps?: Array<ECaseDeptTeamWEmp> | null;
  errCode?: Enum;
  errID?: string | null;
  errMessage?: string | null;
  error?: Enum;
  isSuccess?: boolean;
}
