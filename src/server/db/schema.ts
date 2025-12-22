import { relations } from "drizzle-orm";
import { index, pgTable } from "drizzle-orm/pg-core";

export const collection = pgTable(
  "collection",
  (d) => ({
    id: d.integer("id").primaryKey().generatedByDefaultAsIdentity(),
    name: d.text("name").notNull(),
    description: d.text("description"),
    userId: d
      .text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    createdAt: d.timestamp("created_at").defaultNow().notNull(),
    updatedAt: d
      .timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  }),
  (t) => [index("collection_user_id_idx").on(t.userId), index("collection_user_id_name_idx").on(t.userId, t.name)]
);

export const bookmark = pgTable(
  "bookmark",
  (d) => ({
    id: d.integer("id").primaryKey().generatedByDefaultAsIdentity(),
    userId: d
      .text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    collectionId: d.integer("collection_id").references(() => collection.id, { onDelete: "set null" }),
    url: d.text("url").notNull(),
    title: d.text("title").notNull(),
    description: d.text("description").notNull(),
    favicon: d.text("favicon").notNull(),
    createdAt: d.timestamp("created_at").defaultNow().notNull(),
    updatedAt: d
      .timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  }),
  (t) => [
    index("bookmark_user_id_idx").on(t.userId),
    index("bookmark_collection_id_idx").on(t.collectionId),
    index("bookmark_user_id_url_idx").on(t.userId, t.url),
  ]
);

export const user = pgTable(
  "user",
  (d) => ({
    id: d.text("id").primaryKey(),
    name: d.text("name").notNull(),
    email: d.text("email").notNull().unique(),
    emailVerified: d.boolean("email_verified").default(false).notNull(),
    image: d.text("image"),
    createdAt: d.timestamp("created_at").defaultNow().notNull(),
    updatedAt: d
      .timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  }),
  (t) => [index("user_email_idx").on(t.email)]
);

export const session = pgTable(
  "session",
  (d) => ({
    id: d.text("id").primaryKey(),
    expiresAt: d.timestamp("expires_at").notNull(),
    token: d.text("token").notNull().unique(),
    createdAt: d.timestamp("created_at").defaultNow().notNull(),
    updatedAt: d
      .timestamp("updated_at")
      .$onUpdate(() => new Date())
      .notNull(),
    ipAddress: d.text("ip_address"),
    userAgent: d.text("user_agent"),
    userId: d
      .text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
  }),
  (t) => [index("session_user_id_idx").on(t.userId), index("session_token_idx").on(t.token)]
);

export const account = pgTable(
  "account",
  (d) => ({
    id: d.text("id").primaryKey(),
    accountId: d.text("account_id").notNull(),
    providerId: d.text("provider_id").notNull(),
    userId: d
      .text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    accessToken: d.text("access_token"),
    refreshToken: d.text("refresh_token"),
    idToken: d.text("id_token"),
    accessTokenExpiresAt: d.timestamp("access_token_expires_at"),
    refreshTokenExpiresAt: d.timestamp("refresh_token_expires_at"),
    scope: d.text("scope"),
    password: d.text("password"),
    createdAt: d.timestamp("created_at").defaultNow().notNull(),
    updatedAt: d
      .timestamp("updated_at")
      .$onUpdate(() => new Date())
      .notNull(),
  }),
  (t) => [index("account_user_id_idx").on(t.userId)]
);

export const verification = pgTable(
  "verification",
  (d) => ({
    id: d.text("id").primaryKey(),
    identifier: d.text("identifier").notNull(),
    value: d.text("value").notNull(),
    expiresAt: d.timestamp("expires_at").notNull(),
    createdAt: d.timestamp("created_at").defaultNow().notNull(),
    updatedAt: d
      .timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  }),
  (t) => [index("verification_identifier_idx").on(t.identifier)]
);

export const collectionRelations = relations(collection, ({ one, many }) => ({
  user: one(user, { fields: [collection.userId], references: [user.id] }),
  bookmark: many(bookmark),
}));

export const bookmarkRelations = relations(bookmark, ({ one }) => ({
  user: one(user, { fields: [bookmark.userId], references: [user.id] }),
  collection: one(collection, { fields: [bookmark.collectionId], references: [collection.id] }),
}));

export const userRelations = relations(user, ({ many }) => ({
  session: many(session),
  account: many(account),
}));

export const sessionRelations = relations(session, ({ one }) => ({
  user: one(user, { fields: [session.userId], references: [user.id] }),
}));

export const accountRelations = relations(account, ({ one }) => ({
  user: one(user, { fields: [account.userId], references: [user.id] }),
}));
