// convex/schema.ts
import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export default defineSchema({
  meets: defineTable({
    title: v.string(),
    userId: v.string(),
    description: v.string(),
    dateTime: v.string(), // Store as ISO string
    link: v.string(),
    createdAt: v.number(), // Unix timestamp
  }),
});
