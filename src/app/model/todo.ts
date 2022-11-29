export interface Todo {
    id: string;
    title: string;
    description: string;
    todoOwner: string;
    dueDate: Date;
    doneDate?: Boolean
}

