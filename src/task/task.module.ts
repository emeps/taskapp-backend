import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/user/user.module'; // Importe o UserModule

@Module({
  imports: [PrismaModule, AuthModule, UserModule], // Adicione o UserModule
  controllers: [TaskController],
  providers: [TaskService],
})
export class TaskModule {}
