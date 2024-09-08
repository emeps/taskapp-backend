import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly prisma:PrismaService){}

  async create(createUserDto: CreateUserDto){
    const { name, email, password } = createUserDto;
    
    const uniqueUser = await this.prisma.users.findUnique({
      where: { email },
      select: { id: true },
    });

    if (uniqueUser) {
      throw new HttpException({
        status: HttpStatus.CONFLICT,
        error: 'Usuário já se encontra no nosso banco de dados!',
      }, HttpStatus.CONFLICT);
    }

    const newUser = await this.prisma.users.create({
      data: {
        email,
        name,
        password: bcrypt.hashSync(password, 8),
      },
    });

    return {
      status: HttpStatus.CREATED,
      message: 'Usuário criado com sucesso!',
      data: newUser
    };
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
