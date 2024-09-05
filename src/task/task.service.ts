import {
  Injectable,
  HttpException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Status } from '@prisma/client';

@Injectable()
export class TaskService {
  constructor(private readonly prisma: PrismaService) {}

  private readonly dataFormat = {
    select: {
      title: true,
      description: true,
      status: true,
      createdAt: true,
      updatedAt: true,
      user: {
        select: {
          name: true,
          email: true,
        },
      },
    },
  };

  async create(createTaskDto: CreateTaskDto) {
    const newTask = await this.prisma.tasks.create({
      data: {
        title: createTaskDto.title,
        description: createTaskDto.description,
        status: createTaskDto.status as unknown as Status,
        userId: createTaskDto.userId,
      },
    });

    return {
      status: HttpStatus.CREATED,
      message: 'Tarefa criada com sucesso!',
      data: newTask,
    };
  }

  async findAll() {
    const tasks = await this.prisma.tasks.findMany(this.dataFormat);

    if (tasks.length === 0) {
      throw new NotFoundException('Não foi possível encontrar nenhuma tarefa!');
    }

    return {
      status: HttpStatus.OK,
      data: tasks,
    };
  }

  async findOne(id: number) {
    const selectFormat = {where:{id}, ...this.dataFormat}
    const task = await this.prisma.tasks.findUnique(selectFormat);
    if (!task) {
      throw new NotFoundException('Não foi possível encontrar nenhuma tarefa!');
    }
    return {
      status: HttpStatus.OK,
      data: task,
    };
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    const taskFound = await this.prisma.tasks.findUnique({
      where: { id },
    });

    if (!taskFound) {
      throw new NotFoundException('Não foi possível encontrar nenhuma tarefa!');
    }

    const task = await this.prisma.tasks.update({
      data: {
        title: updateTaskDto.title,
        description: updateTaskDto.description,
        status: updateTaskDto.status as unknown as Status,
        userId: updateTaskDto.userId,
      },
      where: { id },
    });
    
    return {
      status: HttpStatus.OK,
      data: task,
    };
  }

  async remove(id: number) {
    try {
      const task = await this.prisma.tasks.delete({
        where: { id },
      });
      if (task) {
        return {
          status: HttpStatus.OK,
          message: 'Tarefa deletada com sucesso',
          data: { task },
        };
      }
    } catch (e) {
      throw new NotFoundException('Não foi possível encontrar nenhuma tarefa!');
    }
  }
}
