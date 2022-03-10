import { Field, InputType } from "type-graphql";

@InputType()
export class TurnoInput {
  @Field()
  nombre: string;

  @Field()
  hora_inicio: string;

  @Field()
  hora_final: string;
}
