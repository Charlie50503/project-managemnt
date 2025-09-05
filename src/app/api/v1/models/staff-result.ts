/* tslint:disable */
/* eslint-disable */
import { Enum } from '../models/enum';
import { Staff } from '../models/staff';
export interface StaffResult {
  errCode?: Enum;
  errID?: string | null;
  errMessage?: string | null;
  error?: Enum;
  isSuccess?: boolean;
  stafFs?: Array<Staff> | null;
}
