"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migration20211212071644 = void 0;
const migrations_1 = require("@mikro-orm/migrations");
class Migration20211212071644 extends migrations_1.Migration {
    async up() {
        this.addSql('create table "categoria" ("id_categia" serial primary key, "nombre" text not null);');
    }
}
exports.Migration20211212071644 = Migration20211212071644;
//# sourceMappingURL=Migration20211212071644.js.map