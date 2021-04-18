// Module ~ application structure organized
// Module <= Provider, Controller


//1. Module in Nest.js is a class annotated with a @Module() decorator.
// It helps to keep the application structure organized. 
// It is recommended by Nest.js that each application should have at least one module,
// mostly the root module

// you will use the nest command to generate a module for your application.
// To do that, ensure that you are still within the blog-backend directory and execute the following command:
// nest generate module blog => output: @blog.module.ts file

// The command above will generate a new module named blog.module.ts 
// for the application and update the root module for it by automatically importing the newly created BlogModule.
//With this in place, Nest.js will be aware of another module within the application besides the root module.

import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
// from nest generate service blog: it has also automatically imported the newly created service and added it to the blog.module.ts.
import { BlogService } from './blog.service';
import { BlogController } from './blog.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { BlogSchema } from './schemas/blog.schema';
import { AuthenticationMiddleware } from 'src/common/authentication.middleware';

@Module({
    imports: [MongooseModule.forFeature([{ name: 'Post', schema: BlogSchema }])],
    providers: [BlogService],
    controllers: [BlogController]
})
export class BlogModule implements NestModule {
    configure(consumer: MiddlewareConsumer): MiddlewareConsumer | void {
        consumer.apply(AuthenticationMiddleware).forRoutes(
            {
                method: RequestMethod.POST, path: '/blog/post'
            },
            {
                method: RequestMethod.PUT, path: '/blog/edit'
            },
            {
                method: RequestMethod.DELETE, path: '/blog/delete'
            }
        )
    }
}

// 2.
// After creating both the service and controller, you need to set up the Post model that is based on the BlogSchema.
// This configuration could be set up within the root ApplicationModule, 
// but in this instance building, the model in BlogModule will maintain your application’s organization.

// This module uses the MongooseModule.forFeature() method 
// to define which models should be registered in the module.
// Without this, injecting the PostModel within the BlogService using @injectModel() decorator wouldn’t work.

// 3.
// With this implementation, any subsequent requests without an Access Token 
// to the following routes will not be allowed by the application:

// GET / blog / post
// PUT / blog / edit
// DELETE / blog / delete

