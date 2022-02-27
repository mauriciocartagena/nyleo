import { InputType, Field } from "type-graphql";

@InputType()
export class EstudianteInputEditar {
  @Field()
  id_persona: number;

  @Field()
  nombre: string;

  @Field()
  primer_apellido: string;

  @Field()
  segundo_apellido: string;

  @Field()
  dni: string;

  @Field()
  numero: string;

  @Field()
  email: string;
}
