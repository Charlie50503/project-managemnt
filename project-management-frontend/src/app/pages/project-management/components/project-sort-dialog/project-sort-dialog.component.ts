import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { CdkDragDrop, moveItemInArray, DragDropModule } from '@angular/cdk/drag-drop';
import { Project } from '../../../../shared/models/project.model';

export interface ProjectSortDialogData {
  projects: Project[];
}

@Component({
  selector: 'app-project-sort-dialog',
  templateUrl: './project-sort-dialog.component.html',
  styleUrls: ['./project-sort-dialog.component.scss'],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    DragDropModule
  ]
})
export class ProjectSortDialogComponent implements OnInit {
  projects: Project[] = [];

  constructor(
    private dialogRef: MatDialogRef<ProjectSortDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ProjectSortDialogData
  ) {}

  ngOnInit(): void {
    // 複製專案陣列並按當前排序順序排列
    this.projects = [...this.data.projects].sort((a, b) => {
      const sortOrderA = a.sortOrder || 0;
      const sortOrderB = b.sortOrder || 0;
      
      if (sortOrderA !== sortOrderB) {
        return sortOrderA - sortOrderB;
      }
      
      return a.project.localeCompare(b.project, 'zh-TW');
    });
  }

  onDrop(event: CdkDragDrop<Project[]>): void {
    moveItemInArray(this.projects, event.previousIndex, event.currentIndex);
  }

  onSave(): void {
    // 更新排序順序
    const updatedProjects = this.projects.map((project, index) => ({
      ...project,
      sortOrder: index
    }));
    
    this.dialogRef.close(updatedProjects);
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  moveUp(index: number): void {
    if (index > 0) {
      moveItemInArray(this.projects, index, index - 1);
    }
  }

  moveDown(index: number): void {
    if (index < this.projects.length - 1) {
      moveItemInArray(this.projects, index, index + 1);
    }
  }
}