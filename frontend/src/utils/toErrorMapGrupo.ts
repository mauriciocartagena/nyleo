import { FieldErrorGrupo } from "./../generated/graphql";

export const toErrorMapGrupo = (errors: FieldErrorGrupo[]) => {
  const errorMap: Record<string, string> = {};

  errors.forEach(({ field, message }) => {
    errorMap[field] = message;
  });

  return errorMap;
};
