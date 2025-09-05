import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, map, of, delay } from 'rxjs';
import { Member } from '../../../shared/models/member.model';

@Injectable({
  providedIn: 'root'
})
export class MemberCrudService {
  private membersSubject = new BehaviorSubject<Member[]>([]);
  public members$ = this.membersSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadMembers();
  }

  private loadMembers(): void {
    // 先嘗試從 localStorage 載入資料
    const savedMembers = localStorage.getItem('membersData');
    if (savedMembers) {
      try {
        const members = JSON.parse(savedMembers);
        this.membersSubject.next(members);
        return;
      } catch (error) {
        console.error('Error parsing saved members data:', error);
      }
    }
    
    // 如果沒有儲存的資料，則從 JSON 檔案載入
    this.http.get<Member[]>('/assets/data/members.json')
      .subscribe(members => {
        this.membersSubject.next(members);
        this.saveMembers(members);
      });
  }

  // 取得所有人員
  getMembers(): Observable<Member[]> {
    return this.members$;
  }

  // 新增人員
  createMember(member: Omit<Member, 'id'>): Observable<Member> {
    const currentMembers = this.membersSubject.value;
    const newId = Math.max(...currentMembers.map(m => m.id), 0) + 1;
    const newMember: Member = { ...member, id: newId };
    
    const updatedMembers = [...currentMembers, newMember];
    this.membersSubject.next(updatedMembers);
    this.saveMembers(updatedMembers);
    
    return of(newMember).pipe(delay(300));
  }

  // 更新人員
  updateMember(id: number, updates: Partial<Member>): Observable<Member> {
    const currentMembers = this.membersSubject.value;
    const index = currentMembers.findIndex(m => m.id === id);
    
    if (index === -1) {
      throw new Error('Member not found');
    }
    
    const updatedMember = { ...currentMembers[index], ...updates };
    const updatedMembers = [...currentMembers];
    updatedMembers[index] = updatedMember;
    
    this.membersSubject.next(updatedMembers);
    this.saveMembers(updatedMembers);
    
    return of(updatedMember).pipe(delay(300));
  }

  // 刪除人員
  deleteMember(id: number): Observable<boolean> {
    const currentMembers = this.membersSubject.value;
    const updatedMembers = currentMembers.filter(m => m.id !== id);
    
    if (updatedMembers.length === currentMembers.length) {
      return of(false);
    }
    
    this.membersSubject.next(updatedMembers);
    this.saveMembers(updatedMembers);
    
    return of(true).pipe(delay(300));
  }

  // 儲存人員資料到 localStorage
  private saveMembers(members: Member[]): void {
    try {
      localStorage.setItem('membersData', JSON.stringify(members));
      console.log('Members data saved to localStorage:', members);
    } catch (error) {
      console.error('Error saving members data to localStorage:', error);
    }
  }

  // 匯出資料到檔案 (供開發者手動更新 assets)
  exportToFile(): void {
    const members = this.membersSubject.value;
    const dataStr = JSON.stringify(members, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = 'members.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
}