const router = require("express").Router();
const controller = require("./todo.controller");

router.route("/").get(/* Your code here */).post(/* Your code here */);

router
  .route("/:todo_id")
  .get(/* Your code here */)
  .patch(/* Your code here */)
  .delete(/* Your code here */);

module.exports = router;
