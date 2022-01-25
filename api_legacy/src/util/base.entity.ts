import {
    Entity,
    Property,
    PrimaryKey,
    Unique,
} from 'mikro-orm';
import { IsUUID } from 'class-validator';

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