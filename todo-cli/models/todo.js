"use strict";
const { Op } = require("sequelize"); // Import operators for querying
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    static async addTask(params) {
      return await Todo.create(params); // Creates a new task
    }

    static async showList() {
      console.log("My Todo list \n");

      // Display overdue tasks
      console.log("Overdue");
      const overdueItems = await Todo.overdue();
      overdueItems.forEach((todo) => {
        console.log(todo.displayableString());
      });
      console.log("\n");

      // Display tasks due today
      console.log("Due Today");
      const dueTodayItems = await Todo.dueToday();
      dueTodayItems.forEach((todo) => {
        console.log(todo.displayableString());
      });
      console.log("\n");

      // Display tasks due later
      console.log("Due Later");
      const dueLaterItems = await Todo.dueLater();
      dueLaterItems.forEach((todo) => {
        console.log(todo.displayableString());
      });
    }

    static async overdue() {
      // Find tasks that are overdue (due date before today and not completed)
      return await Todo.findAll({
        where: {
          dueDate: { [Op.lt]: new Date() },
          completed: false,
        },
        order: [["dueDate", "ASC"]],
      });
    }

    static async dueToday() {
      // Find tasks that are due today (due date is today)
      const today = new Date().toISOString().split("T")[0]; // Get today's date
      return await Todo.findAll({
        where: {
          dueDate: today,
          completed: false,
        },
        order: [["dueDate", "ASC"]],
      });
    }

    static async dueLater() {
      // Find tasks that are due later (due date after today and not completed)
      return await Todo.findAll({
        where: {
          dueDate: { [Op.gt]: new Date() },
          completed: false,
        },
        order: [["dueDate", "ASC"]],
      });
    }

    static async markAsComplete(id) {
      // Mark a task as completed based on the given ID
      const todoItem = await Todo.findByPk(id);
      if (todoItem) {
        todoItem.completed = true; // Set the completed flag to true
        await todoItem.save(); // Save the changes to the database
      }
    }

    displayableString() {
      // Display task as a string with id, checkbox, title, and due date
      let checkbox = this.completed ? "[x]" : "[ ]";
      const formattedDate =
        this.dueDate === new Date().toISOString().split("T")[0]
          ? ""
          : this.dueDate;
      return `${this.id}. ${checkbox} ${this.title} ${formattedDate}`;
    }
  }

  // Initialize the Todo model with title, dueDate, and completed fields
  Todo.init(
    {
      title: DataTypes.STRING,
      dueDate: DataTypes.DATEONLY,
      completed: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Todo",
    }
  );
  return Todo;
};
