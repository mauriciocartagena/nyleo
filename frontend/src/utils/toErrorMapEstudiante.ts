import { FieldErrorEstudiante } from "../generated/graphql";

export const toErrorMapEstudiante = (errors: FieldErrorEstudiante[]) => {
  const errorMap: Record<string, string> = {};

  errors.forEach(({ field, message }) => {
    errorMap[field] = message;
  });

  return errorMap;
};
