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
export class Turno extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id_turno!: number;

  @Field()
  @Column()
  nombre!: string;

  @Field()
  @Column({ type: "time" })
  hora_inicio!: Date;

  @Field()
  @Column({ type: "time" })
  hora_fin!: Date;

  @OneToMany(() => Grupo, (grupo) => grupo.id_turno, {
    cascade: ["insert", "update"],
  })
  grupos: Grupo[];
}
