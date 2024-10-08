const todoList = () => {
  let all = [];

  const formattedDate = (d) => {
    return d.toISOString().split("T")[0];
  };

  const dateToday = new Date();
  const today = formattedDate(dateToday); // Define 'today'

  const add = (todoItem) => {
    all.push(todoItem);
  };

  const markAsComplete = (index) => {
    if (all[index]) {
      all[index].completed = true;
    }
  };

  const overdue = () => {
    return all.filter((todo) => todo.dueDate < today);
  };

  const dueToday = () => {
    return all.filter((todo) => todo.dueDate === today);
  };

  const dueLater = () => {
    return all.filter((todo) => todo.dueDate > today);
  };

  const toDisplayableList = (list) => {
    return list
      .map((todo) => {
        const checkbox = todo.completed ? "[x]" : "[ ]";
        const displayDate = todo.dueDate === today ? "" : todo.dueDate;
        return `${checkbox} ${todo.title} ${displayDate}`.trim();
      })
      .join("\n");
  };

  return {
    all,
    add,
    markAsComplete,
    overdue,
    dueToday,
    dueLater,
    toDisplayableList,
  };
};

module.exports = todoList; // Export the todoList function
