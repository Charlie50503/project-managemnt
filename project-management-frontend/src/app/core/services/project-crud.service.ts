import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, map, of, delay } from 'rxjs';
import { Project, Task, ProjectData } from '../../shared/models/project.model';
import { Member } from '../../shared/models/member.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectCrudService {
  private dataSubject = new BehaviorSubject<ProjectData | null>(null);
  private membersSubject = new BehaviorSubject<Member[]>([]);
  private readonly API_BASE_URL = 'http://localhost:3000/api';
  
  public data$ = this.dataSubject.asObservable();
  public members$ = this.membersSubject.asObservable();
  public projects$ = this.data$.pipe(
    map(data => data?.projectTableData || [])
  );

  constructor(private http: HttpClient) {
    this.loadData();
    this.loadMembers();
  }

  private loadData(): void {
    console.log('Loading project data from API');
    
    // 同時載入專案和任務資料
    const projects$ = this.http.get<Project[]>(`${this.API_BASE_URL}/projects`);
    const tasks$ = this.http.get<Task[]>(`${this.API_BASE_URL}/tasks`);
    
    // 合併兩個請求的結果
    projects$.subscribe({
      next: (projects) => {
        tasks$.subscribe({
          next: (tasks) => {
            const projectData: ProjectData = {
              projectTableData: projects,
              memberTableData: tasks
            };
            console.log('Loaded project data from API:', projectData);
            this.dataSubject.next(projectData);
          },
          error: (error) => {
            console.error('Error loading tasks from API:', error);
            this.dataSubject.next(null);
          }
        });
      },
      error: (error) => {
        console.error('Error loading projects from API:', error);
        this.dataSubject.next(null);
      }
    });
  }

  private loadMembers(): void {
    this.http.get<Member[]>(`${this.API_BASE_URL}/members`)
      .subscribe(members => this.membersSubject.next(members));
  }

  // 案件 CRUD 操作
  createProject(project: Omit<Project, 'id'>): Observable<Project> {
    return this.http.post<Project>(`${this.API_BASE_URL}/projects`, project).pipe(
      map(newProject => {
        const currentData = this.dataSubject.value;
        if (currentData) {
          currentData.projectTableData.push(newProject);
          this.dataSubject.next(currentData);
        }
        return newProject;
      })
    );
  }

  updateProject(id: number, updates: Partial<Project>): Observable<Project> {
    return this.http.put<Project>(`${this.API_BASE_URL}/projects/${id}`, updates).pipe(
      map(updatedProject => {
        const currentData = this.dataSubject.value;
        if (currentData) {
          const index = currentData.projectTableData.findIndex(p => p.id === id);
          if (index !== -1) {
            currentData.projectTableData[index] = updatedProject;
            this.dataSubject.next(currentData);
          }
        }
        return updatedProject;
      })
    );
  }

  deleteProject(id: number): Observable<boolean> {
    return this.http.delete(`${this.API_BASE_URL}/projects/${id}`).pipe(
      map(() => {
        const currentData = this.dataSubject.value;
        if (currentData) {
          const projectIndex = currentData.projectTableData.findIndex(p => p.id === id);
          if (projectIndex !== -1) {
            const projectName = currentData.projectTableData[projectIndex].project;
            
            // 移除專案和相關任務
            currentData.projectTableData.splice(projectIndex, 1);
            currentData.memberTableData = currentData.memberTableData.filter(task => 
              task.project !== projectName
            );
            
            this.dataSubject.next(currentData);
          }
        }
        return true;
      })
    );
  }

  // 工作項 CRUD 操作
  createTask(task: Omit<Task, 'id'>): Observable<Task> {
    return this.http.post<Task>(`${this.API_BASE_URL}/tasks`, task).pipe(
      map(newTask => {
        const currentData = this.dataSubject.value;
        if (currentData) {
          currentData.memberTableData.push(newTask);
          this.dataSubject.next(currentData);
        }
        return newTask;
      })
    );
  }

  updateTask(id: number, updates: Partial<Task>): Observable<Task> {
    return this.http.put<Task>(`${this.API_BASE_URL}/tasks/${id}`, updates).pipe(
      map(updatedTask => {
        const currentData = this.dataSubject.value;
        if (currentData) {
          const index = currentData.memberTableData.findIndex(t => t.id === id);
          if (index !== -1) {
            currentData.memberTableData[index] = updatedTask;
            this.dataSubject.next(currentData);
          }
        }
        return updatedTask;
      })
    );
  }

  deleteTask(id: number): Observable<boolean> {
    return this.http.delete(`${this.API_BASE_URL}/tasks/${id}`).pipe(
      map(() => {
        const currentData = this.dataSubject.value;
        if (currentData) {
          const taskIndex = currentData.memberTableData.findIndex(task => task.id === id);
          if (taskIndex !== -1) {
            currentData.memberTableData.splice(taskIndex, 1);
            this.dataSubject.next(currentData);
          }
        }
        return true;
      })
    );
  }

  // 取得特定案件的工作項
  getTasksByProject(projectName: string): Observable<Task[]> {
    return this.data$.pipe(
      map(data => {
        if (!data) return [];
        return data.memberTableData.filter(task => task.project === projectName);
      })
    );
  }

  // 取得案件列表
  getProjects(): Observable<Project[]> {
    return this.data$.pipe(
      map(data => data?.projectTableData || [])
    );
  }

  // 取得工作項列表
  getTasks(): Observable<Task[]> {
    return this.data$.pipe(
      map(data => data?.memberTableData || [])
    );
  }

  // 重新載入資料
  refreshData(): void {
    this.loadData();
    this.loadMembers();
  }

  // 匯出資料到檔案 (供開發者手動更新 assets)
  exportToFile(): void {
    const data = this.dataSubject.value;
    if (!data) {
      console.error('No project data to export');
      return;
    }
    
    const dataStr = JSON.stringify(data, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = 'project-data.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
}