/* eslint-disable @typescript-eslint/no-unused-vars */
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
import { CreatePost } from './createpost.dto';
import { PostService } from './post.service';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}
  @Get()
  async index(@Res() res: FastifyReply) {
    const posts = await this.postService.HandlePosts();
    return res.status(200).send(posts);
  }

  @Post()
  async create(@Req() req: FastifyRequest, @Res() res: FastifyReply) {
    const { title, authorId, content, urlImage, description }: CreatePost =
      req.body;
    const user = await this.postService.HandleCreate({
      title,
      description,
      content,
      urlImage,
      authorId,
    });
    return res.status(201).send(user);
  }
  @Post(':id')
  async published(@Res() res: FastifyReply, @Param('id') id: string) {
    const post = await this.postService.handlePublished(id);
    return res.status(200).send(post);
  }

  @Get(':id')
  async findOne(
    @Res() res: FastifyReply,
    @Req() req: FastifyReply,
    @Param('id') id: string,
  ) {
    const post = await this.postService.HandlePost(id);
    return res.status(200).send(post);
  }

  @Put(':id')
  async update(
    @Res() res: FastifyReply,
    @Req() req: FastifyRequest,
    @Param('id') id: string,
    data: CreatePost,
  ) {
    req.body = data;
    const postUpdate = await this.postService.HandleUpdate(id, data);
    return res.status(200).send(postUpdate);
  }

  @Delete(':id')
  async remove(@Res() res: FastifyReply, @Param('id') id: string) {
    const postDeleted = await this.postService.handleDelete(id);
    return res.status(204).send(postDeleted);
  }
}
