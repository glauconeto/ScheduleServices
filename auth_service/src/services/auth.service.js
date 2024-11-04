import { sign, verify } from 'jsonwebtoken';
import User from '../models/auth.model';

export async function register(userData) {
    const user = new User(userData);
    await user.save();
    return { email: user.email };
}

export async function login(credentials) {
    const user = await User.findOne({ email: credentials.email });
    if (!user || !(await user.comparePassword(credentials.password))) {
        throw new Error('Invalid credentials');
    }

    const token = sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return token;
}

export async function validateToken(token) {
    try {
        const decoded = verify(token, process.env.JWT_SECRET);
        return !!decoded;
    } catch {
        throw new Error('Invalid token');
    }
}
