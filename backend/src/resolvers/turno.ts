import { Arg, Query, Resolver, Int, Mutation } from "type-graphql";
import { getConnection } from "typeorm";
import { Turno } from "../entities/Turno";

@Resolver()
export class TurnoResolver {
  @Query(() => [Turno])
  async turnos(): Promise<Turno[]> {
    const conn = getConnection();

    const resp = await conn.manager.find(Turno);

    return resp;
  }

  @Query(() => Turno, { nullable: true })
  async turno(
    @Arg("id_turno", () => Int) id_turno: number
  ): Promise<Turno | null | undefined> {
    const conn = getConnection();

    const resp = await conn.manager.findOne(Turno, { id_turno });

    return resp;
  }

  @Mutation(() => Turno)
  async crearTurno(
    @Arg("nombre") nombre: string,
    @Arg("hora_inicio") hora_inicio: string,
    @Arg("hora_final") hora_final: string
  ): Promise<Turno | null> {
    const conn = getConnection();

    const turno = conn.manager.create(Turno, {
      nombre,
      hora_inicio,
      hora_final,
    });

    const resp = await conn.manager.save(turno);

    return resp;
  }

  @Mutation(() => Turno, { nullable: true })
  async actualizarTurno(
    @Arg("id_turno") id_turno: number,
    @Arg("nombre") nombre: string,
    @Arg("hora_inicio") hora_inicio: string,
    @Arg("hora_final") hora_final: string
  ): Promise<Turno | null> {
    const conn = getConnection();

    const turno = await conn.manager.findOne(Turno, { id_turno });

    if (!turno) {
      return null;
    }
    if (
      typeof nombre !== "undefined" &&
      nombre !== "" &&
      nombre !== null &&
      hora_inicio !== null &&
      hora_final !== null
    ) {
      turno.nombre = nombre;
      turno.hora_inicio = hora_inicio;
      turno.hora_final = hora_final;

      await conn.manager.update(Turno, { id_turno }, turno);
    }
    return turno;
  }

  @Mutation(() => Boolean)
  async eliminarTurno(@Arg("id_turno") id_turno: number): Promise<boolean> {
    const conn = getConnection();
    try {
      conn.manager.delete(Turno, { id_turno });
    } catch {
      return false;
    }

    return true;
  }
}
