import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { 
  ProjectData, 
  Task, 
  Project, 
  GroupedMemberData, 
  GroupedProjectData,
  MemberInProject,
  TaskStatus 
} from '../../shared/models/project.model';
import { ProjectCrudService } from './project-crud.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectDataService {
  public data$ = this.projectCrudService.data$;

  constructor(private projectCrudService: ProjectCrudService) {}

  getGroupedMemberData(): Observable<GroupedMemberData[]> {
    return this.data$.pipe(
      map(data => {
        if (!data) return [];
        
        const grouped: { [key: string]: GroupedMemberData } = {};
        
        data.memberTableData.forEach(item => {
          const key = `${item.member}-${item.project}`;
          if (!grouped[key]) {
            grouped[key] = {
              member: item.member,
              project: item.project,
              system: item.system,
              workload: item.workload,
              tasks: [],
              overallProgress: 0,
              overallStatus: 'in-progress' as TaskStatus,
              demos: [],
              screenshots: 0
            };
          }
          grouped[key].tasks.push(item);
        });

        // 計算每個成員+專案的整體進度和狀態
        Object.keys(grouped).forEach(key => {
          const group = grouped[key];
          const totalProgress = group.tasks.reduce((sum, task) => sum + task.progress, 0);
          group.overallProgress = Math.round(totalProgress / group.tasks.length);
          
          // 判斷整體狀態
          if (group.tasks.some(task => task.status === 'delayed')) {
            group.overallStatus = 'delayed';
          } else if (group.tasks.some(task => task.status === 'in-progress')) {
            group.overallStatus = 'in-progress';
          } else {
            group.overallStatus = 'completed';
          }
          
          // 計算demo和截圖
          group.demos = group.tasks.filter(task => task.demo).map(task => task.demo!);
          group.screenshots = group.tasks.reduce((acc, task) => acc + task.screenshots.length, 0);
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
            const projectInfo = data.projectTableData.find(p => p.project === item.project) || {
              system: item.system,
              status: 'normal' as const,
              startDate: item.startDate,
              expectedEndDate: item.endDate,
              currentMilestone: '進行中',
              nextMilestone: '待定',
              demo: null,
              risks: []
            };
            
            grouped[item.project] = {
              project: item.project,
              system: item.system,
              status: projectInfo.status,
              startDate: projectInfo.startDate,
              expectedEndDate: projectInfo.expectedEndDate,
              currentMilestone: projectInfo.currentMilestone,
              nextMilestone: projectInfo.nextMilestone,
              demo: projectInfo.demo,
              risks: projectInfo.risks,
              members: {},
              membersList: [],
              totalTasks: 0,
              completedTasks: 0,
              inProgressTasks: 0,
              delayedTasks: 0,
              overallProgress: 0
            };
          }
          
          // 按成員分組任務
          if (!grouped[item.project].members[item.member]) {
            grouped[item.project].members[item.member] = {
              member: item.member,
              workload: item.workload,
              tasks: []
            };
          }
          
          grouped[item.project].members[item.member].tasks.push(item);
          grouped[item.project].totalTasks++;
          
          // 統計任務狀態
          if (item.status === 'completed') grouped[item.project].completedTasks++;
          else if (item.status === 'in-progress') grouped[item.project].inProgressTasks++;
          else if (item.status === 'delayed') grouped[item.project].delayedTasks++;
        });

        // 計算每個專案的整體進度
        Object.keys(grouped).forEach(projectKey => {
          const project = grouped[projectKey];
          if (project.totalTasks > 0) {
            const totalProgress = Object.values(project.members)
              .flatMap(member => member.tasks)
              .reduce((sum, task) => sum + task.progress, 0);
            project.overallProgress = Math.round(totalProgress / project.totalTasks);
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
        const delayedTasks = data.memberTableData.filter(task => task.status === 'delayed').length;
        const avgWorkload = Math.round(
          data.memberTableData.reduce((sum, task) => sum + task.workload, 0) / data.memberTableData.length
        );

        return {
          totalProjects: projects.size,
          completedTasks,
          inProgressTasks,
          delayedTasks,
          avgWorkload
        };
      })
    );
  }
}