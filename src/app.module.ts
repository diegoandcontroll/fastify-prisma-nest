import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { PostModule } from './post/post.module';

@Module({
  imports: [ConfigModule.forRoot(), UsersModule, PostModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
