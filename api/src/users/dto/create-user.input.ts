import { InputType, Field, registerEnumType } from '@nestjs/graphql';
import { UserRoles } from '../../common/roles';

registerEnumType(UserRoles, {
  name: "UserRoles"
});

@InputType()
export class CreateUserInput {
  
  @Field()
  email: string;

  @Field()
  password: string;

  @Field(() => [UserRoles], { nullable: true })
  roles: UserRoles[];
}
