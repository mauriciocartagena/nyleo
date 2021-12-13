import { Resolver, Mutation, Arg, Query } from "type-graphql";
import { getConnection } from "typeorm";
import { Persona } from "../entities/Persona";
import { Estudiante } from "../entities/Estudiante";

@Resolver()
export class EstudianteResolver {
  @Query(() => [Persona])
  async estudiantes(): Promise<Persona[]> {
    const conn = getConnection();

    const estudiantes = await conn
      .createQueryBuilder(Persona, "persona")
      .innerJoin(
        Estudiante,
        "estudiante",
        "persona.id_persona = estudiante.id_persona"
      )
      .getMany();

    return estudiantes;
  }

  @Mutation(() => Persona)
  async crearEstudiante(
    @Arg("nombre") nombre: string,
    @Arg("primer_apellido") primer_apellido: string,
    @Arg("segundo_apellido") segundo_apellido: string,
    @Arg("dni") dni: string,
    @Arg("numero") numero: number,
    @Arg("email") email: string
  ): Promise<Persona | null | undefined> {
    const conn = getConnection();

    const persona = conn.manager.create(Persona, {
      nombre,
      primer_apellido,
      segundo_apellido,
      dni,
      numero,
      email,
    });

    const resp = await conn.manager.save(persona);

    if (resp) {
      await conn
        .createQueryBuilder()
        .insert()
        .into("estudiante")
        .values({
          id_persona: resp.id_persona,
        })
        .execute();

      return resp;
    } else {
      return null;
    }
  }
}
