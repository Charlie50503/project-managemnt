import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { Task, Project } from '../models/project.model';
import { DateUtils } from '../utils/date.utils';

export interface ExportTaskData {
  '案件名稱': string;
  '系統名稱': string;
  '工作項名稱': string;
  '負責人員': string;
  '複雜度': string;
  '優先級': string;
  '狀態': string;
  '開始日期': string;
  '預計結束日期': string;
  '實際完成日期': string;
}

@Injectable({
  providedIn: 'root'
})
export class ExcelExportService {

  constructor() { }

  /**
   * 匯出工作項資料到 Excel
   * @param tasks 工作項陣列
   * @param projects 專案陣列（用於排序）
   * @param filename 檔案名稱
   */
  exportTasksToExcel(tasks: Task[], projects: Project[], filename: string = '工作項目清單'): void {
    if (!tasks || tasks.length === 0) {
      console.warn('沒有資料可以匯出');
      return;
    }

    // 根據案件排序工作項
    const sortedTasks = this.sortTasksByProject(tasks, projects);
    
    // 轉換資料格式
    const exportData: ExportTaskData[] = sortedTasks.map(task => ({
      '案件名稱': task.project,
      '系統名稱': task.system,
      '工作項名稱': task.task,
      '負責人員': task.member,
      '複雜度': task.complexity,
      '優先級': task.priority,
      '狀態': this.getStatusText(task.status),
      '開始日期': task.startDate || '',
      '預計結束日期': task.endDate || '',
      '實際完成日期': task.actualEndDate || ''
    }));

    // 創建工作簿
    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    
    // 設定欄位寬度
    const columnWidths = [
      { wch: 20 }, // 案件名稱
      { wch: 15 }, // 系統名稱
      { wch: 30 }, // 工作項名稱
      { wch: 12 }, // 負責人員
      { wch: 8 },  // 複雜度
      { wch: 8 },  // 優先級
      { wch: 10 }, // 狀態
      { wch: 12 }, // 開始日期
      { wch: 12 }, // 預計結束日期
      { wch: 12 }  // 實際完成日期
    ];
    worksheet['!cols'] = columnWidths;

    // 添加工作表到工作簿
    XLSX.utils.book_append_sheet(workbook, worksheet, '工作項目清單');

    // 生成 Excel 檔案並下載
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    
    const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-');
    const fullFilename = `${filename}_${timestamp}.xlsx`;
    
    saveAs(blob, fullFilename);
  }

  /**
   * 匯出專案摘要到 Excel
   * @param projects 專案陣列
   * @param tasks 工作項陣列
   * @param filename 檔案名稱
   */
  exportProjectSummaryToExcel(projects: Project[], tasks: Task[], filename: string = '專案摘要'): void {
    if (!projects || projects.length === 0) {
      console.warn('沒有專案資料可以匯出');
      return;
    }

    // 創建專案摘要資料
    const projectSummaryData = projects.map(project => {
      const projectTasks = tasks.filter(task => task.project === project.project);
      const completedTasks = projectTasks.filter(task => task.status === 'completed').length;
      const inProgressTasks = projectTasks.filter(task => task.status === 'in-progress').length;
      const notStartedTasks = projectTasks.filter(task => task.status === 'not-started').length;
      const totalTasks = projectTasks.length;
      const progress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

      return {
        '案件編號': project.projectNumber || '',
        '案件名稱': project.project,
        '系統名稱': project.system,
        '專案經理': project.projectManager,
        '開始日期': project.startDate,
        '預計結束日期': project.expectedEndDate,
        '狀態': this.getProjectStatusText(project.status),
        '總工作項': totalTasks,
        '已完成': completedTasks,
        '進行中': inProgressTasks,
        '未開始': notStartedTasks,
        '完成率': `${progress}%`,
        '備註': project.demo || ''
      };
    });

    // 創建工作簿
    const worksheet = XLSX.utils.json_to_sheet(projectSummaryData);
    const workbook = XLSX.utils.book_new();
    
    // 設定欄位寬度
    const columnWidths = [
      { wch: 12 }, // 案件編號
      { wch: 25 }, // 案件名稱
      { wch: 15 }, // 系統名稱
      { wch: 12 }, // 專案經理
      { wch: 12 }, // 開始日期
      { wch: 12 }, // 預計結束日期
      { wch: 10 }, // 狀態
      { wch: 8 },  // 總工作項
      { wch: 8 },  // 已完成
      { wch: 8 },  // 進行中
      { wch: 8 },  // 未開始
      { wch: 8 },  // 完成率
      { wch: 20 }  // 備註
    ];
    worksheet['!cols'] = columnWidths;

    // 添加工作表到工作簿
    XLSX.utils.book_append_sheet(workbook, worksheet, '專案摘要');

    // 生成 Excel 檔案並下載
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    
    const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-');
    const fullFilename = `${filename}_${timestamp}.xlsx`;
    
    saveAs(blob, fullFilename);
  }

