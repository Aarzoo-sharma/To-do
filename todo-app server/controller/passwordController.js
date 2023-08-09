const conn = require("./databaseController");

function ChangePassword(req, res) {
  const email = req.body.email;
  const password = req.body.password;
  const security = req.body.security;
  let sql = `select userId from user where email='${email}' and security='${security}';`;
  conn.query(sql, (err, data) => {
    if (!err) {
      if (data.length == 1) {
        sql = `update user set password='${password}' where userId=${data[0].userId};`;
        conn.query(sql, (err) => {
          if (!err) {
            res.send({ message: "Password change successfully. Please login now!!!" });
          }
        });
      } else res.send({ message: "either email is wrong or security ans" });
    }
  });
}
module.exports={ChangePassword}