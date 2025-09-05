import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, map } from 'rxjs';

import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatChipsModule } from '@angular/material/chips';
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
    MatChipsModule
  ],

})
export class MemberViewTabComponent {
  @Input() groupedMemberData$!: Observable<GroupedMemberData[]>;
  @Input() searchTerm!: string;
  @Input() statusFilter!: string;
  @Input() hideCompleted!: boolean;
  @Input() expandedRows!: Set<string>;
  @Output() toggleRow = new EventEmitter<string>();
  @Output() editTask = new EventEmitter<any>();

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
      // 過濾已完成項目
      if (this.hideCompleted && group.overallStatus === 'completed') {
        return false;
      }
      
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

  onToggleRow(key: string): void {
    this.toggleRow.emit(key);
  }

  isRowExpanded(key: string): boolean {
    return this.expandedRows.has(key);
  }

  getRowKey(group: GroupedMemberData): string {
    return `${group.member}-${group.project}`;
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

  onEditTask(task: any): void {
    this.editTask.emit(task);
  }
}