import "reflect-metadata";
import { DataSource } from "typeorm";
import { CompanyDetails } from "./entity/CompanyDetails";
require("dotenv").config();
export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  synchronize: true,
  logging: false,
  entities: [CompanyDetails],
  migrations: [],
  subscribers: [],
});
