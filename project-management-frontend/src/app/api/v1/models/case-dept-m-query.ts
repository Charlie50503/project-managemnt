/* tslint:disable */
/* eslint-disable */
import { MyPaginator } from '../models/my-paginator';

/**
 * CaseDeptM 輸入內容
 */
export interface CaseDeptMQuery {
  brhname?: string | null;
  brhno?: string | null;
  createdBy?: string | null;
  createdDate?: string | null;
  deptname?: string | null;
  deptno?: string | null;
  id: number;
  note?: string | null;
  paginator?: MyPaginator;
  updatedBy?: string | null;
  updatedDate?: string | null;
}
