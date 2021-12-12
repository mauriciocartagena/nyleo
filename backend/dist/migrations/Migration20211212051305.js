"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migration20211212051305 = void 0;
const migrations_1 = require("@mikro-orm/migrations");
class Migration20211212051305 extends migrations_1.Migration {
    async up() {
        this.addSql('create table "post" ("id" serial primary key, "title" varchar(255) not null);');
    }
}
exports.Migration20211212051305 = Migration20211212051305;
//# sourceMappingURL=Migration20211212051305.js.map