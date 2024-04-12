import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { prismaExclude } from 'src/utils/utils';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) { }

  create(createUserDto: CreateUserDto) {
    return this.prisma.user.create({ data: createUserDto });
  }

  findAll() {
    return this.prisma.user.findMany()
  }

  findAllActive() {
    return this.prisma.user.findMany({ where: { active: 1 },
    select: prismaExclude('User', ['password'])
    });
  }

  findOne(id: number) {
    return this.prisma.user.findFirst({ 
      where: { id: id }, 
      select: prismaExclude('User', ['password'])
    });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return this.prisma.user.update({
      where: { id: id },
      data: { active: 0 },
    });
  }
}
