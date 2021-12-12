import { Migration } from '@mikro-orm/migrations';

export class Migration20211212073152 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "categoria" rename column "id_categia" to "id_categoria";');
  }

}
