const request = require("supertest");
const app = require("../app");
const { Todo } = require("../models");

describe("Todo API", () => {
  beforeAll(async () => {
    // Add a test todo to delete later
    await Todo.create({
      title: "Test Todo",
      dueDate: new Date(),
      completed: false,
    });
  });

  test("Should delete a todo by ID", async () => {
    // Fetch a todo to get its ID
    const todos = await Todo.findAll();
    const todoId = todos[0].id;

    const response = await request(app).delete(`/todos/${todoId}`);
    expect(response.statusCode).toBe(200);
    expect(response.text).toBe("true");

    // Check if the todo is actually deleted
    const todo = await Todo.findByPk(todoId);
    expect(todo).toBeNull();
  });

  test("Should return false if the todo doesn't exist", async () => {
    const response = await request(app).delete("/todos/99999");
    expect(response.statusCode).toBe(200);
    expect(response.text).toBe("false");
  });
});
