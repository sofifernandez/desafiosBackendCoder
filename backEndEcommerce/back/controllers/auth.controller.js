/* -------------------------------------------------------------------------- */
/*                                   SIGNUP                                   */
/* -------------------------------------------------------------------------- */

//éxito
export function postSignup(req, res) {
    const user = req.user;
  console.log(user);
    res.status(200).json(user);
}
//fracaso  
export function failSignup(req, res) {
    res.status(401).send('No Autorizado');
}
  
  /* -------------------------------------------------------------------------- */
  /*                                    LOGIN                                   */
  /* -------------------------------------------------------------------------- */
  
  //éxito
export function postLogin(req, res) {
    const user = req.user;
  console.log(user);
    res.status(200).json(user);
}
  //fracaso
export function failLogin(req, res) {
  console.log("Error en el login");
    res.status(401).send('No Autorizado');
}
  
  /* -------------------------------------------------------------------------- */
  /*                                   LOGOUT                                   */
  /* -------------------------------------------------------------------------- */
  
export function logout(req, res) {
    console.log("logout");
  req.logout();
  res.header("Access-Control-Allow-Origin", "http://localhost:8080");
    res.status(401).send('No Autorizado');
}