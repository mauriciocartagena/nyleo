import { Entity, PrimaryKey, Property } from "@mikro-orm/core";
import { Field, ObjectType, Int } from "type-graphql";

@ObjectType()
@Entity()
export class Persona {
  @Field(() => Int)
  @PrimaryKey()
  id_persona!: number;

  @Field()
  @Property({ type: "text", length: 255 })
  nombre!: string;

  @Field()
  @Property({ type: "text", length: 255 })
  primer_apellido!: string;

  @Field()
  @Property({ type: "text", length: 255 })
  segundo_apellido: string;

  @Field()
  @Property({ type: "text", length: 255 })
  dni!: string;

  @Field(() => Int)
  @Property()
  numero!: Number;

  @Field()
  @Property({ type: "text", length: 255 })
  email: string;
}
