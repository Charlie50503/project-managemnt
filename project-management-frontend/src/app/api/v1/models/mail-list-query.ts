/* tslint:disable */
/* eslint-disable */
import { MyPaginator } from '../models/my-paginator';

/**
 * CaseMailList 輸入內容
 */
export interface MailListQuery {
  createdBy?: string | null;
  createdDate?: string | null;
  id: number;
  macctname?: string | null;
  macctno?: string | null;
  midtype?: string | null;
  mtype?: string | null;
  note?: string | null;
  paginator?: MyPaginator;
  updatedBy?: string | null;
  updatedDate?: string | null;
}
