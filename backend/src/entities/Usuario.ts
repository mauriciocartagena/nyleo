import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { Persona } from "./Persona";

@ObjectType()
@Entity()
export class Usuario extends BaseEntity {
  @ManyToOne(() => Persona, (persona) => persona.usuarios, {
    primary: true,
  })
  @JoinColumn({ name: "id_persona" })
  id_persona: Persona;

  @Field({ nullable: false })
  @Column({ unique: true })
  usuario: string;

  @Field({ nullable: false })
  @Column()
  password: string;
}
