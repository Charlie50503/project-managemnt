import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { Observable } from 'rxjs';
import { Task, TaskStatus, Priority, Complexity, Project } from '../../../../shared/models/project.model';
import { Member } from '../../../../shared/models/member.model';
import { ProjectCrudService } from '../../../../core/services/project-crud.service';

export interface TaskFormDialogData {
  task?: Task;
  isEdit: boolean;
  projectName?: string;
}

@Component({
  selector: 'app-task-form-dialog',
  templateUrl: './task-form-dialog.component.html',
  styleUrls: ['./task-form-dialog.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatIconModule,

  ]
})
export class TaskFormDialogComponent implements OnInit {
  taskForm: FormGroup;
  members$: Observable<Member[]>;
  projects$: Observable<Project[]>;
  screenshots: string[] = [];
  
  statusOptions: { value: TaskStatus; label: string }[] = [
    { value: 'not-started', label: '未開始' },
    { value: 'in-progress', label: '進行中' },
    { value: 'completed', label: '已完成' }
  ];

  priorityOptions: { value: Priority; label: string }[] = [
    { value: '高', label: '高' },
    { value: '中', label: '中' },
    { value: '低', label: '低' }
  ];

  complexityOptions: { value: Complexity; label: string }[] = [
    { value: '高', label: '高' },
    { value: '中', label: '中' },
    { value: '低', label: '低' }
  ];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<TaskFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TaskFormDialogData,
    private projectCrudService: ProjectCrudService
  ) {
    this.members$ = this.projectCrudService.members$;
    this.projects$ = this.projectCrudService.getProjects();
    this.taskForm = this.createForm();
  }

  ngOnInit(): void {
    if (this.data.isEdit && this.data.task) {
      this.populateForm(this.data.task);
    } else if (this.data.projectName) {
      this.taskForm.patchValue({ project: this.data.projectName });
    }
  }

  private createForm(): FormGroup {
    return this.fb.group({
      project: ['', Validators.required],
      system: [''],
      task: ['', [Validators.required, Validators.minLength(2)]],
      member: ['', Validators.required],
      complexity: ['中', Validators.required],
      priority: ['中', Validators.required],
      status: ['not-started', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      actualEndDate: ['']
    }, { validators: this.dateValidator });
  }

  private dateValidator(form: FormGroup) {
    const startDate = form.get('startDate')?.value;
    const endDate = form.get('endDate')?.value;
    
    if (startDate && endDate && new Date(startDate) >= new Date(endDate)) {
      return { dateInvalid: true };
    }
    return null;
  }

  private populateForm(task: Task): void {
    this.taskForm.patchValue({
      project: task.project,
      system: task.system,
      task: task.task,
      member: task.member,
      complexity: task.complexity,
      priority: task.priority,
      status: task.status,
      startDate: new Date(task.startDate),
      endDate: new Date(task.endDate),
      actualEndDate: task.actualEndDate ? new Date(task.actualEndDate) : null
    });
  }

  onProjectChange(): void {
    const selectedProject = this.taskForm.get('project')?.value;
    this.projects$.subscribe(projects => {
      const project = projects.find(p => p.project === selectedProject);
      if (project) {
        this.taskForm.patchValue({ system: project.system });
      }
    });
  }

  onStatusChange(): void {
    const status = this.taskForm.get('status')?.value;
    if (status === 'completed') {
      this.taskForm.patchValue({ actualEndDate: new Date() });
    } else {
      this.taskForm.patchValue({ actualEndDate: null });
    }
  }

  onSubmit(): void {
    if (this.taskForm.valid) {
      const formValue = this.taskForm.value;
      const taskData: Omit<Task, 'id'> = {
        project: formValue.project,
        system: formValue.system,
        task: formValue.task,
        member: formValue.member,
        complexity: formValue.complexity,
        priority: formValue.priority,
        status: formValue.status,
        startDate: this.formatDate(formValue.startDate),
        endDate: this.formatDate(formValue.endDate),
        actualEndDate: formValue.actualEndDate ? this.formatDate(formValue.actualEndDate) : null
      };

      this.dialogRef.close(taskData);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  private formatDate(date: Date): string {
    if (!date) return '';
    return date.toISOString().split('T')[0];
  }



  getErrorMessage(fieldName: string): string {
    const field = this.taskForm.get(fieldName);
    if (field?.hasError('required')) {
      return `${this.getFieldLabel(fieldName)}為必填欄位`;
    }
    if (field?.hasError('minlength')) {
      return `${this.getFieldLabel(fieldName)}至少需要2個字元`;
    }
    if (field?.hasError('min') || field?.hasError('max')) {
      return `${this.getFieldLabel(fieldName)}數值範圍不正確`;
    }
    if (this.taskForm.hasError('dateInvalid')) {
      return '結束日期不能早於或等於開始日期';
    }
    return '';
  }

  private getFieldLabel(fieldName: string): string {
    const labels: { [key: string]: string } = {
      project: '所屬案件',
      task: '工作項名稱',
      member: '負責人員',
      startDate: '開始日期',
      endDate: '預計結束日期'
    };
    return labels[fieldName] || fieldName;
  }
}