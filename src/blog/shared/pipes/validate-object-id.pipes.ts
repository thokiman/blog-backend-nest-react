// the following content to define the accepted postID data

import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common'

import * as mongoose from 'mongoose'

@Injectable()
export class ValidateObjectId implements PipeTransform<string> {
    async transform(value: string, metadata: ArgumentMetadata) {
        const isValid = mongoose.Types.ObjectId.isValid(value)
        if (!isValid) {
            throw new BadRequestException('Invalid ID!')
        }
        return value
    }
}

// The ValidateObjectId() class implements the "PipeTransform" method from the @nestjs/common module.
//  It has a single method named transform() that takes in value as a parameter — postID in this case.
//  With the method above, any HTTP request from the frontend of this application 
// with a postID that can’t be found in the database will be regarded as invalid.