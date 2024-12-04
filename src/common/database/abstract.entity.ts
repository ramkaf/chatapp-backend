import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema()
@ObjectType({isAbstract : true})
export abstract class AbstractEntity {
  @Prop({ type: Types.ObjectId })
  @Field(()=> ID)
  _id: Types.ObjectId;
}
