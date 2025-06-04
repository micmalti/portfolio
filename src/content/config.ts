import { defineCollection, z } from "astro:content";

const notesCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    creation_date: z.string(),
    last_updated: z.string().optional(),
    // tags: 
    description: z.string().optional()
  }),
});

export const collections = {
  notes: notesCollection,
};
