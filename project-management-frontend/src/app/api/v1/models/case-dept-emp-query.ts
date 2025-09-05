/* tslint:disable */
/* eslint-disable */
import { MyPaginator } from '../models/my-paginator';

/**
 * CaseDeptEmp 輸入內容
 */
export interface CaseDeptEmpQuery {
  acctno?: string | null;
  brhname?: string | null;
  brhno?: string | null;
  createdBy?: string | null;
  createdDate?: string | null;
  deptname?: string | null;
  deptno?: string | null;
  empname?: string | null;
  empno?: string | null;
  id: number;
  note?: string | null;
  paginator?: MyPaginator;
  role?: string | null;
  updatedBy?: string | null;
  updatedDate?: string | null;
}
