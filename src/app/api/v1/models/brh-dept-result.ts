/* tslint:disable */
/* eslint-disable */
import { Brhdept } from '../models/brhdept';
import { Enum } from '../models/enum';
export interface BrhDeptResult {
  brhDepts?: Array<Brhdept> | null;
  brhcod?: string | null;
  brhname?: string | null;
  errCode?: Enum;
  errID?: string | null;
  errMessage?: string | null;
  error?: Enum;
  isSuccess?: boolean;
}
