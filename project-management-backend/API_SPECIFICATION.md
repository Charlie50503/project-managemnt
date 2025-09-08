# Project Management API 規格文件

## 資料結構分析

### 1. System (系統)
```typescript
interface System {
  id: string;           // 系統唯一識別碼 (格式: sys_timestamp_random)
  name: string;         // 系統名稱
  code: string;         // 系統代碼
  description?: string; // 系統描述 (可選)
  owner?: string;       // 系統負責人 (可選)
  createdAt: string;    // 建立時間 (ISO 字串)
  updatedAt: string;    // 更新時間 (ISO 字串)
}
```

### 2. Member (人員)
```typescript
interface Member {
  id: number;           // 人員唯一識別碼
  name: string;         // 姓名
  employeeId: string;   // 員工編號
  email: string;        // 電子郵件
  department: string;   // 部門名稱
  departmentCode: string; // 部門代碼
  section: string;      // 科別名稱
  sectionCode: string;  // 科別代碼
}
```

### 3. Project (專案)
```typescript
interface Project {
  id: number;              // 專案唯一識別碼
  projectNumber?: string;  // 專案編號 (可選)
  projectSource?: string;  // 專案來源 (可選)
  project: string;         // 專案名稱
  system: string;          // 所屬系統
  totalTasks: number;      // 總任務數
  completedTasks: number;  // 已完成任務數
  inProgressTasks: number; // 進行中任務數
  notStartedTasks: number; // 未開始任務數
  overallProgress: number; // 整體進度 (百分比)
  status: ProjectStatus;   // 專案狀態
  projectManager: string;  // PM
  startDate: string;       // 開始日期
  expectedEndDate: string; // 預期結束日期
  demo?: string;          // 展示連結 (可選)
}
```

### 4. Task (任務)
```typescript
interface Task {
  id: number;              // 任務唯一識別碼
  member: string;          // 負責人員
  project: string;         // 所屬專案
  system: string;          // 所屬系統
  task: string;           // 任務名稱
  complexity: Complexity;  // 複雜度 ('高' | '中' | '低')
  priority: Priority;      // 優先級 ('高' | '中' | '低')
  status: TaskStatus;      // 任務狀態 ('not-started' | 'in-progress' | 'completed')
  startDate: string;       // 開始日期
  endDate: string;         // 預期結束日期
  actualEndDate: string | null; // 實際結束日期 (可為 null)
}
```

## 前端操作行為分析

### SystemCrudService 操作
1. **getSystems()** - 取得所有系統列表
2. **getSystemById(id)** - 根據 ID 取得特定系統
3. **createSystem(systemData)** - 新增系統
4. **updateSystem(id, systemData)** - 更新系統
5. **deleteSystem(id)** - 刪除系統
6. **refreshData()** - 重新載入資料
7. **exportToFile()** - 匯出資料到檔案
8. **setAutoExport(enabled)** - 設定自動匯出

### MemberCrudService 操作
1. **getMembers()** - 取得所有人員列表
2. **createMember(member)** - 新增人員
3. **updateMember(id, updates)** - 更新人員
4. **deleteMember(id)** - 刪除人員
5. **exportToFile()** - 匯出資料到檔案
6. **reloadData()** - 重新載入資料

### ProjectCrudService 操作
1. **getProjects()** - 取得所有專案列表
2. **getTasks()** - 取得所有任務列表
3. **createProject(project)** - 新增專案
4. **updateProject(id, updates)** - 更新專案
5. **deleteProject(id)** - 刪除專案 (同時刪除相關任務)
6. **createTask(task)** - 新增任務
7. **updateTask(id, updates)** - 更新任務
8. **deleteTask(id)** - 刪除任務
9. **getTasksByProject(projectName)** - 取得特定專案的任務
10. **refreshData()** - 重新載入資料
11. **exportToFile()** - 匯出資料到檔案

## API 端點設計

### Systems API
- `GET /api/systems` - 取得所有系統
- `GET /api/systems/:id` - 取得特定系統
- `POST /api/systems` - 新增系統
- `PUT /api/systems/:id` - 更新系統
- `DELETE /api/systems/:id` - 刪除系統

### Members API
- `GET /api/members` - 取得所有人員
- `GET /api/members/:id` - 取得特定人員
- `POST /api/members` - 新增人員
- `PUT /api/members/:id` - 更新人員
- `DELETE /api/members/:id` - 刪除人員

### Projects API
- `GET /api/projects` - 取得所有專案
- `GET /api/projects/:id` - 取得特定專案
- `POST /api/projects` - 新增專案
- `PUT /api/projects/:id` - 更新專案
- `DELETE /api/projects/:id` - 刪除專案

### Tasks API
- `GET /api/tasks` - 取得所有任務
- `GET /api/tasks/:id` - 取得特定任務
- `GET /api/tasks/project/:projectName` - 取得特定專案的任務
- `POST /api/tasks` - 新增任務
- `PUT /api/tasks/:id` - 更新任務
- `DELETE /api/tasks/:id` - 刪除任務

## 資料庫設計 (SQLite)

### systems 表
```sql
CREATE TABLE systems (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  code TEXT NOT NULL UNIQUE,
  description TEXT,
  owner TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### members 表
```sql
CREATE TABLE members (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  employee_id TEXT NOT NULL UNIQUE,
  email TEXT NOT NULL UNIQUE,
  department TEXT NOT NULL,
  department_code TEXT NOT NULL,
  section TEXT NOT NULL,
  section_code TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### projects 表
```sql
CREATE TABLE projects (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  project_number TEXT,
  project_source TEXT,
  project TEXT NOT NULL,
  system TEXT NOT NULL,
  total_tasks INTEGER DEFAULT 0,
  completed_tasks INTEGER DEFAULT 0,
  in_progress_tasks INTEGER DEFAULT 0,
  not_started_tasks INTEGER DEFAULT 0,
  overall_progress REAL DEFAULT 0,
  status TEXT CHECK(status IN ('not-started', 'in-progress', 'completed')) DEFAULT 'not-started',
  project_manager TEXT NOT NULL,
  start_date TEXT NOT NULL,
  expected_end_date TEXT NOT NULL,
  demo TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### tasks 表
```sql
CREATE TABLE tasks (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  member TEXT NOT NULL,
  project TEXT NOT NULL,
  system TEXT NOT NULL,
  task TEXT NOT NULL,
  complexity TEXT CHECK(complexity IN ('高', '中', '低')) NOT NULL,
  priority TEXT CHECK(priority IN ('高', '中', '低')) NOT NULL,
  status TEXT CHECK(status IN ('not-started', 'in-progress', 'completed')) DEFAULT 'not-started',
  start_date TEXT NOT NULL,
  end_date TEXT NOT NULL,
  actual_end_date TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

## 技術規格
- **後端框架**: Node.js + Express
- **資料庫**: SQLite3
- **ORM**: 使用原生 SQL 或 sqlite3 套件
- **CORS**: 支援跨域請求
- **錯誤處理**: 統一錯誤回應格式
- **驗證**: 基本資料驗證
- **日誌**: 請求日誌記錄