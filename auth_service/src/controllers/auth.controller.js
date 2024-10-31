const AuthService = require('../services/auth.service');

exports.register = async (req, res) => {
    try {
        const user = await AuthService.register(req.body);
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        const token = await AuthService.login(req.body);
        res.status(200).json({ token });
    } catch (error) {
        res.status(401).json({ message: 'Invalid credentials' });
    }
};

exports.validateToken = async (req, res) => {
    try {
        const valid = await AuthService.validateToken(req.headers.authorization);
        res.status(200).json({ valid });
    } catch (error) {
        res.status(401).json({ message: 'Invalid token' });
    }
};
