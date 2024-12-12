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
}