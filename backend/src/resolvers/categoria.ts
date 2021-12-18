import { Arg, Query, Resolver, Int, Mutation } from "type-graphql";
import { getConnection } from "typeorm";
import { Categoria } from "../entities/Categoria";

@Resolver()
export class CategoriaResolver {
  @Query(() => [Categoria])
  async categorias(): Promise<Categoria[]> {
    const conn = getConnection();

    return conn.manager.find(Categoria);
  }

  @Query(() => Categoria, { nullable: true })
  async categoria(
    @Arg("id_categoria", () => Int) id_categoria: number
  ): Promise<Categoria | null | undefined> {
    const conn = getConnection();

    return conn.manager.findOne(Categoria, { id_categoria });
  }

  @Mutation(() => Categoria)
  async crearCategoria(
    @Arg("nombre") nombre: string
  ): Promise<Categoria | null> {
    const conn = getConnection();

    const categoria = conn.manager.create(Categoria, { nombre });

    return conn.manager.save(categoria);
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
      await conn.manager.delete(Categoria, { id_categoria });
    } catch {
      return false;
    }

    return true;
  }
}
