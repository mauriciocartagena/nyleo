import { Curso } from "../entities/Curso";
import { Arg, Int, Mutation, Query, Resolver } from "type-graphql";
import { getConnection } from "typeorm";

@Resolver()
export class CursoResolver {
  @Query(() => [Curso])
  async cursos(): Promise<Curso[]> {
    const conn = getConnection();
    const resp = conn.getRepository(Curso).find({
      relations: ["id_grupo", "id_persona"],
    });

    console.log(resp);
    return resp;
  }
  @Query(() => Curso, { nullable: true })
  async curso(
    @Arg("id_curso", () => Int) id_curso: number
  ): Promise<Curso | null | undefined> {
    const conn = getConnection();

    return conn.getRepository(Curso).findOne({
      relations: ["id_grupo", "id_persona"],
      where: { id_curso },
    });
  }
  @Mutation(() => Curso)
  async crearCurso(
    @Arg("id_persona", () => Int) id_persona: number,
    @Arg("id_grupo", () => Int) id_grupo: number
  ): Promise<Curso | null> {
    const conn = getConnection();
    const curso = await conn
      .createQueryBuilder()
      .insert()
      .into("curso")
      .values({
        id_persona,
        id_grupo,
      })
      .execute();

    return curso.raw[0];
  }
  @Mutation(() => Curso)
  async actualizarCurso(
    @Arg("id_curso", () => Int) id_curso: number,
    @Arg("id_persona", () => Int) id_persona: number,
    @Arg("id_grupo", () => Int) id_grupo: number
  ): Promise<Curso> {
    const conn = getConnection();
    const curso = await conn
      .createQueryBuilder()
      .update("curso")
      .set({
        id_persona,
        id_grupo,
      })
      .where("id_curso = :id_curso", { id_curso })
      .returning("*")
      .execute();

    return curso.raw[0];
  }
  @Mutation(() => Boolean)
  async eliminarCurso(
    @Arg("id_curso", () => Int) id_curso: number
  ): Promise<boolean> {
    const conn = getConnection();
    try {
      await conn.manager.delete(Curso, { id_curso });
    } catch {
      return false;
    }

    return true;
  }
}
