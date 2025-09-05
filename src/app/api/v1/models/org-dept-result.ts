/* tslint:disable */
/* eslint-disable */
import { Enum } from '../models/enum';
import { Hwporgm } from '../models/hwporgm';
export interface OrgDeptResult {
  errCode?: Enum;
  errID?: string | null;
  errMessage?: string | null;
  error?: Enum;
  isSuccess?: boolean;
  organDept?: Array<Hwporgm> | null;
}
