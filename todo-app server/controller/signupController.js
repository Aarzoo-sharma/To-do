const conn = require("./databaseController");

function signupUser(req, res) {
  let name = req.body.username;
  let email = req.body.email;
  let password = req.body.password;
  let security = req.body.security;

  if (
    email.trim() === "" ||
    password.trim() === "" ||
    name.trim() === "" ||
    security.trim() == ""
  ) {
    res.send({ error: "Invalid details!" });
    return;
  } else if (!password.match("(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*).{8,}")) {
    res.send({
      error:
        "password should be of length 8,one upper character and one lower charater atlest and have a number",
    });
    return;
  } else if (!email.match("[a-z0-9._%+-]+@[a-z0-9.-]+[.][a-z]{2,3}$")) {
    res.send({ error: "please enter a valid email" });
    return;
  }
  let sql = `INSERT INTO user(username,email,password,security) VALUES('${name}','${email}','${password}','${security}');select userId from user where email='${email}';`;

  let response;
  conn.query(sql, (err, result) => {
    if (err) {
      if (err.errno == 1062) {
        res.send({ error: "Email already exist please use new email" });
        return;
      } else {
        res.send({
          error: "something went wrong, please try again after a while",
        });
        return;
      }
    } else {
      req.session.is_logged_in = true;
      req.session.name = name;
      req.session.email = email;
      req.session.userId = result[1][0].userId;
      response = {
        name: req.session.name,
        userId: result[1][0].userId,
        loggedin: true,
        status: "ok",
      };
      res.send(response);
    }
  });
}
module.exports = {
  signupUser,
};
