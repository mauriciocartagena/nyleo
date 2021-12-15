import { Field, Int, ObjectType } from "type-graphql";
import {
  Column,
  OneToMany,
  PrimaryGeneratedColumn,
  Entity,
  BaseEntity,
} from "typeorm";
import { Grupo } from "./Grupo";

@ObjectType()
@Entity()
export class Categoria extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id_categoria!: number;

  @Field()
  @Column({ type: "character varying", unique: true })
  nombre!: string;

  @OneToMany(() => Grupo, (grupo) => grupo.id_categoria, {
    cascade: ["insert", "update"],
  })
  grupos: Grupo[];
}
