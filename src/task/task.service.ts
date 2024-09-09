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
import { StatusTaskDto } from './dto/status-task.dto';

@Injectable()
export class TaskService {
  constructor(private readonly prisma: PrismaService) {}

  private readonly dataFormat = {
    select: {
      id:true,
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

  async create(req, createTaskDto: CreateTaskDto) {
    const newTask = await this.prisma.tasks.create({
      data: {
        title: createTaskDto.title,
        description: createTaskDto.description,
        status: createTaskDto.status as unknown as Status,
        userId: req.tokenPayload.sub,
      },
    });

    return {
      status: HttpStatus.CREATED,
      message: 'Tarefa criada com sucesso!',
      data: newTask,
    };
  }

  async findAll(userId:number) {
    const tasks = await this.prisma.tasks.findMany({
      where: {
        userId
      },
      ...this.dataFormat,
    });
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

  async update(req, id: number, updateTaskDto: UpdateTaskDto) {
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
        userId: req.tokenPayload.sub,
      },
      where: { id },
    });
    
    return {
      status: HttpStatus.OK,
      data: task,
    };
  }

  async remove(req, id: number) {
    try {
      const task = await this.prisma.tasks.delete({
        where: { id, userId:req.tokenPayload.sub},
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

  async statusChange(req, id: number, statusTaskDto: StatusTaskDto) {
    const taskFound = await this.prisma.tasks.findUnique({
      where: { id },
    });

    if (!taskFound) {
      throw new NotFoundException('Não foi possível encontrar nenhuma tarefa!');
    }

    const task = await this.prisma.tasks.update({
      data: {
        status: statusTaskDto.status as unknown as Status,
      },
      where: { id, userId:req.tokenPayload.sub },
    });
    
    return {
      data: task,
    };
  }
}
