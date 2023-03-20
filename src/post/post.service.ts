import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Post } from '@prisma/client';
import { PrismaService } from 'src/db/Prisma.service';
import { CreatePost } from './createpost.dto';

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) {}

  async HandlePosts(): Promise<Post[]> {
    return await this.prisma.post.findMany({
      include: {
        author: true,
      },
    });
  }

  async HandleCreate({
    title,
    description,
    content,
    urlImage,
    authorId,
  }: CreatePost): Promise<Post> {
    const post = await this.prisma.post.create({
      data: {
        title,
        description,
        content,
        urlImage,
        authorId,
      },
    });
    return post;
  }

  async HandlePost(id: string): Promise<Post> {
    const post = await this.prisma.post.findFirst({
      where: {
        id,
      },
    });
    if (!post) {
      throw new HttpException('post not found', HttpStatus.NOT_FOUND);
    }
    return post;
  }
  async handlePublished(id: string): Promise<Post> {
    const post = await this.prisma.post.findFirst({
      where: {
        id,
      },
    });
    if (!post) {
      throw new HttpException('post not found', HttpStatus.NOT_FOUND);
    }
    const updatePublished = await this.prisma.post.update({
      where: {
        id,
      },
      data: {
        published: true,
      },
    });
    return updatePublished;
  }
  async HandleUpdate(id: string, data: CreatePost): Promise<Post> {
    const post = await this.prisma.post.findFirst({
      where: {
        id,
      },
    });
    if (!post) {
      throw new HttpException('post not found', HttpStatus.NOT_FOUND);
    }
    const postUpdate = await this.prisma.post.update({
      data: {
        urlImage: data.urlImage,
        title: data.title,
        content: data.content,
        description: data.description,
      },
      where: {
        id,
      },
    });
    return postUpdate;
  }

  async handleDelete(id: string): Promise<Post> {
    const user = await this.prisma.post.findFirst({
      where: {
        id,
      },
    });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return await this.prisma.post.delete({
      where: {
        id,
      },
    });
  }
}
