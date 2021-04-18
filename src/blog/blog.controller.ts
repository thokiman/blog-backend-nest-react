// Controller ~ connection between CRUD operation controller and database connection
// Controller <= Provider

// Create a new controller
// "nest generate controller blog" => output: blog.controller.ts and blog.controller.spec.ts 
// Controllers in Nest.js are meant to receive incoming HTTP requests from an application frontend 
// and return an appropriate response.
// This will ensure that the controller is not bloated 
// as most of the business logic has been abstracted to a service.

import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Param,
    Body,
    Query,
    NotFoundException,
    HttpStatus,
    Res
} from '@nestjs/common';
// @Controller is a TypeScript file decorated with @Controller metadata,
//  as it is obtainable for every controller created in Nest.js.
import { BlogService } from './blog.service'

import { CreatePostDTO } from './dto/create-post.dto'

import { ValidateObjectId } from './shared/pipes/validate-object-id.pipes'

//  To have access to all the functions declared within the BlogService earlier,
//  you injected it into the controller via a constructor.
//  This is a pattern regarded as "dependency injection" used in Nest.js 
//  to increase efficiency and enhance the modularity of the application.

@Controller('blog')
export class BlogController {
    constructor(private blogService: BlogService) { }


    //fetch all photos
    @Get('posts')
    async getPosts(@Res() res) {
        const posts = await this.blogService.getPosts()
        return res.status(HttpStatus.OK).json(posts)
    }

    // fetch a particular post using id
    @Get('/post/:postID')
    async getPost(@Res() res, @Param('postID', new ValidateObjectId()) postID) {
        const post = await this.blogService.getPost(postID)

        if (!post) {
            throw new NotFoundException('Post does not exist!')

        }
        return res.status(HttpStatus.OK).json(post)
    }
    //submit a post
    @Post('/post')
    async addPost(@Res() res, @Body() createPostDTO: CreatePostDTO) {
        const newPost = await this.blogService.addPost(createPostDTO)
        return res.status(HttpStatus.OK).json({
            message: 'Post has been submitted successfully',
            post: newPost
            //  template html: post
            //  variable value: newPost
        })
    }

    // update the post
    @Put('/edit')
    async editPost(@Res() res, @Query('postID', new ValidateObjectId()) postID, @Body() createPostDTO: CreatePostDTO) {
        const editedPost = await this.blogService.editPost(postID, createPostDTO)

        if (!editedPost) {
            throw new NotFoundException('Post does not exist')
        }
        return res.status(HttpStatus.OK).json({
            message: 'Post has been successfully updated',
            post: editedPost
        })
    }
    // delete the post
    @Delete('/delete')
    async deletePost(@Res() res, @Query('postID', new ValidateObjectId()) postID) {
        const deletedPost = await this.blogService.deletePost(postID)
        if (!deletedPost) {
            throw new NotFoundException('Post does not exist')
        }
        return res.status(HttpStatus.OK).json({
            message: 'Post has been deleted!',
            post: deletedPost
        })
    }
}

// you imported all the necessary modules to handle HTTP requests from @nestjs/common module.


// getPosts(): 
// This method will carry out the functionality of receiving an HTTP GET request from the client to fetch all posts from the database 
// and then return the appropriate response.It is decorated with a @Get('posts').

// getPost():
// This takes a postID as a parameter and fetches a single post from the database.
// In addition to the postID parameter passed to this method, you realized the addition of an extra method named ValidateObjectId().
// This method "implements the PipeTransform" interface from Nest.js.
// Its purpose is to validate and ensure that the postID parameter can be found in the database.
// You will define this method in the next section.

// addPost(): 
// This method will handle a POST HTTP request to add a new post to the database.

// editPost(): This method accepts a query parameter of postID 
// and will carry out the functionality of updating a single post.
// It also made use of the ValidateObjectId method 
// to provide proper validation for the post that you need to edit.

// deletePost(): This method will accept a query parameter of postID and will delete a particular post from the database.


// Similarly to the BlogController, 
// each of the asynchronous methods you have defined here has a metadata decorator 
// and takes in a prefix that Nest.js uses as a routing mechanism
// It controls which controller receives which requests 
// and points to the methods that should process the request and return a response, respectively.

// For example, the BlogController that you have created in this section has a prefix of blog 
// and a method named getPosts() that takes in a prefix of posts.
// This means that any GET request sent to an endpoint of blog / posts(http: localhost: 3000 / blog / posts) 
// will be handled by the getPosts()method.This example is similar to how other methods will handle HTTP requests.