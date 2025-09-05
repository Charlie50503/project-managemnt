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
import { GroupedProjectData } from '../../../../shared/models/project.model';
import { StatusHelperService } from '../../../../shared/services/status-helper.service';

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
    MatTooltipModule
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
  @Output() editTask = new EventEmitter<any>();
  @Output() copyTask = new EventEmitter<any>();
  @Output() deleteTask = new EventEmitter<any>();

  filteredData$!: Observable<GroupedProjectData[]>;
  displayedColumns: string[] = ['system', 'project', 'projectProgress', 'totalTasks', 'completed', 'inProgress', 'notStarted', 'progressPercent', 'actions'];
  displayedColumnsWithExpand: string[] = [...this.displayedColumns, 'expand'];
  expandedElement: GroupedProjectData | null = null;

  constructor(public statusHelper: StatusHelperService) { }

  ngOnInit(): void {
    this.filteredData$ = this.groupedProjectData$.pipe(
      map(data => this.filterData(data))
    );
  }

  ngOnChanges(): void {
    if (this.groupedProjectData$) {
      this.filteredData$ = this.groupedProjectData$.pipe(
        map(data => this.filterData(data))
      );
    }
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