const { Command } = require("commander");
const program = new Command();
const fs = require("fs");

program
  .name("todo cli")
  .description("managa your todos via CLI")
  .version("1.0.0");

program
  .command("add")
  .description("add todo in your todos")
  .argument("<todo>", "Provide todo to add")
  .action((todo) => {
    let todos = [];
    try {
      const data = fs.readFileSync("file.json", "utf-8");
      todos = JSON.parse(data);
    } catch (readError) {
      console.log(readError.message);
    }
    const newTodo = {
      id: Math.floor(Math.random() * 100),
      task: todo,
      done: false,
    };
    todos.push(newTodo);
    try {
      fs.writeFileSync("file.json", JSON.stringify(todos));
    } catch (writeError) {
      console.log(writeError.message);
    }
  });

program
  .command("edit")
  .description("edit todo")
  .argument("<id>", "id of todo to be edited")
  .argument("<new_task>", "new updated todo")
  .action((idstr, new_task) => {
    try {
      const todos = JSON.parse(fs.readFileSync("file.json", "utf-8"));
      const id = parseInt(idstr);
      const todoIndex = todos.findIndex((todo) => todo.id === id);
      todos[todoIndex].task = new_task;
      console.log(todos[todoIndex]);

      fs.writeFileSync("file.json", JSON.stringify(todos));
    } catch (error) {
      console.log(error.message);
    }
  });

program
  .command("delete")
  .description("delete todo")
  .argument("<id>", "id of todo to be deleted")

  .action((idstr) => {
    try {
      const todos = JSON.parse(fs.readFileSync("file.json", "utf-8"));
      const id = parseInt(idstr);
      const updatedTodos = todos.filter((todo) => todo.id !== id);

      fs.writeFileSync("file.json", JSON.stringify(updatedTodos));
    } catch (error) {
      console.log(error.message);
    }
  });

program
  .command("list")
  .description("list all the todos")

  .action(() => {
    try {
      const todos = JSON.parse(fs.readFileSync("file.json", "utf-8"));
      console.log(todos);
    } catch (error) {
      console.log(error.message);
    }
  });

program.parse();
