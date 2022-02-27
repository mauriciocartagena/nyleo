import { CategoriaInput } from "../resolvers/Inputs/Categoria/CategoriaInput";

export const validateRegisterCategoria = (input: CategoriaInput) => {
  if (input.nombre.length <= 2) {
    return [
      {
        field: "nombre",
        message: "El nombre debe tener más de 2 caracteres",
      },
    ];
  }
  return null;
};
