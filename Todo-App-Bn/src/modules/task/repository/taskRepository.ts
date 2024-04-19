import Todo from "../../../database/models/task";

const createTodo = async (body: any) => {
  return await Todo.create(body);
};

const getTodos = async () => {
  return await Todo.find().sort({ createdAt: -1 });
};

const findTodoById = async (id: string) => {
  return await Todo.findOne({ _id: id });
};

const deleteTodoById = async (id: string) => {
  return await Todo.deleteOne({ _id: id });
};

const updateTodoById = async (id: string, data: any) => {
  return await Todo.updateOne({ _id: id }, data);
};

export { createTodo, getTodos, findTodoById, deleteTodoById, updateTodoById };
