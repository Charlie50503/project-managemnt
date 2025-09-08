import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import {
  GroupedMemberData,
  GroupedProjectData,
  TaskStatus
} from '../../shared/models/project.model';
import { ProjectCrudService } from './project-crud.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectDataService {
  public data$ = this.projectCrudService.data$;

  constructor(private projectCrudService: ProjectCrudService) { }

  getGroupedMemberData(): Observable<GroupedMemberData[]> {
    return this.data$.pipe(
      map(data => {
        if (!data) return [];

        const grouped: { [key: string]: GroupedMemberData } = {};

        data.memberTableData.forEach(item => {
          const key = item.member; // 只按人員分組，不包含專案
          if (!grouped[key]) {
            grouped[key] = {
              member: item.member,
              project: '', // 清空單一專案欄位，因為一個人可能參與多個專案
              system: '', // 清空單一系統欄位，因為一個人可能參與多個系統
              workload: 0,
              tasks: [],
              overallProgress: 0,
              overallStatus: 'not-started' as TaskStatus,
              demos: [],
              screenshots: 0
            };
          }
          grouped[key].tasks.push(item);
        });

        // 計算每個成員的整體進度和狀態
        Object.keys(grouped).forEach(key => {
          const group = grouped[key];
          const completedTasks = group.tasks.filter(task => task.status === 'completed').length;
          group.overallProgress = Math.round((completedTasks / group.tasks.length) * 100);

          // 判斷整體狀態
          const completedCount = group.tasks.filter(task => task.status === 'completed').length;
          const inProgressCount = group.tasks.filter(task => task.status === 'in-progress').length;

          if (completedCount === group.tasks.length) {
            group.overallStatus = 'completed';
          } else if (inProgressCount > 0) {
            group.overallStatus = 'in-progress';
          } else {
            group.overallStatus = 'not-started';
          }

          // 設定專案和系統資訊（顯示參與的專案數量）
          const uniqueProjects = [...new Set(group.tasks.map(task => task.project))];
          const uniqueSystems = [...new Set(group.tasks.map(task => task.system))];

          if (uniqueProjects.length === 1) {
            group.project = uniqueProjects[0];
          } else {
            group.project = `${uniqueProjects.length} 個專案`;
          }

          if (uniqueSystems.length === 1) {
            group.system = uniqueSystems[0];
          } else {
            group.system = `${uniqueSystems.length} 個系統`;
          }

          // 計算demo和截圖 (簡化版本)
          group.demos = [];
          group.screenshots = 0;
        });

        return Object.values(grouped);
      })
    );
  }

  getGroupedProjectData(): Observable<GroupedProjectData[]> {
    return this.data$.pipe(
      map(data => {
        if (!data) return [];

        const grouped: { [key: string]: GroupedProjectData } = {};

        // 從 memberTableData 中提取每個專案的詳細任務資訊
        data.memberTableData.forEach(item => {
          if (!grouped[item.project]) {
            // 從 projectTableData 中找到對應的專案基本資訊
            const projectInfo = data.projectTableData.find(p => p.project === item.project);

            grouped[item.project] = {
              project: item.project,
              system: item.system,
              status: projectInfo?.status || 'not-started',
              startDate: projectInfo?.startDate || item.startDate,
              expectedEndDate: projectInfo?.expectedEndDate || item.endDate,
              currentMilestone: '進行中',
              nextMilestone: '待定',
              demo: null,
              risks: [],
              members: {},
              membersList: [],
              totalTasks: 0,
              completedTasks: 0,
              inProgressTasks: 0,
              notStartedTasks: 0,
              overallProgress: 0
            };
          }

          // 按成員分組任務
          if (!grouped[item.project].members[item.member]) {
            grouped[item.project].members[item.member] = {
              member: item.member,
              workload: 0,
              tasks: []
            };
          }

          grouped[item.project].members[item.member].tasks.push(item);
          grouped[item.project].totalTasks++;

          // 統計任務狀態
          if (item.status === 'completed') grouped[item.project].completedTasks++;
          else if (item.status === 'in-progress') grouped[item.project].inProgressTasks++;
          else if (item.status === 'not-started') grouped[item.project].notStartedTasks++;
        });

        // 計算每個專案的整體進度
        Object.keys(grouped).forEach(projectKey => {
          const project = grouped[projectKey];
          if (project.totalTasks > 0) {
            // 進度 = (已完成任務數 / 總任務數) × 100
            project.overallProgress = Math.round((project.completedTasks / project.totalTasks) * 100);
          }

          // 將成員物件轉為陣列以便渲染
          project.membersList = Object.values(project.members);
        });

        return Object.values(grouped);
      })
    );
  }

  getOverviewStats(): Observable<any> {
    return this.data$.pipe(
      map(data => {
        if (!data) return null;

        const projects = new Set(data.memberTableData.map(item => item.project));
        const completedTasks = data.memberTableData.filter(task => task.status === 'completed').length;
        const inProgressTasks = data.memberTableData.filter(task => task.status === 'in-progress').length;
        const notStartedTasks = data.memberTableData.filter(task => task.status === 'not-started').length;

        return {
          totalProjects: projects.size,
          completedTasks,
          inProgressTasks,
          notStartedTasks,
          avgWorkload: 0
        };
      })
    );
  }
}