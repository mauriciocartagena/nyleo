import { Field, InputType } from "type-graphql";

@InputType()
export class TurnoInputEditar {
  @Field()
  id_turno: number;

  @Field()
  nombre: string;

  @Field()
  hora_inicio: string;

  @Field()
  hora_final: string;
}
