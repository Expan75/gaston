import { ObjectType, Field, ID, GraphQLISODateTime } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

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

  @Field(() => GraphQLISODateTime, { nullable: true })
  @Prop()
  createdAt: Date;

  @Field(() => GraphQLISODateTime, { nullable: true })
  @Prop()
  updatedAt: Date;

  // required to name the corresponding collection
  get name(): string { return this.email }
};

export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);