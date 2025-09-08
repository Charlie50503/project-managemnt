import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, map } from 'rxjs';

import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSortModule } from '@angular/material/sort';
import { GroupedProjectData } from '../../../../shared/models/project.model';
import { StatusHelperService } from '../../../../shared/services/status-helper.service';

export interface SortState {
  column: string;
  direction: 'asc' | 'desc' | '';
}

@Component({
  selector: 'app-project-view-tab',
  templateUrl: './project-view-tab.component.html',
  styleUrls: ['./project-view-tab.component.scss'],
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatProgressBarModule,
    MatChipsModule,
    MatTooltipModule,
    MatSortModule
  ],

})
export class ProjectViewTabComponent {
  @Input() groupedProjectData$!: Observable<GroupedProjectData[]>;
  @Input() searchTerm!: string;
  @Input() statusFilter!: string;
  @Input() hideCompleted!: boolean;
  @Input() expandedRows!: Set<string>;
  @Output() toggleRow = new EventEmitter<string>();
  @Output() editProject = new EventEmitter<any>();
  @Output() addTask = new EventEmitter<string>();
  @Output() bulkAddTask = new EventEmitter<string>();
  @Output() editTask = new EventEmitter<any>();
  @Output() copyTask = new EventEmitter<any>();
  @Output() deleteTask = new EventEmitter<any>();

  filteredData$!: Observable<GroupedProjectData[]>;
  displayedColumns: string[] = ['project', 'system', 'projectProgress', 'totalTasks', 'completed', 'inProgress', 'notStarted', 'progressPercent', 'actions'];
  displayedColumnsWithExpand: string[] = [...this.displayedColumns, 'expand'];
  expandedElement: GroupedProjectData | null = null;
  
  // 排序狀態
  sortState: SortState = { column: '', direction: '' };

  constructor(public statusHelper: StatusHelperService) { }

  ngOnInit(): void {
    this.updateFilteredData();
  }

  ngOnChanges(): void {
    if (this.groupedProjectData$) {
      this.updateFilteredData();
    }
  }

  private updateFilteredData(): void {
    this.filteredData$ = this.groupedProjectData$.pipe(
      map(data => this.sortData(this.filterData(data)))
    );
  }

  private filterData(data: GroupedProjectData[]): GroupedProjectData[] {
    return data.filter(project => {
      // 過濾已完成項目
      if (this.hideCompleted && project.status === 'completed') {
        return false;
      }

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

  private sortData(data: GroupedProjectData[]): GroupedProjectData[] {
    if (!this.sortState.column || this.sortState.direction === '') {
      // 預設按照 sortOrder 排序，如果沒有則按專案名稱排序
      return [...data].sort((a, b) => {
        const sortOrderA = (a as any).sortOrder || 0;
        const sortOrderB = (b as any).sortOrder || 0;
        
        if (sortOrderA !== sortOrderB) {
          return sortOrderA - sortOrderB;
        }
        
        return a.project.localeCompare(b.project, 'zh-TW');
      });
    }

    return [...data].sort((a, b) => {
      const isAsc = this.sortState.direction === 'asc';
      
      switch (this.sortState.column) {
        case 'project':
          return this.compare(a.project, b.project, isAsc);
        case 'system':
          return this.compare(a.system, b.system, isAsc);
        case 'projectProgress':
          return this.compare(this.getStatusOrder(a.status), this.getStatusOrder(b.status), isAsc);
        case 'totalTasks':
          return this.compare(a.totalTasks, b.totalTasks, isAsc);
        case 'completed':
          return this.compare(a.completedTasks, b.completedTasks, isAsc);
        case 'inProgress':
          return this.compare(a.inProgressTasks, b.inProgressTasks, isAsc);
        case 'notStarted':
          return this.compare(a.notStartedTasks, b.notStartedTasks, isAsc);
        case 'progressPercent':
          return this.compare(a.overallProgress, b.overallProgress, isAsc);
        case 'startDate':
          return this.compareDates(a.startDate, b.startDate, isAsc);
        case 'expectedEndDate':
          return this.compareDates(a.expectedEndDate, b.expectedEndDate, isAsc);
        default:
          return 0;
      }
    });
  }

  private compare(a: any, b: any, isAsc: boolean): number {
    if (a === null || a === undefined) a = '';
    if (b === null || b === undefined) b = '';
    
    if (typeof a === 'string' && typeof b === 'string') {
      return (a.localeCompare(b, 'zh-TW') * (isAsc ? 1 : -1));
    }
    
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  private compareDates(a: string | null, b: string | null, isAsc: boolean): number {
    // 處理空日期，空日期排在最後
    if (!a && !b) return 0;
    if (!a) return isAsc ? 1 : -1;
    if (!b) return isAsc ? -1 : 1;
    
    const dateA = new Date(a);
    const dateB = new Date(b);
    
    return (dateA.getTime() - dateB.getTime()) * (isAsc ? 1 : -1);
  }

  private getStatusOrder(status: string): number {
    // 定義狀態的排序順序
    const statusOrder: { [key: string]: number } = {
      'in-progress': 1,
      'not-started': 2,
      'pending': 3,
      'on-hold': 4,
      'completed': 5,
      'cancelled': 6
    };
    return statusOrder[status] || 999;
  }

  onSort(column: string): void {
    if (this.sortState.column === column) {
      // 同一欄位：切換排序方向
      if (this.sortState.direction === 'asc') {
        this.sortState.direction = 'desc';
      } else if (this.sortState.direction === 'desc') {
        this.sortState.direction = '';
        this.sortState.column = '';
      } else {
        this.sortState.direction = 'asc';
      }
    } else {
      // 不同欄位：設定為升序
      this.sortState.column = column;
      this.sortState.direction = 'asc';
    }
    
    this.updateFilteredData();
  }

  getSortIcon(column: string): string {
    if (this.sortState.column !== column || this.sortState.direction === '') {
      return 'unfold_more';
    }
    return this.sortState.direction === 'asc' ? 'keyboard_arrow_up' : 'keyboard_arrow_down';
  }

  isSorted(column: string): boolean {
    return this.sortState.column === column && this.sortState.direction !== '';
  }

  onToggleRow(key: string): void {
    this.toggleRow.emit(key);
  }

  isRowExpanded(key: string): boolean {
    return this.expandedRows.has(key);
  }

  getRowKey(project: GroupedProjectData): string {
    return project.project;
  }



  onEditProject(project: any): void {
    this.editProject.emit(project);
  }

  onAddTask(projectName: string): void {
    this.addTask.emit(projectName);
  }

  onBulkAddTask(projectName: string): void {
    this.bulkAddTask.emit(projectName);
  }

  onEditTask(task: any): void {
    this.editTask.emit(task);
  }

  onCopyTask(task: any): void {
    this.copyTask.emit(task);
  }

  onDeleteTask(task: any): void {
    this.deleteTask.emit(task);
  }
}