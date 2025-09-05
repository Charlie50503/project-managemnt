/* tslint:disable */
/* eslint-disable */
import { ECaseDeptEmp } from '../models/e-case-dept-emp';
import { Enum } from '../models/enum';

/**
 * CaseDeptEmp 返回內容
 */
export interface CaseDeptEmpResult {

  /**
   * 自定義部門主檔
   */
  caseDeptEmps?: Array<ECaseDeptEmp> | null;
  errCode?: Enum;
  errID?: string | null;
  errMessage?: string | null;
  error?: Enum;
  isSuccess?: boolean;
}
