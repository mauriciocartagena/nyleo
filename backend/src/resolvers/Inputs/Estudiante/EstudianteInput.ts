import { InputType, Field } from "type-graphql";

@InputType()
export class EstudianteInput {
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
