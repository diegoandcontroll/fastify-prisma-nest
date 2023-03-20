import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'src/db/Prisma.service';
import { CreateUserDto } from './createuser.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async HandleUsers(): Promise<User[]> {
    return await this.prisma.user.findMany({
      include: {
        posts: true,
      },
    });
  }

  async HandleCreate({ email, name }: Prisma.UserCreateInput): Promise<User> {
    const user = await this.prisma.user.create({
      data: {
        email,
        name,
      },
    });
    return user;
  }

  async HandleUser(id: string): Promise<User> {
    const user = await this.prisma.user.findFirst({
      where: {
        id,
      },
      include: {
        posts: true,
      },
    });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  async HandleUpdate(id: string, { name }: CreateUserDto): Promise<User> {
    const user = await this.prisma.user.findFirst({
      where: {
        id,
      },
    });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    const userUpdate = await this.prisma.user.update({
      data: {
        name,
      },
      where: {
        id,
      },
    });
    return userUpdate;
  }

  async handleDelete(id: string): Promise<User> {
    const user = await this.prisma.user.findFirst({
      where: {
        id,
      },
    });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return await this.prisma.user.delete({
      where: {
        id,
      },
    });
  }
}
