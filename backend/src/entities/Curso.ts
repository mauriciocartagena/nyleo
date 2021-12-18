import { Field, Int, ObjectType } from "type-graphql";
import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Column,
  BaseEntity,
} from "typeorm";
import { Grupo } from "./Grupo";
import { Persona } from "./Persona";

@ObjectType()
@Entity()
export class Curso extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id_curso: number;

  @Field()
  @Column({ type: "integer", nullable: false })
  @ManyToOne(() => Grupo, (grupo) => grupo.cursos)
  @JoinColumn({ name: "id_grupo", referencedColumnName: "id_grupo" })
  id_grupo: Grupo;

  @Field()
  @Column({ type: "integer", nullable: false })
  @ManyToOne(() => Persona, (estudiante) => estudiante.cursos)
  @JoinColumn({ name: "id_persona", referencedColumnName: "id_persona" })
  id_persona: Persona;
}
