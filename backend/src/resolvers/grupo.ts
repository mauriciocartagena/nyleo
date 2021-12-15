import { Query, Arg, Int, Mutation } from "type-graphql";
import { Grupo } from "../entities/Grupo";
import { getConnection } from "typeorm";
import { Categoria } from "../entities/Categoria";
import { Turno } from "../entities/Turno";

export class GrupoResolver {
  @Query(() => [Grupo, { Categoria, Turno }])
  async grupos(): Promise<Grupo[]> {
    const conn = getConnection();

    const grupos = await conn.getRepository(Grupo).find({
      relations: ["id_categoria", "id_turno"],
    });

    return grupos;
  }

  @Query(() => Grupo, { nullable: true })
  async grupo(
    @Arg("id_grupo", () => Int) id_grupo: number
  ): Promise<Grupo | null | undefined> {
    const conn = getConnection();

    const resp = await conn.manager.findOne(Grupo, { id_grupo });

    return resp;
  }

  @Mutation(() => Grupo, { nullable: true })
  async crearGrupo(
    @Arg("fecha_inicio") fecha_inicio: Date,
    @Arg("fecha_final") fecha_final: Date,
    @Arg("dia_final") dia_final: string,
    @Arg("dia_inicio") dia_inicio: string,
    @Arg("id_categoria") id_categoria: number,
    @Arg("id_turno") id_turno: number
  ): Promise<Grupo | null> {
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
}
