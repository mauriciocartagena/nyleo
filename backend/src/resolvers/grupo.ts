import { Query, Arg, Int, Mutation, Resolver } from "type-graphql";
import { Grupo } from "../entities/Grupo";
import { getConnection } from "typeorm";
import { Categoria } from "../entities/Categoria";
import { Turno } from "../entities/Turno";
@Resolver()
export class GrupoResolver {
  @Query(() => [Grupo, { Categoria, Turno }])
  async grupos(): Promise<Grupo[]> {
    const conn = getConnection();

    return conn.getRepository(Grupo).find({
      relations: ["id_categoria", "id_turno"],
    });
  }

  @Query(() => Grupo, { nullable: true })
  async grupo(
    @Arg("id_grupo", () => Int) id_grupo: number
  ): Promise<Grupo | null | undefined> {
    const conn = getConnection();

    return conn.manager.findOne(Grupo, { id_grupo });
  }

  @Mutation(() => Grupo, { nullable: true })
  async crearGrupo(
    @Arg("fecha_inicio") fecha_inicio: Date,
    @Arg("fecha_final") fecha_final: Date,
    @Arg("dia_final") dia_final: string,
    @Arg("dia_inicio") dia_inicio: string,
    @Arg("id_categoria", () => Int) id_categoria: number,
    @Arg("id_turno", () => Int) id_turno: number
  ): Promise<Grupo[]> {
    const conn = getConnection();

    const grupo = await conn
      .createQueryBuilder()
      .insert()
      .into("grupo")
      .values({
        fecha_inicio,
        fecha_final,
        dia_inicio,
        dia_final,
        id_categoria,
        id_turno,
      })
      .execute();

    return grupo.raw[0];
  }

  @Mutation(() => [Grupo])
  async actualizarGrupo(
    @Arg("id_grupo", () => Int) id_grupo: number,
    @Arg("fecha_inicio") fecha_inicio: Date,
    @Arg("fecha_final") fecha_final: Date,
    @Arg("dia_inicio") dia_inicio: string,
    @Arg("dia_final") dia_final: string,
    @Arg("id_categoria", () => Int) id_categoria: number,
    @Arg("id_turno", () => Int) id_turno: number
  ): Promise<Grupo[] | null> {
    const conn = getConnection();

    let grupo;

    if (
      typeof id_grupo !== "undefined" &&
      id_grupo !== null &&
      id_categoria !== null &&
      id_turno !== null &&
      fecha_inicio !== null &&
      fecha_final !== null &&
      dia_inicio !== "" &&
      dia_final !== ""
    ) {
      grupo = await conn
        .createQueryBuilder()
        .update("Grupo")
        .set({
          fecha_inicio,
          fecha_final,
          dia_inicio,
          dia_final,
          id_categoria: id_categoria,
          id_turno: id_turno,
        })
        .where("id_grupo = :id_grupo", { id_grupo })
        .returning("*")
        .execute();

      return grupo.raw;
    }

    return null;
  }
  @Mutation(() => Boolean)
  async eliminarGrupo(
    @Arg("id_grupo", () => Int) id_grupo: number
  ): Promise<boolean> {
    const conn = getConnection();
    try {
      await conn.manager.delete(Grupo, { id_grupo });
    } catch {
      return false;
    }

    return true;
  }
}
