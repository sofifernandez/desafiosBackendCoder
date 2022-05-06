export default function auth(req, res, next) {
  if (req.session.login) {
    next(); //-> sigue a lo proximo
  } else {
    return res.status(401).send("No autorizado");
  }
}
