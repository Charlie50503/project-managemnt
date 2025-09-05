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
  private readonly ASSETS_PATH = 'assets/data/systems.json';
  constructor(private http: HttpClient) {
    this.loadInitialData();
  }

  // 獲取所有系統
  getSystems(): Observable<System[]> {
    return this.systems$;
  }

  // 根據 ID 獲取系統
  getSystemById(id: string): Observable<System | undefined> {
    return this.systems$.pipe(
      map(systems => systems.find(system => system.id === id))
    );
  }

  // 新增系統
  createSystem(systemData: Omit<System, 'id'>): Observable<System> {
    const newSystem: System = {
      ...systemData,
      id: this.generateId()
    };

    const currentSystems = this.systemsSubject.value;
    const updatedSystems = [...currentSystems, newSystem];
    this.systemsSubject.next(updatedSystems);

    return of(newSystem).pipe(delay(500)); // 模擬 API 延遲
  }

  // 更新系統
  updateSystem(id: string, systemData: Partial<System>): Observable<System> {
    const currentSystems = this.systemsSubject.value;
    const systemIndex = currentSystems.findIndex(system => system.id === id);

    if (systemIndex === -1) {
      throw new Error('System not found');
    }

    const updatedSystem = {
      ...currentSystems[systemIndex],
      ...systemData,
      id, // 確保 ID 不被覆蓋
      updatedAt: new Date().toISOString()
    };

    const updatedSystems = [...currentSystems];
    updatedSystems[systemIndex] = updatedSystem;

    this.systemsSubject.next(updatedSystems);

    return of(updatedSystem).pipe(delay(500)); // 模擬 API 延遲
  }

  // 刪除系統
  deleteSystem(id: string): Observable<boolean> {
    const currentSystems = this.systemsSubject.value;
    const updatedSystems = currentSystems.filter(system => system.id !== id);

    this.systemsSubject.next(updatedSystems);

    return of(true).pipe(delay(500)); // 模擬 API 延遲
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
    // 直接從 assets 載入
    console.log('Loading systems from assets/data/systems.json');
    this.http.get<System[]>(this.ASSETS_PATH).pipe(
      catchError(() => {
        // 如果 assets 檔案載入失敗，使用空陣列
        console.log('No systems.json found, starting with empty array');
        return of([]);
      })
    ).subscribe(systems => {
      console.log('Loaded systems from JSON file:', systems);
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