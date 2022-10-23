const router = require("express").Router();
const controller = require("./todo.controller");

router
  .route("/")
  .get(controller.list)
  .post(controller.create);

router
  .route("/:todo_id")
  .get(controller.read)
  .patch(controller.update)
  .delete(controller.delete);

module.exports = router;
