import { Field, InputType } from "type-graphql";

@InputType()
export class CategoriaInputEditar {
  @Field()
  id_categoria: number;

  @Field()
  nombre: string;
}
