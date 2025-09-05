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
import { MatChipsModule } from '@angular/material/chips';
import { Observable } from 'rxjs';
import { Project, ProjectStatus } from '../../../../shared/models/project.model';
import { Member } from '../../../../shared/models/member.model';
import { ProjectCrudService } from '../../../../core/services/project-crud.service';

export interface ProjectFormDialogData {
  project?: Project;
  isEdit: boolean;
}

@Component({
  selector: 'app-project-form-dialog',
  templateUrl: './project-form-dialog.component.html',
  styleUrls: ['./project-form-dialog.component.scss'],
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
    MatChipsModule
  ]
})
export class ProjectFormDialogComponent implements OnInit {
  projectForm: FormGroup;
  members$: Observable<Member[]>;
  risks: string[] = [];
  
  statusOptions: { value: ProjectStatus; label: string }[] = [
    { value: 'normal', label: '正常' },
    { value: 'delayed', label: '延遲' },
    { value: 'risk', label: '風險' }
  ];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ProjectFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ProjectFormDialogData,
    private projectCrudService: ProjectCrudService
  ) {
    this.members$ = this.projectCrudService.members$;
    this.projectForm = this.createForm();
  }

  ngOnInit(): void {
    if (this.data.isEdit && this.data.project) {
      this.populateForm(this.data.project);
    }
  }

  private createForm(): FormGroup {
    return this.fb.group({
      project: ['', [Validators.required, Validators.minLength(2)]],
      system: ['', [Validators.required, Validators.minLength(2)]],
      projectManager: ['', Validators.required],
      startDate: ['', Validators.required],
      expectedEndDate: ['', Validators.required],
      currentMilestone: [''],
      nextMilestone: [''],
      demo: [''],
      status: ['normal', Validators.required],
      newRisk: ['']
    }, { validators: this.dateValidator });
  }

  private dateValidator(form: FormGroup) {
    const startDate = form.get('startDate')?.value;
    const endDate = form.get('expectedEndDate')?.value;
    
    if (startDate && endDate && new Date(startDate) >= new Date(endDate)) {
      return { dateInvalid: true };
    }
    return null;
  }

  private populateForm(project: Project): void {
    this.risks = [...project.risks];
    this.projectForm.patchValue({
      project: project.project,
      system: project.system,
      projectManager: project.projectManager,
      startDate: new Date(project.startDate),
      expectedEndDate: new Date(project.expectedEndDate),
      currentMilestone: project.currentMilestone,
      nextMilestone: project.nextMilestone,
      demo: project.demo,
      status: project.status
    });
  }

  addRisk(): void {
    const newRisk = this.projectForm.get('newRisk')?.value?.trim();
    if (newRisk && !this.risks.includes(newRisk)) {
      this.risks.push(newRisk);
      this.projectForm.get('newRisk')?.setValue('');
    }
  }

  removeRisk(index: number): void {
    this.risks.splice(index, 1);
  }

  onSubmit(): void {
    if (this.projectForm.valid) {
      const formValue = this.projectForm.value;
      const projectData: Omit<Project, 'id'> = {
        project: formValue.project,
        system: formValue.system,
        projectManager: formValue.projectManager,
        startDate: this.formatDate(formValue.startDate),
        expectedEndDate: this.formatDate(formValue.expectedEndDate),
        currentMilestone: formValue.currentMilestone || '專案啟動',
        nextMilestone: formValue.nextMilestone || '待規劃',
        demo: formValue.demo || null,
        status: formValue.status,
        risks: [...this.risks],
        totalTasks: this.data.project?.totalTasks || 0,
        completedTasks: this.data.project?.completedTasks || 0,
        inProgressTasks: this.data.project?.inProgressTasks || 0,
        delayedTasks: this.data.project?.delayedTasks || 0,
        overallProgress: this.data.project?.overallProgress || 0
      };

      this.dialogRef.close(projectData);
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
    const field = this.projectForm.get(fieldName);
    if (field?.hasError('required')) {
      return `${this.getFieldLabel(fieldName)}為必填欄位`;
    }
    if (field?.hasError('minlength')) {
      return `${this.getFieldLabel(fieldName)}至少需要2個字元`;
    }
    if (this.projectForm.hasError('dateInvalid')) {
      return '結束日期不能早於或等於開始日期';
    }
    return '';
  }

  private getFieldLabel(fieldName: string): string {
    const labels: { [key: string]: string } = {
      project: '案件名稱',
      system: '系統名稱',
      projectManager: '專案經理',
      startDate: '開始日期',
      expectedEndDate: '預計結束日期'
    };
    return labels[fieldName] || fieldName;
  }
}