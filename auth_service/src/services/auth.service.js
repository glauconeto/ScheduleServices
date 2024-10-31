const jwt = require('jsonwebtoken');
const User = require('../models/auth.model');

exports.register = async (userData) => {
    const user = new User(userData);
    await user.save();
    return { email: user.email };
};

exports.login = async (credentials) => {
    const user = await User.findOne({ email: credentials.email });
    if (!user || !(await user.comparePassword(credentials.password))) {
        throw new Error('Invalid credentials');
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return token;
};

exports.validateToken = async (token) => {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return !!decoded;
    } catch {
        throw new Error('Invalid token');
    }
};
