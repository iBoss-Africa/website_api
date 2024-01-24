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

  //  reset Password Validation
export const ResetPasswordSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    newPassword: Joi.string().required()
}).options({
    abortEarly: false,
  });

  //   ourService Validation
export const OurServiceSchema = Joi.object({
    title: Joi.string(),
    description: Joi.string(),
    image: Joi.string().uri(),
    id: Joi.any(),
    email: Joi.any(),
    name: Joi.any(),
    password: Joi.any(),
    createdAt: Joi.any(),
    updatedAt: Joi.any(),
    role: Joi.any(),
}).options({
    abortEarly: false,
  });


@Injectable()
export class userValidation implements PipeTransform {
    constructor(private readonly schema: Joi.ObjectSchema){}

    transform(value: any, metadata: ArgumentMetadata) {
        const { error } = this.schema.validate(value, { abortEarly: false });
     
        if (error) {
          throw new BadRequestException('Validation failed', error.toString());
      }
        return value;
    }
}