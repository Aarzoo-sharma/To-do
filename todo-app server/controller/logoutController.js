function userLogout(req, res) {
  req.session.destroy();
  res.send({ status: "ok" });
}
module.exports = { userLogout };
