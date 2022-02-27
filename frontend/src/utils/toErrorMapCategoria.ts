import { FieldErrorCategoria } from "../generated/graphql";

export const toErrorMapCategoria = (errors: FieldErrorCategoria[]) => {
  const errorMap: Record<string, string> = {};

  errors.forEach(({ field, message }) => {
    errorMap[field] = message;
  });

  return errorMap;
};
