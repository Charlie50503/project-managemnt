/* tslint:disable */
/* eslint-disable */

/**
 * 部門主檔加上主管
 */
export interface ECaseDeptWEmp {

  /**
   * 員工帳號
   */
  acctno?: string | null;
  brhname?: string | null;
  brhno?: string | null;
  createdBy?: string | null;
  createdDate?: string | null;
  deptname?: string | null;
  deptno?: string | null;

  /**
   * 員工名稱
   */
  empname?: string | null;

  /**
   * 員工代號
   */
  empno?: string | null;
  id: number;
  note?: string | null;

  /**
   * 角色
   */
  role?: string | null;

  /**
   * 科組代號
   */
  teamname?: string | null;

  /**
   * 科組代號
   */
  teamno?: string | null;
  updatedBy?: string | null;
  updatedDate?: string | null;
}
