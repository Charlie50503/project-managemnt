const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.join(__dirname, 'project_management.db');

class DatabaseWrapper {
  constructor() {
    try {
      this.db = new Database(dbPath);
      console.log('Connected to SQLite database');
      this.initTables();
    } catch (err) {
      console.error('Error opening database:', err.message);
    }
  }

  initTables() {
    // 建立 systems 表
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS systems (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        code TEXT NOT NULL UNIQUE,
        description TEXT,
        owner TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // 建立 members 表
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS members (
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
      )
    `);

    // 建立 projects 表
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS projects (
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
        status TEXT CHECK(status IN ('not-started', 'in-progress', 'completed', 'pending', 'on-hold', 'cancelled')) DEFAULT 'not-started',
        project_manager TEXT NOT NULL,
        start_date TEXT NOT NULL,
        expected_end_date TEXT NOT NULL,
        demo TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // 檢查並更新 tasks 表結構
    this.updateTasksTableSchema();
    
    // 檢查並更新 projects 表結構
    this.updateProjectsTableSchema();

    console.log('Database tables initialized');
    
    // 檢查是否需要插入初始資料
    this.insertInitialData();
  }

  updateTasksTableSchema() {
    try {
      // 檢查 tasks 表是否存在以及其結構
      const tableInfo = this.db.prepare("PRAGMA table_info(tasks)").all();
      
      if (tableInfo.length === 0) {
        // 表不存在，創建新表
        this.db.exec(`
          CREATE TABLE tasks (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            member TEXT NOT NULL,
            project TEXT NOT NULL,
            system TEXT NOT NULL,
            task TEXT NOT NULL,
            complexity TEXT CHECK(complexity IN ('高', '中', '低')) NOT NULL,
            priority TEXT CHECK(priority IN ('高', '中', '低')) NOT NULL,
            status TEXT CHECK(status IN ('not-started', 'in-progress', 'completed')) DEFAULT 'not-started',
            start_date TEXT,
            end_date TEXT,
            actual_end_date TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
          )
        `);
        console.log('Created new tasks table with correct schema');
      } else {
        // 檢查 start_date 和 end_date 是否為 NOT NULL
        const startDateColumn = tableInfo.find(col => col.name === 'start_date');
        const endDateColumn = tableInfo.find(col => col.name === 'end_date');
        
        if (startDateColumn && startDateColumn.notnull === 1) {
          // 需要更新表結構，備份數據並重建表
          console.log('Updating tasks table schema to allow null dates...');
          
          // 備份現有數據
          this.db.exec(`
            CREATE TABLE tasks_backup AS SELECT * FROM tasks
          `);
          
          // 刪除舊表
          this.db.exec(`DROP TABLE tasks`);
          
          // 創建新表
          this.db.exec(`
            CREATE TABLE tasks (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              member TEXT NOT NULL,
              project TEXT NOT NULL,
              system TEXT NOT NULL,
              task TEXT NOT NULL,
              complexity TEXT CHECK(complexity IN ('高', '中', '低')) NOT NULL,
              priority TEXT CHECK(priority IN ('高', '中', '低')) NOT NULL,
              status TEXT CHECK(status IN ('not-started', 'in-progress', 'completed')) DEFAULT 'not-started',
              start_date TEXT,
              end_date TEXT,
              actual_end_date TEXT,
              created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
              updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
            )
          `);
          
          // 恢復數據
          this.db.exec(`
            INSERT INTO tasks SELECT * FROM tasks_backup
          `);
          
          // 刪除備份表
          this.db.exec(`DROP TABLE tasks_backup`);
          
          console.log('Tasks table schema updated successfully');
        }
      }
    } catch (error) {
      console.error('Error updating tasks table schema:', error);
      // 如果更新失敗，確保至少有基本表結構
      this.db.exec(`
        CREATE TABLE IF NOT EXISTS tasks (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          member TEXT NOT NULL,
          project TEXT NOT NULL,
          system TEXT NOT NULL,
          task TEXT NOT NULL,
          complexity TEXT CHECK(complexity IN ('高', '中', '低')) NOT NULL,
          priority TEXT CHECK(priority IN ('高', '中', '低')) NOT NULL,
          status TEXT CHECK(status IN ('not-started', 'in-progress', 'completed')) DEFAULT 'not-started',
          start_date TEXT,
          end_date TEXT,
          actual_end_date TEXT,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      `);
    }
  }

  updateProjectsTableSchema() {
    try {
      // 檢查 projects 表是否存在以及其結構
      const tableInfo = this.db.prepare("PRAGMA table_info(projects)").all();
      
      if (tableInfo.length > 0) {
        // 檢查 status 欄位的約束是否需要更新
        // 由於 SQLite 不支援直接修改 CHECK 約束，我們需要重建表
        console.log('Updating projects table schema to support new status values...');
        
        // 備份現有數據
        this.db.exec(`
          CREATE TABLE projects_backup AS SELECT * FROM projects
        `);
        
        // 刪除舊表
        this.db.exec(`DROP TABLE projects`);
        
        // 創建新表
        this.db.exec(`
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
            status TEXT CHECK(status IN ('not-started', 'in-progress', 'completed', 'pending', 'on-hold', 'cancelled')) DEFAULT 'not-started',
            project_manager TEXT NOT NULL,
            start_date TEXT NOT NULL,
            expected_end_date TEXT NOT NULL,
            demo TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
          )
        `);
        
        // 恢復數據
        this.db.exec(`
          INSERT INTO projects SELECT * FROM projects_backup
        `);
        
        // 刪除備份表
        this.db.exec(`DROP TABLE projects_backup`);
        
        console.log('Projects table schema updated successfully');
      }
    } catch (error) {
      console.error('Error updating projects table schema:', error);
      // 如果更新失敗，確保至少有基本表結構
      this.db.exec(`
        CREATE TABLE IF NOT EXISTS projects (
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
          status TEXT CHECK(status IN ('not-started', 'in-progress', 'completed', 'pending', 'on-hold', 'cancelled')) DEFAULT 'not-started',
          project_manager TEXT NOT NULL,
          start_date TEXT NOT NULL,
          expected_end_date TEXT NOT NULL,
          demo TEXT,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      `);
    }
  }

  // 通用查詢方法
  get(sql, params = []) {
    try {
      const stmt = this.db.prepare(sql);
      return stmt.get(...params);
    } catch (err) {
      console.error('Database get error:', err);
      throw err;
    }
  }

  all(sql, params = []) {
    try {
      const stmt = this.db.prepare(sql);
      return stmt.all(...params);
    } catch (err) {
      console.error('Database all error:', err);
      throw err;
    }
  }

  run(sql, params = []) {
    try {
      const stmt = this.db.prepare(sql);
      const result = stmt.run(...params);
      return { id: result.lastInsertRowid, changes: result.changes };
    } catch (err) {
      console.error('Database run error:', err);
      console.error('SQL:', sql);
      console.error('Params:', params);
      throw err;
    }
  }

  close() {
    try {
      this.db.close();
      console.log('Database connection closed');
    } catch (err) {
      throw err;
    }
  }
}

module.exports = new DatabaseWrapper();