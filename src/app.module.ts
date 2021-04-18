import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { MongooseModule } from '@nestjs/mongoose'
import { BlogModule } from './blog/blog.module';
//forRoot() method to supply the connection to the database
@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/nest-blog-backend', { useNewUrlParser: true }),
    BlogModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
