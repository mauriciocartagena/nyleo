import { Field, Int, ObjectType } from "type-graphql";
import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { Grupo } from "./Grupo";
import { Estudiante } from "./Estudiante";

@ObjectType()
@Entity()
export class Curso {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id_curso: number;

  @ManyToOne(() => Grupo, (grupo) => grupo.cursos)
  @JoinColumn({ name: "id_grupo" })
  grupo: Grupo;

  @ManyToOne(() => Estudiante, (estudiante) => estudiante.cursos)
  @JoinColumn({ name: "id_persona" })
  id_persona: Estudiante;
}
