import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { DataExportImportService, ExportData } from '../../services/data-export-import.service';

@Component({
  selector: 'app-data-export-import-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatTabsModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatSnackBarModule
  ],
  template: `
    <div class="p-6 min-w-[500px]">
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-xl font-semibold text-gray-900">資料匯出/匯入</h2>
        <button mat-icon-button (click)="onClose()" class="text-gray-400 hover:text-gray-600">
          <mat-icon>close</mat-icon>
        </button>
      </div>

      <mat-tab-group>
        <!-- 匯出分頁 -->
        <mat-tab label="匯出資料">
          <div class="py-6 space-y-4">
            <p class="text-gray-600 mb-4">選擇要匯出的資料格式：</p>
            
            <!-- 完整資料匯出 -->
            <mat-card class="p-4">
              <div class="flex items-center justify-between">
                <div>
                  <h3 class="font-medium text-gray-900">完整資料匯出 (JSON)</h3>
                  <p class="text-sm text-gray-600">匯出所有資料，包含人員、系統、專案資料</p>
                </div>
                <button 
                  mat-raised-button 
                  color="primary"
                  (click)="exportAllData()"
                  [disabled]="isExporting"
                  class="flex items-center gap-2">
                  <mat-icon *ngIf="!isExporting">download</mat-icon>
                  <mat-spinner *ngIf="isExporting" diameter="16"></mat-spinner>
                  {{ isExporting ? '匯出中...' : '匯出 JSON' }}
                </button>
              </div>
            </mat-card>

            <!-- 分別匯出 -->
            <mat-card class="p-4">
              <h3 class="font-medium text-gray-900 mb-3">分別匯出 (CSV)</h3>
              <div class="grid grid-cols-1 gap-3">
                <div class="flex items-center justify-between">
                  <span class="text-sm text-gray-600">人員資料</span>
                  <button 
                    mat-button 
                    color="primary"
                    (click)="exportMembers()"
                    [disabled]="isExporting">
                    <mat-icon>download</mat-icon>
                    匯出 CSV
                  </button>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-sm text-gray-600">系統資料</span>
                  <button 
                    mat-button 
                    color="primary"
                    (click)="exportSystems()"
                    [disabled]="isExporting">
                    <mat-icon>download</mat-icon>
                    匯出 CSV
                  </button>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-sm text-gray-600">專案任務資料</span>
                  <button 
                    mat-button 
                    color="primary"
                    (click)="exportTasks()"
                    [disabled]="isExporting">
                    <mat-icon>download</mat-icon>
                    匯出 CSV
                  </button>
                </div>
              </div>
            </mat-card>
          </div>
        </mat-tab>

        <!-- 匯入分頁 -->
        <mat-tab label="匯入資料">
          <div class="py-6 space-y-4">
            <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
              <div class="flex items-start">
                <mat-icon class="text-yellow-600 mr-2 mt-0.5">warning</mat-icon>
                <div>
                  <h4 class="font-medium text-yellow-800">注意事項</h4>
                  <p class="text-sm text-yellow-700 mt-1">
                    匯入資料將會覆蓋現有的所有資料，請確保已備份重要資料。
                  </p>
                </div>
              </div>
            </div>

            <mat-card class="p-4">
              <div class="text-center">
                <div class="mb-4">
                  <mat-icon class="text-6xl text-gray-400 mb-2">cloud_upload</mat-icon>
                  <h3 class="font-medium text-gray-900">選擇匯入檔案</h3>
                  <p class="text-sm text-gray-600">支援 JSON 格式的完整資料檔案</p>
                </div>
                
                <input 
                  type="file" 
                  #fileInput 
                  accept=".json"
                  (change)="onFileSelected($event)"
                  class="hidden">
                
                <button 
                  mat-raised-button 
                  color="accent"
                  (click)="fileInput.click()"
                  [disabled]="isImporting"
                  class="mb-4">
                  <mat-icon>folder_open</mat-icon>
                  選擇檔案
                </button>
                
                <div *ngIf="selectedFile" class="text-sm text-gray-600 mb-4">
                  已選擇：{{ selectedFile.name }}
                </div>
                
                <button 
                  mat-raised-button 
                  color="primary"
                  (click)="importData()"
                  [disabled]="!selectedFile || isImporting"
                  class="w-full">
                  <mat-icon *ngIf="!isImporting">upload</mat-icon>
                  <mat-spinner *ngIf="isImporting" diameter="16"></mat-spinner>
                  {{ isImporting ? '匯入中...' : '開始匯入' }}
                </button>
              </div>
            </mat-card>
          </div>
        </mat-tab>
      </mat-tab-group>
    </div>
  `
})
export class DataExportImportDialogComponent {
  isExporting = false;
  isImporting = false;
  selectedFile: File | null = null;

