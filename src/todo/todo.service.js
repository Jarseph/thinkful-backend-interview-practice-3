const knex = require("../db/connection");

// id, title, completed

//TODO: Implement list function. Should get all todos
function list() {
    return knex("todo")
        .select("*")
}
//TODO: Implement read function. Should get a single todo
function read(todo_id) {
    return knex("todo")
    .select()
    .where({ todo_id })
    .first();
}
//TODO: Implement create function. Should create a new todo
function create(newTodo) {
    return knex("todos")
        .insert(newTodo)
        .returning("*")
        .then((todoList) => todoList[0]);
}
//TODO: Implement update function. Should update a todo
function update(updatedTodo) {
    return knex("todo")
      .select("*")
      .where({ todo_id: updatedTodo.todo_id })
      .update(updatedTodo, "*");
  }
//TODO: Implement destroy function. Should delete a todo
function destroy(todo_id) {
    return knex("todo").where({ todo_id }).del();
  }
//TODO: Export functions
module.exports = {
    list,
    read,
    create,
    update,
    delete: destroy
};
