import { Field, Int, ObjectType } from "type-graphql";
import {
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  BaseEntity,
  Entity,
} from "typeorm";
import { Categoria } from "./Categoria";
import { Fecha } from "./Fecha";
import { Turno } from "./Turno";
import { OneToMany } from "typeorm";
import { Curso } from "./Curso";

@ObjectType()
@Entity()
export class Grupo extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id_grupo!: number;

  @ManyToOne(() => Categoria, (categoria) => categoria.grupos)
  @JoinColumn({ name: "id_categoria" })
  id_categoria!: Categoria;

  @ManyToOne(() => Turno, (turno) => turno.grupos)
  @JoinColumn({ name: "id_turno" })
  id_turno!: Turno;

  @ManyToOne(() => Fecha, (fecha) => fecha.grupos)
  @JoinColumn({ name: "id_fecha" })
  id_fecha!: Fecha;

  @OneToMany(() => Curso, (curso) => curso.grupo)
  cursos!: Curso[];
}
