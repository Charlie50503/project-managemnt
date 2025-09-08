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
import { GroupedMemberData } from '../../../../shared/models/project.model';
import { StatusHelperService } from '../../../../shared/services/status-helper.service';

@Component({
  selector: 'app-member-view-tab',
  templateUrl: './member-view-tab.component.html',
  styleUrls: ['./member-view-tab.component.scss'],
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatProgressBarModule,
    MatChipsModule,
    MatTooltipModule
  ],

})
export class MemberViewTabComponent {
  @Input() groupedMemberData$!: Observable<GroupedMemberData[]>;
  @Input() searchTerm!: string;
  @Input() selectedMembers!: string[];
  @Input() projectSearchTerm!: string;
  @Input() taskSearchTerm!: string;
  @Input() statusFilters!: string[];
  @Input() projectStatusFilters!: string[];
  @Input() hideCompleted!: boolean;
  @Input() expandedRows!: Set<string>;
  @Output() toggleRow = new EventEmitter<string>();
  @Output() editTask = new EventEmitter<any>();
  @Output() copyTask = new EventEmitter<any>();
  @Output() addTask = new EventEmitter<void>();
  @Output() deleteTask = new EventEmitter<any>();

  filteredData$!: Observable<GroupedMemberData[]>;

  displayedColumns: string[] = ['member', 'totalTasks', 'completed', 'inProgress', 'notStarted', 'dateRange'];
  displayedColumnsWithExpand: string[] = [...this.displayedColumns, 'expand'];
  expandedElement: GroupedMemberData | null = null;

  constructor(public statusHelper: StatusHelperService) {}

  ngOnInit(): void {
    this.filteredData$ = this.groupedMemberData$.pipe(
      map(data => this.filterData(data))
    );
  }

  ngOnChanges(): void {
    if (this.groupedMemberData$) {
      this.filteredData$ = this.groupedMemberData$.pipe(
        map(data => this.filterData(data))
      );
    }
  }

  private filterData(data: GroupedMemberData[]): GroupedMemberData[] {
    return data.filter(group => {
      // 只保留 hideCompleted 的篩選邏輯，其他篩選已在主組件處理
      if (this.hideCompleted && group.overallStatus === 'completed') {
        return false;
      }
      return true;
    });
  }

  onToggleRow(key: string): void {
    this.toggleRow.emit(key);
  }

  isRowExpanded(key: string): boolean {
    return this.expandedRows.has(key);
  }

  getRowKey(group: GroupedMemberData): string {
    return group.member; // 現在只按人員分組，所以只用人員名稱作為 key
  }

  getTaskStatusCount(tasks: any[], status: string): number {
    return tasks.filter(t => t.status === status).length;
  }

  getDateRange(tasks: any[]): string {
    if (!tasks || tasks.length === 0) return '-';
    
    const startDates = tasks.map(t => new Date(t.startDate)).filter(d => !isNaN(d.getTime()));
    const endDates = tasks.map(t => new Date(t.endDate)).filter(d => !isNaN(d.getTime()));
    
    if (startDates.length === 0 || endDates.length === 0) return '-';
    
    const minStart = new Date(Math.min(...startDates.map(d => d.getTime())));
    const maxEnd = new Date(Math.max(...endDates.map(d => d.getTime())));
    
    return `${minStart.toLocaleDateString('zh-TW')} ~ ${maxEnd.toLocaleDateString('zh-TW')}`;
  }

  getTasksByProject(tasks: any[]): any[] {
    if (!tasks || tasks.length === 0) return [];
    
    // 按案件分組
    const projectGroups = tasks.reduce((groups: any, task: any) => {
      const projectKey = task.project;
      if (!groups[projectKey]) {
        groups[projectKey] = {
          project: task.project,
          system: task.system,
          tasks: []
        };
      }
      groups[projectKey].tasks.push(task);
      return groups;
    }, {});
    
    // 轉換為陣列並排序
    return Object.values(projectGroups).sort((a: any, b: any) => 
      a.project.localeCompare(b.project, 'zh-TW')
    );
  }

  onEditTask(task: any): void {
    this.editTask.emit(task);
  }

  onCopyTask(task: any): void {
    this.copyTask.emit(task);
  }

  onAddTask(): void {
    this.addTask.emit();
  }

  onDeleteTask(task: any): void {
    this.deleteTask.emit(task);
  }
}