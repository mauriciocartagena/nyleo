import { ObjectType } from "type-graphql";
import { Entity, ManyToOne, BaseEntity, JoinColumn } from "typeorm";
import { Persona } from "./Persona";

@ObjectType()
@Entity()
export class Estudiante extends BaseEntity {
  @ManyToOne(() => Persona, (persona) => persona.estudiantes, {
    primary: true,
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "id_persona" })
  id_persona: Persona;
}
