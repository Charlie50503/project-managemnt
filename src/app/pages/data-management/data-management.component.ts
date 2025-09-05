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
import { Project } from '../../shared/models/project.model';
import { SystemFormDialogComponent } from '../project-management/components/system-form-dialog/system-form-dialog.component';
import { ProjectFormDialogComponent } from '../project-management/components/project-form-dialog/project-form-dialog.component';

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
  systems$: Observable<System[]>;
  projects$: Observable<Project[]>;

  systemDisplayedColumns: string[] = ['name', 'code', 'description', 'owner', 'createdAt', 'actions'];
  projectDisplayedColumns: string[] = ['projectNumber', 'projectSource', 'project', 'system', 'projectManager', 'status', 'startDate', 'actions'];

  constructor(
    private systemCrudService: SystemCrudService,
    private projectCrudService: ProjectCrudService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    this.systems$ = this.systemCrudService.getSystems();
    this.projects$ = this.projectCrudService.getProjects();
  }

  ngOnInit(): void {}

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

  deleteSystem(system: System): void {
    if (confirm(`確定要刪除系統「${system.name}」嗎？此操作無法復原。`)) {
      this.systemCrudService.deleteSystem(system.id).subscribe({
        next: () => {
          this.snackBar.open('系統刪除成功', '關閉', { duration: 3000 });
          this.refreshData();
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
          next: () => {
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

  deleteProject(project: Project): void {
    if (confirm(`確定要刪除案件「${project.project}」嗎？此操作無法復原。`)) {
      this.projectCrudService.deleteProject(project.id).subscribe({
        next: () => {
          this.snackBar.open('案件刪除成功', '關閉', { duration: 3000 });
          this.refreshData();
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

  private refreshData(): void {
    this.systemCrudService.refreshData();
    this.projectCrudService.refreshData();
    this.systems$ = this.systemCrudService.getSystems();
    this.projects$ = this.projectCrudService.getProjects();
  }
}