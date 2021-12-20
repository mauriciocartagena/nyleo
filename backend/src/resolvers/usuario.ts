import { Arg, Field, InputType, Mutation, Resolver, ObjectType, Ctx } from "type-graphql";
import argon2 from "argon2";
import { getConnection } from "typeorm";
import { Usuario } from "../entities/Usuario";
import { MyContext } from "../types";

@InputType()
class UsuarioPasswordInput {
  @Field()
  id_persona: number;

  @Field()
  usuario: string;

  @Field()
  password: string;
}

@InputType()
class LoginUsuarioPasswordInput {
  @Field()
  usuario: string;

  @Field()
  password: string;
}

@ObjectType()
class FieldError {
  @Field()
  field: string;

  @Field()
  message: string;
}

@ObjectType()
class UserResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => Usuario, { nullable: true })
  usuario?: Usuario;
}

@Resolver()
export class UsuarioResolver {
  @Mutation(() => UserResponse)
  async registrarUsuario(@Arg("options") options: UsuarioPasswordInput): Promise<UserResponse> {
    const conn = getConnection();

    if (options.usuario.length <= 2) {
      return {
        errors: [
          {
            field: "usuario",
            message: "Usuario debe tener mas de 2 caracteres",
          },
        ],
      };
    }

    if (options.password.length <= 2) {
      return {
        errors: [
          {
            field: "password",
            message: "Contraseña debe tener mas de 2 caracteres",
          },
        ],
      };
    }

    const hashedPassword = await argon2.hash(options.password);
    let usuario;

    try {
      const user = await conn
        .createQueryBuilder()
        .insert()
        .into("usuario")
        .values({
          id_persona: options.id_persona,
          usuario: options.usuario,
          password: hashedPassword,
        })
        .returning("*")
        .execute();

      usuario = user.raw[0];
    } catch (error) {
      if (error.code === "23505") {
        return {
          errors: [
            {
              field: "usuario",
              message: "Usuario ya existe",
            },
          ],
        };
      }
    }

    return usuario;
  }

  @Mutation(() => UserResponse)
  async login(@Arg("options") options: LoginUsuarioPasswordInput, @Ctx() { req }: MyContext): Promise<UserResponse> {
    const conn = getConnection();

    const usuario = await conn.getRepository(Usuario).findOne({
      relations: ["id_persona"],
      where: { usuario: options.usuario },
    });

    if (!usuario) {
      return {
        errors: [
          {
            field: "usuario",
            message: "Usuario no existe",
          },
        ],
      };
    }

    const valid = await argon2.verify(usuario.password, options.password);

    if (!valid) {
      return {
        errors: [
          {
            field: "contraseña",
            message: "Contraseña incorrecta",
          },
        ],
      };
    }

    req.session.userId = usuario.id_persona.id_persona;

    return {
      usuario,
    };
  }
}
