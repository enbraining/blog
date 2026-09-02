import { defineCollection, defineConfig, s } from "velite";
import { remarkCodeMeta } from "./src/lib/remark-code-meta";

const posts = defineCollection({
  name: "Post",
  pattern: "*.mdx",
  schema: s.object({
    title: s.string(),
    publishedAt: s.isodate(),
    updatedAt: s.isodate().optional(),
    slug: s.path(),
    code: s.mdx(),
  }),
});

export default defineConfig({
  root: "content",
  mdx: {
    remarkPlugins: [remarkCodeMeta],
  },
  output: {
    data: ".velite",
    assets: "public/static",
    base: "/static/",
    name: "[name]-[hash:6].[ext]",
    clean: true,
  },
  collections: { posts },
});
