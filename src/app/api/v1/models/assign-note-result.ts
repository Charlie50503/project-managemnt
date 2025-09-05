/* tslint:disable */
/* eslint-disable */
import { ECaseAssignNote } from '../models/e-case-assign-note';
import { Enum } from '../models/enum';

/**
 * AssignNote 返回內容
 */
export interface AssignNoteResult {

  /**
   * 案件變更紀錄
   */
  assignNotes?: Array<ECaseAssignNote> | null;
  errCode?: Enum;
  errID?: string | null;
  errMessage?: string | null;
  error?: Enum;
  isSuccess?: boolean;
}
