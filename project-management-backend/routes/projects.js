const express = require('express');
const router = express.Router();
const db = require('../database/db');

// 計算專案統計資料
function calculateProjectStats(projectName) {
  const tasks = db.all('SELECT status FROM tasks WHERE project = ?', [projectName]);

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.status === 'completed').length;
  const inProgressTasks = tasks.filter(t => t.status === 'in-progress').length;
  const notStartedTasks = tasks.filter(t => t.status === 'not-started').length;
  const overallProgress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return {
    totalTasks,
    completedTasks,
    inProgressTasks,
    notStartedTasks,
    overallProgress
  };
}

// GET /api/projects - 取得所有專案
router.get('/', (req, res) => {
  try {
    const projects = db.all('SELECT * FROM projects ORDER BY created_at DESC');

    // 為每個專案計算最新統計資料
    const formattedProjects = projects.map((project) => {
      const stats = calculateProjectStats(project.project);

      return {
        id: project.id,
        projectNumber: project.project_number,
        projectSource: project.project_source,
        project: project.project,
        system: project.system,
        totalTasks: stats.totalTasks,
        completedTasks: stats.completedTasks,
        inProgressTasks: stats.inProgressTasks,
        notStartedTasks: stats.notStartedTasks,
        overallProgress: stats.overallProgress,
        status: project.status,
        projectManager: project.project_manager,
        startDate: project.start_date,
        expectedEndDate: project.expected_end_date,
        demo: project.demo
      };
    });

    res.json(formattedProjects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
});

// GET /api/projects/:id - 取得特定專案
router.get('/:id', (req, res) => {
  try {
    const project = db.get('SELECT * FROM projects WHERE id = ?', [req.params.id]);

    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    const stats = calculateProjectStats(project.project);

    const formattedProject = {
      id: project.id,
      projectNumber: project.project_number,
      projectSource: project.project_source,
      project: project.project,
      system: project.system,
      totalTasks: stats.totalTasks,
      completedTasks: stats.completedTasks,
      inProgressTasks: stats.inProgressTasks,
      notStartedTasks: stats.notStartedTasks,
      overallProgress: stats.overallProgress,
      status: project.status,
      projectManager: project.project_manager,
      startDate: project.start_date,
      expectedEndDate: project.expected_end_date,
      demo: project.demo
    };

    res.json(formattedProject);
  } catch (error) {
    console.error('Error fetching project:', error);
    res.status(500).json({ error: 'Failed to fetch project' });
  }
});

// POST /api/projects - 新增專案
router.post('/', (req, res) => {
  try {
    const {
      projectNumber, projectSource, project, system, status,
      projectManager, startDate, expectedEndDate, demo
    } = req.body;

    // 驗證必要欄位
    if (!project || !system || !projectManager) {
      return res.status(400).json({
        error: 'Required fields: project, system, projectManager'
      });
    }

    const result = db.run(
      `INSERT INTO projects (
        project_number, project_source, project, system, status,
        project_manager, start_date, expected_end_date, demo
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        projectNumber || null,
        projectSource || null,
        project,
        system,
        status || 'not-started',
        projectManager,
        startDate || null,
        expectedEndDate || null,
        demo || null
      ]
    );

    const newProject = {
      id: result.id,
      projectNumber: projectNumber || null,
      projectSource: projectSource || null,
      project,
      system,
      totalTasks: 0,
      completedTasks: 0,
      inProgressTasks: 0,
      notStartedTasks: 0,
      overallProgress: 0,
      status: status || 'not-started',
      projectManager,
      startDate: startDate || null,
      expectedEndDate: expectedEndDate || null,
      demo: demo || null
    };

    res.status(201).json(newProject);
  } catch (error) {
    console.error('Error creating project:', error);
    res.status(500).json({ error: 'Failed to create project' });
  }
});

// PUT /api/projects/:id - 更新專案
router.put('/:id', (req, res) => {
  try {
    const projectId = req.params.id;
    const updates = req.body;

    // 檢查專案是否存在
    const existingProject = db.get('SELECT * FROM projects WHERE id = ?', [projectId]);
    if (!existingProject) {
      return res.status(404).json({ error: 'Project not found' });
    }

    const updatedAt = new Date().toISOString();

    db.run(
      `UPDATE projects SET 
       project_number = ?, project_source = ?, project = ?, system = ?,
       status = ?, project_manager = ?, start_date = ?, expected_end_date = ?,
       demo = ?, updated_at = ?
       WHERE id = ?`,
      [
        updates.projectNumber !== undefined ? updates.projectNumber : existingProject.project_number,
        updates.projectSource !== undefined ? updates.projectSource : existingProject.project_source,
        updates.project || existingProject.project,
        updates.system || existingProject.system,
        updates.status || existingProject.status,
        updates.projectManager || existingProject.project_manager,
        updates.startDate !== undefined ? (updates.startDate || null) : existingProject.start_date,
        updates.expectedEndDate !== undefined ? (updates.expectedEndDate || null) : existingProject.expected_end_date,
        updates.demo !== undefined ? updates.demo : existingProject.demo,
        updatedAt,
        projectId
      ]
    );

    const updatedProject = db.get('SELECT * FROM projects WHERE id = ?', [projectId]);
    const stats = calculateProjectStats(updatedProject.project);

    const formattedProject = {
      id: updatedProject.id,
      projectNumber: updatedProject.project_number,
      projectSource: updatedProject.project_source,
      project: updatedProject.project,
      system: updatedProject.system,
      totalTasks: stats.totalTasks,
      completedTasks: stats.completedTasks,
      inProgressTasks: stats.inProgressTasks,
      notStartedTasks: stats.notStartedTasks,
      overallProgress: stats.overallProgress,
      status: updatedProject.status,
      projectManager: updatedProject.project_manager,
      startDate: updatedProject.start_date,
      expectedEndDate: updatedProject.expected_end_date,
      demo: updatedProject.demo
    };

    res.json(formattedProject);
  } catch (error) {
    console.error('Error updating project:', error);
    res.status(500).json({ error: 'Failed to update project' });
  }
});

// DELETE /api/projects/:id - 刪除專案
router.delete('/:id', (req, res) => {
  try {
    const projectId = req.params.id;

    // 先取得專案資訊
    const project = db.get('SELECT project FROM projects WHERE id = ?', [projectId]);
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    // 刪除相關任務
    db.run('DELETE FROM tasks WHERE project = ?', [project.project]);

    // 刪除專案
    const result = db.run('DELETE FROM projects WHERE id = ?', [projectId]);

    if (result.changes === 0) {
      return res.status(404).json({ error: 'Project not found' });
    }

    res.json({ message: 'Project and related tasks deleted successfully' });
  } catch (error) {
    console.error('Error deleting project:', error);
    res.status(500).json({ error: 'Failed to delete project' });
  }
});

module.exports = router;