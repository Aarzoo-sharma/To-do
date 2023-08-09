const conn = require("./databaseController");

function viewTodoList(req, res) {
  const userId = req.session.userId;
  const sql = `select * from todo where userId=${userId}`;
  conn.query(sql, (err, result) => {
    if (!err) {
      res.send(result);
    }
  });
}

function addTodoTask(req, res) {
  const userId = req.session.userId;
  const task = req.body.task;
  const sql = `INSERT INTO todo(userId,task) VALUES(${userId},'${task}');select * from todo where userId=${userId} order by taskid desc limit 1`;
  conn.query(sql, (err, result) => {
    if (!err) {
      let response = {
        status: "ok",
        userId,
        taskId: result[1][0].taskId,
      };
      res.send(response);
    } else {
      res.send({ error: err.sqlMessage });
    }
  });
}
function taskChecked(req, res) {
  const userId = req.session.userId;
  const taskId = req.body.taskId;
  const checked = req.body.checked;
  const sql = `update todo set checked=${!checked} where taskId=${taskId} and userId=${userId};`;
  conn.query(sql, (err) => {
    if (!err) {
      res.send({ status: "ok" });
    } else res.send({ error: err.sqlMessage });
  });
}

function taskDelete(req, res) {
  const userId = req.session.userId;
  const taskId = req.body.taskId;
  const sql = `delete from todo where taskId=${taskId} and userId=${userId};`;
  conn.query(sql, (err) => {
    if (!err) {
      res.send({ status: "ok" });
    } else res.send({ error: err.sqlMessage });
  });
}
function updateTask(req, res) {
  const userId = req.session.userId;
  const taskId = req.body.taskId;
  const task = req.body.task;
  const sql = `update todo set checked=${false},task='${task}' where taskId=${taskId} and userId=${userId};`;
  conn.query(sql, (err) => {
    if (!err) {
      res.send({ status: "ok" });
    } else res.send({ error: err.sqlMessage });
  });
}
module.exports = {
  viewTodoList,
  addTodoTask,
  taskChecked,
  taskDelete,
  updateTask,
};
