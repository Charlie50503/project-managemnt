import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, map } from 'rxjs';
import { trigger, state, style, transition, animate } from '@angular/animations';
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
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
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

  displayedColumns: string[] = ['expand', 'member', 'project', 'taskStats', 'status', 'results'];

  constructor(public statusHelper: StatusHelperService) {}

  isExpanded = (index: number, group: GroupedMemberData) => this.isRowExpanded(this.getRowKey(group));

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

  onEditTask(task: any): void {
    this.editTask.emit(task);
  }
}