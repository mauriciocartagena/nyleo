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
          crearEstudiante: (_result, args, cache, info) => {
            cache.invalidate("Query", "estudiantes");
          },
          crearCategoria: (_result, args, cache, info) => {
            cache.invalidate("Query", "categorias");
          },

          // All Entities Updated
          actualizarEstudiante: (_result, args, cache) => {
            cache.invalidate("Query", "estudiantes");
          },

          // All Entities Deleted
          eliminarEstudiante: (_result, args, cache) => {
            cache.invalidate({ __typename: "Query", estudiantes: true });
          },
        },
      },
    }),
    fetchExchange,
    ssrExchange,
  ],
});
