# Project Management Backend API

專案管理系統的後端 API，使用 Node.js + Express + SQLite 建構。

## 功能特色

- 系統管理 (Systems CRUD)
- 人員管理 (Members CRUD)
- 專案管理 (Projects CRUD)
- 任務管理 (Tasks CRUD)
- SQLite 資料庫
- RESTful API 設計
- CORS 支援

## 快速開始

### 1. 安裝依賴套件

```bash
cd project-management-backend
npm install
```

### 2. 初始化資料庫

```bash
npm run init-db
```

### 3. 啟動開發伺服器

```bash
npm run dev
```

或啟動正式伺服器：

```bash
npm start
```

伺服器將在 http://localhost:3000 啟動

### 4. 健康檢查

訪問 http://localhost:3000/health 確認 API 正常運作

## API 端點

### Systems (系統管理)
- `GET /api/systems` - 取得所有系統
- `GET /api/systems/:id` - 取得特定系統
- `POST /api/systems` - 新增系統
- `PUT /api/systems/:id` - 更新系統
- `DELETE /api/systems/:id` - 刪除系統

### Members (人員管理)
- `GET /api/members` - 取得所有人員
- `GET /api/members/:id` - 取得特定人員
- `POST /api/members` - 新增人員
- `PUT /api/members/:id` - 更新人員
- `DELETE /api/members/:id` - 刪除人員

### Projects (專案管理)
- `GET /api/projects` - 取得所有專案
- `GET /api/projects/:id` - 取得特定專案
- `POST /api/projects` - 新增專案
- `PUT /api/projects/:id` - 更新專案
- `DELETE /api/projects/:id` - 刪除專案

### Tasks (任務管理)
- `GET /api/tasks` - 取得所有任務
- `GET /api/tasks/:id` - 取得特定任務
- `GET /api/tasks/project/:projectName` - 取得特定專案的任務
- `POST /api/tasks` - 新增任務
- `PUT /api/tasks/:id` - 更新任務
- `DELETE /api/tasks/:id` - 刪除任務

## 資料結構

詳細的資料結構和 API 規格請參考 [API_SPECIFICATION.md](./API_SPECIFICATION.md)

## 專案結構

```
project-management-backend/
├── database/
│   └── db.js              # 資料庫連接和操作
├── routes/
│   ├── systems.js         # 系統管理路由
│   ├── members.js         # 人員管理路由
│   ├── projects.js        # 專案管理路由
│   └── tasks.js           # 任務管理路由
├── scripts/
│   └── init-db.js         # 資料庫初始化腳本
├── server.js              # 主伺服器檔案
├── package.json
└── README.md
```

## 開發說明

### 資料庫

- 使用 SQLite 作為資料庫
- 資料庫檔案位於 `database/project_management.db`
- 支援自動建立表格和初始化範例資料

### 錯誤處理

API 使用統一的錯誤回應格式：

```json
{
  "error": "錯誤類型",
  "message": "詳細錯誤訊息"
}
```

### 日誌

使用 Morgan 中間件記錄 HTTP 請求日誌

## 部署

1. 確保 Node.js 環境已安裝
2. 執行 `npm install` 安裝依賴
3. 執行 `npm run init-db` 初始化資料庫
4. 執行 `npm start` 啟動伺服器
5. 設定反向代理 (如 Nginx) 指向 API 伺服器

## 環境變數

- `PORT`: 伺服器埠號 (預設: 3000)

## 授權

MIT License