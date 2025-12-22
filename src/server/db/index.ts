import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import { env } from "~/env";
import * as schema from "~/server/db/schema";

const globalForDb = globalThis as unknown as {
  connection: postgres.Sql | undefined;
};

const connection = globalForDb.connection ?? postgres(env.DATABASE_URL);

if (env.NODE_ENV !== "production") {
  globalForDb.connection = connection;
}

export const db = drizzle(connection, { schema });
