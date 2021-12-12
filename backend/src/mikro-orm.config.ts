import { __prod__ } from "./constants";
import { Post } from "./entities/Post";
import { MikroORM } from "@mikro-orm/core";
import path from "path";
import { Categoria } from "./entities/Categoria";

export default {
  migrations: {
    path: path.join(__dirname, "./migrations"), // path to the folder with migrations
    pattern: /^[\w-]+\d+\.[tj]s$/, // r
  },
  entities: [Post, Categoria],

  dbName: "nyleo",
  type: "postgresql",
  debug: !__prod__,
  user: "user",
  password: "password",
} as Parameters<typeof MikroORM.init>[0];
