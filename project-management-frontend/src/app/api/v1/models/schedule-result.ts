/* tslint:disable */
/* eslint-disable */
import { Enum } from '../models/enum';
export interface ScheduleResult {
  errCode?: Enum;
  errID?: string | null;
  errMessage?: string | null;
  error?: Enum;
  isSuccess?: boolean;
  resulTs?: string | null;
}
