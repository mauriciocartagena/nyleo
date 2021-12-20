import {
  Arg,
  Field,
  InputType,
  Mutation,
  Resolver,
  ObjectType,
} from "type-graphql";
import argon2 from "argon2";
import { getConnection } from "typeorm";
import { Usuario } from "../entities/Usuario";

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
  @Mutation(() => Usuario)
  async registrarUsuario(@Arg("options") options: UsuarioPasswordInput) {
    const conn = getConnection();

    const hashedPassword = await argon2.hash(options.password);

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

    return user.raw[0];
  }

  @Mutation(() => UserResponse)
  async login(
    @Arg("options") options: LoginUsuarioPasswordInput
  ): Promise<UserResponse> {
    const conn = getConnection();

    const usuario = await conn.getRepository(Usuario).findOne({
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

    return {
      usuario,
    };
  }
}
