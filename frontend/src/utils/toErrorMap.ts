import { FieldErrorEstudiante } from "../generated/graphql";

export const toErrorMap = (errors: FieldErrorEstudiante[]) => {
  const errorMap: Record<string, string> = {};

  errors.forEach(({ field, message }) => {
    errorMap[field] = message;
  });

  return errorMap;
};
