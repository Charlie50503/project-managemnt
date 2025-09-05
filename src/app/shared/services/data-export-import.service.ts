import { Injectable } from '@angular/core';
import { Observable, forkJoin, map, take } from 'rxjs';
import { MemberCrudService } from '../../pages/project-management/services/member-crud.service';
import { SystemCrudService } from '../../pages/project-management/services/system-crud.service';
import { ProjectCrudService } from '../../core/services/project-crud.service';
import { Member } from '../models/member.model';
import { ProjectData } from '../models/project.model';

export interface ExportData {
  version: string;
  exportDate: string;
  members: Member[];
  systems: any[];
  projectData: ProjectData | null;
}

@Injectable({
  providedIn: 'root'
})
export class DataExportImportService {

  constructor(
    private memberCrudService: MemberCrudService,
    private systemCrudService: SystemCrudService,
    private projectCrudService: ProjectCrudService
  ) { }

  // 匯出所有資料
  exportAllData(): Observable<ExportData> {
    return forkJoin({
      members: this.memberCrudService.getMembers().pipe(take(1)),
      systems: this.systemCrudService.getSystems().pipe(take(1)),
      projectData: this.projectCrudService.data$.pipe(take(1))
    }).pipe(
      map(data => ({
        version: '1.0.0',
        exportDate: new Date().toISOString(),
        members: data.members,
        systems: data.systems,
        projectData: data.projectData
      }))
    );
  }

  // 下載 JSON 檔案
  downloadJsonFile(data: ExportData, filename?: string): void {
    const jsonString = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = filename || `project-data-export-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    window.URL.revokeObjectURL(url);
  }

  // 匯入資料
  importData(file: File): Promise<ExportData> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (event) => {
        try {
          const jsonString = event.target?.result as string;
          const data = JSON.parse(jsonString) as ExportData;

          // 驗證資料格式
          if (!this.validateImportData(data)) {
            reject(new Error('匯入檔案格式不正確'));
            return;
          }

          resolve(data);
        } catch (error) {
          reject(new Error('檔案解析失敗：' + error));
        }
      };

      reader.onerror = () => {
        reject(new Error('檔案讀取失敗'));
      };

      reader.readAsText(file);
    });
  }

  // 應用匯入的資料
  async applyImportedData(data: ExportData): Promise<void> {
    try {
      // 清除現有資料並匯入新資料
      if (data.members) {
        localStorage.setItem('membersData', JSON.stringify(data.members));
      }

      if (data.systems) {
        localStorage.setItem('project_management_systems', JSON.stringify(data.systems));
      }

      if (data.projectData) {
        localStorage.setItem('projectData', JSON.stringify(data.projectData));
      }

      // 重新載入頁面以應用新資料
      window.location.reload();
    } catch (error) {
      throw new Error('資料匯入失敗：' + error);
    }
  }

  // 驗證匯入資料格式
  private validateImportData(data: any): data is ExportData {
    return (
      data &&
      typeof data === 'object' &&
      data.version &&
      data.exportDate &&
      Array.isArray(data.members) &&
      Array.isArray(data.systems) &&
      (data.projectData === null || typeof data.projectData === 'object')
    );
  }

  // 匯出單一資料類型
  exportMembers(): Observable<Member[]> {
    return this.memberCrudService.getMembers();
  }

  exportSystems(): Observable<any[]> {
    return this.systemCrudService.getSystems();
  }

  exportProjects(): Observable<ProjectData | null> {
    return this.projectCrudService.data$;
  }

  // 下載 CSV 格式
  downloadCsvFile(data: any[], filename: string, headers: string[]): void {
    const csvContent = this.convertToCSV(data, headers);
    const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = `${filename}-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    window.URL.revokeObjectURL(url);
  }

  // 轉換為 CSV 格式
  private convertToCSV(data: any[], headers: string[]): string {
    const csvRows = [];

    // 添加標題行
    csvRows.push(headers.join(','));

    // 添加資料行
    for (const row of data) {
      const values = headers.map(header => {
        const value = row[header];
        // 處理包含逗號或引號的值
        if (typeof value === 'string' && (value.includes(',') || value.includes('"'))) {
          return `"${value.replace(/"/g, '""')}"`;
        }
        return value || '';
      });
      csvRows.push(values.join(','));
    }

    return csvRows.join('\n');
  }
}