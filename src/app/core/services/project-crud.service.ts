import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { Project, Task, ProjectData } from '../../shared/models/project.model';
import { Member } from '../../shared/models/member.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectCrudService {
  private dataSubject = new BehaviorSubject<ProjectData | null>(null);
  private membersSubject = new BehaviorSubject<Member[]>([]);
  
  public data$ = this.dataSubject.asObservable();
  public members$ = this.membersSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadData();
    this.loadMembers();
  }

  private loadData(): void {
    this.http.get<ProjectData>('/assets/data/project-data.json')
      .subscribe(data => this.dataSubject.next(data));
  }

  private loadMembers(): void {
    this.http.get<Member[]>('/assets/data/members.json')
      .subscribe(members => this.membersSubject.next(members));
  }

  // 案件 CRUD 操作
  createProject(project: Omit<Project, 'id'>): Observable<Project> {
    return this.data$.pipe(
      map(data => {
        if (!data) throw new Error('Data not loaded');
        
        const newId = Math.max(...data.projectTableData.map(p => p.id), 0) + 1;
        const newProject: Project = {
          ...project,
          id: newId
        };
        
        data.projectTableData.push(newProject);
        this.dataSubject.next(data);
        this.saveData(data);
        
        return newProject;
      })
    );
  }

  updateProject(id: number, updates: Partial<Project>): Observable<Project> {
    return this.data$.pipe(
      map(data => {
        if (!data) throw new Error('Data not loaded');
        
        const index = data.projectTableData.findIndex(p => p.id === id);
        if (index === -1) throw new Error('Project not found');
        
        data.projectTableData[index] = { ...data.projectTableData[index], ...updates };
        this.dataSubject.next(data);
        this.saveData(data);
        
        return data.projectTableData[index];
      })
    );
  }

  deleteProject(id: number): Observable<boolean> {
    return this.data$.pipe(
      map(data => {
        if (!data) throw new Error('Data not loaded');
        
        const index = data.projectTableData.findIndex(p => p.id === id);
        if (index === -1) return false;
        
        // 同時刪除相關的任務
        data.memberTableData = data.memberTableData.filter(task => 
          !data.projectTableData[index] || task.project !== data.projectTableData[index].project
        );
        
        data.projectTableData.splice(index, 1);
        this.dataSubject.next(data);
        this.saveData(data);
        
        return true;
      })
    );
  }

  // 工作項 CRUD 操作
  createTask(task: Omit<Task, 'id'>): Observable<Task> {
    return this.data$.pipe(
      map(data => {
        if (!data) throw new Error('Data not loaded');
        
        const newId = Math.max(...data.memberTableData.map(t => t.id), 0) + 1;
        const newTask: Task = {
          ...task,
          id: newId
        };
        
        data.memberTableData.push(newTask);
        this.dataSubject.next(data);
        this.saveData(data);
        
        return newTask;
      })
    );
  }

  updateTask(id: number, updates: Partial<Task>): Observable<Task> {
    return this.data$.pipe(
      map(data => {
        if (!data) throw new Error('Data not loaded');
        
        const index = data.memberTableData.findIndex(t => t.id === id);
        if (index === -1) throw new Error('Task not found');
        
        data.memberTableData[index] = { ...data.memberTableData[index], ...updates };
        this.dataSubject.next(data);
        this.saveData(data);
        
        return data.memberTableData[index];
      })
    );
  }

  deleteTask(id: number): Observable<boolean> {
    return this.data$.pipe(
      map(data => {
        if (!data) throw new Error('Data not loaded');
        
        const index = data.memberTableData.findIndex(t => t.id === id);
        if (index === -1) return false;
        
        data.memberTableData.splice(index, 1);
        this.dataSubject.next(data);
        this.saveData(data);
        
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

  // 儲存資料到本地 (模擬)
  private saveData(data: ProjectData): void {
    // 在實際應用中，這裡會呼叫 API 儲存到後端
    // 目前只是更新記憶體中的資料
    console.log('Data saved:', data);
  }

  // 重新載入資料
  refreshData(): void {
    this.loadData();
  }
}