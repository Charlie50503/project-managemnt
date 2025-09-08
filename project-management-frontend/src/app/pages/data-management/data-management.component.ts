import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';

import { SystemCrudService, System } from '../project-management/services/system-crud.service';
import { ProjectCrudService } from '../../core/services/project-crud.service';
import { MemberCrudService } from '../project-management/services/member-crud.service';
import { Project, Task } from '../../shared/models/project.model';
import { Member } from '../../shared/models/member.model';
import { SystemFormDialogComponent } from '../project-management/components/system-form-dialog/system-form-dialog.component';
import { ProjectFormDialogComponent } from '../project-management/components/project-form-dialog/project-form-dialog.component';
import { MemberFormDialogComponent } from '../project-management/components/member-form-dialog/member-form-dialog.component';
import { TaskFormDialogComponent } from '../project-management/components/task-form-dialog/task-form-dialog.component';
import { ConfirmDialogComponent } from '../../shared/components/confirm-dialog/confirm-dialog.component';
import { DataExportImportDialogComponent } from '../../shared/components/data-export-import-dialog/data-export-import-dialog.component';

@Component({
  selector: 'app-data-management',
  standalone: true,
  imports: [
    CommonModule,
    MatTabsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatDialogModule,
    MatSnackBarModule,
    MatChipsModule,
    MatTooltipModule
  ],
  templateUrl: './data-management.component.html',
  styleUrls: ['./data-management.component.scss']
})
export class DataManagementComponent implements OnInit {
  members$: Observable<Member[]>;
  systems$: Observable<System[]>;
  projects$: Observable<Project[]>;

  memberDisplayedColumns: string[] = ['name', 'employeeId', 'email', 'department', 'departmentCode', 'section', 'sectionCode', 'actions'];
  systemDisplayedColumns: string[] = ['name', 'code', 'description', 'owner', 'createdAt', 'actions'];
  projectDisplayedColumns: string[] = ['projectNumber', 'projectSource', 'project', 'system', 'projectManager', 'status', 'startDate', 'actions'];

  constructor(
    private memberCrudService: MemberCrudService,
    private systemCrudService: SystemCrudService,
    private projectCrudService: ProjectCrudService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    // 直接訂閱服務的 Observable，這樣會自動更新
    this.members$ = this.memberCrudService.members$;
    this.systems$ = this.systemCrudService.systems$;
    this.projects$ = this.projectCrudService.projects$;
  }

  ngOnInit(): void {
    // 確保 ProjectCrudService 的資料已載入
    this.projectCrudService.refreshData();
    
    // 除錯：檢查人員資料是否載入
    this.projectCrudService.members$.subscribe(members => {
      console.log('ProjectCrudService members data:', members);
    });
  }