  /**
   * 匯出完整報告（包含專案摘要和工作項詳細）
   * @param projects 專案陣列
   * @param tasks 工作項陣列
   * @param filename 檔案名稱
   */
  exportFullReportToExcel(projects: Project[], tasks: Task[], filename: string = '專案管理報告'): void {
    if (!projects || projects.length === 0 || !tasks || tasks.length === 0) {
      console.warn('沒有足夠的資料可以匯出完整報告');
      return;
    }

    const workbook = XLSX.utils.book_new();

    // 1. 專案摘要工作表
    const projectSummaryData = projects.map(project => {
      const projectTasks = tasks.filter(task => task.project === project.project);
      const completedTasks = projectTasks.filter(task => task.status === 'completed').length;
      const inProgressTasks = projectTasks.filter(task => task.status === 'in-progress').length;
      const notStartedTasks = projectTasks.filter(task => task.status === 'not-started').length;
      const totalTasks = projectTasks.length;
      const progress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

      return {
        '案件編號': project.projectNumber || '',
        '案件名稱': project.project,
        '系統名稱': project.system,
        '專案經理': project.projectManager,
        '開始日期': project.startDate,
        '預計結束日期': project.expectedEndDate,
        '狀態': this.getProjectStatusText(project.status),
        '總工作項': totalTasks,
        '已完成': completedTasks,
        '進行中': inProgressTasks,
        '未開始': notStartedTasks,
        '完成率': `${progress}%`
      };
    });

    const summaryWorksheet = XLSX.utils.json_to_sheet(projectSummaryData);
    summaryWorksheet['!cols'] = [
      { wch: 12 }, { wch: 25 }, { wch: 15 }, { wch: 12 }, { wch: 12 }, 
      { wch: 12 }, { wch: 10 }, { wch: 8 }, { wch: 8 }, { wch: 8 }, 
      { wch: 8 }, { wch: 8 }
    ];
    XLSX.utils.book_append_sheet(workbook, summaryWorksheet, '專案摘要');

    // 2. 工作項詳細工作表
    const sortedTasks = this.sortTasksByProject(tasks, projects);
    const taskDetailData: ExportTaskData[] = sortedTasks.map(task => ({
      '案件名稱': task.project,
      '系統名稱': task.system,
      '工作項名稱': task.task,
      '負責人員': task.member,
      '複雜度': task.complexity,
      '優先級': task.priority,
      '狀態': this.getStatusText(task.status),
      '開始日期': task.startDate || '',
      '預計結束日期': task.endDate || '',
      '實際完成日期': task.actualEndDate || ''
    }));

    const detailWorksheet = XLSX.utils.json_to_sheet(taskDetailData);
    detailWorksheet['!cols'] = [
      { wch: 20 }, { wch: 15 }, { wch: 30 }, { wch: 12 }, { wch: 8 },
      { wch: 8 }, { wch: 10 }, { wch: 12 }, { wch: 12 }, { wch: 12 }
    ];
    XLSX.utils.book_append_sheet(workbook, detailWorksheet, '工作項詳細');

    // 生成 Excel 檔案並下載
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    
    const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-');
    const fullFilename = `${filename}_${timestamp}.xlsx`;
    
    saveAs(blob, fullFilename);
  }

  /**
   * 根據專案順序排序工作項
   * @param tasks 工作項陣列
   * @param projects 專案陣列
   * @returns 排序後的工作項陣列
   */
  private sortTasksByProject(tasks: Task[], projects: Project[]): Task[] {
    // 創建專案順序映射
    const projectOrder = new Map<string, number>();
    projects.forEach((project, index) => {
      projectOrder.set(project.project, index);
    });

    // 根據專案順序和工作項名稱排序
    return tasks.sort((a, b) => {
      const projectOrderA = projectOrder.get(a.project) ?? 999;
      const projectOrderB = projectOrder.get(b.project) ?? 999;
      
      if (projectOrderA !== projectOrderB) {
        return projectOrderA - projectOrderB;
      }
      
      // 如果是同一個專案，按工作項名稱排序
      return a.task.localeCompare(b.task, 'zh-TW');
    });
  }

  /**
   * 獲取狀態的中文文字
   * @param status 狀態值
   * @returns 中文狀態文字
   */
  private getStatusText(status: string): string {
    const statusMap: { [key: string]: string } = {
      'not-started': '未開始',
      'in-progress': '進行中',
      'completed': '已完成'
    };
    return statusMap[status] || status;
  }

  /**
   * 獲取專案狀態的中文文字
   * @param status 專案狀態值
   * @returns 中文狀態文字
   */
  private getProjectStatusText(status: string): string {
    const statusMap: { [key: string]: string } = {
      'not-started': '未開始',
      'in-progress': '進行中',
      'completed': '已完成',
      'pending': '待排',
      'on-hold': '保留',
      'cancelled': '廢棄'
    };
    return statusMap[status] || status;
  }
}