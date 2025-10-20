import { z, defineCollection } from 'astro:content'
import { glob } from 'astro/loaders'
import { r2Loader } from '/infrastructure/r2/astroLoader'

// データソースの切り替え
// - ローカルMarkdown: glob({ pattern: '**/*.md', base: './src/posts' })
// - Cloudflare R2: r2Loader({ bucket: 'asunaro-blog-posts' })
const USE_R2 = import.meta.env.USE_R2 === 'true' || process.env.USE_R2 === 'true'

const posts = defineCollection({
  loader: USE_R2
    ? r2Loader({ bucket: import.meta.env.R2_BUCKET_NAME || process.env.R2_BUCKET_NAME || 'asunaro-blog-posts' })
    : glob({ pattern: '**/*.md', base: './src/posts' }),
  schema: ({ image }) => z.object({
    title: z.string(),
    description: z.string(),
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),
    category: z.string(),
    tags: z.array(z.string()),
    coverImage: z.union([image(), z.string()]).optional(),
    coverImageAlt: z.string().optional(),
    status: z.enum(["published", "draft"]),
  }),
})

export const collections = { posts }
