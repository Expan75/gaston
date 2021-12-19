import {
  Entity,
  Property,
  PrimaryKey,
  Unique,
  Collection,
  ManyToOne,
  OneToMany,
} from 'mikro-orm';
import {
  IsIn,
  IsEmail,
  IsMobilePhone,
  IsLocale,
  IsUUID,
} from 'class-validator';

export enum Role {
  ADMIN = 'admin',
  OWNER_EDIT = 'ownerEdit', // billing information and invites of new staff members.
  OWNER_READ = 'ownerRead', // full visibility of every resturant resource.
  STAFF_EDIT = 'staffEdit', // changes of menu items, their prices, and how they are displayed.
  STAFF_READ = 'staffRead', // staff only menu information
  GUEST = 'guest', // normal user that can look at menus
}

export const supportedLanguages = ['svenska', 'english'];

@Entity({ abstract: true })
export abstract class BaseEntity {
  @PrimaryKey()
  id: number;

  @Property({ type: 'uuid', defaultRaw: 'uuid_generate_v4()' })
  @Unique()
  @IsUUID()
  uuid: string;

  @Property()
  createdAt: Date = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt: Date = new Date();
}

@Entity({ tableName: 'restaurants' })
export class Restaurant extends BaseEntity {
  @Property()
  name!: string;

  @Property()
  address!: string;

  @OneToMany('User', 'restaurant')
  users = new Collection<User>(this);
}

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
}
