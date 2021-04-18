// Provider ~ database connection
// Provider <= interface, schema, dto

// Here you will generate a service, also known as a provider,
// and afterward, you will create a controller to handle all HTTP requests from the application.
// Services in Nest.js are meant only to handle any complex business logic 
// for a specific purpose and return the appropriate response to the controller.

// Create service
// Run the following command while you are still within the project directory 
// to generate a new service file: "nest generate service blog" => output: @blog.service.ts

// blog.service.spec.ts file, which you can use for testing

// blog.service.ts file, which will hold all the logic for this application 
// and then communicate with the MongoDB database by adding and retrieving data from it

// replace its default contents with the following code with methods 
// for creating a post, retrieving all created posts, 
// and fetching the details of a single post from the database:

// The @Injectable() decorator attaches metadata, 
// which declares that BlogService is a class that can be managed by the Nest IoC container

import { Injectable } from '@nestjs/common';

import { Model } from 'mongoose'

import { InjectModel } from '@nestjs/mongoose'

import { Post } from './interfaces/post.interface'

import { CreatePostDTO } from './dto/create-post.dto'

@Injectable()
export class BlogService {
    constructor(@InjectModel('Post') private readonly postModel: Model<Post>) { }
    //you added @InjectModel('Post'), which will inject the Post model into this BlogService class. 
    // Post ~ "posts" collection in mongodb
    async getPost(postID): Promise<Post> {
        const post = await this.postModel.findById(postID).exec()
        return post
    }
    async addPost(createPostDTO: CreatePostDTO): Promise<Post> {
        const newPost = new this.postModel(createPostDTO);
        return newPost.save()
    }
    async getPosts(): Promise<Post[]> {
        const posts = await this.postModel.find().exec()
        return posts
    }
    async editPost(postID, createPostDTO: CreatePostDTO): Promise<Post> {
        const editedPost = await this.postModel.findByIdAndUpdate(postID, createPostDTO, { new: true })
        return editedPost
    }
    async deletePost(postID): Promise<any> {
        const deletedPost = await this.postModel.findByIdAndRemove(postID)
        return deletedPost
    }
}


// All the methods created above will help facilitate proper interaction with the MongoDB database from the backend API.
// You can now proceed to create the required routes that will handle HTTP calls from a front - end client.