import { Resolver, Mutation, Arg, Query, Int } from "type-graphql";
import { getConnection } from "typeorm";
import { Persona } from "../entities/Persona";
import { Estudiante } from "../entities/Estudiante";

@Resolver()
export class EstudianteResolver {
  @Query(() => [Persona])
  async estudiantes(): Promise<Persona[]> {
    const conn = getConnection();

    return conn.createQueryBuilder(Persona, "persona").innerJoin(Estudiante, "estudiante", "persona.id_persona = estudiante.id_persona").getMany();
  }

  @Query(() => [Persona])
  async estudiante(@Arg("id_persona", () => Int) id_persona: number): Promise<Persona[]> {
    const conn = getConnection();

    return conn
      .createQueryBuilder(Persona, "persona")
      .innerJoin(Estudiante, "estudiante", "persona.id_persona = " + id_persona)
      .getMany();
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

  @Mutation(() => [Persona], { nullable: true })
  async actualizarEstudiante(
    @Arg("id_persona") id_persona: number,
    @Arg("nombre", () => String) nombre: string,
    @Arg("primer_apellido", () => String)
    primer_apellido: string,
    @Arg("segundo_apellido", () => String, { nullable: true })
    segundo_apellido: string,
    @Arg("dni", () => String) dni: string,
    @Arg("numero", () => Number) numero: number,
    @Arg("email", () => String) email: string
  ): Promise<Persona[] | null> {
    const conn = getConnection();

    const estudiante = await conn
      .createQueryBuilder(Persona, "persona")
      .innerJoin(Estudiante, "estudiante", "persona.id_persona = " + id_persona)
      .getMany();

    if (!estudiante) {
      return null;
    }
    if (
      typeof nombre !== "undefined" &&
      nombre !== "" &&
      nombre !== null &&
      primer_apellido !== "" &&
      primer_apellido !== null &&
      dni !== "" &&
      dni !== null &&
      numero !== null &&
      email !== "" &&
      email !== null
    ) {
      estudiante[0].nombre = nombre;
      estudiante[0].primer_apellido = primer_apellido;
      estudiante[0].segundo_apellido = segundo_apellido;
      estudiante[0].dni = dni;
      estudiante[0].numero = numero;
      estudiante[0].email = email;

      await conn.manager.update(Persona, { id_persona }, estudiante[0]);
    }
    return estudiante;
  }

  @Mutation(() => Boolean)
  async eliminarEstudiante(@Arg("id_persona") id_persona: number): Promise<boolean> {
    const conn = getConnection();
    try {
      const estudiante = await conn
        .createQueryBuilder(Persona, "persona")
        .innerJoin(Estudiante, "estudiante", "persona.id_persona = " + id_persona)
        .getMany();

      conn.manager.delete(Persona, estudiante[0].id_persona);
    } catch {
      return false;
    }

    return true;
  }
}
