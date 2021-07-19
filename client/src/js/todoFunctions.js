export function reduce(todo, id) {
    let newTodo = [...todo];
    const index = todo.findIndex((item) => item.id === id);
    if (index !== -1) {
      newTodo.splice(index, 1);
      return todo;
    }
}