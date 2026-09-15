import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const notebook = defineCollection({
    // Load Markdown and MDX files in the `src/content/notebook/` directory.
    loader: glob({ base: "./src/content/notebook", pattern: "**/*.{md,mdx}" }),
    // Type-check frontmatter using a schema
    schema: z.object({
        title: z.string(),
        description: z.string(),
        // Transform string to Date object
        pubDate: z.coerce.date(),
        updatedDate: z.coerce.date().optional(),
    }),
});

export const collections = { notebook };
