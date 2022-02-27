import { InputType, Field } from "type-graphql";

@InputType()
export class CategoriaInput {
  @Field()
  nombre: string;
}
