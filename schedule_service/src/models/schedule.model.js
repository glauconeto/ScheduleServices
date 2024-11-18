import { query } from '../config/database.js';

class ScheduleModel {
  static async create(scheduleData) {
    const { title, description, date, time } = scheduleData;
    
    try {
      const result = await query(
        `INSERT INTO schedules (title, description, date, time) 
         VALUES ($1, $2, $3, $4) 
         RETURNING *`,
        [title, description, date, time]
      );
      
      return result.rows[0];
    } catch (error) {
      throw new Error('Error creating schedule');
    }
  }

  static async findAll() {
    try {
      const result = await query(
        'SELECT * FROM schedules ORDER BY date ASC, time ASC'
      );
      return result.rows;
    } catch (error) {
      throw new Error('Error fetching schedules');
    }
  }

  static async findById(id) {
    try {
      const result = await query(
        'SELECT * FROM schedules WHERE id = $1',
        [id]
      );
      return result.rows[0];
    } catch (error) {
      throw new Error('Error fetching schedule');
    }
  }

  static async update(id, scheduleData) {
    const { title, description, date, time } = scheduleData;
    
    try {
      const result = await query(
        `UPDATE schedules 
         SET title = $1, 
             description = $2, 
             date = $3, 
             time = $4,
             updated_at = CURRENT_TIMESTAMP
         WHERE id = $5 
         RETURNING *`,
        [title, description, date, time, id]
      );
      
      return result.rows[0];
    } catch (error) {
      throw new Error('Error updating schedule');
    }
  }

  static async delete(id) {
    try {
      const result = await query(
        'DELETE FROM schedules WHERE id = $1 RETURNING *',
        [id]
      );
      return result.rows[0];
    } catch (error) {
      throw new Error('Error deleting schedule');
    }
  }

  // Additional useful methods

  static async findByDateRange(startDate, endDate) {
    try {
      const result = await query(
        `SELECT * FROM schedules 
         WHERE date BETWEEN $1 AND $2 
         ORDER BY date ASC, time ASC`,
        [startDate, endDate]
      );
      return result.rows;
    } catch (error) {
      throw new Error('Error fetching schedules by date range');
    }
  }

  static async findByDate(date) {
    try {
      const result = await query(
        'SELECT * FROM schedules WHERE date = $1 ORDER BY time ASC',
        [date]
      );
      return result.rows;
    } catch (error) {
      throw new Error('Error fetching schedules by date');
    }
  }

  static async findUpcoming(limit = 5) {
    try {
      const result = await query(
        `SELECT * FROM schedules 
         WHERE date >= CURRENT_DATE 
         ORDER BY date ASC, time ASC 
         LIMIT $1`,
        [limit]
      );
      return result.rows;
    } catch (error) {
      throw new Error('Error fetching upcoming schedules');
    }
  }

  static async countByDate(date) {
    try {
      const result = await query(
        'SELECT COUNT(*) FROM schedules WHERE date = $1',
        [date]
      );
      return parseInt(result.rows[0].count);
    } catch (error) {
      throw new Error('Error counting schedules');
    }
  }
}

export default ScheduleModel;