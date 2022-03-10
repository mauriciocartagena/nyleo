import { FieldErrorTurno } from "../generated/graphql";

export const toErrorMapTurn = (errors: FieldErrorTurno[]) => {
  const errorMap: Record<string, string> = {};

  errors.forEach(({ field, message }) => {
    errorMap[field] = message;
  });

  return errorMap;
};
