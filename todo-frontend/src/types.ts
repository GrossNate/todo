export interface Todo {
  id: number;
  title: string;
  day?: string;
  month?: string;
  year?: string;
  completed: boolean;
  description?: string;
}

export interface MutationObject {
  setCompletion: (id: number, completed: boolean) => Promise<void>;
  delete: (id: number) => Promise<void>;
  addItem: (newTodo: Omit<Todo, "id">) => Promise<boolean>;
  editItem: () => Promise<boolean>;
  showAddItem: () => void;
  hideAddItem: () => void;
  showEditItem: () => void;
  hideEditItem: () => void;
  setItemToEdit: React.Dispatch<React.SetStateAction<Todo>>
}

export type DisplayTypes = "block" | "none";

export interface SelectOption {
  value: string;
  display: string;
}

export interface ItemProps {
  todo: Todo;
  setCompletion: (id: number, completed: boolean) => Promise<void>;
  deleteItem: (id: number) => Promise<void>;
  showEditItem: () => void;
  setItemToEdit: (todo: Todo) => void;
}