import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ErrorMessagePipe } from 'src/app/core/pipes/error-message.pipe';

export interface SystemFormDialogData {
  system?: any;
  isEdit?: boolean;
}

@Component({
  selector: 'app-system-form-dialog',
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
    <h2 mat-dialog-title class="flex items-center gap-2">
      <mat-icon>computer</mat-icon>
      {{ data.isEdit ? '編輯系統' : '新增系統' }}
    </h2>

    <form [formGroup]="systemForm" (ngSubmit)="onSubmit()">
      <mat-dialog-content class="space-y-4">
        <!-- 系統名稱 -->
        <mat-form-field appearance="outline" class="w-full">
          <mat-label>系統名稱 *</mat-label>
          <input matInput formControlName="name" placeholder="請輸入系統名稱">
          <mat-error>{{ systemForm.get('name')!.errors | errorMessage }}</mat-error>
        </mat-form-field>

        <!-- 系統代碼 -->
        <mat-form-field appearance="outline" class="w-full">
          <mat-label>系統代碼 *</mat-label>
          <input matInput formControlName="code" placeholder="請輸入系統代碼">
          <mat-error>{{ systemForm.get('code')!.errors | errorMessage }}</mat-error>
        </mat-form-field>

        <!-- 系統描述 -->
        <mat-form-field appearance="outline" class="w-full">
          <mat-label>系統描述</mat-label>
          <textarea matInput formControlName="description" rows="3" placeholder="請輸入系統描述"></textarea>
        </mat-form-field>

        <!-- 負責人 -->
        <mat-form-field appearance="outline" class="w-full">
          <mat-label>負責人</mat-label>
          <input matInput formControlName="owner" placeholder="請輸入負責人">
        </mat-form-field>
      </mat-dialog-content>

      <mat-dialog-actions align="end" class="gap-2">
        <button mat-button type="button" (click)="onCancel()">
          取消
        </button>
        <button 
          mat-raised-button 
          color="primary" 
          type="submit"
          [disabled]="systemForm.invalid">
          {{ data.isEdit ? '更新' : '新增' }}
        </button>
      </mat-dialog-actions>
    </form>
  `,
  styles: [`
    mat-dialog-content {
      min-width: 400px;
      max-width: 600px;
    }
  `]
})
export class SystemFormDialogComponent implements OnInit {
  systemForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<SystemFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SystemFormDialogData
  ) {
    this.systemForm = this.createForm();
  }

  ngOnInit(): void {
    if (this.data.isEdit && this.data.system) {
      this.systemForm.patchValue({
        name: this.data.system.name,
        code: this.data.system.code,
        description: this.data.system.description || '',
        owner: this.data.system.owner || ''
      });
    }
  }

  private createForm(): FormGroup {
    return this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      code: ['', [Validators.required, Validators.minLength(2)]],
      description: [''],
      owner: ['']
    });
  }

  getErrorMessage(field: string): string {
    const control = this.systemForm.get(field);
    if (control?.hasError('required')) {
      return `${this.getFieldName(field)}為必填項目`;
    }
    if (control?.hasError('minlength')) {
      return `${this.getFieldName(field)}至少需要2個字元`;
    }
    return '';
  }

  private getFieldName(field: string): string {
    const fieldNames: { [key: string]: string } = {
      name: '系統名稱',
      code: '系統代碼',
      description: '系統描述',
      owner: '負責人'
    };
    return fieldNames[field] || field;
  }

  onSubmit(): void {
    this.systemForm.markAllAsTouched();
    this.systemForm.updateValueAndValidity();
    if (this.systemForm.valid) {
      const formValue = this.systemForm.value;
      const systemData = {
        id: this.data.system?.id,
        name: formValue.name,
        code: formValue.code,
        description: formValue.description,
        owner: formValue.owner,
        createdAt: this.data.system?.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      this.dialogRef.close(systemData);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}