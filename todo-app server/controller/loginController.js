const conn = require("./databaseController");

function userLogin(req, res) {
  let email = req.body.email;
  let password = req.body.password;
  if (email.trim() === "" || password.trim() === "") {
    res.send({ error: "Invalid details!" });
    return;
  }
  let response;
  let sql = `select * from user where email='${email}' and password='${password}' ;`;
  conn.query(sql, (err, result) => {
    if (err) {
      res.send(err.sqlMessage);
    } else if (result.length == 1) {
      req.session.is_logged_in = true;
      req.session.name = result[0].username;
      req.session.email = result[0].email;
      req.session.userId = result[0].userId;
      response = {
        status: "ok",
        name: result[0].username,
        userID: result[0].userId,
        loggedin: true,
      };
      res.send(response);
    } else {
      res.send({ error: "Wrong Email or password" });
    }
  });
}

function checkAuth(req, res) {
  let result;
  if (req.session.is_logged_in) {
    let name = req.session.name;
    result = {
      status: "ok",
      name,
      userId: req.session.userId,
      loggedin: true,
    };
    res.send(result);
  } else {
    result = { loggedin: false };
    res.send(result);
  }
}

module.exports = {
  userLogin,
  checkAuth,
};
