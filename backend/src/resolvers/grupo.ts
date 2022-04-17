import {
  Query,
  Arg,
  Int,
  Mutation,
  Resolver,
  ObjectType,
  Field,
} from "type-graphql";
import { Grupo } from "../entities/Grupo";
import { getConnection } from "typeorm";
import { Categoria } from "../entities/Categoria";
import { Turno } from "../entities/Turno";
import { GrupoInput } from "./Inputs/Grupo/GrupoInput";
import { validateRegisterGrupo } from "../utils/validateRegisterGrupo";
import { GrupoInputEditar } from "./Inputs/Grupo/GrupoInputEditar";
import { validateEditarGrupo } from "../utils/validateEditarGrupo";

@ObjectType()
class FieldErrorGrupo {
  @Field()
  field: string;
  @Field()
  message: string;
}

@ObjectType()
class GrupoResponse {
  @Field(() => [FieldErrorGrupo], { nullable: true })
  errors?: FieldErrorGrupo[];

  @Field(() => Grupo, { nullable: true })
  grupo?: Grupo;
}
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

  @Mutation(() => GrupoResponse)
  async crearGrupo(@Arg("input") input: GrupoInput): Promise<GrupoResponse> {
    const conn = getConnection();

    const errors = validateRegisterGrupo(input);

    if (errors) {
      return { errors: errors };
    }

    try {
      const resp = await conn
        .createQueryBuilder()
        .insert()
        .into("grupo")
        .values(input)
        .returning("*")
        .execute();

      return { grupo: resp.raw[0] };
    } catch (error) {
      return {
        errors: [
          {
            field: "Error",
            message: "Ponganse en contacto con el administrador.",
          },
        ],
      };
    }
  }

  @Mutation(() => GrupoResponse)
  async actualizarGrupo(
    @Arg("input") input: GrupoInputEditar
  ): Promise<GrupoResponse> {
    const conn = getConnection();

    const errors = validateEditarGrupo(input);

    if (errors) {
      return { errors: errors };
    }

    try {
      const resp = await conn
        .createQueryBuilder()
        .update("Grupo")
        .set(input)
        .where("id_grupo = :id_grupo", input)
        .returning("*")
        .execute();

      return {
        grupo: resp.raw[0],
      };
    } catch (error) {
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
