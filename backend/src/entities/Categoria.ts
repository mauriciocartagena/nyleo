import { Property, Entity, PrimaryKey } from "@mikro-orm/core";
import { Field, Int, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
export class Categoria {
  @Field(() => Int)
  @PrimaryKey()
  id_categoria!: number;

  @Field()
  @Property({ type: "text", length: 255 })
  nombre!: string;
}
