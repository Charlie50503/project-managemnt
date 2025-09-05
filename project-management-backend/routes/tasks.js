const express = require('express');
const router = express.Router();
const db = require('../database/db');

// GET /api/tasks - 取得所有任務
router.get('/', (req, res) => {
  try {
    const tasks = db.all('SELECT * FROM tasks ORDER BY created_at DESC');
    
    // 轉換資料格式以符合前端期望
    const formattedTasks = tasks.map(task => ({
      id: task.id,
      member: task.member,
      project: task.project,
      system: task.system,
      task: task.task,
      complexity: task.complexity,
      priority: task.priority,
      status: task.status,
      startDate: task.start_date,
      endDate: task.end_date,
      actualEndDate: task.actual_end_date
    }));
    
    res.json(formattedTasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
});

// GET /api/tasks/:id - 取得特定任務
router.get('/:id', (req, res) => {
  try {
    const task = db.get('SELECT * FROM tasks WHERE id = ?', [req.params.id]);
    
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    
    const formattedTask = {
      id: task.id,
      member: task.member,
      project: task.project,
      system: task.system,
      task: task.task,
      complexity: task.complexity,
      priority: task.priority,
      status: task.status,
      startDate: task.start_date,
      endDate: task.end_date,
      actualEndDate: task.actual_end_date
    };
    
    res.json(formattedTask);
  } catch (error) {
    console.error('Error fetching task:', error);
    res.status(500).json({ error: 'Failed to fetch task' });
  }
});

// GET /api/tasks/project/:projectName - 取得特定專案的任務
router.get('/project/:projectName', (req, res) => {
  try {
    const projectName = decodeURIComponent(req.params.projectName);
    const tasks = db.all('SELECT * FROM tasks WHERE project = ? ORDER BY created_at DESC', [projectName]);
    
    const formattedTasks = tasks.map(task => ({
      id: task.id,
      member: task.member,
      project: task.project,
      system: task.system,
      task: task.task,
      complexity: task.complexity,
      priority: task.priority,
      status: task.status,
      startDate: task.start_date,
      endDate: task.end_date,
      actualEndDate: task.actual_end_date
    }));
    
    res.json(formattedTasks);
  } catch (error) {
    console.error('Error fetching tasks by project:', error);
    res.status(500).json({ error: 'Failed to fetch tasks by project' });
  }
});

// POST /api/tasks - 新增任務
router.post('/', (req, res) => {
  try {
    const { 
      member, project, system, task, complexity, priority, 
      status, startDate, endDate, actualEndDate 
    } = req.body;
    
    // 驗證必要欄位
    if (!member || !project || !system || !task || !complexity || !priority || !startDate || !endDate) {
      return res.status(400).json({ 
        error: 'Required fields: member, project, system, task, complexity, priority, startDate, endDate' 
      });
    }
    
    // 驗證枚舉值
    const validComplexity = ['高', '中', '低'];
    const validPriority = ['高', '中', '低'];
    const validStatus = ['not-started', 'in-progress', 'completed'];
    
    if (!validComplexity.includes(complexity)) {
      return res.status(400).json({ error: 'Invalid complexity. Must be one of: 高, 中, 低' });
    }
    
    if (!validPriority.includes(priority)) {
      return res.status(400).json({ error: 'Invalid priority. Must be one of: 高, 中, 低' });
    }
    
    if (status && !validStatus.includes(status)) {
      return res.status(400).json({ error: 'Invalid status. Must be one of: not-started, in-progress, completed' });
    }
    
    const result = db.run(
      `INSERT INTO tasks (
        member, project, system, task, complexity, priority, status,
        start_date, end_date, actual_end_date
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        member, project, system, task, complexity, priority, 
        status || 'not-started', startDate, endDate, actualEndDate || null
      ]
    );
    
    const newTask = {
      id: result.id,
      member,
      project,
      system,
      task,
      complexity,
      priority,
      status: status || 'not-started',
      startDate,
      endDate,
      actualEndDate: actualEndDate || null
    };
    
    res.status(201).json(newTask);
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(500).json({ error: 'Failed to create task' });
  }
});

// PUT /api/tasks/:id - 更新任務
router.put('/:id', (req, res) => {
  try {
    const taskId = req.params.id;
    const updates = req.body;
    
    // 檢查任務是否存在
    const existingTask = db.get('SELECT * FROM tasks WHERE id = ?', [taskId]);
    if (!existingTask) {
      return res.status(404).json({ error: 'Task not found' });
    }
    
    // 驗證枚舉值（如果有提供）
    const validComplexity = ['高', '中', '低'];
    const validPriority = ['高', '中', '低'];
    const validStatus = ['not-started', 'in-progress', 'completed'];
    
    if (updates.complexity && !validComplexity.includes(updates.complexity)) {
      return res.status(400).json({ error: 'Invalid complexity. Must be one of: 高, 中, 低' });
    }
    
    if (updates.priority && !validPriority.includes(updates.priority)) {
      return res.status(400).json({ error: 'Invalid priority. Must be one of: 高, 中, 低' });
    }
    
    if (updates.status && !validStatus.includes(updates.status)) {
      return res.status(400).json({ error: 'Invalid status. Must be one of: not-started, in-progress, completed' });
    }
    
    const updatedAt = new Date().toISOString();
    
    db.run(
      `UPDATE tasks SET 
       member = ?, project = ?, system = ?, task = ?, complexity = ?,
       priority = ?, status = ?, start_date = ?, end_date = ?, 
       actual_end_date = ?, updated_at = ?
       WHERE id = ?`,
      [
        updates.member || existingTask.member,
        updates.project || existingTask.project,
        updates.system || existingTask.system,
        updates.task || existingTask.task,
        updates.complexity || existingTask.complexity,
        updates.priority || existingTask.priority,
        updates.status || existingTask.status,
        updates.startDate || existingTask.start_date,
        updates.endDate || existingTask.end_date,
        updates.actualEndDate !== undefined ? updates.actualEndDate : existingTask.actual_end_date,
        updatedAt,
        taskId
      ]
    );
    
    const updatedTask = db.get('SELECT * FROM tasks WHERE id = ?', [taskId]);
    
    const formattedTask = {
      id: updatedTask.id,
      member: updatedTask.member,
      project: updatedTask.project,
      system: updatedTask.system,
      task: updatedTask.task,
      complexity: updatedTask.complexity,
      priority: updatedTask.priority,
      status: updatedTask.status,
      startDate: updatedTask.start_date,
      endDate: updatedTask.end_date,
      actualEndDate: updatedTask.actual_end_date
    };
    
    res.json(formattedTask);
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(500).json({ error: 'Failed to update task' });
  }
});

// DELETE /api/tasks/:id - 刪除任務
router.delete('/:id', (req, res) => {
  try {
    const taskId = req.params.id;
    
    const result = db.run('DELETE FROM tasks WHERE id = ?', [taskId]);
    
    if (result.changes === 0) {
      return res.status(404).json({ error: 'Task not found' });
    }
    
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).json({ error: 'Failed to delete task' });
  }
});

module.exports = router;