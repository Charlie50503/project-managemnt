# 資料持久化指南

## 概述

本系統採用混合式資料持久化方案，結合 localStorage 和 JSON 檔案來確保資料的持久性和可移植性。

## 資料流程

### 1. 資料載入順序
1. **localStorage 優先**: 系統啟動時首先檢查 localStorage 中是否有資料
2. **Assets 檔案備援**: 如果 localStorage 沒有資料，則從 `src/assets/data/` 載入 JSON 檔案
3. **預設資料**: 如果都沒有，則使用程式碼中的預設資料

### 2. 資料儲存
- 所有 CRUD 操作都會同時更新 localStorage
- 資料變更會立即反映在使用者介面上
- localStorage 作為主要的資料來源

## 檔案結構

```
src/assets/data/
├── members.json      # 人員資料
├── systems.json      # 系統資料
└── project-data.json # 案件和任務資料
```

## 匯出功能

### 1. 完整資料匯出
- 位置：資料管理頁面 → 匯出/匯入資料按鈕
- 功能：匯出所有資料為單一 JSON 檔案
- 用途：備份、資料遷移、跨環境同步

### 2. 個別檔案匯出
- 位置：資料管理頁面 → 各分頁的「匯出檔案」按鈕
- 功能：匯出特定類型的資料為 JSON 檔案
- 用途：更新 assets 檔案、部分資料備份

## 開發者工作流程

### 更新 Assets 檔案
1. 在系統中新增/修改資料
2. 到資料管理頁面點擊對應的「匯出檔案」按鈕
3. 將下載的 JSON 檔案替換 `src/assets/data/` 中的對應檔案
4. 提交程式碼變更

### 資料遷移
1. 在來源環境匯出完整資料
2. 在目標環境使用匯入功能載入資料
3. 系統會自動重新載入並應用新資料

## 技術實現

### Service 層級
- **MemberCrudService**: 管理人員資料
- **SystemCrudService**: 管理系統資料  
- **ProjectCrudService**: 管理案件和任務資料
- **DataExportImportService**: 處理匯出匯入功能

### 儲存機制
- **localStorage keys**:
  - `membersData`: 人員資料
  - `project_management_systems`: 系統資料
  - `projectData`: 案件資料

### 資料同步
- 使用 RxJS BehaviorSubject 確保資料即時同步
- 所有組件都會自動接收資料變更通知
- 無需手動刷新頁面

## 注意事項

### 瀏覽器限制
- localStorage 有容量限制（通常 5-10MB）
- 清除瀏覽器資料會遺失 localStorage 內容
- 建議定期匯出資料作為備份

### 開發環境
- 開發時資料變更不會自動更新 assets 檔案
- 需要手動匯出並替換檔案
- 建議在版本控制中追蹤 assets 檔案變更

### 生產環境
- 確保 assets 檔案包含正確的初始資料
- 考慮實施定期備份機制
- 監控 localStorage 使用量

## 故障排除

### 資料遺失
1. 檢查 localStorage 是否有資料
2. 確認 assets 檔案是否存在且格式正確
3. 查看瀏覽器控制台是否有錯誤訊息

### 匯出失敗
1. 確認瀏覽器允許檔案下載
2. 檢查是否有足夠的磁碟空間
3. 驗證資料格式是否正確

### 匯入失敗
1. 確認 JSON 檔案格式正確
2. 檢查檔案大小是否超過限制
3. 驗證資料結構是否符合預期格式