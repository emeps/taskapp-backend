import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { StatusTaskDto } from './dto/status-task.dto';

@UseGuards(AuthGuard)
@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  create(@Req() req, @Body() createTaskDto: CreateTaskDto) {
    return this.taskService.create(req, createTaskDto);
  }
  
  @Get()
  findAll(@Req() req) {
    setTimeout(()=>{},10000)
    return this.taskService.findAll(Number(req.tokenPayload.sub));
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.taskService.findOne(+id);
  }

  @Patch(':id')
  update(@Req() req, @Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.taskService.update(req, +id, updateTaskDto);
  }

  @Delete(':id')
  remove(@Req() req, @Param('id') id: string) {
    return this.taskService.remove(req, +id);
  }

  @Patch('status/:id')
  statusChange(@Req() req, @Param('id') id: string, @Body() statusTaskDto:StatusTaskDto){
    return this.taskService.statusChange(req, +id, statusTaskDto);
  }
}
