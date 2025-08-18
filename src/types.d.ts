import type { CollectionEntry } from "astro:content";

export interface PolicyFrontmatter {
  title: string;
  date: string;
}

// export interface NoteProps {
//   post: CollectionEntry<"notes">;
//   headings: import("astro").MarkdownHeading[];
// }