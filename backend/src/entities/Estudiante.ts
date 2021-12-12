import { ObjectType } from "type-graphql";
import { Entity, ManyToOne, BaseEntity, JoinColumn, OneToMany } from "typeorm";
import { Persona } from "./Persona";
import { Curso } from "./Curso";

@ObjectType()
@Entity()
export class Estudiante extends BaseEntity {
  @ManyToOne(() => Persona, (persona) => persona.estudiantes, { primary: true })
  @JoinColumn({ name: "id_persona" })
  id_persona: Persona;

  @OneToMany(() => Curso, (curso) => curso.id_persona)
  cursos: Curso[];
}
