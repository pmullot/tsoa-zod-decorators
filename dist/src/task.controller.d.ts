import { Controller } from '@tsoa/runtime';
interface Task {
    id: string;
    title: string;
    completed: boolean;
    priority: number;
}
type TaskCreate = Omit<Task, 'id'>;
export declare class TaskController extends Controller {
    createTask(task: TaskCreate): Promise<Task>;
}
export {};
