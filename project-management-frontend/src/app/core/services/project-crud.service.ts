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
  
  public data$ = this.dataSubject.asObservable();
  public members$ = this.membersSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadData();
    this.loadMembers();
  }

  private loadData(): void {
    // 直接從 JSON 檔案載入
    console.log('Loading project data from assets/data/project-data.json');
    this.http.get<ProjectData>('assets/data/project-data.json')
      .subscribe({
        next: (data) => {
          console.log('Loaded project data from JSON file:', data);
          this.dataSubject.next(data);
        },
        error: (error) => {
          console.error('Error loading project data from JSON file:', error);
          this.dataSubject.next(null);
        }
      });
  }

  private loadMembers(): void {
    this.http.get<Member[]>('assets/data/members.json')
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
        
        return data.memberTableData[index];
      })
    );
  }

  deleteTask(id: number): Observable<boolean> {
    const currentData = this.dataSubject.value;
    
    if (!currentData) {
      return of(false);
    }
    
    // 從 memberTableData 中找到並移除任務
    const taskIndex = currentData.memberTableData.findIndex(task => task.id === id);
    
    if (taskIndex !== -1) {
      // 移除任務
      currentData.memberTableData.splice(taskIndex, 1);
      
      // 更新資料
      this.dataSubject.next(currentData);
      
      return of(true).pipe(delay(300)); // 模擬 API 延遲
    }
    
    return of(false);
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