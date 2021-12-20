import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { Persona } from "./Persona";

@ObjectType()
@Entity()
export class Usuario extends BaseEntity {
  @Field(() => Persona)
  @PrimaryColumn({ type: "integer", unique: true })
  @ManyToOne(() => Persona, (persona) => persona.usuarios, {
    primary: true,
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "id_persona", referencedColumnName: "id_persona" })
  id_persona: Persona;

  @Field({ nullable: false })
  @Column({ unique: true })
  usuario: string;

  @Field({ nullable: false })
  @Column()
  password: string;
}
