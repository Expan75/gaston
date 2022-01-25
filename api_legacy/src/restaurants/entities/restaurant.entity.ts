import {
    Entity,
    Property,
    Collection,
    OneToMany,
    ManyToOne,
} from 'mikro-orm';
import {
    IsEmail,
    IsMobilePhone,
} from 'class-validator';
import { BaseEntity } from '../../util/base.entity';

@Entity({ tableName: 'restaurants' })
export class Restaurant extends BaseEntity {
    @Property()
    name!: string;

    @Property()
    address!: string;

    @Property()
    @IsMobilePhone()
    phone?: string;

    @Property()
    @IsEmail()
    email?: string;

    @OneToMany('Menu', 'restaurant')
    menus = new Collection<Menu>(this);
};

@Entity({ tableName: 'menus' })
export class Menu extends BaseEntity {
    @Property()
    name!: string;

    @Property()
    description!: string;

    @ManyToOne({ entity: () => Restaurant, eager: false, nullable: false })
    restaurant: Restaurant;
};