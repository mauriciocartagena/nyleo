import { Property, Entity, PrimaryKey } from "@mikro-orm/core";

@Entity()
export class Post {
  @PrimaryKey()
  id: number;

  @Property()
  title!: string;
}
