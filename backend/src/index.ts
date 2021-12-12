import "reflect-metadata";
import { MikroORM } from "@mikro-orm/core";
import { __prod__ } from "./constants";
// import { Post } from "./entities/Post";
import microConfig from "./mikro-orm.config";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { HelloResolver } from "./resolvers/hello";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { CategoriaResolver } from "./resolvers/categoria";
// import { Categoria } from "./entities/Categoria";

const main = async () => {
  const orm = await MikroORM.init(microConfig);
  await orm.getMigrator().up();

  // const categoria = orm.em.create(Categoria, {
  //   nombre: "Autocad Basico",
  // });

  // await orm.em.persistAndFlush(categoria);

  const app = express();

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, CategoriaResolver],
      validate: false,
    }),

    plugins: [ApolloServerPluginLandingPageGraphQLPlayground],
    context: () => ({ em: orm.em }),
  });

  await apolloServer.start();

  apolloServer.applyMiddleware({ app, cors: false });

  // app.get("/", (_, res) => {
  //   res.send("Hello World");
  // });
  app.listen(4000, () => {
    console.log("Server listening on port 4000");
  });
};
main().catch((err) => {
  console.log(err);
});

console.log("Hello World");
