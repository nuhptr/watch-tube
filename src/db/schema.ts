import { pgTable, text, timestamp, uniqueIndex, uuid } from "drizzle-orm/pg-core"

export const users = pgTable(
    "users",
    {
        id: uuid("id").defaultRandom().primaryKey(),
        clerkId: text("clerk_id").notNull().unique(),
        name: text("name").notNull(),
        // TODO: Add banner fields
        imageUrl: text("image_url").notNull(),
        createdAt: timestamp("created_at").defaultNow().notNull(),
        updatedAt: timestamp("updated_at").defaultNow().notNull(),
    },
    (table) => [uniqueIndex("clerk_id_idx").on(table.clerkId)]
)

export const categories = pgTable(
    "categories",
    {
        id: uuid("id").defaultRandom().primaryKey(),
        name: text("name").notNull().unique(),
        description: text("description"),
        createdAt: timestamp("created_at").defaultNow().notNull(),
        updatedAt: timestamp("updated_at").defaultNow().notNull(),
    },
    (table) => [uniqueIndex("name_idx").on(table.name)]
)
