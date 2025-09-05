import { Injectable } from '@angular/core';
import { TaskStatus, ProjectStatus, Priority, Complexity } from '../models/project.model';

@Injectable({
  providedIn: 'root'
})
export class StatusHelperService {

  getStatusColor(status: TaskStatus | ProjectStatus): string {
    switch (status) {
      case 'not-started': return 'bg-gray-100 text-gray-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  }

  getStatusText(status: TaskStatus | ProjectStatus): string {
    switch (status) {
      case 'not-started': return '未開始';
      case 'in-progress': return '進行中';
      case 'completed': return '已完成';
      default: return '未知';
    }
  }

  getPriorityColor(priority: Priority): string {
    switch (priority) {
      case '高': return 'bg-red-100 text-red-800';
      case '中': return 'bg-yellow-100 text-yellow-800';
      case '低': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  }

  getComplexityColor(complexity: Complexity): string {
    switch (complexity) {
      case '高': return 'bg-purple-100 text-purple-800';
      case '中': return 'bg-blue-100 text-blue-800';
      case '低': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  }

  getProgressBarColor(progress: number, status: TaskStatus | ProjectStatus): string {
    if (progress === 100) return 'bg-green-500';
    if (status === 'not-started') return 'bg-gray-500';
    return 'bg-blue-500';
  }
}