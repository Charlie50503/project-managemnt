export type TaskStatus = 'not-started' | 'in-progress' | 'completed';
export type ProjectStatus = 'not-started' | 'in-progress' | 'completed' | 'pending' | 'on-hold' | 'cancelled';
export type Priority = '高' | '中' | '低';
export type Complexity = '高' | '中' | '低';

export interface Task {
  id: number;
  member: string;
  project: string;
  system: string;
  task: string;
  complexity: Complexity;
  priority: Priority;
  status: TaskStatus;
  startDate: string;
  endDate: string;
  actualEndDate: string | null;
}

export interface Project {
  id: number;
  projectNumber?: string;
  projectSource?: string;
  project: string;
  system: string;
  totalTasks: number;
  completedTasks: number;
  inProgressTasks: number;
  notStartedTasks: number;
  overallProgress: number;
  status: ProjectStatus;
  projectManager: string;
  startDate: string;
  expectedEndDate: string;
  demo?: string;
  sortOrder: number;
}

export interface GroupedMemberData {
  member: string;
  project: string;
  system: string;
  workload: number;
  tasks: Task[];
  overallProgress: number;
  overallStatus: TaskStatus;
  demos: string[];
  screenshots: number;
}

export interface GroupedProjectData {
  project: string;
  system: string;
  status: ProjectStatus;
  startDate: string;
  expectedEndDate: string;
  currentMilestone: string;
  nextMilestone: string;
  demo: string | null;
  risks: string[];
  members: { [key: string]: MemberInProject };
  membersList: MemberInProject[];
  totalTasks: number;
  completedTasks: number;
  inProgressTasks: number;
  notStartedTasks: number;
  overallProgress: number;
  sortOrder?: number;
}

export interface MemberInProject {
  member: string;
  workload: number;
  tasks: Task[];
}

export interface ProjectData {
  memberTableData: Task[];
  projectTableData: Project[];
}