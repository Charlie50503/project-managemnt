import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Observable, map } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { GroupedMemberData, GroupedProjectData } from '../../../../shared/models/project.model';

@Component({
  selector: 'app-overview-tab',
  templateUrl: './overview-tab.component.html',
  styleUrls: ['./overview-tab.component.scss'],
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    MatButtonModule
  ]
})
export class OverviewTabComponent implements OnInit {
  @Input() overviewStats$!: Observable<any>;
  @Input() groupedMemberData$!: Observable<GroupedMemberData[]>;
  @Input() groupedProjectData$!: Observable<GroupedProjectData[]>;

  // 篩選條件
  selectedMembers: string[] = [];
  availableMembers: string[] = [];

  // 本期完成成果的日期區間 (預設今天到兩週前)
  completedStartDate: Date;
  completedEndDate: Date;

  // 下期重點目標的日期區間 (預設兩週)
  upcomingStartDate: Date;
  upcomingEndDate: Date;

  // 篩選後的數據
  filteredCompletedTasks$!: Observable<any[]>;
  filteredUpcomingTasks$!: Observable<any[]>;

  constructor() {
    // 設定預設日期區間
    const today = new Date();
    this.completedEndDate = new Date(today);
    this.completedStartDate = new Date(today);
    this.completedStartDate.setDate(today.getDate() - 14); // 兩週前

    this.upcomingStartDate = new Date(today);
    this.upcomingEndDate = new Date(today);
    this.upcomingEndDate.setDate(today.getDate() + 14); // 兩週後
  }

  ngOnInit(): void {
    // 獲取可用的成員列表
    this.groupedMemberData$.subscribe(data => {
      this.availableMembers = [...new Set(data.map(item => item.member))].sort();
    });

    // 初始化篩選後的數據
    this.updateFilteredData();
  }

  onMemberSelectionChange(selectedMembers: string[]): void {
    this.selectedMembers = selectedMembers || [];
    this.updateFilteredData();
  }

  onCompletedDateRangeChange(): void {
    this.updateFilteredData();
  }

  onUpcomingDateRangeChange(): void {
    this.updateFilteredData();
  }

  private updateFilteredData(): void {
    // 篩選已完成的任務
    this.filteredCompletedTasks$ = this.groupedMemberData$.pipe(
      map(memberData => {
        const tasks: any[] = [];
        memberData.forEach(group => {
          // 成員篩選
          if (this.selectedMembers.length > 0 && !this.selectedMembers.includes(group.member)) {
            return;
          }

          group.tasks.forEach(task => {
            if (task.status === 'completed' && task.actualEndDate) {
              const completedDate = new Date(task.actualEndDate);
              // 日期區間篩選
              if (completedDate >= this.completedStartDate && completedDate <= this.completedEndDate) {
                tasks.push({
                  ...task,
                  member: group.member
                });
              }
            }
          });
        });
        return tasks.sort((a, b) => new Date(b.actualEndDate).getTime() - new Date(a.actualEndDate).getTime());
      })
    );

    // 篩選即將到來的任務
    this.filteredUpcomingTasks$ = this.groupedMemberData$.pipe(
      map(memberData => {
        const tasks: any[] = [];
        memberData.forEach(group => {
          // 成員篩選
          if (this.selectedMembers.length > 0 && !this.selectedMembers.includes(group.member)) {
            return;
          }

          group.tasks.forEach(task => {
            if (task.status !== 'completed') {
              const startDate = new Date(task.startDate);
              const endDate = new Date(task.endDate);
              // 日期區間篩選 (開始日期或結束日期在區間內)
              if ((startDate >= this.upcomingStartDate && startDate <= this.upcomingEndDate) ||
                (endDate >= this.upcomingStartDate && endDate <= this.upcomingEndDate)) {
                tasks.push({
                  ...task,
                  member: group.member
                });
              }
            }
          });
        });
        return tasks.sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
      })
    );
  }

  isOverdue(task: any): boolean {
    // 簡單的邏輯：如果任務進行中且已超過預計結束日期
    const today = new Date();
    const endDate = new Date(task.endDate);
    return today > endDate;
  }

  formatDate(dateString: string): string {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('zh-TW');
  }

  getTaskStatusIcon(status: string): { icon: string, class: string } {
    switch (status) {
      case 'not-started':
        return { icon: 'radio_button_unchecked', class: 'text-gray-500' };
      case 'in-progress':
        return { icon: 'schedule', class: 'text-blue-600' };
      case 'completed':
        return { icon: 'check_circle', class: 'text-green-600' };
      default:
        return { icon: 'help', class: 'text-gray-500' };
    }
  }

  getStatusText(status: string): string {
    switch (status) {
      case 'not-started':
        return '未開始';
      case 'in-progress':
        return '進行中';
      case 'completed':
        return '已完成';
      default:
        return '未知';
    }
  }
}