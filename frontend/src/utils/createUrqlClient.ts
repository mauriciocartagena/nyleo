import { dedupExchange, fetchExchange } from "urql";
import { cacheExchange } from "@urql/exchange-graphcache";

export const createUrlClient = (ssrExchange: any) => ({
  url: "http://localhost:4000/graphql",
  fetchOptions: {
    credentials: "include" as const,
  },
  exchanges: [
    dedupExchange,
    cacheExchange({
      updates: {
        Mutation: {
          // All Entities Created
          crearEstudiante: (_result, _args, cache, _info) => {
            cache.invalidate("Query", "estudiantes");
          },
          crearCategoria: (_result, _args, cache, _info) => {
            cache.invalidate("Query", "categorias");
          },
          crearTurno: (_result, _args, cache, _info) => {
            cache.invalidate("Query", "turnos");
          },
          crearGrupo: (_result, _args, cache, _info) => {
            cache.invalidate("Query", "grupos");
          },

          // All Entities Updated
          actualizarEstudiante: (_result, _args, cache) => {
            cache.invalidate("Query", "estudiantes");
          },
          actualizarCategoria: (_result, _args, cache) => {
            cache.invalidate("Query", "categorias");
          },
          actualizarTurno: (_result, _args, cache) => {
            cache.invalidate("Query", "turnos");
          },
          actualizarGrupo: (_result, _args, cache) => {
            cache.invalidate("Query", "grupos");
          },

          // All Entities Deleted
          eliminarEstudiante: (_result, _args, cache) => {
            cache.invalidate({ __typename: "Query", estudiantes: true });
          },
          eliminarGrupo: (_result, _args, cache) => {
            cache.invalidate({ __typename: "Query", grupos: true });
          },
        },
      },
    }),
    fetchExchange,
    ssrExchange,
  ],
});
