import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';

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
  private systemsSubject = new BehaviorSubject<System[]>(this.getInitialSystems());
  public systems$ = this.systemsSubject.asObservable();

  constructor() {}

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
    this.saveToLocalStorage(updatedSystems);

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
    this.saveToLocalStorage(updatedSystems);

    return of(updatedSystem).pipe(delay(500)); // 模擬 API 延遲
  }

  // 刪除系統
  deleteSystem(id: string): Observable<boolean> {
    const currentSystems = this.systemsSubject.value;
    const updatedSystems = currentSystems.filter(system => system.id !== id);
    
    this.systemsSubject.next(updatedSystems);
    this.saveToLocalStorage(updatedSystems);

    return of(true).pipe(delay(500)); // 模擬 API 延遲
  }

  // 刷新資料
  refreshData(): void {
    const savedSystems = this.loadFromLocalStorage();
    this.systemsSubject.next(savedSystems);
  }

  // 生成唯一 ID
  private generateId(): string {
    return 'sys_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }

  // 獲取初始系統資料
  private getInitialSystems(): System[] {
    const savedSystems = this.loadFromLocalStorage();
    if (savedSystems.length > 0) {
      return savedSystems;
    }

    // 預設系統資料
    const defaultSystems: System[] = [
      {
        id: 'sys_001',
        name: '人事管理系統',
        code: 'HRM',
        description: '員工資料、薪資、考勤管理系統',
        owner: '張三',
        createdAt: '2024-01-01T00:00:00.000Z',
        updatedAt: '2024-01-01T00:00:00.000Z'
      },
      {
        id: 'sys_002',
        name: '財務管理系統',
        code: 'FMS',
        description: '會計、預算、報表管理系統',
        owner: '李四',
        createdAt: '2024-01-01T00:00:00.000Z',
        updatedAt: '2024-01-01T00:00:00.000Z'
      },
      {
        id: 'sys_003',
        name: '客戶關係管理系統',
        code: 'CRM',
        description: '客戶資料、銷售、服務管理系統',
        owner: '王五',
        createdAt: '2024-01-01T00:00:00.000Z',
        updatedAt: '2024-01-01T00:00:00.000Z'
      },
      {
        id: 'sys_004',
        name: '庫存管理系統',
        code: 'IMS',
        description: '商品庫存、進出貨管理系統',
        owner: '趙六',
        createdAt: '2024-01-01T00:00:00.000Z',
        updatedAt: '2024-01-01T00:00:00.000Z'
      }
    ];

    this.saveToLocalStorage(defaultSystems);
    return defaultSystems;
  }

  // 儲存到 localStorage
  private saveToLocalStorage(systems: System[]): void {
    try {
      localStorage.setItem('project_management_systems', JSON.stringify(systems));
    } catch (error) {
      console.error('Error saving systems to localStorage:', error);
    }
  }

  // 從 localStorage 載入
  private loadFromLocalStorage(): System[] {
    try {
      const saved = localStorage.getItem('project_management_systems');
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error('Error loading systems from localStorage:', error);
      return [];
    }
  }
}