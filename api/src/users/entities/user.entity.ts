import {
  Entity,
  Property,
  Unique,
  ManyToOne,
} from 'mikro-orm';
import {
  IsIn,
  IsEmail,
  IsMobilePhone,
  IsLocale,
} from 'class-validator';
import { BaseEntity } from '../../util/base.entity';
import { Restaurant } from '../../restaurants/entities/restaurant.entity';

export const supportedLanguages = ['svenska', 'english'];
export enum Role {
  ADMIN = 'admin',
  OWNER_EDIT = 'ownerEdit', // billing information and invites of new staff members.
  OWNER_READ = 'ownerRead', // full visibility of every resturant resource.
  STAFF_EDIT = 'staffEdit', // changes of menu items, their prices, and how they are displayed.
  STAFF_READ = 'staffRead', // staff only menu information
  GUEST = 'guest', // normal user that can look at menus
};

@Entity({ tableName: 'users' })
export class User extends BaseEntity {
  @Property()
  @Unique()
  @IsEmail()
  email!: string;

  @Property({ default: Role.GUEST })
  role: Role;

  @Property()
  password!: string;

  @ManyToOne({ entity: () => Restaurant, eager: true, nullable: true })
  restaurant: Restaurant;

  @Property()
  name?: string;

  @Property()
  @IsMobilePhone()
  phone?: string;

  @Property()
  address?: string;

  @Property()
  @IsLocale()
  locale?: string;

  @Property({ default: 'english' })
  @IsIn(supportedLanguages)
  language!: string;

  @Property()
  deletedAt?: Date;
};
