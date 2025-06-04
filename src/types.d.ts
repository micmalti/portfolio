import type { CollectionEntry } from "astro:content";

export interface PolicyFrontmatter {
  title: string;
  date: string;
}

export interface ArticleFrontmatter {
  title: string;
  creation_date: string;
  last_updated: string;
  tags: Array;
  description?: string;
}

export interface NoteProps {
  post: CollectionEntry<"notes">;
  headings: import("astro").MarkdownHeading[];
}