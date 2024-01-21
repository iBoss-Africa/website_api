import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import * as Joi from 'joi';

export const UserSchema = Joi.object({
    email: Joi.string().email().required(),
    name: Joi.string().required(),
    password: Joi.string().required()
}).options({
    abortEarly: false,
   });

  //  Login Validation
export const LoginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
}).options({
    abortEarly: false,
   });


@Injectable()
export class userValidation implements PipeTransform {
    constructor(private readonly schema: Joi.ObjectSchema){}

    transform(value: any, metadata: ArgumentMetadata) {
        const { error } = this.schema.validate(value, { abortEarly: false });
     
        if (error) {
          throw new BadRequestException('Validation failed', error.message);
        }
     
        return value;
      }

}