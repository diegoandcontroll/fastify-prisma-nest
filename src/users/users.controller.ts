import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  Res,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { FastifyReply, FastifyRequest } from 'fastify';
import { CreateUserDto } from './createuser.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}
  @Get()
  async index(@Res() res: FastifyReply) {
    const users = await this.userService.HandleUsers();
    return res.status(200).send(users);
  }

  @Post()
  async create(@Req() req: FastifyRequest, @Res() res: FastifyReply) {
    const { email, name }: CreateUserDto = req.body;
    const user = await this.userService.HandleCreate({ email, name });
    return res.status(201).send(user);
  }

  @Get(':id')
  async findOne(
    @Res() res: FastifyReply,
    @Req() req: FastifyReply,
    @Param('id') id: string,
  ) {
    const user = await this.userService.HandleUser(id);
    return res.status(200).send(user);
  }

  @Put(':id')
  async update(
    @Res() res: FastifyReply,
    @Req() req: FastifyRequest,
    @Param('id') id: string,
  ) {
    const { name }: CreateUserDto = req.body;
    const user = await this.userService.HandleUpdate(id, { name });
    return res.status(200).send(user);
  }

  @Delete(':id')
  async remove(@Res() res: FastifyReply, @Param('id') id: string) {
    const user = await this.userService.handleDelete(id);
    return res.status(200).send(user);
  }
}
