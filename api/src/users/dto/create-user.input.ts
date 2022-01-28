import { InputType, Field, registerEnumType } from '@nestjs/graphql';
import { IsEmail } from 'class-validator';
import { UserRoles } from '../../common/roles';

registerEnumType(UserRoles, {
  name: "UserRoles"
});

@InputType()
export class CreateUserInput {
  
  @Field()
  @IsEmail()
  email: string;

  @Field()
  password: string;

  @Field(() => [UserRoles], { nullable: true })
  roles: UserRoles[];
}