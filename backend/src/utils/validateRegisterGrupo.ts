import { GrupoInput } from "../resolvers/Inputs/Grupo/GrupoInput";

export const validateRegisterGrupo = (input: GrupoInput) => {
  if (input.dia_inicio.length <= 2) {
    return [
      {
        field: "dia_inicio",
        message: "El Dia debe tener más de 2 caracteres",
      },
    ];
  } else if (input.dia_final.length <= 2) {
    return [
      {
        field: "dia_final",
        message: "El dia final debe tener más de 2 caracteres",
      },
    ];
  }
  return null;
};
