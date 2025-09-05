/* tslint:disable */
/* eslint-disable */
import { Enum } from '../models/enum';
import { StaffWithTeam } from '../models/staff-with-team';
export interface StaffWithTeamResult {
  errCode?: Enum;
  errID?: string | null;
  errMessage?: string | null;
  error?: Enum;
  isSuccess?: boolean;
  staffwithteaMs?: Array<StaffWithTeam> | null;
}
