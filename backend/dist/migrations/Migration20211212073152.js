"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migration20211212073152 = void 0;
const migrations_1 = require("@mikro-orm/migrations");
class Migration20211212073152 extends migrations_1.Migration {
    async up() {
        this.addSql('alter table "categoria" rename column "id_categia" to "id_categoria";');
    }
}
exports.Migration20211212073152 = Migration20211212073152;
//# sourceMappingURL=Migration20211212073152.js.map