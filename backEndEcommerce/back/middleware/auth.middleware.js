const authorized = (req, res, next) => {
    if (req.isAuthenticated()) {
        req.session.touch()
        next();
    } else {
        return res.status(401).send('No Autorizado');
    }
}

export default authorized;