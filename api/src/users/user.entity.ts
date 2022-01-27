import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from 'mongoose';

@ObjectType()
@Schema({ timestamps: true })
export class User {
  @Field(() => ID, { nullable: true })
  id: string;

  @Field()
  @Prop()
  email: string;

  @Field()
  @Prop()
  password: string;

  // required to name the corresponding collection
  get name(): string { return this.email }
};

export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);