import axios, { AxiosResponse } from "axios";
import { Todo } from "../types";
const baseUrl = "/api/todos";

type TodoCompletion = Pick<Todo, "completed">;

export const getAll = async (): Promise<Todo[]> => {
  const response: AxiosResponse<Todo[]> = await axios.get(baseUrl);
  return response.data;
};

export const setCompleted = async (id: Todo["id"], isCompleted: boolean): Promise<Todo> => {
  const updateTodo: TodoCompletion = { completed: isCompleted }
  const response: AxiosResponse<Todo> = await axios.put(`${baseUrl}/${id.toString()}`, updateTodo)
  return response.data;
};

export const deleteItem = async (id: Todo["id"]): Promise<boolean> => {
  const response = await axios.delete(`${baseUrl}/${id.toString()}`);
  return response.status === 204;  // Status code is 204 if item was deleted.
};