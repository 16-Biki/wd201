const todoList = require("../todo");

describe("Todo List Test Suite", () => {
  let todos;

  beforeEach(() => {
    todos = todoList();
  });

  test("should add a new todo", () => {
    todos.add({ title: "Test todo", dueDate: "2024-10-08", completed: false });
    expect(todos.all.length).toBe(1);
    expect(todos.all[0].title).toBe("Test todo");
  });

  test("should mark a todo as completed", () => {
    todos.add({ title: "Test todo", dueDate: "2024-10-08", completed: false });
    todos.markAsComplete(0);
    expect(todos.all[0].completed).toBe(true);
  });

  test("should retrieve overdue todos", () => {
    todos.add({
      title: "Overdue todo",
      dueDate: "2024-10-07",
      completed: false,
    });
    todos.add({ title: "Due today", dueDate: "2024-10-08", completed: false });
    const overdueItems = todos.overdue();
    expect(overdueItems.length).toBe(1);
    expect(overdueItems[0].title).toBe("Overdue todo");
  });

  test("should retrieve todos due today", () => {
    todos.add({ title: "Due today", dueDate: "2024-10-08", completed: false });
    const dueTodayItems = todos.dueToday();
    expect(dueTodayItems.length).toBe(1);
    expect(dueTodayItems[0].title).toBe("Due today");
  });

  test("should retrieve todos due later", () => {
    todos.add({ title: "Due later", dueDate: "2024-10-09", completed: false });
    const dueLaterItems = todos.dueLater();
    expect(dueLaterItems.length).toBe(1);
    expect(dueLaterItems[0].title).toBe("Due later");
  });
});
