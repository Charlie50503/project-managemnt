import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of, delay } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Member } from '../../../shared/models/member.model';

@Injectable({
  providedIn: 'root'
})
export class MemberCrudService {
  private membersSubject = new BehaviorSubject<Member[]>([]);
  public members$ = this.membersSubject.asObservable();
  private readonly API_BASE_URL = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {
    this.loadMembers();
  }

  private loadMembers(): void {
    console.log('Loading members from API');
    this.http.get<Member[]>(`${this.API_BASE_URL}/members`)
      .subscribe({
        next: (members) => {
          console.log('Loaded members from API:', members);
          this.membersSubject.next(members);
        },
        error: (error) => {
          console.error('Error loading members from API:', error);
          this.membersSubject.next([]);
        }
      });
  }

  // 取得所有人員
  getMembers(): Observable<Member[]> {
    return this.members$;
  }

  // 新增人員
  createMember(member: Omit<Member, 'id'>): Observable<Member> {
    return this.http.post<Member>(`${this.API_BASE_URL}/members`, member).pipe(
      map(newMember => {
        const currentMembers = this.membersSubject.value;
        const updatedMembers = [...currentMembers, newMember];
        this.membersSubject.next(updatedMembers);
        return newMember;
      }),
      catchError(error => {
        console.error('Error creating member:', error);
        throw error;
      })
    );
  }

  // 更新人員
  updateMember(id: number, updates: Partial<Member>): Observable<Member> {
    return this.http.put<Member>(`${this.API_BASE_URL}/members/${id}`, updates).pipe(
      map(updatedMember => {
        const currentMembers = this.membersSubject.value;
        const index = currentMembers.findIndex(m => m.id === id);
        
        if (index !== -1) {
          const updatedMembers = [...currentMembers];
          updatedMembers[index] = updatedMember;
          this.membersSubject.next(updatedMembers);
        }
        
        return updatedMember;
      }),
      catchError(error => {
        console.error('Error updating member:', error);
        throw error;
      })
    );
  }

  // 刪除人員
  deleteMember(id: number): Observable<boolean> {
    return this.http.delete(`${this.API_BASE_URL}/members/${id}`).pipe(
      map(() => {
        const currentMembers = this.membersSubject.value;
        const updatedMembers = currentMembers.filter(m => m.id !== id);
        this.membersSubject.next(updatedMembers);
        return true;
      }),
      catchError(error => {
        console.error('Error deleting member:', error);
        throw error;
      })
    );
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

  // 重新載入資料
  reloadData(): void {
    this.loadMembers();
  }
}