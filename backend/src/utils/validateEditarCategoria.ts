import { CategoriaInputEditar } from "../resolvers/Inputs/Categoria/CategoriaInputEditar";

export const validateEditarCategoria = (input: CategoriaInputEditar) => {
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
