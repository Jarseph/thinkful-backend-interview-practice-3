const service = require("./todo.service");

//TODO: Implement list function. Should get all todos
function list(req, res, next) {
    service
      .list()
      .then((data) => res.json({ data }))
      .catch(next);
  }

//TODO: Implement read function. Should get a single todo
function read(req, res) {
    const { todo: data } = res.locals;
    res.json({ data });
  }

//TODO: Implement create function. Should create a new todo
function create(req, res, next) {
    service
      .create(req.body.data)
      .then((data) => res.status(201).json({ data }))
      .catch(next);
  }

//TODO: Implement update function. Should update a todo
function update(req, res, next) {
    const updatedTodo = {
      ...req.body.data,
      todo_id: res.locals.newTodo.todo_id,
    };
    service
      .update(updatedTodo)
      .then((data) => res.json({ data }))
      .catch(next);
  }

//TODO: Implement destroy function. Should delete a todo
function destroy(req, res, next) {
    service
      .delete(res.locals.newTodo.todo_id)
      .then(() => res.sendStatus(204))
      .catch(next);
  }

//TODO: Implement any required middleware
function todoExists(req, res, next) {
    service
      .read(req.params.todo_id)
      .then((todo) => {
        if (todo) {
          res.locals.todo = todo;
          return next();
        }
        next({ status: 404, message: `todo cannot be found.` });
      })
      .catch(next);
  }

  const VALID_PROPERTIES = [
    "todo_id",
    "todo_title",
    "todo_completed"
  ];
  
  function hasOnlyValidProperties(req, res, next) {
    const { data = {} } = req.body;
  
    const invalidFields = Object.keys(data).filter(
      (field) => !VALID_PROPERTIES.includes(field)
    );
  
    if (invalidFields.length) {
      return next({
        status: 400,
        message: `Invalid field(s): ${invalidFields.join(", ")}`,
      });
    }
    next();
  }

  function hasProperties(...properties) {
    return function (req, res, next) {
      const { data = {} } = req.body;
  
      try {
        properties.forEach((property) => {
          if (!data[property]) {
            const error = new Error(`A '${property}' property is required.`);
            error.status = 400;
            throw error;
          }
        });
        next();
      } catch (error) {
        next(error);
      }
    };
  }
  

//TODO: Export middleware and functions
module.exports = {
    list,
    read: [todoExists, read],
    create: [hasOnlyValidProperties, hasProperties, create],
    update: [todoExists, hasOnlyValidProperties, hasProperties, update],
    delete: [todoExists, destroy],
};
