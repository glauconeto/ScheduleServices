import { register, login, validateToken } from '../services/auth.service';

export async function register(req, res) {
    try {
        const user = await register(req.body);
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export async function login(req, res) {
    try {
        const token = await login(req.body);
        res.status(200).json({ token });
    } catch (error) {
        res.status(401).json({ message: 'Invalid credentials' });
    }
}

export async function validateToken(req, res) {
    try {
        const valid = await validateToken(req.headers.authorization);
        res.status(200).json({ valid });
    } catch (error) {
        res.status(401).json({ message: 'Invalid token' });
    }
}
