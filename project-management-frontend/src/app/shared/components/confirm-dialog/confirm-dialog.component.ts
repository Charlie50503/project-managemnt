import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

export interface ConfirmDialogData {
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  type?: 'warning' | 'danger' | 'info';
}

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule
  ],
  template: `
    <div class="p-6">
      <div class="flex items-center gap-3 mb-4">
        <mat-icon 
          [ngClass]="{
            'text-yellow-500': data.type === 'warning',
            'text-red-500': data.type === 'danger',
            'text-blue-500': data.type === 'info' || !data.type
          }"
          class="text-2xl">
          {{ getIcon() }}
        </mat-icon>
        <h2 class="text-lg font-semibold text-gray-900">{{ data.title }}</h2>
      </div>
      
      <p class="text-gray-600 mb-6 leading-relaxed">{{ data.message }}</p>
      
      <div class="flex justify-end gap-3">
        <button 
          mat-button 
          (click)="onCancel()"
          class="text-gray-600">
          {{ data.cancelText || '取消' }}
        </button>
        <button 
          mat-raised-button 
          [color]="getButtonColor()"
          (click)="onConfirm()">
          {{ data.confirmText || '確認' }}
        </button>
      </div>
    </div>
  `,
  styles: [`
    .mat-mdc-dialog-container {
      border-radius: 8px;
    }
  `]
})
export class ConfirmDialogComponent {
  constructor(
    private dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogData
  ) { }

  getIcon(): string {
    switch (this.data.type) {
      case 'warning':
        return 'warning';
      case 'danger':
        return 'error';
      case 'info':
      default:
        return 'info';
    }
  }

  getButtonColor(): string {
    switch (this.data.type) {
      case 'danger':
        return 'warn';
      case 'warning':
        return 'accent';
      case 'info':
      default:
        return 'primary';
    }
  }

  onConfirm(): void {
    this.dialogRef.close(true);
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}