  constructor(
    private dialogRef: MatDialogRef<DataExportImportDialogComponent>,
    private dataService: DataExportImportService,
    private snackBar: MatSnackBar
  ) { }

  // 匯出所有資料
  exportAllData(): void {
    this.isExporting = true;
    this.dataService.exportAllData().subscribe({
      next: (data) => {
        this.dataService.downloadJsonFile(data);
        this.snackBar.open('資料匯出成功', '關閉', { duration: 3000 });
        this.isExporting = false;
      },
      error: (error) => {
        this.snackBar.open('資料匯出失敗：' + error.message, '關閉', { duration: 5000 });
        this.isExporting = false;
      }
    });
  }

  // 匯出人員資料
  exportMembers(): void {
    this.isExporting = true;
    this.dataService.exportMembers().subscribe({
      next: (members) => {
        const headers = ['id', 'name', 'employeeId', 'email', 'department', 'departmentCode', 'section', 'sectionCode'];
        this.dataService.downloadCsvFile(members, 'members', headers);
        this.snackBar.open('人員資料匯出成功', '關閉', { duration: 3000 });
        this.isExporting = false;
      },
      error: (error) => {
        this.snackBar.open('人員資料匯出失敗', '關閉', { duration: 3000 });
        this.isExporting = false;
      }
    });
  }

  // 匯出系統資料
  exportSystems(): void {
    this.isExporting = true;
    this.dataService.exportSystems().subscribe({
      next: (systems) => {
        const headers = ['id', 'name', 'code', 'description', 'owner', 'createdAt'];
        this.dataService.downloadCsvFile(systems, 'systems', headers);
        this.snackBar.open('系統資料匯出成功', '關閉', { duration: 3000 });
        this.isExporting = false;
      },
      error: (error) => {
        this.snackBar.open('系統資料匯出失敗', '關閉', { duration: 3000 });
        this.isExporting = false;
      }
    });
  }

  // 匯出任務資料
  exportTasks(): void {
    this.isExporting = true;
    this.dataService.exportProjects().subscribe({
      next: (projectData) => {
        if (projectData?.memberTableData) {
          const headers = ['id', 'member', 'project', 'system', 'task', 'complexity', 'priority', 'status', 'startDate', 'endDate', 'actualEndDate'];
          this.dataService.downloadCsvFile(projectData.memberTableData, 'tasks', headers);
          this.snackBar.open('任務資料匯出成功', '關閉', { duration: 3000 });
        } else {
          this.snackBar.open('沒有任務資料可匯出', '關閉', { duration: 3000 });
        }
        this.isExporting = false;
      },
      error: (error) => {
        this.snackBar.open('任務資料匯出失敗', '關閉', { duration: 3000 });
        this.isExporting = false;
      }
    });
  }

  // 檔案選擇
  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file && file.type === 'application/json') {
      this.selectedFile = file;
    } else {
      this.snackBar.open('請選擇 JSON 格式的檔案', '關閉', { duration: 3000 });
      this.selectedFile = null;
    }
  }

  // 匯入資料
  async importData(): Promise<void> {
    if (!this.selectedFile) return;

    this.isImporting = true;
    try {
      const data = await this.dataService.importData(this.selectedFile);
      await this.dataService.applyImportedData(data);
      this.snackBar.open('資料匯入成功，頁面將重新載入', '關閉', { duration: 3000 });
      this.dialogRef.close();
    } catch (error: any) {
      this.snackBar.open('資料匯入失敗：' + error.message, '關閉', { duration: 5000 });
      this.isImporting = false;
    }
  }

  onClose(): void {
    this.dialogRef.close();
  }
}