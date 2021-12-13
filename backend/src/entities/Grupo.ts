import { Field, Int, ObjectType } from "type-graphql";
import {
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  BaseEntity,
  Entity,
  Column,
} from "typeorm";
import { Categoria } from "./Categoria";
import { Turno } from "./Turno";
import { OneToMany } from "typeorm";
import { Curso } from "./Curso";

@ObjectType()
@Entity()
export class Grupo extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id_grupo!: number;

  @Field()
  @Column({ type: "timestamp" })
  fecha_inicio: Date;

  @Field()
  @Column({ type: "timestamp" })
  fecha_final: Date;

  @Field()
  @Column({ type: "character varying" })
  dia_inicio: string;

  @Field()
  @Column({ type: "character varying" })
  dia_final: string;

  @ManyToOne(() => Categoria, (categoria) => categoria.grupos, {
    cascade: true,
  })
  @JoinColumn({ name: "id_categoria", referencedColumnName: "id_categoria" })
  id_categoria: Categoria;

  @ManyToOne(() => Turno, (turno) => turno.grupos, { cascade: true })
  @JoinColumn({ name: "id_turno", referencedColumnName: "id_turno" })
  id_turno: Turno;

  @OneToMany(() => Curso, (curso) => curso.grupo, {
    cascade: ["insert", "update"],
  })
  cursos!: Curso[];
}
