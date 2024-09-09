import { Length , IsString, IsEnum, IsOptional, IsNotEmpty} from "class-validator";

export enum TaskStatus{
    PENDING = 'PENDING',
    IN_PROGRESS = 'IN_PROGRESS',
    COMPLETED =  'COMPLETED'
}

export class CreateTaskDto {
    @IsString()
    @Length(1, 255)
    @IsNotEmpty()
    title: string;

    @IsString()
    @Length(1, 1000)
    description: string;

    @IsOptional()
    @IsEnum(TaskStatus)
    status: TaskStatus;

}
