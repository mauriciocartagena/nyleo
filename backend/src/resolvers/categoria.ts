import { Arg, Query, Resolver, Int, Mutation } from "type-graphql";
import { Categoria } from "../entities/Categoria";
import { getConnection } from "typeorm";

@Resolver()
export class CategoriaResolver {
  @Query(() => [Categoria])
  async categorias(): Promise<Categoria[]> {
    const conn = getConnection();
    const resp = await conn.manager.find(Categoria);

    return resp;
  }

  @Query(() => Categoria, { nullable: true })
  categoria(
    @Arg("id_categoria", () => Int) id_categoria: number
  ): Promise<Categoria | null | undefined> {
    const conn = getConnection();

    const resp = conn.manager.findOne(Categoria, { id_categoria });
    return resp;
  }

  @Mutation(() => Categoria)
  async crearCategoria(
    @Arg("nombre") nombre: string
  ): Promise<Categoria | null> {
    const conn = getConnection();

    const categoria = conn.manager.create(Categoria, { nombre });

    const resp = await conn.manager.save(categoria);

    return resp;
  }

  @Mutation(() => Categoria, { nullable: true })
  async actualizarCategoria(
    @Arg("id_categoria") id_categoria: number,
    @Arg("nombre", () => String, { nullable: true }) nombre: string
  ): Promise<Categoria | null> {
    const conn = getConnection();

    const categoria = await conn.manager.findOne(Categoria, { id_categoria });

    if (!categoria) {
      return null;
    }
    if (typeof nombre !== "undefined") {
      categoria.nombre = nombre;

      await conn.manager.update(Categoria, { id_categoria }, categoria);
    }
    return categoria;
  }

  @Mutation(() => Boolean)
  async eliminarCategoria(
    @Arg("id_categoria") id_categoria: number
  ): Promise<boolean> {
    const conn = getConnection();
    try {
      conn.manager.delete(Categoria, { id_categoria });
    } catch {
      return false;
    }

    return true;
  }
}
