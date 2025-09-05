/* tslint:disable */
/* eslint-disable */
import { Enum } from '../models/enum';
import { UserInfo } from '../models/user-info';
export interface UserInfoResult {
  errCode?: Enum;
  errID?: string | null;
  errMessage?: string | null;
  error?: Enum;
  isSuccess?: boolean;
  userInfo?: UserInfo;
}
