export interface Todo {
  id: number;
  title: string;
  day?: string;
  month?: string;
  year?: string;
  completed: boolean;
  description?: string;
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

export interface ItemsProps {
  todos: Todo[];
  itemProps: Omit<ItemProps, "todo">;
  showAddItem: () => void;
}