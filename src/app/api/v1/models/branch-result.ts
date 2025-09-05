/* tslint:disable */
/* eslint-disable */
import { Branch } from '../models/branch';
import { Enum } from '../models/enum';
export interface BranchResult {
  branchs?: Array<Branch> | null;
  errCode?: Enum;
  errID?: string | null;
  errMessage?: string | null;
  error?: Enum;
  isSuccess?: boolean;
}
