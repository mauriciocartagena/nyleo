import { Arg, Ctx, Query, Resolver, Int, Mutation } from "type-graphql";
import { Categoria } from "../entities/Categoria";
import { MyContext } from "../types";

@Resolver()
export class CategoriaResolver {
  @Query(() => [Categoria])
  categorias(@Ctx() { em }: MyContext): Promise<Categoria[]> {
    return em.find(Categoria, {});
  }

  @Query(() => Categoria, { nullable: true })
  categoria(
    @Arg("id_categoria", () => Int) id_categoria: number,
    @Ctx() { em }: MyContext
  ): Promise<Categoria | null> {
    return em.findOne(Categoria, { id_categoria });
  }

  @Mutation(() => Categoria)
  async crearCategoria(
    @Arg("nombre") nombre: string,
    @Ctx() { em }: MyContext
  ): Promise<Categoria | null> {
    const categoria = em.create(Categoria, { nombre });
    await em.persistAndFlush(categoria);

    return categoria;
  }

  @Mutation(() => Categoria, { nullable: true })
  async actualizarCategoria(
    @Arg("id_categoria") id_categoria: number,
    @Arg("nombre", () => String, { nullable: true }) nombre: string,
    @Ctx() { em }: MyContext
  ): Promise<Categoria | null> {
    const categoria = await em.findOne(Categoria, { id_categoria });

    if (!categoria) {
      return null;
    }
    if (typeof nombre !== "undefined") {
      categoria.nombre = nombre;
      await em.persistAndFlush(categoria);
    }
    return categoria;
  }

  @Mutation(() => Boolean)
  async eliminarCategoria(
    @Arg("id_categoria") id_categoria: number,

    @Ctx() { em }: MyContext
  ): Promise<boolean> {
    try {
      em.nativeDelete(Categoria, { id_categoria });
    } catch {
      return false;
    }

    return true;
  }
}
