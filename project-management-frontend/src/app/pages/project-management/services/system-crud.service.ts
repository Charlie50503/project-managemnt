import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay, map, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

export interface System {
  id: string;
  name: string;
  code: string;
  description?: string;
  owner?: string;
  createdAt: string;
  updatedAt: string;
}

@Injectable({
  providedIn: 'root'
})
export class SystemCrudService {
  private systemsSubject = new BehaviorSubject<System[]>([]);
  public systems$ = this.systemsSubject.asObservable();
  private readonly API_BASE_URL = 'http://localhost:3000/api';
  private autoExportEnabled = false; // 控制是否自動匯出

  constructor(private http: HttpClient) {
    this.loadInitialData();
  }

  // 啟用/停用自動匯出
  setAutoExport(enabled: boolean): void {
    this.autoExportEnabled = enabled;
  }

  // 獲取所有系統
  getSystems(): Observable<System[]> {
    return this.systems$;
  }

  // 根據 ID 獲取系統
  getSystemById(id: string): Observable<System | undefined> {
    return this.http.get<System>(`${this.API_BASE_URL}/systems/${id}`).pipe(
      catchError(() => of(undefined))
    );
  }

  // 新增系統
  createSystem(systemData: Omit<System, 'id'>): Observable<System> {
    return this.http.post<System>(`${this.API_BASE_URL}/systems`, systemData).pipe(
      map(newSystem => {
        const currentSystems = this.systemsSubject.value;
        const updatedSystems = [...currentSystems, newSystem];
        this.systemsSubject.next(updatedSystems);
        return newSystem;
      }),
      catchError(error => {
        console.error('Error creating system:', error);
        throw error;
      })
    );
  }

  // 更新系統
  updateSystem(id: string, systemData: Partial<System>): Observable<System> {
    return this.http.put<System>(`${this.API_BASE_URL}/systems/${id}`, systemData).pipe(
      map(updatedSystem => {
        const currentSystems = this.systemsSubject.value;
        const systemIndex = currentSystems.findIndex(system => system.id === id);
        
        if (systemIndex !== -1) {
          const updatedSystems = [...currentSystems];
          updatedSystems[systemIndex] = updatedSystem;
          this.systemsSubject.next(updatedSystems);
        }
        
        return updatedSystem;
      }),
      catchError(error => {
        console.error('Error updating system:', error);
        throw error;
      })
    );
  }

  // 刪除系統
  deleteSystem(id: string): Observable<boolean> {
    return this.http.delete(`${this.API_BASE_URL}/systems/${id}`).pipe(
      map(() => {
        const currentSystems = this.systemsSubject.value;
        const updatedSystems = currentSystems.filter(system => system.id !== id);
        this.systemsSubject.next(updatedSystems);
        return true;
      }),
      catchError(error => {
        console.error('Error deleting system:', error);
        throw error;
      })
    );
  }

  // 刷新資料
  refreshData(): void {
    this.loadInitialData();
  }

  // 生成唯一 ID
  private generateId(): string {
    return 'sys_' + Date.now() + '_' + Math.random().toString(36).substring(2, 11);
  }

  // 載入初始資料
  private loadInitialData(): void {
    console.log('Loading systems from API');
    this.http.get<System[]>(`${this.API_BASE_URL}/systems`).pipe(
      catchError(error => {
        console.error('Error loading systems from API:', error);
        return of([]);
      })
    ).subscribe(systems => {
      console.log('Loaded systems from API:', systems);
      this.systemsSubject.next(systems);
    });
  }

  // 匯出資料到檔案 (供開發者手動更新 assets)
  exportToFile(): void {
    const systems = this.systemsSubject.value;
    const dataStr = JSON.stringify(systems, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'systems.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }


}