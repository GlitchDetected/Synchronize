import dotenv from "dotenv";
import { Kysely, PostgresDialect } from "kysely";
import pg from "pg";
import { Sequelize } from "sequelize";

import type { Database } from "./types";

dotenv.config();

const connection = process.env.connectionstring;

if (!connection) {
    throw new Error("error creating models");
}

// PostgreSQL Pool for Kysely
const kyselyDialect = new PostgresDialect({
    pool: new pg.Pool({
        connectionString: connection,
        max: 10
    })
});

// Kysely Instance
export const db = new Kysely<Database>({
    dialect: kyselyDialect
});

export const sequelize = new Sequelize(connection, {
    dialect: "postgres",
    logging: false
});