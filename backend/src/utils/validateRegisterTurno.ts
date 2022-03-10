import { TurnoInput } from "../resolvers/Inputs/turno/TurnoInput";

export const validateRegisterTurno = (input: TurnoInput) => {
  if (input.nombre.length <= 2) {
    return [
      {
        field: "nombre",
        message: "El nombre debe tener más de 2 caracteres",
      },
    ];
  } else if (input.hora_inicio.length <= 2) {
    return [
      {
        field: "hora_inicio",
        message: "La hora de inicio debe tener más de 2 caracteres",
      },
    ];
  } else if (input.hora_final.length <= 2) {
    return [
      {
        field: "hora_final",
        message: "La hora de finalización debe tener más de 2 caracteres",
      },
    ];
  }

  return null;
};
