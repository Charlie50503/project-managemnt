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
import { ProjectDataService } from '../../core/services/project-data.service';
import { ProjectCrudService } from '../../core/services/project-crud.service';
import { StatusHelperService } from '../../shared/services/status-helper.service';
import { GroupedMemberData, GroupedProjectData, Project, Task } from '../../shared/models/project.model';
import { OverviewTabComponent } from './components/overview-tab/overview-tab.component';
import { MemberViewTabComponent } from './components/member-view-tab/member-view-tab.component';
import { ProjectViewTabComponent } from './components/project-view-tab/project-view-tab.component';
import { ProjectFormDialogComponent } from './components/project-form-dialog/project-form-dialog.component';
import { TaskFormDialogComponent } from './components/task-form-dialog/task-form-dialog.component';
import { SystemFormDialogComponent } from './components/system-form-dialog/system-form-dialog.component';
import { SystemCrudService } from './services/system-crud.service';

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
    OverviewTabComponent,
    MemberViewTabComponent,
    ProjectViewTabComponent
  ]
})
export class ProjectManagementComponent implements OnInit {
  activeTab = 'overview';
  searchTerm = '';
  statusFilter = 'all';
  hideCompleted = false;
  expandedRows = new Set<string>();

  groupedMemberData$: Observable<GroupedMemberData[]>;
  groupedProjectData$: Observable<GroupedProjectData[]>;
  overviewStats$: Observable<any>;

  constructor(
    private projectDataService: ProjectDataService,
    private projectCrudService: ProjectCrudService,
    public statusHelper: StatusHelperService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private systemCrudService: SystemCrudService
  ) {
    this.groupedMemberData$ = this.projectDataService.getGroupedMemberData();
    this.groupedProjectData$ = this.projectDataService.getGroupedProjectData();
    this.overviewStats$ = this.projectDataService.getOverviewStats();
  }

  selectedTabIndex = 0;

  ngOnInit(): void { }

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

  onSearchChange(value: string): void {
    this.searchTerm = value;
  }

  onStatusFilterChange(value: string): void {
    this.statusFilter = value;
  }

  exportToExcel(): void {
    // TODO: 實現 Excel 匯出功能
    console.log('Export to Excel');
  }

  filterMemberData(data: GroupedMemberData[]): GroupedMemberData[] {
    return data.filter(group => {
      const matchesSearch = group.member.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        group.project.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        group.system.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        group.tasks.some(task => task.task.toLowerCase().includes(this.searchTerm.toLowerCase()));

      const matchesStatus = this.statusFilter === 'all' ||
        group.overallStatus === this.statusFilter ||
        group.tasks.some(task => task.status === this.statusFilter);

      return matchesSearch && matchesStatus;
    });
  }

  filterProjectData(data: GroupedProjectData[]): GroupedProjectData[] {
    return data.filter(project => {
      const matchesSearch = project.project.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        project.system.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        project.membersList.some(member =>
          member.member.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          member.tasks.some(task => task.task.toLowerCase().includes(this.searchTerm.toLowerCase()))
        );

      const matchesStatus = this.statusFilter === 'all' ||
        project.status === this.statusFilter ||
        project.membersList.some(member =>
          member.tasks.some(task => task.status === this.statusFilter)
        );

      return matchesSearch && matchesStatus;
    });
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
            this.refreshData();
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
            this.refreshData();
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
            this.refreshData();
          },
          error: (error) => {
            this.snackBar.open('工作項新增失敗', '關閉', { duration: 3000 });
            console.error('Error creating task:', error);
          }
        });
      }
    });
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
            this.refreshData();
          },
          error: (error) => {
            this.snackBar.open('工作項更新失敗', '關閉', { duration: 3000 });
            console.error('Error updating task:', error);
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
            this.refreshData();
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
            this.refreshData();
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
    const dialogRef = this.dialog.open(TaskFormDialogComponent, {
      width: '400px',
      data: {
        task,
        isEdit: false,
        isDelete: true,
        title: '確認刪除',
        message: `確定要刪除任務「${task.task}」嗎？此操作無法復原。`
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'confirm') {
        this.projectCrudService.deleteTask(task.id).subscribe({
          next: () => {
            this.snackBar.open('任務刪除成功', '關閉', { duration: 3000 });
            this.refreshData();
          },
          error: (error) => {
            this.snackBar.open('任務刪除失敗', '關閉', { duration: 3000 });
            console.error('Error deleting task:', error);
          }
        });
      }
    });
  }

  private refreshData(): void {
    this.projectCrudService.refreshData();
    // 重新訂閱資料
    this.groupedMemberData$ = this.projectDataService.getGroupedMemberData();
    this.groupedProjectData$ = this.projectDataService.getGroupedProjectData();
    this.overviewStats$ = this.projectDataService.getOverviewStats();
  }
}