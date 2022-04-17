import { Field, InputType } from "type-graphql";

@InputType()
export class GrupoInput {
  @Field()
  fecha_inicio: Date;

  @Field()
  fecha_final: Date;

  @Field()
  dia_inicio: string;

  @Field()
  dia_final: string;

  @Field()
  id_categoria: number;

  @Field()
  id_turno: number;
}
