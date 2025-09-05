import { Pipe, PipeTransform } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Pipe({
  name: 'errorMessage',
  standalone: true,
})
export class ErrorMessagePipe implements PipeTransform {
  private errorMessages: { [key: string]: (error: any) => string } = {
    required: () => '該欄位必填',
    maxlength: (error: any) => `輸入長度不可大於 ${error.requiredLength} 碼`,
    minlength: (error: any) => `輸入長度不可小於 ${error.requiredLength} 碼`,
    max: (error: any) => `輸入數值不可大於 ${error.max}`,
    min: (error: any) => `輸入數值不可小於 ${error.min}`,
    RegexNumber: () => '請輸入數字',
    idnoCheck: () => '請輸入正確的身分證字號',
    RegexEnglish: () => '請輸入英文',
    RegexChinese: () => '請輸入中文',
    RegexEngNum: () => '請輸入英文和數字',
    RegexEngAddress: () => '請輸入正確的地址',
    RegexEmail: () => 'Email輸入不正確',
    RegexTelephone: () => '電話號碼輸入不正確',
    RegexSimpleDate: () => '日期輸入不正確',
    invalidMsg: (error: any) => error,
    ExceedTodayError: () => '結束日期不可以超過今天',
    StartDateError: () => '結束日期不可以小於開始日期',
    invalidWorkHour: () => '小數點僅限一位',
  };

  transform(errors: ValidationErrors | null): string | null {
    if (!errors) {
      return null;
    }

    for (const key in errors) {
      if (errors[key] && this.errorMessages[key]) {
        return this.errorMessages[key](errors[key]);
      }
    }
    return '格式錯誤';
  }
}