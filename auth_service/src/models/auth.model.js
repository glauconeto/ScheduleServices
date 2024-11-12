import bcrypt from 'bcrypt';
import * as db from '../config/database.js';

class AuthModel {
  static async createUser(email, password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const query = `
      INSERT INTO users (email, password)
      VALUES ($1, $2)
      RETURNING id, email`;
    const values = [email, hashedPassword];
    
    try {
      const result = await db.query(query, values);
      return result.rows[0];
    } catch (error) {
      throw new Error('Error creating user');
    }
  }

  static async findUserByEmail(email) {
    const query = 'SELECT * FROM users WHERE email = $1';
    const values = [email];
    
    try {
      const result = await db.query(query, values);
      return result.rows[0];
    } catch (error) {
      throw new Error('Error finding user');
    }
  }
}

export default AuthModel;
