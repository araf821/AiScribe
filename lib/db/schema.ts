import { pgTable, text, serial, timestamp } from "drizzle-orm/pg-core";

export const $notes = pgTable("notes", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  imageUrl: text("image"),
  userId: text("userId").notNull(),
  editorState: text("editorState"),
});

export type NoteType = typeof $notes.$inferInsert;
