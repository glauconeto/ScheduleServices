export default (req, res, next) => {
    const token = req.headers["authorization"];
    if (token) {
        console.log("Token is valid");
        next();
    } else {
        res.status(401).json({ message: "Unauthorized" });
    }
};
