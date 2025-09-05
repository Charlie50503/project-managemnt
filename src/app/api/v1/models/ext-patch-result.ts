/* tslint:disable */
/* eslint-disable */
import { ECaseAssign } from '../models/e-case-assign';
import { ECaseM } from '../models/e-case-m';
import { Enum } from '../models/enum';

/**
 * 外部連結加密字串返回內容
 */
export interface ExtPatchResult {

  /**
   * 案件追蹤_歸屬
   */
  caseAssigns?: Array<ECaseAssign> | null;

  /**
   * 案件追蹤主檔
   */
  caseMs?: Array<ECaseM> | null;
  errCode?: Enum;
  errID?: string | null;
  errMessage?: string | null;
  error?: Enum;

  /**
   * 此連結是否過期
   */
  isExpire?: boolean;
  isSuccess?: boolean;

  /**
   * 目標元件
   */
  target?: string | null;
}
