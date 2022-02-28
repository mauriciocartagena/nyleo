import {
  Arg,
  Query,
  Resolver,
  Int,
  Mutation,
  ObjectType,
  Field,
} from "type-graphql";
import { getConnection } from "typeorm";
import { Categoria } from "../entities/Categoria";
import { CategoriaInput } from "./Inputs/Categoria/CategoriaInput";
import { validateRegisterCategoria } from "../utils/validateRegisterCategoria";
import { CategoriaInputEditar } from "./Inputs/Categoria/CategoriaInputEditar";
import { validateEditarCategoria } from "../utils/validateEditarCategoria";

@ObjectType()
class FieldErrorCategoria {
  @Field()
  field: string;

  @Field()
  message: string;
}

@ObjectType()
class CategoriaResponse {
  @Field(() => [FieldErrorCategoria], { nullable: true })
  errors?: FieldErrorCategoria[];

  @Field(() => Categoria, { nullable: true })
  categoria?: Categoria;
}

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

  @Mutation(() => CategoriaResponse)
  async crearCategoria(
    @Arg("input") input: CategoriaInput
  ): Promise<CategoriaResponse> {
    const conn = getConnection();

    const errors = validateRegisterCategoria(input);

    if (errors) {
      return { errors };
    }

    try {
      const categoria = conn.manager.create(Categoria, input);

      const resp = await conn.manager.save(categoria);

      return { categoria: resp };
    } catch (error) {
      if (error.detail.includes("already exists")) {
        if (error.detail.includes("nombre")) {
          return {
            errors: [
              {
                field: "nombre",
                message: "El nombre ya está en uso",
              },
            ],
          };
        }
      }
      return {
        errors: [
          {
            field: "Error",
            message: "Error al crear la categoria",
          },
        ],
      };
    }
  }

  @Mutation(() => CategoriaResponse)
  async actualizarCategoria(
    @Arg("input") input: CategoriaInputEditar
  ): Promise<CategoriaResponse> {
    const conn = getConnection();

    const errors = validateEditarCategoria(input);

    if (errors) {
      return {
        errors,
      };
    }

    const categoria = await conn.manager.findOne(Categoria, input.id_categoria);

    if (!categoria) {
      return {
        errors: [
          {
            field: "Error",
            message: "No se encontró la categoria",
          },
        ],
      };
    }

    try {
      const response = await conn
        .createQueryBuilder()
        .update(Categoria)
        .set({
          nombre: input.nombre,
        })
        .where("id_categoria=" + input.id_categoria)
        .returning("*")
        .execute();

      return { categoria: response.raw[0] };
    } catch (error) {
      if (error.detail.includes("already exists")) {
        if (error.detail.includes("nombre")) {
          return {
            errors: [
              {
                field: "nombre",
                message: "El nombre ya está en uso",
              },
            ],
          };
        }
      }
      return {
        errors: [
          {
            field: "Error",
            message: "Error al actualizar la categoria",
          },
        ],
      };
    }
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