  // 人員管理方法
  openCreateMemberDialog(): void {
    const dialogRef = this.dialog.open(MemberFormDialogComponent, {
      width: '600px',
      data: { isEdit: false }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.memberCrudService.createMember(result).subscribe({
          next: () => {
            this.snackBar.open('人員新增成功', '關閉', { duration: 3000 });
          },
          error: (error) => {
            this.snackBar.open('人員新增失敗', '關閉', { duration: 3000 });
            console.error('Error creating member:', error);
          }
        });
      }
    });
  }

  openEditMemberDialog(member: Member): void {
    const dialogRef = this.dialog.open(MemberFormDialogComponent, {
      width: '600px',
      data: { member, isEdit: true }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.memberCrudService.updateMember(member.id, result).subscribe({
          next: () => {
            this.snackBar.open('人員更新成功', '關閉', { duration: 3000 });
          },
          error: (error) => {
            this.snackBar.open('人員更新失敗', '關閉', { duration: 3000 });
            console.error('Error updating member:', error);
          }
        });
      }
    });
  }

  deleteMember(member: Member): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        title: '確認刪除人員',
        message: `確定要刪除人員「${member.name}」嗎？此操作無法復原。`,
        confirmText: '刪除',
        cancelText: '取消',
        type: 'danger'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.memberCrudService.deleteMember(member.id).subscribe({
          next: () => {
            this.snackBar.open('人員刪除成功', '關閉', { duration: 3000 });
          },
          error: (error) => {
            this.snackBar.open('人員刪除失敗', '關閉', { duration: 3000 });
            console.error('Error deleting member:', error);
          }
        });
      }
    });
  }

  // 系統管理方法
  openCreateSystemDialog(): void {
    const dialogRef = this.dialog.open(SystemFormDialogComponent, {
      width: '500px',
      data: { isEdit: false }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.systemCrudService.createSystem(result).subscribe({
          next: () => {
            this.snackBar.open('系統新增成功', '關閉', { duration: 3000 });
          },
          error: (error) => {
            this.snackBar.open('系統新增失敗', '關閉', { duration: 3000 });
            console.error('Error creating system:', error);
          }
        });
      }
    });
  }

  openEditSystemDialog(system: System): void {
    const dialogRef = this.dialog.open(SystemFormDialogComponent, {
      width: '500px',
      data: { system, isEdit: true }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.systemCrudService.updateSystem(system.id, result).subscribe({
          next: () => {
            this.snackBar.open('系統更新成功', '關閉', { duration: 3000 });
          },
          error: (error) => {
            this.snackBar.open('系統更新失敗', '關閉', { duration: 3000 });
            console.error('Error updating system:', error);
          }
        });
      }
    });
  }

  deleteSystem(system: System): void {
    if (confirm(`確定要刪除系統「${system.name}」嗎？此操作無法復原。`)) {
      this.systemCrudService.deleteSystem(system.id).subscribe({
        next: () => {
          this.snackBar.open('系統刪除成功', '關閉', { duration: 3000 });
        },
        error: (error) => {
          this.snackBar.open('系統刪除失敗', '關閉', { duration: 3000 });
          console.error('Error deleting system:', error);
        }
      });
    }
  }

  // 案件管理方法
  openCreateProjectDialog(): void {
    const dialogRef = this.dialog.open(ProjectFormDialogComponent, {
      width: '800px',
      data: { isEdit: false }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.projectCrudService.createProject(result).subscribe({
          next: () => {
            this.snackBar.open('案件新增成功', '關閉', { duration: 3000 });
          },
          error: (error) => {
            this.snackBar.open('案件新增失敗', '關閉', { duration: 3000 });
            console.error('Error creating project:', error);
          }
        });
      }
    });
  }

  openEditProjectDialog(project: Project): void {
    const dialogRef = this.dialog.open(ProjectFormDialogComponent, {
      width: '800px',
      data: { project, isEdit: true }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.projectCrudService.updateProject(project.id, result).subscribe({
          next: () => {
            this.snackBar.open('案件更新成功', '關閉', { duration: 3000 });
          },
          error: (error) => {
            this.snackBar.open('案件更新失敗', '關閉', { duration: 3000 });
            console.error('Error updating project:', error);
          }
        });
      }
    });
  }

  copyProject(project: Project): void {
    // 創建一個基於現有案件的新任務資料
    const taskData: Partial<Task> = {
      project: project.project,
      system: project.system,
      member: project.projectManager, // 預設負責人為專案經理
      task: '', // 任務名稱留空讓使用者填寫
      complexity: '中', // 預設複雜度
      priority: '中', // 預設優先級
      status: 'not-started', // 預設狀態
      startDate: project.startDate,
      endDate: project.expectedEndDate,
      actualEndDate: null
    };

    const dialogRef = this.dialog.open(TaskFormDialogComponent, {
      width: '800px',
      data: { 
        task: taskData, 
        isEdit: false, // 這是新增模式，不是編輯模式
        projectName: project.project 
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.projectCrudService.createTask(result).subscribe({
          next: () => {
            this.snackBar.open('基於案件資料的任務新增成功', '關閉', { duration: 3000 });
          },
          error: (error) => {
            this.snackBar.open('任務新增失敗', '關閉', { duration: 3000 });
            console.error('Error creating task from project:', error);
          }
        });
      }
    });
  }

  deleteProject(project: Project): void {
    if (confirm(`確定要刪除案件「${project.project}」嗎？此操作無法復原。`)) {
      this.projectCrudService.deleteProject(project.id).subscribe({
        next: () => {
          this.snackBar.open('案件刪除成功', '關閉', { duration: 3000 });
        },
        error: (error) => {
          this.snackBar.open('案件刪除失敗', '關閉', { duration: 3000 });
          console.error('Error deleting project:', error);
        }
      });
    }
  }

  // 輔助方法
  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('zh-TW');
  }

  getStatusText(status: string): string {
    const statusMap: { [key: string]: string } = {
      'not-started': '未開始',
      'in-progress': '進行中',
      'completed': '已完成',
      'on-hold': '暫停',
      'cancelled': '已取消'
    };
    return statusMap[status] || status;
  }

  getStatusColor(status: string): string {
    const colorMap: { [key: string]: string } = {
      'not-started': 'bg-gray-100 text-gray-800',
      'in-progress': 'bg-blue-100 text-blue-800',
      'completed': 'bg-green-100 text-green-800',
      'on-hold': 'bg-yellow-100 text-yellow-800',
      'cancelled': 'bg-red-100 text-red-800'
    };
    return colorMap[status] || 'bg-gray-100 text-gray-800';
  }

  getSourceText(source: string): string {
    const sourceMap: { [key: string]: string } = {
      'project': '專案',
      'requirement': '需求單',
      'assignment': '交辦',
      'self-built': '自建'
    };
    return sourceMap[source] || source;
  }

  // 匯出/匯入功能
  openExportImportDialog(): void {
    this.dialog.open(DataExportImportDialogComponent, {
      width: '600px',
      disableClose: false
    });
  }

  // 匯出個別資料檔案 (供開發者更新 assets)
  exportMembersFile(): void {
    this.memberCrudService.exportToFile();
    this.snackBar.open('人員資料已匯出，請將檔案放到 src/assets/data/ 目錄', '關閉', { duration: 5000 });
  }



  exportSystemsFile(): void {
    this.systemCrudService.exportToFile();
    this.snackBar.open('系統資料已匯出，請將檔案放到 src/assets/data/ 目錄', '關閉', { duration: 5000 });
  }

  exportProjectsFile(): void {
    this.projectCrudService.exportToFile();
    this.snackBar.open('案件資料已匯出，請將檔案放到 src/assets/data/ 目錄', '關閉', { duration: 5000 });
  }

  private refreshData(): void {
    // 資料已由各自的 CRUD 服務自動更新，無需手動刷新
    // this.memberCrudService, this.systemCrudService, this.projectCrudService 都使用 BehaviorSubject
    // 會自動通知所有訂閱者資料變更
  }
}