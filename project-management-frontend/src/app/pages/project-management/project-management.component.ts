import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatMenuModule } from '@angular/material/menu';
import { ProjectDataService } from '../../core/services/project-data.service';
import { ProjectCrudService } from '../../core/services/project-crud.service';
import { StatusHelperService } from '../../shared/services/status-helper.service';
import { ExcelExportService } from '../../shared/services/excel-export.service';
import { GroupedMemberData, GroupedProjectData, Project, Task } from '../../shared/models/project.model';
import { OverviewTabComponent } from './components/overview-tab/overview-tab.component';
import { MemberViewTabComponent } from './components/member-view-tab/member-view-tab.component';
import { ProjectViewTabComponent } from './components/project-view-tab/project-view-tab.component';
import { ProjectFormDialogComponent } from './components/project-form-dialog/project-form-dialog.component';
import { TaskFormDialogComponent } from './components/task-form-dialog/task-form-dialog.component';
import { BulkTaskFormDialogComponent } from './components/bulk-task-form-dialog/bulk-task-form-dialog.component';
import { SystemFormDialogComponent } from './components/system-form-dialog/system-form-dialog.component';
import { ProjectSortDialogComponent } from './components/project-sort-dialog/project-sort-dialog.component';
import { SystemCrudService } from './services/system-crud.service';
import { ConfirmDialogComponent } from '../../shared/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-project-management',
  templateUrl: './project-management.component.html',
  styleUrls: ['./project-management.component.scss'],
  imports: [
    CommonModule,
    MatTabsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDialogModule,
    MatSnackBarModule,
    MatMenuModule,
    OverviewTabComponent,
    MemberViewTabComponent,
    ProjectViewTabComponent
  ]
})
export class ProjectManagementComponent implements OnInit {
  activeTab = 'overview';
  selectedMembers: string[] = [];
  projectSearchTerm = '';
  taskSearchTerm = '';
  statusFilters: string[] = [];
  projectStatusFilters: string[] = [];
  hideCompleted = false;
  expandedRows = new Set<string>();

  // 可用的選項列表
  availableMembers: string[] = [];
  availableProjectStatuses: string[] = ['not-started', 'in-progress', 'completed', 'pending', 'on-hold', 'cancelled'];

  groupedMemberData$: Observable<GroupedMemberData[]>;
  groupedProjectData$: Observable<GroupedProjectData[]>;
  overviewStats$: Observable<any>;

  constructor(
    private projectDataService: ProjectDataService,
    private projectCrudService: ProjectCrudService,
    public statusHelper: StatusHelperService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private systemCrudService: SystemCrudService,
    private excelExportService: ExcelExportService
  ) {
    this.groupedMemberData$ = this.projectDataService.getGroupedMemberData();
    this.groupedProjectData$ = this.projectDataService.getGroupedProjectData();
    this.overviewStats$ = this.projectDataService.getOverviewStats();
  }

  selectedTabIndex = 0;

  ngOnInit(): void {
    // 獲取可用的成員列表
    this.groupedMemberData$.subscribe(data => {
      this.availableMembers = [...new Set(data.map(item => item.member))].sort();
    });
  }

  getCurrentDate(): string {
    return new Date().toLocaleDateString('zh-TW');
  }

