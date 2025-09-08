/**
 * 日期工具類，提供穩定的日期處理方法，避免 UTC 時區問題
 */
export class DateUtils {
  
  /**
   * 安全地解析日期字串，避免 UTC 時區問題
   * @param dateString 日期字串 (YYYY-MM-DD 格式)
   * @returns Date 物件或 null
   */
  static parseDate(dateString: string | null | undefined): Date | null {
    if (!dateString || dateString.trim() === '') {
      return null;
    }
    
    // 處理 YYYY-MM-DD 格式的日期字串，避免 UTC 時區問題
    const dateMatch = dateString.match(/^(\d{4})-(\d{2})-(\d{2})$/);
    if (dateMatch) {
      const [, year, month, day] = dateMatch;
      // 使用本地時區創建日期，避免 UTC 轉換問題
      const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
      return isNaN(date.getTime()) ? null : date;
    }
    
    // 如果不是標準格式，嘗試直接解析
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? null : date;
  }
  
  /**
   * 格式化日期為 YYYY-MM-DD 字串，使用本地時區
   * @param date Date 物件
   * @returns 格式化的日期字串或空字串
   */
  static formatDate(date: Date | null | undefined): string {
    if (!date || isNaN(date.getTime())) return '';
    
    // 使用本地時區格式化日期，避免 UTC 轉換問題
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    
    return `${year}-${month}-${day}`;
  }
  
  /**
   * 檢查日期是否有效
   * @param date Date 物件
   * @returns 是否為有效日期
   */
  static isValidDate(date: any): date is Date {
    return date instanceof Date && !isNaN(date.getTime());
  }
  
  /**
   * 比較兩個日期（只比較日期部分，忽略時間）
   * @param date1 第一個日期
   * @param date2 第二個日期
   * @returns -1: date1 < date2, 0: date1 = date2, 1: date1 > date2
   */
  static compareDates(date1: Date, date2: Date): number {
    if (!this.isValidDate(date1) || !this.isValidDate(date2)) {
      throw new Error('Invalid date provided for comparison');
    }
    
    const d1 = new Date(date1.getFullYear(), date1.getMonth(), date1.getDate());
    const d2 = new Date(date2.getFullYear(), date2.getMonth(), date2.getDate());
    
    if (d1.getTime() < d2.getTime()) return -1;
    if (d1.getTime() > d2.getTime()) return 1;
    return 0;
  }
  
  /**
   * 獲取今天的日期（本地時區）
   * @returns 今天的 Date 物件
   */
  static today(): Date {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), now.getDate());
  }
  
  /**
   * 格式化日期為顯示用的字串（中文格式）
   * @param date Date 物件
   * @returns 格式化的中文日期字串
   */
  static formatDateForDisplay(date: Date | null | undefined): string {
    if (!this.isValidDate(date)) return '';
    
    const year = date!.getFullYear();
    const month = date!.getMonth() + 1;
    const day = date!.getDate();
    
    return `${year}年${month}月${day}日`;
  }
}