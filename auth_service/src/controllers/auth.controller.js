const AuthService = require('../services/auth.service');
const authService = new AuthService();

class AuthController {
  async register(req, res) {
    try {
      const { email, password, name } = req.body;
      const user = await authService.register({ email, password, name });
      res.status(201).json({ user });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;
      const { user, token } = await authService.login(email, password);
      res.json({ user, token });
    } catch (error) {
      res.status(401).json({ message: error.message });
    }
  }

  async verifyToken(req, res) {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      const user = await authService.verifyToken(token);
      res.json({ user });
    } catch (error) {
      res.status(401).json({ message: error.message });
    }
  }

  async getProfile(req, res) {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      const user = await authService.verifyToken(token);
      res.json({ user });
    } catch (error) {
      res.status(401).json({ message: error.message });
    }
  }
}

module.exports = new AuthController();