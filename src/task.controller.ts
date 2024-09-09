import { Controller, Post, Route, SuccessResponse, Tags } from '@tsoa/runtime';
import { z } from 'zod';
import { Body, ValidateBody } from './validation.decorators';

// Define the type of the data
interface Task {
  id: string;
  title: string;  // We need our title to be at lease 5 char long
  completed: boolean;
  priority: number; // priority must be a number between 1 and 5 included
}

type TaskCreate = Omit<Task, 'id'>;

// Define Zod schema for Task parameters
const TaskCreateSchema: z.ZodType<TaskCreate> = z.object({
  title: z.string().min(5, "Title must be at least 5 letters long"),
  completed: z.boolean(),
  priority: z.number()
    .min(1, 'Priority must be greater or equal to 1')
    .max(5, 'Priority must be lower or equal to 5')
});

@Route("tasks")
@Tags("Tasks")
export class TaskController extends Controller {

  @Post("")
  @SuccessResponse('201', 'Task Created')
  @ValidateBody(TaskCreateSchema) // <-- New Decorator
  public async createTask(@Body() task: TaskCreate): Promise<Task> {
    // this is no longer needed
    /* 
       const check = TaskSchema.safeParse(task);
       if(!check.success){
         return BaseError.createInvalidArgumentError(check.error.errors.join(','))
       } 
    */

    return { id: '1', ...task };
  }
}