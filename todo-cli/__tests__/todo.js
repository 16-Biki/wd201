const todoList = require("../todo");

describe("Todo List Test Suite", () => {
  let todos;

  beforeEach(() => {
    todos = todoList();
  });

  // Test to add a new todo
  test("should add a new todo", () => {
    const initialLength = todos.all.length;
    todos.add({ title: "New Task", dueDate: "2024-10-08", completed: false });
    expect(todos.all.length).toBe(initialLength + 1);
    expect(todos.all[initialLength].title).toBe("New Task");
  });

  // Test to mark a todo as complete
  test("should mark a todo as completed", () => {
    todos.add({
      title: "Incomplete Task",
      dueDate: "2024-10-08",
      completed: false,
    });
    todos.markAsComplete(0);
    expect(todos.all[0].completed).toBe(true);
  });

  // Test to retrieve overdue items
  test("should retrieve overdue todos", () => {
    todos.add({
      title: "Overdue Task",
      dueDate: "2024-10-07",
      completed: false,
    });
    const overdueItems = todos.overdue();
    expect(overdueItems.length).toBeGreaterThan(0);
    expect(overdueItems[0].dueDate).toBe("2024-10-07");
  });

  // Test to retrieve due today items
  test("should retrieve todos due today", () => {
    const today = new Date().toISOString().split("T")[0];
    todos.add({ title: "Today's Task", dueDate: today, completed: false });
    const dueTodayItems = todos.dueToday();
    expect(dueTodayItems.length).toBeGreaterThan(0);
    expect(dueTodayItems[0].dueDate).toBe(today);
  });

  // Test to retrieve due later items
  test("should retrieve todos due later", () => {
    const tomorrow = new Date(new Date().setDate(new Date().getDate() + 1))
      .toISOString()
      .split("T")[0];
    todos.add({ title: "Future Task", dueDate: tomorrow, completed: false });
    const dueLaterItems = todos.dueLater();
    expect(dueLaterItems.length).toBeGreaterThan(0);
    expect(dueLaterItems[0].dueDate).toBe(tomorrow);
  });
});
