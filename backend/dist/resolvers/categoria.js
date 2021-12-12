"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriaResolver = void 0;
const type_graphql_1 = require("type-graphql");
const Categoria_1 = require("../entities/Categoria");
let CategoriaResolver = class CategoriaResolver {
    categorias({ em }) {
        return em.find(Categoria_1.Categoria, {});
    }
    categoria(id_categoria, { em }) {
        return em.findOne(Categoria_1.Categoria, { id_categoria });
    }
    async crearCategoria(nombre, { em }) {
        const categoria = em.create(Categoria_1.Categoria, { nombre });
        await em.persistAndFlush(categoria);
        return categoria;
    }
    async actualizarCategoria(id_categoria, nombre, { em }) {
        const categoria = await em.findOne(Categoria_1.Categoria, { id_categoria });
        if (!categoria) {
            return null;
        }
        if (typeof nombre !== "undefined") {
            categoria.nombre = nombre;
            await em.persistAndFlush(categoria);
        }
        return categoria;
    }
    async eliminarCategoria(id_categoria, { em }) {
        try {
            em.nativeDelete(Categoria_1.Categoria, { id_categoria });
        }
        catch (_a) {
            return false;
        }
        return true;
    }
};
__decorate([
    (0, type_graphql_1.Query)(() => [Categoria_1.Categoria]),
    __param(0, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CategoriaResolver.prototype, "categorias", null);
__decorate([
    (0, type_graphql_1.Query)(() => Categoria_1.Categoria, { nullable: true }),
    __param(0, (0, type_graphql_1.Arg)("id_categoria", () => type_graphql_1.Int)),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], CategoriaResolver.prototype, "categoria", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Categoria_1.Categoria),
    __param(0, (0, type_graphql_1.Arg)("nombre")),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], CategoriaResolver.prototype, "crearCategoria", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Categoria_1.Categoria, { nullable: true }),
    __param(0, (0, type_graphql_1.Arg)("id_categoria")),
    __param(1, (0, type_graphql_1.Arg)("nombre", () => String, { nullable: true })),
    __param(2, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, Object]),
    __metadata("design:returntype", Promise)
], CategoriaResolver.prototype, "actualizarCategoria", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)("id_categoria")),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], CategoriaResolver.prototype, "eliminarCategoria", null);
CategoriaResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], CategoriaResolver);
exports.CategoriaResolver = CategoriaResolver;
//# sourceMappingURL=categoria.js.map