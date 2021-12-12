import { Migration } from '@mikro-orm/migrations';

export class Migration20211212071644 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "categoria" ("id_categia" serial primary key, "nombre" text not null);');
  }

}
