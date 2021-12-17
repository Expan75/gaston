import { Migration } from '@mikro-orm/migrations';

export class Migration20211216232902 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "restaurants" ("id" serial primary key, "uuid" uuid not null default uuid_generate_v4(), "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "name" varchar(255) not null, "address" varchar(255) not null);');
    this.addSql('alter table "restaurants" add constraint "restaurants_uuid_unique" unique ("uuid");');

    this.addSql('create table "users" ("id" serial primary key, "uuid" uuid not null default uuid_generate_v4(), "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "email" varchar(255) not null, "role" varchar(255) not null default \'guest\', "password" varchar(255) not null, "restaurant_id" int4 null, "name" varchar(255) not null, "phone" varchar(255) not null, "address" varchar(255) not null, "locale" varchar(255) not null, "language" varchar(255) not null default \'english\', "deleted_at" timestamptz(0) not null);');
    this.addSql('alter table "users" add constraint "users_uuid_unique" unique ("uuid");');
    this.addSql('alter table "users" add constraint "users_email_unique" unique ("email");');

    this.addSql('alter table "users" add constraint "users_restaurant_id_foreign" foreign key ("restaurant_id") references "restaurants" ("id") on update cascade on delete set null;');

    this.addSql('alter table "users" add constraint "users_email_unique" unique ("email");');
  }

}
