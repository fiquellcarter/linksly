import { type Config } from "drizzle-kit";

import { env } from "~/env";

const config: Config = {
  schema: "./src/server/db/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: env.DATABASE_URL,
  },
};

export default config;
