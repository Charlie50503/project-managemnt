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
export class ProjectViewTabComponent {
  @Input() groupedProjectData$!: Observable<GroupedProjectData[]>;
  @Input() searchTerm!: string;
  @Input() statusFilter!: string;
  @Input() expandedRows!: Set<string>;
  @Output() toggleRow = new EventEmitter<string>();
  @Output() editProject = new EventEmitter<any>();
  @Output() addTask = new EventEmitter<string>();
  @Output() editTask = new EventEmitter<any>();

  filteredData$!: Observable<GroupedProjectData[]>;
  displayedColumns: string[] = ['expand', 'project', 'taskStats', 'progress', 'status', 'milestones', 'risks', 'actions'];

  constructor(public statusHelper: StatusHelperService) {}

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

  isExpanded = (index: number, project: GroupedProjectData) => this.isRowExpanded(this.getRowKey(project));

  onEditProject(project: any): void {
    this.editProject.emit(project);
  }

  onAddTask(projectName: string): void {
    this.addTask.emit(projectName);
  }

  onEditTask(task: any): void {
    this.editTask.emit(task);
  }
}