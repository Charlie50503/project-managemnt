const db = require('../database/db');

async function initializeDatabase() {
  try {
    console.log('Initializing database with sample data...');
    
    // 等待資料庫表格建立完成
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // 插入範例系統資料
    const systems = [
      {
        id: 'sys_1703123456789_abc123def',
        name: '人事管理系統',
        code: 'HRM',
        description: '員工資料管理與薪資計算系統',
        owner: '張三'
      },
      {
        id: 'sys_1703123456790_def456ghi',
        name: '財務管理系統',
        code: 'FMS',
        description: '財務報表與會計管理系統',
        owner: '李四'
      }
    ];
    
    for (const system of systems) {
      await db.run(
        'INSERT OR IGNORE INTO systems (id, name, code, description, owner) VALUES (?, ?, ?, ?, ?)',
        [system.id, system.name, system.code, system.description, system.owner]
      );
    }
    
    // 插入範例人員資料
    const members = [
      {
        name: '張三',
        employeeId: 'EMP001',
        email: 'zhang.san@company.com',
        department: '資訊部',
        departmentCode: 'IT',
        section: '系統開發科',
        sectionCode: 'DEV'
      },
      {
        name: '李四',
        employeeId: 'EMP002',
        email: 'li.si@company.com',
        department: '資訊部',
        departmentCode: 'IT',
        section: '系統維護科',
        sectionCode: 'OPS'
      },
      {
        name: '王五',
        employeeId: 'EMP003',
        email: 'wang.wu@company.com',
        department: '財務部',
        departmentCode: 'FIN',
        section: '會計科',
        sectionCode: 'ACC'
      }
    ];
    
    for (const member of members) {
      await db.run(
        `INSERT OR IGNORE INTO members 
         (name, employee_id, email, department, department_code, section, section_code) 
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [member.name, member.employeeId, member.email, member.department, 
         member.departmentCode, member.section, member.sectionCode]
      );
    }
    
    // 插入範例專案資料
    const projects = [
      {
        projectNumber: 'PRJ001',
        projectSource: '內部需求',
        project: '人事系統升級',
        system: '人事管理系統',
        status: 'in-progress',
        projectManager: '張三',
        startDate: '2024-01-01',
        expectedEndDate: '2024-06-30',
        demo: 'https://demo.hrm.company.com'
      },
      {
        projectNumber: 'PRJ002',
        projectSource: '法規要求',
        project: '財務報表自動化',
        system: '財務管理系統',
        status: 'not-started',
        projectManager: '李四',
        startDate: '2024-03-01',
        expectedEndDate: '2024-09-30'
      }
    ];
    
    for (const project of projects) {
      await db.run(
        `INSERT OR IGNORE INTO projects 
         (project_number, project_source, project, system, status, project_manager, start_date, expected_end_date, demo) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [project.projectNumber, project.projectSource, project.project, project.system,
         project.status, project.projectManager, project.startDate, project.expectedEndDate, project.demo]
      );
    }
    
    // 插入範例任務資料
    const tasks = [
      {
        member: '張三',
        project: '人事系統升級',
        system: '人事管理系統',
        task: '需求分析',
        complexity: '中',
        priority: '高',
        status: 'completed',
        startDate: '2024-01-01',
        endDate: '2024-01-15',
        actualEndDate: '2024-01-14'
      },
      {
        member: '張三',
        project: '人事系統升級',
        system: '人事管理系統',
        task: '系統設計',
        complexity: '高',
        priority: '高',
        status: 'in-progress',
        startDate: '2024-01-16',
        endDate: '2024-02-15',
        actualEndDate: null
      },
      {
        member: '李四',
        project: '財務報表自動化',
        system: '財務管理系統',
        task: '現況調查',
        complexity: '低',
        priority: '中',
        status: 'not-started',
        startDate: '2024-03-01',
        endDate: '2024-03-10',
        actualEndDate: null
      }
    ];
    
    for (const task of tasks) {
      await db.run(
        `INSERT OR IGNORE INTO tasks 
         (member, project, system, task, complexity, priority, status, start_date, end_date, actual_end_date) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [task.member, task.project, task.system, task.task, task.complexity,
         task.priority, task.status, task.startDate, task.endDate, task.actualEndDate]
      );
    }
    
    console.log('Database initialized successfully with sample data!');
    
    // 顯示統計資料
    const systemCount = await db.get('SELECT COUNT(*) as count FROM systems');
    const memberCount = await db.get('SELECT COUNT(*) as count FROM members');
    const projectCount = await db.get('SELECT COUNT(*) as count FROM projects');
    const taskCount = await db.get('SELECT COUNT(*) as count FROM tasks');
    
    console.log(`\nDatabase Statistics:`);
    console.log(`- Systems: ${systemCount.count}`);
    console.log(`- Members: ${memberCount.count}`);
    console.log(`- Projects: ${projectCount.count}`);
    console.log(`- Tasks: ${taskCount.count}`);
    
  } catch (error) {
    console.error('Error initializing database:', error);
  } finally {
    await db.close();
  }
}

// 如果直接執行此腳本
if (require.main === module) {
  initializeDatabase();
}

module.exports = initializeDatabase;