  onTabChange(event: any): void {
    this.selectedTabIndex = event.index;
  }

  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }

  toggleRow(key: string): void {
    if (this.expandedRows.has(key)) {
      this.expandedRows.delete(key);
    } else {
      this.expandedRows.add(key);
    }
  }

  isRowExpanded(key: string): boolean {
    return this.expandedRows.has(key);
  }

  onMemberSelectionChange(selectedMembers: string[]): void {
    this.selectedMembers = selectedMembers || [];
  }

  onProjectSearchChange(value: string): void {
    this.projectSearchTerm = value;
  }

  onTaskSearchChange(value: string): void {
    this.taskSearchTerm = value;
  }

  onStatusFiltersChange(selectedStatuses: string[]): void {
    this.statusFilters = selectedStatuses || [];
  }

  onProjectStatusFiltersChange(selectedStatuses: string[]): void {
    this.projectStatusFilters = selectedStatuses || [];
  }

  exportToExcel(): void {
    // 獲取當前的專案和工作項資料
    this.projectCrudService.getProjects().subscribe(projects => {
      this.projectCrudService.getTasks().subscribe(tasks => {
        if (tasks.length === 0) {
          this.snackBar.open('沒有工作項資料可以匯出', '關閉', { duration: 3000 });
          return;
        }

        try {
          // 匯出完整報告（包含專案摘要和工作項詳細）
          this.excelExportService.exportFullReportToExcel(projects, tasks);
          this.snackBar.open('Excel 檔案匯出成功', '關閉', { duration: 3000 });
        } catch (error) {
          console.error('Excel 匯出失敗:', error);
          this.snackBar.open('Excel 匯出失敗', '關閉', { duration: 3000 });
        }
      });
    });
  }

  /**
   * 匯出工作項清單
   */
  exportTasksOnly(): void {
    this.projectCrudService.getProjects().subscribe(projects => {
      this.projectCrudService.getTasks().subscribe(tasks => {
        if (tasks.length === 0) {
          this.snackBar.open('沒有工作項資料可以匯出', '關閉', { duration: 3000 });
          return;
        }

        try {
          this.excelExportService.exportTasksToExcel(tasks, projects);
          this.snackBar.open('工作項清單匯出成功', '關閉', { duration: 3000 });
        } catch (error) {
          console.error('工作項清單匯出失敗:', error);
          this.snackBar.open('工作項清單匯出失敗', '關閉', { duration: 3000 });
        }
      });
    });
  }

  /**
   * 匯出專案摘要
   */
  exportProjectSummary(): void {
    this.projectCrudService.getProjects().subscribe(projects => {
      this.projectCrudService.getTasks().subscribe(tasks => {
        if (projects.length === 0) {
          this.snackBar.open('沒有專案資料可以匯出', '關閉', { duration: 3000 });
          return;
        }

        try {
          this.excelExportService.exportProjectSummaryToExcel(projects, tasks);
          this.snackBar.open('專案摘要匯出成功', '關閉', { duration: 3000 });
        } catch (error) {
          console.error('專案摘要匯出失敗:', error);
          this.snackBar.open('專案摘要匯出失敗', '關閉', { duration: 3000 });
        }
      });
    });
  }

  filterMemberData(data: GroupedMemberData[]): GroupedMemberData[] {
    return data.map(group => {
      // 1. 成員篩選
      if (this.selectedMembers.length > 0 && !this.selectedMembers.includes(group.member)) {
        return null;
      }

      // 2. 專案搜尋
      const matchesProjectSearch = this.projectSearchTerm === '' ||
        group.tasks.some(task => task.project.toLowerCase().includes(this.projectSearchTerm.toLowerCase()));

      if (!matchesProjectSearch) {
        return null;
      }

      // 3. 過濾工作項 (根據工作項搜尋和狀態)
      let filteredTasks = group.tasks;

      // 工作項搜尋
      if (this.taskSearchTerm) {
        filteredTasks = filteredTasks.filter(task =>
          task.task.toLowerCase().includes(this.taskSearchTerm.toLowerCase())
        );
      }

      // 工作項狀態篩選
      if (this.statusFilters.length > 0) {
        filteredTasks = filteredTasks.filter(task => this.statusFilters.includes(task.status));
      }

      // 4. 專案狀態篩選 (如果有選擇專案狀態，需要檢查該成員參與的專案狀態)
      if (this.projectStatusFilters.length > 0) {
        // 這裡需要從 projectData 中獲取專案狀態資訊
        // 暫時先保留所有任務，後續可以根據需要調整
      }

      // 如果沒有符合條件的工作項，則不顯示該群組
      if (filteredTasks.length === 0) {
        return null;
      }

      return {
        ...group,
        tasks: filteredTasks
      };
    }).filter(group => group !== null) as GroupedMemberData[];
  }

  filterProjectData(data: GroupedProjectData[]): GroupedProjectData[] {
    return data.map(project => {
      // 1. 專案搜尋
      const matchesProjectSearch = this.projectSearchTerm === '' ||
        project.project.toLowerCase().includes(this.projectSearchTerm.toLowerCase());

      if (!matchesProjectSearch) {
        return null;
      }

      // 2. 專案狀態篩選
      if (this.projectStatusFilters.length > 0 && !this.projectStatusFilters.includes(project.status)) {
        return null;
      }

      // 3. 過濾成員列表
      const filteredMembersList = project.membersList.map(member => {
        // 成員篩選
        if (this.selectedMembers.length > 0 && !this.selectedMembers.includes(member.member)) {
          return null;
        }

        // 過濾工作項
        let filteredTasks = member.tasks;

        // 工作項搜尋
        if (this.taskSearchTerm) {
          filteredTasks = filteredTasks.filter(task =>
            task.task.toLowerCase().includes(this.taskSearchTerm.toLowerCase())
          );
        }

        // 工作項狀態篩選
        if (this.statusFilters.length > 0) {
          filteredTasks = filteredTasks.filter(task => this.statusFilters.includes(task.status));
        }

        if (filteredTasks.length === 0) {
          return null;
        }

        return {
          ...member,
          tasks: filteredTasks
        };
      }).filter(member => member !== null);

      // 如果沒有符合條件的成員，則不顯示該專案
      if (filteredMembersList.length === 0) {
        return null;
      }

      return {
        ...project,
        membersList: filteredMembersList
      };
    }).filter(project => project !== null) as GroupedProjectData[];
  }

  // 案件 CRUD 操作
  openCreateProjectDialog(): void {
    const dialogRef = this.dialog.open(ProjectFormDialogComponent, {
      width: '800px',
      data: { isEdit: false }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.projectCrudService.createProject(result).subscribe({
          next: (project) => {
            this.snackBar.open('案件新增成功', '關閉', { duration: 3000 });
            this.refreshData(); // 刷新頁面資料
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
          next: (updatedProject) => {
            this.snackBar.open('案件更新成功', '關閉', { duration: 3000 });
            this.refreshData(); // 刷新頁面資料
          },
          error: (error) => {
            this.snackBar.open('案件更新失敗', '關閉', { duration: 3000 });
            console.error('Error updating project:', error);
          }
        });
      }
    });
  }

  // 工作項 CRUD 操作
  openCreateTaskDialog(projectName?: string): void {
    const dialogRef = this.dialog.open(TaskFormDialogComponent, {
      width: '800px',
      data: { isEdit: false, projectName }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.projectCrudService.createTask(result).subscribe({
          next: (task) => {
            this.snackBar.open('工作項新增成功', '關閉', { duration: 3000 });
            // 資料已由 CRUD 服務更新，無需額外刷新
          },
          error: (error) => {
            this.snackBar.open('工作項新增失敗', '關閉', { duration: 3000 });
            console.error('Error creating task:', error);
          }
        });
      }
    });
  }

  openBulkCreateTaskDialog(projectName?: string): void {
    const dialogRef = this.dialog.open(BulkTaskFormDialogComponent, {
      width: '1200px',
      maxWidth: '95vw',
      height: '80vh',
      data: { projectName }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && Array.isArray(result)) {
        // 使用批量創建 API
        this.projectCrudService.createBulkTasks(result).subscribe({
          next: (response) => {
            this.showBulkCreateResult(response.successCount, response.failureCount);
          },
          error: (error) => {
            console.error('Error creating bulk tasks:', error);
            this.snackBar.open('批量新增失敗', '關閉', { duration: 3000 });
          }
        });
      }
    });
  }

  private showBulkCreateResult(successCount: number, errorCount: number): void {
    if (errorCount === 0) {
      this.snackBar.open(`成功新增 ${successCount} 個工作項`, '關閉', { duration: 3000 });
    } else if (successCount === 0) {
      this.snackBar.open(`新增失敗，共 ${errorCount} 個工作項新增失敗`, '關閉', { duration: 5000 });
    } else {
      this.snackBar.open(`新增完成：成功 ${successCount} 個，失敗 ${errorCount} 個`, '關閉', { duration: 5000 });
    }
  }

  openEditTaskDialog(task: Task): void {
    const dialogRef = this.dialog.open(TaskFormDialogComponent, {
      width: '800px',
      data: { task, isEdit: true }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.projectCrudService.updateTask(task.id, result).subscribe({
          next: (updatedTask) => {
            this.snackBar.open('工作項更新成功', '關閉', { duration: 3000 });
            // 資料已由 CRUD 服務更新，無需額外刷新
          },
          error: (error) => {
            this.snackBar.open('工作項更新失敗', '關閉', { duration: 3000 });
            console.error('Error updating task:', error);
          }
        });
      }
    });
  }

  openCopyTaskDialog(task: Task): void {
    // 創建一個基於現有任務的新任務資料，清空任務名稱讓使用者重新填寫
    const taskCopy: Partial<Task> = {
      project: task.project,
      system: task.system,
      member: task.member,
      task: '', // 清空任務名稱
      complexity: task.complexity,
      priority: task.priority,
      status: 'not-started', // 重設為未開始
      startDate: task.startDate,
      endDate: task.endDate,
      actualEndDate: null // 清空實際完成日期
    };

    const dialogRef = this.dialog.open(TaskFormDialogComponent, {
      width: '800px',
      data: {
        task: taskCopy,
        isEdit: false, // 這是新增模式，不是編輯模式
        projectName: task.project
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.projectCrudService.createTask(result).subscribe({
          next: () => {
            this.snackBar.open('任務複製成功', '關閉', { duration: 3000 });
          },
          error: (error) => {
            this.snackBar.open('任務複製失敗', '關閉', { duration: 3000 });
            console.error('Error copying task:', error);
          }
        });
      }
    });
  }

  // 系統 CRUD 操作
  openCreateSystemDialog(): void {
    const dialogRef = this.dialog.open(SystemFormDialogComponent, {
      width: '500px',
      data: { isEdit: false }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.systemCrudService.createSystem(result).subscribe({
          next: (newSystem) => {
            this.snackBar.open('系統新增成功', '關閉', { duration: 3000 });
            // 資料已由 CRUD 服務更新，無需額外刷新
          },
          error: (error) => {
            this.snackBar.open('系統新增失敗', '關閉', { duration: 3000 });
            console.error('Error creating system:', error);
          }
        });
      }
    });
  }

  openEditSystemDialog(system: any): void {
    const dialogRef = this.dialog.open(SystemFormDialogComponent, {
      width: '500px',
      data: { system, isEdit: true }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.systemCrudService.updateSystem(system.id, result).subscribe({
          next: (updatedSystem) => {
            this.snackBar.open('系統更新成功', '關閉', { duration: 3000 });
            // 資料已由 CRUD 服務更新，無需額外刷新
          },
          error: (error) => {
            this.snackBar.open('系統更新失敗', '關閉', { duration: 3000 });
            console.error('Error updating system:', error);
          }
        });
      }
    });
  }

  // 刪除任務操作
  openDeleteTaskDialog(task: Task): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        title: '確認刪除任務',
        message: `確定要刪除任務「${task.task}」嗎？此操作無法復原。`,
        confirmText: '刪除',
        cancelText: '取消',
        type: 'danger'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.projectCrudService.deleteTask(task.id).subscribe({
          next: () => {
            this.snackBar.open('任務刪除成功', '關閉', { duration: 3000 });
            // 資料已由 CRUD 服務更新，無需額外刷新
          },
          error: (error) => {
            this.snackBar.open('任務刪除失敗', '關閉', { duration: 3000 });
            console.error('Error deleting task:', error);
          }
        });
      }
    });
  }

  // 專案排序管理
  openProjectSortDialog(): void {
    this.projectCrudService.getProjects().subscribe(projects => {
      const dialogRef = this.dialog.open(ProjectSortDialogComponent, {
        width: '600px',
        maxHeight: '80vh',
        data: { projects }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result && Array.isArray(result)) {
          this.updateProjectsOrder(result);
        }
      });
    });
  }

  private updateProjectsOrder(projects: Project[]): void {
    // 檢查專案是否有有效的 ID
    const invalidProjects = projects.filter(p => !p.id);
    if (invalidProjects.length > 0) {
      console.error('Some projects have invalid IDs:', invalidProjects);
      this.snackBar.open('部分專案資料無效，無法更新排序', '關閉', { duration: 3000 });
      return;
    }

    // 批量更新專案排序
    let completedCount = 0;
    let errorCount = 0;
    const totalCount = projects.length;

    projects.forEach((project, index) => {
      this.projectCrudService.updateProject(project.id, { sortOrder: index }).subscribe({
        next: () => {
          completedCount++;
          if (completedCount + errorCount === totalCount) {
            this.handleUpdateComplete(completedCount, errorCount);
          }
        },
        error: (error) => {
          console.error(`Error updating project ${project.id}:`, error);
          errorCount++;
          if (completedCount + errorCount === totalCount) {
            this.handleUpdateComplete(completedCount, errorCount);
          }
        }
      });
    });
  }

  private handleUpdateComplete(successCount: number, errorCount: number): void {
    if (errorCount === 0) {
      this.snackBar.open('專案排序更新成功', '關閉', { duration: 3000 });
      this.refreshData(); // 刷新頁面資料以反映新的排序
    } else if (successCount === 0) {
      this.snackBar.open('專案排序更新失敗', '關閉', { duration: 3000 });
    } else {
      this.snackBar.open(`專案排序更新完成：成功 ${successCount} 個，失敗 ${errorCount} 個`, '關閉', { duration: 5000 });
      this.refreshData(); // 刷新頁面資料以反映新的排序
    }
  }

  private refreshData(): void {
    this.projectCrudService.refreshData();
    // 重新訂閱資料
    this.groupedMemberData$ = this.projectDataService.getGroupedMemberData();
    this.groupedProjectData$ = this.projectDataService.getGroupedProjectData();
    this.overviewStats$ = this.projectDataService.getOverviewStats();
  }
}