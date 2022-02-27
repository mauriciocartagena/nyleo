import { EstudianteInput } from "../resolvers/Inputs/Estudiante/EstudianteInput";

export const validateRegisterEstudiante = (input: EstudianteInput) => {
  if (input.nombre.length <= 2) {
    return [
      {
        field: "nombre",
        message: "El nombre debe tener más de 2 caracteres",
      },
    ];
  }
  if (input.primer_apellido.length <= 2) {
    return [
      {
        field: "primer_apellido",
        message: "El primer apellido debe tener más de 2 caracteres",
      },
    ];
  }
  if (input.dni.length <= 6) {
    return [
      {
        field: "dni",
        message: "El dni debe tener más de 6 caracteres",
      },
    ];
  }
  if (input.numero.length <= 6) {
    return [
      {
        field: "numero",
        message: "El numero debe ser mayor a 6",
      },
    ];
  }

  return null;
};
