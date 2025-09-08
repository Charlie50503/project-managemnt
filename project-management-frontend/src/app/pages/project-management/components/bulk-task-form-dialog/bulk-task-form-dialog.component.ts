import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, provideNativeDateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Observable } from 'rxjs';
import { Task, TaskStatus, Priority, Complexity, Project } from '../../../../shared/models/project.model';
import { Member } from '../../../../shared/models/member.model';
import { ProjectCrudService } from '../../../../core/services/project-crud.service';
import { ErrorMessagePipe } from 'src/app/core/pipes/error-message.pipe';

export interface BulkTaskFormDialogData {
  projectName?: string;
}

interface TaskFormData {
  project: string;
  system: string;
  task: string;
  member: string;
  complexity: Complexity;
  priority: Priority;
  status: TaskStatus;
  startDate: string;
  endDate: string;
  actualEndDate: string;
}

@Component({
  selector: 'app-bulk-task-form-dialog',
  templateUrl: './bulk-task-form-dialog.component.html',
  styleUrls: ['./bulk-task-form-dialog.component.scss'],
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
    MatTableModule,
    MatTooltipModule,
    ErrorMessagePipe
  ],
  providers: [
    provideNativeDateAdapter(),
    { provide: MAT_DATE_LOCALE, useValue: 'zh-TW' }
  ]
})
export class BulkTaskFormDialogComponent implements OnInit {
  bulkTaskForm: FormGroup;
  members$: Observable<Member[]>;
  projects$: Observable<Project[]>;
  dataSource: any[] = [];

  displayedColumns: string[] = [
    'project', 'system', 'task', 'member', 'complexity',
    'priority', 'status', 'startDate', 'endDate', 'actions'
  ];

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
    private dialogRef: MatDialogRef<BulkTaskFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: BulkTaskFormDialogData,
    private projectCrudService: ProjectCrudService,
    private snackBar: MatSnackBar
  ) {
    this.members$ = this.projectCrudService.members$;
    this.projects$ = this.projectCrudService.projects$;
    this.bulkTaskForm = this.createForm();
  }

  ngOnInit(): void {
    // 初始化時新增一行
    this.addNewRow();

    // 如果有預設專案名稱，設定第一行的專案
    if (this.data.projectName) {
      const firstRow = this.getTasksFormArray().at(0) as FormGroup;
      firstRow.patchValue({ project: this.data.projectName });
      this.onProjectChange(0);
    }

    // 更新資料來源
    this.updateDataSource();
  }

  private createForm(): FormGroup {
    return this.fb.group({
      tasks: this.fb.array([])
    });
  }

  private createTaskFormGroup(): FormGroup {
    return this.fb.group({
      project: ['', Validators.required],
      system: [''],
      task: ['', [Validators.required, Validators.minLength(2)]],
      member: ['', Validators.required],
      complexity: ['中', Validators.required],
      priority: ['中', Validators.required],
      status: ['not-started', Validators.required],
      startDate: [''],
      endDate: [''],
      actualEndDate: ['']
    });
  }

  getTasksFormArray(): FormArray {
    return this.bulkTaskForm.get('tasks') as FormArray;
  }

  addNewRow(): void {
    const tasksArray = this.getTasksFormArray();
    tasksArray.push(this.createTaskFormGroup());
    this.updateDataSource();
  }

  copyRow(index: number): void {
    const tasksArray = this.getTasksFormArray();
    const sourceRow = tasksArray.at(index) as FormGroup;
    const copiedRow = this.createTaskFormGroup();

    // 複製所有欄位值，但清空任務名稱
    const sourceValue = sourceRow.value;
    copiedRow.patchValue({
      ...sourceValue,
      task: '', // 清空任務名稱讓使用者重新填寫
      status: 'not-started', // 重設為未開始
      actualEndDate: '' // 清空實際完成日期
    });

    tasksArray.insert(index + 1, copiedRow);
    this.updateDataSource();
  }

  deleteRow(index: number): void {
    const tasksArray = this.getTasksFormArray();
    if (tasksArray.length > 1) {
      tasksArray.removeAt(index);
      this.updateDataSource();
    } else {
      this.snackBar.open('至少需要保留一行', '關閉', { duration: 2000 });
    }
  }

  private updateDataSource(): void {
    this.dataSource = [...this.getTasksFormArray().controls];
  }

  onProjectChange(index: number): void {
    const taskForm = this.getTasksFormArray().at(index) as FormGroup;
    const selectedProject = taskForm.get('project')?.value;

    this.projects$.subscribe(projects => {
      const project = projects.find(p => p.project === selectedProject);
      if (project) {
        taskForm.patchValue({ system: project.system });
      }
    });
  }

  onStatusChange(index: number): void {
    const taskForm = this.getTasksFormArray().at(index) as FormGroup;
    const status = taskForm.get('status')?.value;

    if (status === 'completed') {
      taskForm.patchValue({ actualEndDate: new Date() });
    } else {
      taskForm.patchValue({ actualEndDate: null });
    }
  }

  onSubmit(): void {
    this.bulkTaskForm.markAllAsTouched();
    this.bulkTaskForm.updateValueAndValidity();

    if (this.bulkTaskForm.valid) {
      const tasksData = this.getTasksFormArray().value.map((task: any) => ({
        project: task.project,
        system: task.system,
        task: task.task,
        member: task.member,
        complexity: task.complexity,
        priority: task.priority,
        status: task.status,
        startDate: this.formatDate(task.startDate),
        endDate: this.formatDate(task.endDate),
        actualEndDate: task.actualEndDate ? this.formatDate(task.actualEndDate) : null
      }));

      this.dialogRef.close(tasksData);
    } else {
      this.snackBar.open('請檢查表單中的錯誤', '關閉', { duration: 3000 });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  private formatDate(date: Date | string): string {
    if (!date) return '';
    if (typeof date === 'string') return date;
    if (isNaN(date.getTime())) return '';
    return date.toISOString().split('T')[0];
  }

  getRowErrorMessage(index: number, fieldName: string): string {
    const taskForm = this.getTasksFormArray().at(index) as FormGroup;
    const field = taskForm.get(fieldName);

    if (field?.hasError('required')) {
      return `${this.getFieldLabel(fieldName)}為必填欄位`;
    }
    if (field?.hasError('minlength')) {
      return `${this.getFieldLabel(fieldName)}至少需要2個字元`;
    }
    return '';
  }

  private getFieldLabel(fieldName: string): string {
    const labels: { [key: string]: string } = {
      project: '所屬案件',
      task: '工作項名稱',
      member: '負責人員',
      complexity: '複雜度',
      priority: '優先級',
      status: '狀態'
    };
    return labels[fieldName] || fieldName;
  }

  isRowValid(index: number): boolean {
    const taskForm = this.getTasksFormArray().at(index) as FormGroup;
    return taskForm.valid;
  }

  getInvalidRowsCount(): number {
    const tasksArray = this.getTasksFormArray();
    let invalidCount = 0;
    for (let i = 0; i < tasksArray.length; i++) {
      if (!this.isRowValid(i)) {
        invalidCount++;
      }
    }
    return invalidCount;
  }
}