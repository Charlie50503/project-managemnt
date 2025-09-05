/* tslint:disable */
/* eslint-disable */

/**
 * MailNotifyInput 輸入內容
 */
export interface MailNotifyInput {

  /**
   * 身分別(0:主辦 1:協辦 9:主+協)
   */
  idType?: string | null;

  /**
   * 通知主旨
   */
  notifySubject?: string | null;

  /**
   * 通知連結目標
   * CONFIRM:案件確認(3日)
   * MAINTENPROGRESS:進度維護(20日)
   * 31:即將到期(到期前3日)
   * 32:到期通知(當日17:00)
   */
  notifyTarget?: string | null;

  /**
   * 通知別
   * 11:派案通知(3日) 21:進度維護(20日) 22:撤案通知 23:延期成功
   * 31:即將到期(到期前3日) 32:到期通知(當日17:00)
   */
  notifyType?: string | null;

  /**
   * 案件編號
   */
  ptNos?: Array<string> | null;

  /**
   * 寄件者帳號
   */
  senderACCT?: string | null;

  /**
   * 寄件者密碼
   */
  senderAPWD?: string | null;
}
