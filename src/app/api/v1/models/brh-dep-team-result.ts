/* tslint:disable */
/* eslint-disable */
import { Brhdepteam } from '../models/brhdepteam';
import { Enum } from '../models/enum';
export interface BrhDepTeamResult {
  brhDepTeams?: Array<Brhdepteam> | null;
  brhcod?: string | null;
  brhname?: string | null;
  deptcd?: string | null;
  deptname?: string | null;
  errCode?: Enum;
  errID?: string | null;
  errMessage?: string | null;
  error?: Enum;
  isSuccess?: boolean;
}
