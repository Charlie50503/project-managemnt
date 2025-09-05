const express = require('express');
const router = express.Router();
const db = require('../database/db');

// GET /api/members - 取得所有人員
router.get('/', (req, res) => {
  try {
    const members = db.all('SELECT * FROM members ORDER BY created_at DESC');
    
    // 轉換資料格式以符合前端期望
    const formattedMembers = members.map(member => ({
      id: member.id,
      name: member.name,
      employeeId: member.employee_id,
      email: member.email,
      department: member.department,
      departmentCode: member.department_code,
      section: member.section,
      sectionCode: member.section_code
    }));
    
    res.json(formattedMembers);
  } catch (error) {
    console.error('Error fetching members:', error);
    res.status(500).json({ error: 'Failed to fetch members' });
  }
});

// GET /api/members/:id - 取得特定人員
router.get('/:id', (req, res) => {
  try {
    const member = db.get('SELECT * FROM members WHERE id = ?', [req.params.id]);
    
    if (!member) {
      return res.status(404).json({ error: 'Member not found' });
    }
    
    const formattedMember = {
      id: member.id,
      name: member.name,
      employeeId: member.employee_id,
      email: member.email,
      department: member.department,
      departmentCode: member.department_code,
      section: member.section,
      sectionCode: member.section_code
    };
    
    res.json(formattedMember);
  } catch (error) {
    console.error('Error fetching member:', error);
    res.status(500).json({ error: 'Failed to fetch member' });
  }
});

// POST /api/members - 新增人員
router.post('/', (req, res) => {
  try {
    const { name, employeeId, email, department, departmentCode, section, sectionCode } = req.body;
    
    // 驗證必要欄位
    if (!name || !employeeId || !email || !department || !departmentCode || !section || !sectionCode) {
      return res.status(400).json({ 
        error: 'All fields are required: name, employeeId, email, department, departmentCode, section, sectionCode' 
      });
    }
    
    const result = db.run(
      `INSERT INTO members (name, employee_id, email, department, department_code, section, section_code) 
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [name, employeeId, email, department, departmentCode, section, sectionCode]
    );
    
    const newMember = {
      id: result.id,
      name,
      employeeId,
      email,
      department,
      departmentCode,
      section,
      sectionCode
    };
    
    res.status(201).json(newMember);
  } catch (error) {
    console.error('Error creating member:', error);
    if (error.message.includes('UNIQUE constraint failed')) {
      if (error.message.includes('employee_id')) {
        res.status(409).json({ error: 'Employee ID already exists' });
      } else if (error.message.includes('email')) {
        res.status(409).json({ error: 'Email already exists' });
      } else {
        res.status(409).json({ error: 'Duplicate entry' });
      }
    } else {
      res.status(500).json({ error: 'Failed to create member' });
    }
  }
});

// PUT /api/members/:id - 更新人員
router.put('/:id', (req, res) => {
  try {
    const { name, employeeId, email, department, departmentCode, section, sectionCode } = req.body;
    const memberId = req.params.id;
    
    // 檢查人員是否存在
    const existingMember = db.get('SELECT * FROM members WHERE id = ?', [memberId]);
    if (!existingMember) {
      return res.status(404).json({ error: 'Member not found' });
    }
    
    const updatedAt = new Date().toISOString();
    
    db.run(
      `UPDATE members SET 
       name = ?, employee_id = ?, email = ?, department = ?, 
       department_code = ?, section = ?, section_code = ?, updated_at = ? 
       WHERE id = ?`,
      [
        name || existingMember.name,
        employeeId || existingMember.employee_id,
        email || existingMember.email,
        department || existingMember.department,
        departmentCode || existingMember.department_code,
        section || existingMember.section,
        sectionCode || existingMember.section_code,
        updatedAt,
        memberId
      ]
    );
    
    const updatedMember = db.get('SELECT * FROM members WHERE id = ?', [memberId]);
    
    const formattedMember = {
      id: updatedMember.id,
      name: updatedMember.name,
      employeeId: updatedMember.employee_id,
      email: updatedMember.email,
      department: updatedMember.department,
      departmentCode: updatedMember.department_code,
      section: updatedMember.section,
      sectionCode: updatedMember.section_code
    };
    
    res.json(formattedMember);
  } catch (error) {
    console.error('Error updating member:', error);
    if (error.message.includes('UNIQUE constraint failed')) {
      if (error.message.includes('employee_id')) {
        res.status(409).json({ error: 'Employee ID already exists' });
      } else if (error.message.includes('email')) {
        res.status(409).json({ error: 'Email already exists' });
      } else {
        res.status(409).json({ error: 'Duplicate entry' });
      }
    } else {
      res.status(500).json({ error: 'Failed to update member' });
    }
  }
});

// DELETE /api/members/:id - 刪除人員
router.delete('/:id', (req, res) => {
  try {
    const memberId = req.params.id;
    
    const result = db.run('DELETE FROM members WHERE id = ?', [memberId]);
    
    if (result.changes === 0) {
      return res.status(404).json({ error: 'Member not found' });
    }
    
    res.json({ message: 'Member deleted successfully' });
  } catch (error) {
    console.error('Error deleting member:', error);
    res.status(500).json({ error: 'Failed to delete member' });
  }
});

module.exports = router;