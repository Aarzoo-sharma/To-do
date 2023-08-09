const express = require("express");
const {
  addTodoTask,
  taskChecked,
  taskDelete,
  viewTodoList,
  updateTask,
} = require("../controller/todoController");
const router = express.Router();

router.get("/viewList", viewTodoList);
router.post("/newTodoItem", addTodoTask);
router.put("/taskChecked", taskChecked);
router.put("/taskDelete", taskDelete);
router.put("/updateTask", updateTask);

module.exports = router;
