import { IsEnum } from 'class-validator';
import { TaskStatus } from '../task-status';

export class updateTaskStatusDto {
  @IsEnum(TaskStatus)
  status: TaskStatus;
}
