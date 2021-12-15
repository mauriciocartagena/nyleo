import { __prod__ } from "./constants";
import { MikroORM } from "@mikro-orm/core";
import path from "path";
// import { Categoria } from "./entities/Categoria";
import { Persona } from "./entities/Persona";
import { Estudiante } from "./entities/Estudiante";
import { Grupo } from "./entities/Grupo";

export default {
  migrations: {
    path: path.join(__dirname, "./migrations"), // path to the folder with migrations
    pattern: /^[\w-]+\d+\.[tj]s$/, // r
  },
  entities: [Persona, Estudiante, Grupo],

  dbName: "nyleo",
  type: "postgresql",
  debug: !__prod__,
  user: "user",
  password: "password",
} as Parameters<typeof MikroORM.init>[0];
