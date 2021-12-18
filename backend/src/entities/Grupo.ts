import { Field, Int, ObjectType } from "type-graphql";
import {
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  BaseEntity,
  Entity,
  Column,
  OneToMany,
} from "typeorm";
import { Turno } from "./Turno";
import { Curso } from "./Curso";
import { Categoria } from "./Categoria";

@ObjectType()
@Entity()
export class Grupo extends BaseEntity {
  @Field(() => Int)
  @Column()
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

  @Field()
  @Column()
  @ManyToOne(() => Turno, (turno) => turno.grupos, {
    cascade: true,
    eager: true,
  })
  @JoinColumn({ name: "id_turno", referencedColumnName: "id_turno" })
  id_turno: Turno;

  @Field()
  @Column()
  @ManyToOne(() => Categoria, (categoria) => categoria.grupos, {
    cascade: true,
  })
  @JoinColumn({ name: "id_categoria", referencedColumnName: "id_categoria" })
  id_categoria!: Categoria;

  @OneToMany(() => Curso, (curso) => curso.id_grupo, {
    cascade: true,
  })
  cursos: Curso[];
}
