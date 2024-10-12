"use strict";
const { Model, Op } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    static async addTask(params) {
      return await Todo.create(params);
    }

    static async showList() {
      console.log("My Todo list \n");

      console.log("Overdue");
      const overdueTodos = await Todo.overdue();
      overdueTodos.forEach((todo) => {
        console.log(todo.displayableString());
      });
      console.log("\n");

      console.log("Due Today");
      const dueTodayTodos = await Todo.dueToday();
      dueTodayTodos.forEach((todo) => {
        console.log(todo.displayableString());
      });
      console.log("\n");

      console.log("Due Later");
      const dueLaterTodos = await Todo.dueLater();
      dueLaterTodos.forEach((todo) => {
        console.log(todo.displayableString());
      });
    }

    static async overdue() {
      const today = new Date().toISOString().split("T")[0];
      return await Todo.findAll({
        where: {
          dueDate: {
            [Op.lt]: today,
          },
        },
        order: [["dueDate", "ASC"]],
      });
    }

    static async dueToday() {
      const today = new Date().toISOString().split("T")[0];
      return await Todo.findAll({
        where: {
          dueDate: today,
        },
        order: [["dueDate", "ASC"]],
      });
    }

    static async dueLater() {
      const today = new Date().toISOString().split("T")[0];
      return await Todo.findAll({
        where: {
          dueDate: {
            [Op.gt]: today,
          },
        },
        order: [["dueDate", "ASC"]],
      });
    }

    static async markAsComplete(id) {
      const todo = await Todo.findByPk(id);
      if (todo) {
        todo.completed = true;
        await todo.save();
      }
    }

    displayableString() {
      let checkbox = this.completed ? "[x]" : "[ ]";
      const today = new Date().toISOString().split("T")[0];

      // For todos due today, no date should be shown
      if (this.dueDate === today) {
        return `${this.id}. ${checkbox} ${this.title}`;
      }

      // For todos past due or due later, the date should be shown
      return `${this.id}. ${checkbox} ${this.title} ${this.dueDate}`;
    }
  }

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
