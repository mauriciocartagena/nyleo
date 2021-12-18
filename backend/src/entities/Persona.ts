import { Field, ObjectType, Int } from "type-graphql";
import { Estudiante } from "./Estudiante";
import { Curso } from "./Curso";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany,
} from "typeorm";

@ObjectType()
@Entity()
export class Persona extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id_persona!: number;

  @OneToMany(() => Estudiante, (estudiante) => estudiante.id_persona, {
    cascade: true,
  })
  estudiantes: Estudiante[];

  @Field()
  @Column({ type: "character varying" })
  nombre!: string;

  @Field()
  @Column({ type: "character varying" })
  primer_apellido!: string;

  @Field()
  @Column({ type: "character varying" })
  segundo_apellido: string;

  @Field()
  @Column({ type: "character varying", unique: true })
  dni!: string;

  @Field(() => Int)
  @Column()
  numero!: Number;

  @Field()
  @Column({ type: "character varying", unique: true })
  email: string;

  @OneToMany(() => Curso, (curso) => curso.id_persona, {
    cascade: ["insert", "update"],
  })
  cursos: Curso[];
}
