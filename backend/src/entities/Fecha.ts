import { Field, ObjectType } from "type-graphql";
import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  BaseEntity,
} from "typeorm";
import { Grupo } from "./Grupo";
@ObjectType()
@Entity()
export class Fecha extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id_fecha!: number;

  @Field()
  @Column({ type: "timestamp" })
  fecha_inicio!: Date;

  @Field()
  @Column({ type: "timestamp" })
  fecha_fin!: Date;

  @Field()
  @Column({ type: "character varying" })
  dia_inicio!: string;

  @Field()
  @Column({ type: "character varying" })
  dia_fin!: string;

  @OneToMany(() => Grupo, (grupo) => grupo.id_fecha)
  grupos: Grupo[];
}
