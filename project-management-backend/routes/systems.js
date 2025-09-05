const express = require('express');
const router = express.Router();
const db = require('../database/db');

// 生成系統 ID
function generateSystemId() {
  return 'sys_' + Date.now() + '_' + Math.random().toString(36).substring(2, 11);
}

// GET /api/systems - 取得所有系統
router.get('/', async (req, res) => {
  try {
    const systems = await db.all('SELECT * FROM systems ORDER BY created_at DESC');
    
    // 轉換資料格式以符合前端期望
    const formattedSystems = systems.map(system => ({
      id: system.id,
      name: system.name,
      code: system.code,
      description: system.description,
      owner: system.owner,
      createdAt: system.created_at,
      updatedAt: system.updated_at
    }));
    
    res.json(formattedSystems);
  } catch (error) {
    console.error('Error fetching systems:', error);
    res.status(500).json({ error: 'Failed to fetch systems' });
  }
});

// GET /api/systems/:id - 取得特定系統
router.get('/:id', async (req, res) => {
  try {
    const system = await db.get('SELECT * FROM systems WHERE id = ?', [req.params.id]);
    
    if (!system) {
      return res.status(404).json({ error: 'System not found' });
    }
    
    const formattedSystem = {
      id: system.id,
      name: system.name,
      code: system.code,
      description: system.description,
      owner: system.owner,
      createdAt: system.created_at,
      updatedAt: system.updated_at
    };
    
    res.json(formattedSystem);
  } catch (error) {
    console.error('Error fetching system:', error);
    res.status(500).json({ error: 'Failed to fetch system' });
  }
});

// POST /api/systems - 新增系統
router.post('/', async (req, res) => {
  try {
    const { name, code, description, owner } = req.body;
    
    // 驗證必要欄位
    if (!name || !code) {
      return res.status(400).json({ error: 'Name and code are required' });
    }
    
    const id = generateSystemId();
    const now = new Date().toISOString();
    
    await db.run(
      'INSERT INTO systems (id, name, code, description, owner, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [id, name, code, description || null, owner || null, now, now]
    );
    
    const newSystem = {
      id,
      name,
      code,
      description: description || null,
      owner: owner || null,
      createdAt: now,
      updatedAt: now
    };
    
    res.status(201).json(newSystem);
  } catch (error) {
    console.error('Error creating system:', error);
    if (error.message.includes('UNIQUE constraint failed')) {
      res.status(409).json({ error: 'System code already exists' });
    } else {
      res.status(500).json({ error: 'Failed to create system' });
    }
  }
});

// PUT /api/systems/:id - 更新系統
router.put('/:id', async (req, res) => {
  try {
    const { name, code, description, owner } = req.body;
    const systemId = req.params.id;
    
    // 檢查系統是否存在
    const existingSystem = await db.get('SELECT * FROM systems WHERE id = ?', [systemId]);
    if (!existingSystem) {
      return res.status(404).json({ error: 'System not found' });
    }
    
    const updatedAt = new Date().toISOString();
    
    await db.run(
      'UPDATE systems SET name = ?, code = ?, description = ?, owner = ?, updated_at = ? WHERE id = ?',
      [
        name || existingSystem.name,
        code || existingSystem.code,
        description !== undefined ? description : existingSystem.description,
        owner !== undefined ? owner : existingSystem.owner,
        updatedAt,
        systemId
      ]
    );
    
    const updatedSystem = await db.get('SELECT * FROM systems WHERE id = ?', [systemId]);
    
    const formattedSystem = {
      id: updatedSystem.id,
      name: updatedSystem.name,
      code: updatedSystem.code,
      description: updatedSystem.description,
      owner: updatedSystem.owner,
      createdAt: updatedSystem.created_at,
      updatedAt: updatedSystem.updated_at
    };
    
    res.json(formattedSystem);
  } catch (error) {
    console.error('Error updating system:', error);
    if (error.message.includes('UNIQUE constraint failed')) {
      res.status(409).json({ error: 'System code already exists' });
    } else {
      res.status(500).json({ error: 'Failed to update system' });
    }
  }
});

// DELETE /api/systems/:id - 刪除系統
router.delete('/:id', async (req, res) => {
  try {
    const systemId = req.params.id;
    
    const result = await db.run('DELETE FROM systems WHERE id = ?', [systemId]);
    
    if (result.changes === 0) {
      return res.status(404).json({ error: 'System not found' });
    }
    
    res.json({ message: 'System deleted successfully' });
  } catch (error) {
    console.error('Error deleting system:', error);
    res.status(500).json({ error: 'Failed to delete system' });
  }
});

module.exports = router;