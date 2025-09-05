/* tslint:disable */
/* eslint-disable */
import { ECaseDeptWEmp } from '../models/e-case-dept-w-emp';
import { Enum } from '../models/enum';

/**
 * CaseDeptM 返回內容
 */
export interface CaseDeptWEmpResult {

  /**
   * 自定義部門主檔
   */
  caseDeptWEmps?: Array<ECaseDeptWEmp> | null;
  errCode?: Enum;
  errID?: string | null;
  errMessage?: string | null;
  error?: Enum;
  isSuccess?: boolean;
}
