import { PartialType } from '@nestjs/mapped-types';
import { CreateOurWorkDto } from './create-our-work.dto';

export class UpdateOurWorkDto extends PartialType(CreateOurWorkDto) {}
