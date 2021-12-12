import "reflect-metadata";
// import { MikroORM } from "@mikro-orm/core";
import { __prod__ } from "./constants";
// import microConfig from "./mikro-orm.config";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { HelloResolver } from "./resolvers/hello";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { CategoriaResolver } from "./resolvers/categoria";
import { createConnection } from "typeorm";
import { Categoria } from "./entities/Categoria";
import { Persona } from "./entities/Persona";
import { Estudiante } from "./entities/Estudiante";
import { Grupo } from "./entities/Grupo";
import { Fecha } from "./entities/Fecha";
import { Turno } from "./entities/Turno";
import { Curso } from "./entities/Curso";

const main = async () => {
  const conn = await createConnection({
    type: "postgres",
    database: "nyleo",
    username: "user",
    password: "password",
    logging: true,
    synchronize: true,
    entities: [Persona, Estudiante, Categoria, Grupo, Fecha, Turno, Curso],
  });
  console.log("This connection", conn.isConnected);

  // const orm = await MikroORM.init(microConfig);
  // await orm.getMigrator().up();

  const app = express();

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, CategoriaResolver],
      validate: false,
    }),

    plugins: [ApolloServerPluginLandingPageGraphQLPlayground],
    context: () => ({}),
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
