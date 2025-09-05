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
        status TEXT CHECK(status IN ('not-started', 'in-progress', 'completed')) DEFAULT 'not-started',
        project_manager TEXT NOT NULL,
        start_date TEXT NOT NULL,
        expected_end_date TEXT NOT NULL,
        demo TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // 建立 tasks 表
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
        start_date TEXT NOT NULL,
        end_date TEXT NOT NULL,
        actual_end_date TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    console.log('Database tables initialized');
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