module.exports = (req, res, next) => {
    // Dummy authentication middleware logic
    const token = req.headers['authorization'];
    if (token) {
        // Validate token logic
        console.log('Token is valid');
        next();
    } else {
        res.status(401).json({ message: 'Unauthorized' });
    }
};
