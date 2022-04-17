import {
  Arg,
  Query,
  Resolver,
  Int,
  Mutation,
  Field,
  ObjectType,
} from "type-graphql";
import { getConnection } from "typeorm";
import { Turno } from "../entities/Turno";
import { validateRegisterTurno } from "../utils/validateRegisterTurno";
import { TurnoInputEditar } from "./Inputs/Turno/TurnoInputEditar";
import { validateEditarTurno } from "../utils/validateEditarTurno";
import { TurnoInput } from "./Inputs/turno/TurnoInput";

@ObjectType()
class FieldErrorTurno {
  @Field()
  field: string;
  @Field()
  message: string;
}

@ObjectType()
class TurnoResponse {
  @Field(() => [FieldErrorTurno], { nullable: true })
  errors?: FieldErrorTurno[];

  @Field(() => Turno, { nullable: true })
  turno?: Turno;
}

@Resolver()
export class TurnoResolver {
  @Query(() => [Turno])
  async turnos(): Promise<Turno[]> {
    const conn = getConnection();

    return conn.manager.find(Turno);
  }

  @Query(() => Turno, { nullable: true })
  async turno(
    @Arg("id_turno", () => Int) id_turno: number
  ): Promise<Turno | null | undefined> {
    const conn = getConnection();

    return conn.manager.findOne(Turno, { id_turno });
  }

  @Mutation(() => TurnoResponse)
  async crearTurno(@Arg("input") input: TurnoInput): Promise<TurnoResponse> {
    const conn = getConnection();

    const errors = validateRegisterTurno(input);

    if (errors) {
      return { errors: errors };
    }

    try {
      const turno = conn.manager.create(Turno, input);

      const resp = await conn.manager.save(Turno, turno);

      return { turno: resp };
    } catch (error) {
      if (error.detail.includes("already exists")) {
        if (error.detail.includes("nombre")) {
          return {
            errors: [
              {
                field: "nombre",
                message: "El nombre ya existe",
              },
            ],
          };
        }
      }
      return {
        errors: [
          {
            field: "Error",
            message: "Error al crear el turno",
          },
        ],
      };
    }
  }

  @Mutation(() => TurnoResponse)
  async actualizarTurno(
    @Arg("input") input: TurnoInputEditar
  ): Promise<TurnoResponse> {
    const conn = getConnection();

    const errors = validateEditarTurno(input);

    if (errors) {
      return { errors: errors };
    }

    const turno = await conn.manager.findOne(Turno, {
      id_turno: input.id_turno,
    });

    if (!turno) {
      return {
        errors: [
          {
            field: "Error",
            message: "El turno no existe",
          },
        ],
      };
    }

    try {
      const response = await conn
        .createQueryBuilder()
        .update(Turno)
        .set(input)
        .where("id_turno = " + input.id_turno)
        .returning("*")
        .execute();

      return { turno: response.raw[0] };
    } catch (error) {
      if (error.detail.includes("already exists")) {
        if (error.detail.includes("nombre")) {
          return {
            errors: [
              {
                field: "nombre",
                message: "El nombre ya existe",
              },
            ],
          };
        }
      }
      return {
        errors: [
          {
            field: "Error",
            message: "Error al actualizar el turno",
          },
        ],
      };
    }
  }

  @Mutation(() => Boolean)
  async eliminarTurno(@Arg("id_turno") id_turno: number): Promise<boolean> {
    const conn = getConnection();
    try {
      await conn.manager.delete(Turno, { id_turno });
    } catch {
      return false;
    }

    return true;
  }
}
