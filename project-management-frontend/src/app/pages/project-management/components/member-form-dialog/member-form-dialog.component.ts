import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Member } from '../../../../shared/models/member.model';
import { ErrorMessagePipe } from 'src/app/core/pipes/error-message.pipe';

export interface MemberDialogData {
  member?: Member;
  isEdit: boolean;
}

@Component({
  selector: 'app-member-form-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    ErrorMessagePipe
  ],
  template: `
    <div class="p-6">
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-xl font-semibold text-gray-900">
          {{ data.isEdit ? '編輯人員' : '新增人員' }}
        </h2>
        <button mat-icon-button (click)="onCancel()" class="text-gray-400 hover:text-gray-600">
          <mat-icon>close</mat-icon>
        </button>
      </div>

      <form [formGroup]="memberForm" (ngSubmit)="onSubmit()" class="space-y-4">
        <!-- 姓名 -->
        <mat-form-field appearance="outline" class="w-full">
          <mat-label>姓名</mat-label>
          <input matInput formControlName="name" placeholder="請輸入姓名">
          <mat-error>{{ memberForm.get('name')!.errors | errorMessage }}</mat-error>
        </mat-form-field>

        <!-- 員編 -->
        <mat-form-field appearance="outline" class="w-full">
          <mat-label>員編</mat-label>
          <input matInput formControlName="employeeId" placeholder="請輸入員編">
          <mat-error>{{ memberForm.get('employeeId')!.errors | errorMessage }}</mat-error>
        </mat-form-field>

        <!-- Email -->
        <mat-form-field appearance="outline" class="w-full">
          <mat-label>Email</mat-label>
          <input matInput formControlName="email" type="email" placeholder="請輸入 Email">
          <mat-error>{{ memberForm.get('email')!.errors | errorMessage }}</mat-error>
        </mat-form-field>

        <!-- 部門名稱 -->
        <mat-form-field appearance="outline" class="w-full">
          <mat-label>部門名稱</mat-label>
          <input matInput formControlName="department" placeholder="請輸入部門名稱">
          <mat-error>{{ memberForm.get('department')!.errors | errorMessage }}</mat-error>
        </mat-form-field>

        <!-- 部門代號 -->
        <mat-form-field appearance="outline" class="w-full">
          <mat-label>部門代號</mat-label>
          <input matInput formControlName="departmentCode" placeholder="請輸入部門代號">
          <mat-error>{{ memberForm.get('departmentCode')!.errors | errorMessage }}</mat-error>
        </mat-form-field>

        <!-- 科組名稱 -->
        <mat-form-field appearance="outline" class="w-full">
          <mat-label>科組名稱</mat-label>
          <input matInput formControlName="section" placeholder="請輸入科組名稱">
          <mat-error>{{ memberForm.get('section')!.errors | errorMessage }}</mat-error>
        </mat-form-field>

        <!-- 科組代號 -->
        <mat-form-field appearance="outline" class="w-full">
          <mat-label>科組代號</mat-label>
          <input matInput formControlName="sectionCode" placeholder="請輸入科組代號">
          <mat-error>{{ memberForm.get('sectionCode')!.errors | errorMessage }}</mat-error>
        </mat-form-field>

        <!-- 按鈕區域 -->
        <div class="flex justify-end gap-3 pt-4">
          <button type="button" mat-button (click)="onCancel()" class="text-gray-600">
            取消
          </button>
          <button 
            type="submit" 
            mat-raised-button 
            color="primary"
            [disabled]="memberForm.invalid"
            class="px-6">
            {{ data.isEdit ? '更新' : '新增' }}
          </button>
        </div>
      </form>
    </div>
  `
})
export class MemberFormDialogComponent {
  memberForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<MemberFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: MemberDialogData
  ) {
    this.memberForm = this.fb.group({
      name: [data.member?.name || '', [Validators.required]],
      employeeId: [data.member?.employeeId || '', [Validators.required]],
      email: [data.member?.email || '', [Validators.required, Validators.email]],
      department: [data.member?.department || '', [Validators.required]],
      departmentCode: [data.member?.departmentCode || '', [Validators.required]],
      section: [data.member?.section || '', [Validators.required]],
      sectionCode: [data.member?.sectionCode || '', [Validators.required]]
    });
  }

  onSubmit(): void {
    this.memberForm.markAllAsTouched();
    this.memberForm.updateValueAndValidity();
    if (this.memberForm.valid) {
      this.dialogRef.close(this.memberForm.value);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}