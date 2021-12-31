import {
  Resolver,
  Mutation,
  Arg,
  Query,
  Int,
  ObjectType,
  Field,
} from "type-graphql";
import { getConnection } from "typeorm";
import { Persona } from "../entities/Persona";
import { Estudiante } from "../entities/Estudiante";
import { EstudianteInput } from "./EstudianteInput";
import { validateRegisterEstudiante } from "../utils/validateRegisterEstudiante";
import { EstudianteInputEditar } from "./EstudianteInputEditar";
import { validateEditarEstudiante } from "../utils/validateEditarEstudiante";

@ObjectType()
class FieldErrorEstudiante {
  @Field()
  field: string;

  @Field()
  message: string;
}

@ObjectType()
class EstudianteResponse {
  @Field(() => [FieldErrorEstudiante], { nullable: true })
  errors?: FieldErrorEstudiante[];

  @Field(() => Persona, { nullable: true })
  persona?: Persona;
}

@Resolver()
export class EstudianteResolver {
  @Query(() => [Persona])
  async estudiantes(): Promise<Persona[]> {
    const conn = getConnection();

    return conn
      .createQueryBuilder(Persona, "persona")
      .innerJoin(
        Estudiante,
        "estudiante",
        "persona.id_persona = estudiante.id_persona"
      )
      .getMany();
  }

  @Query(() => [Persona])
  async estudiante(
    @Arg("id_persona", () => Int) id_persona: number
  ): Promise<Persona[]> {
    const conn = getConnection();

    return conn
      .createQueryBuilder(Persona, "persona")
      .innerJoin(Estudiante, "estudiante", "persona.id_persona = " + id_persona)
      .getMany();
  }

  @Mutation(() => EstudianteResponse)
  async crearEstudiante(
    @Arg("input") input: EstudianteInput
  ): Promise<EstudianteResponse> {
    const conn = getConnection();

    const errors = validateRegisterEstudiante(input);

    if (errors) {
      return { errors };
    }

    try {
      const persona = conn.manager.create(Persona, input);

      const resp = await conn.manager.save(persona);

      await conn
        .createQueryBuilder()
        .insert()
        .into("estudiante")
        .values({
          id_persona: resp.id_persona,
        })
        .execute();

      return { persona: resp };
    } catch (error) {
      if (error.detail.includes("already exists")) {
        if (error.detail.includes("email")) {
          return {
            errors: [
              {
                field: "email",
                message: "El email ya está en uso",
              },
            ],
          };
        } else if (error.detail.includes("dni")) {
          return {
            errors: [
              {
                field: "dni",
                message: "El dni ya está en uso",
              },
            ],
          };
        }
      }
      return {
        errors: [
          {
            field: "Error",
            message: "Error al crear el estudiante",
          },
        ],
      };
    }
  }

  @Mutation(() => EstudianteResponse)
  async actualizarEstudiante(
    @Arg("input") input: EstudianteInputEditar
  ): Promise<EstudianteResponse> {
    const conn = getConnection();

    const errors = validateEditarEstudiante(input);

    // return if exist errors
    if (errors) {
      return { errors };
    }

    const estudiante = await conn
      .createQueryBuilder(Persona, "persona")
      .innerJoin(
        Estudiante,
        "estudiante",
        "persona.id_persona = " + input.id_persona
      )
      .getMany();

    if (!estudiante) {
      return {
        errors: [
          {
            field: "Error",
            message: "La persona no existe",
          },
        ],
      };
    }

    try {
      const response = await conn
        .createQueryBuilder()
        .update(Persona)
        .set(input)
        .where("id_persona = " + input.id_persona)
        .returning("*")
        .execute();

      return { persona: response.raw[0] };
    } catch (error) {
      if (error.detail.includes("already exists")) {
        if (error.detail.includes("email")) {
          return {
            errors: [
              {
                field: "email",
                message: "El email ya está en uso",
              },
            ],
          };
        } else if (error.detail.includes("dni")) {
          return {
            errors: [
              {
                field: "dni",
                message: "El dni ya está en uso",
              },
            ],
          };
        }
      }
      return {
        errors: [
          {
            field: "Error",
            message: "Error al actualizar el estudiante",
          },
        ],
      };
    }
  }

  @Mutation(() => Boolean)
  async eliminarEstudiante(
    @Arg("id_persona", () => Int) id_persona: number
  ): Promise<boolean> {
    const conn = getConnection();
    try {
      const estudiante = await conn
        .createQueryBuilder(Persona, "persona")
        .innerJoin(
          Estudiante,
          "estudiante",
          "persona.id_persona = " + id_persona
        )
        .getMany();

      conn.manager.delete(Persona, estudiante[0].id_persona);
    } catch {
      return false;
    }

    return true;
  }
}
