import { ObjectType, Field, ID, GraphQLISODateTime, registerEnumType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';
import { UserRoles } from '../common/roles';

// required for proper type conversion: https://docs.nestjs.com/graphql/unions-and-enums#schema-first
registerEnumType(UserRoles, {
  name: "UserRoles"
});

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

  // TODO: fix type issues
  @Field(() => UserRoles[])
  @Prop({ type: [SchemaTypes.String] })
  roles: UserRoles[];

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