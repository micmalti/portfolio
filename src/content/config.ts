import { defineCollection, z } from "astro:content";

const notesCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    created: z.date().transform((date) => ({
      raw: date,
      formatted: date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      short: date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
    })),
    updated: z.date().transform((date) => ({
      raw: date,
      formatted: date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      short: date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
    })),
    tags: z.array(z.string())
  })
});

export const collections = {
  notes: notesCollection
};
