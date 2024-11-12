import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import AuthModel from '../models/auth.model.js';

class AuthService {
  static async register(email, password) {
    const existingUser = await AuthModel.findUserByEmail(email);
    if (existingUser) {
      throw new Error('User already exists');
    }
    
    return await AuthModel.createUser(email, password);
  }

  static async login(email, password) {
    const user = await AuthModel.findUserByEmail(email);
    if (!user) {
      throw new Error('User not found');
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      throw new Error('Invalid password');
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '1h' }
    );

    return { token, user: { id: user.id, email: user.email } };
  }
}

export default AuthService;