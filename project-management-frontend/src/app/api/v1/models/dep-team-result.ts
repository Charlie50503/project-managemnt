/* tslint:disable */
/* eslint-disable */
import { Depteam } from '../models/depteam';
import { Enum } from '../models/enum';
export interface DepTeamResult {
  brhcod?: string | null;
  brhname?: string | null;
  depTeams?: Array<Depteam> | null;
  deptcd?: string | null;
  deptname?: string | null;
  errCode?: Enum;
  errID?: string | null;
  errMessage?: string | null;
  error?: Enum;
  isSuccess?: boolean;
  teamcd?: string | null;
  teamname?: string | null;
}
