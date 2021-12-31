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
          crearEstudiante: (_result, args, cache, info) => {
            cache.invalidate("Query", "estudiantes");
          },
          eliminarEstudiante: (_result, args, cache) => {
            cache.invalidate({ __typename: "Query", estudiantes: true });
          },
          actualizarEstudiante: (_result, args, cache) => {
            cache.invalidate("Query", "estudiantes");
          },
        },
      },
    }),
    fetchExchange,
    ssrExchange,
  ],
});
