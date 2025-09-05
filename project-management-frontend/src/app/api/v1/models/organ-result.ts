/* tslint:disable */
/* eslint-disable */
import { Enum } from '../models/enum';
import { OrgClass } from '../models/org-class';
export interface OrganResult {
  errCode?: Enum;
  errID?: string | null;
  errMessage?: string | null;
  error?: Enum;
  isSuccess?: boolean;
  organize?: Array<OrgClass> | null;
}
