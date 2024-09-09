import {IsEnum,  IsOptional} from "class-validator";

export enum TaskStatus{
    PENDING = 'PENDING',
    IN_PROGRESS = 'IN_PROGRESS',
    COMPLETED =  'COMPLETED'
}

export class StatusTaskDto {
    @IsEnum(TaskStatus)
    status: TaskStatus; 
}
