import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import type { PortableTextBlock } from "@portabletext/types";

export const client = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID || "YOUR_PROJECT_ID",
  dataset: import.meta.env.VITE_SANITY_DATASET || "production",
  useCdn: true,
  apiVersion: "2024-01-01",
});

const builder = imageUrlBuilder(client);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

export interface Article {
  _id: string;
  _createdAt: string;
  title: string;
  slug: {
    current: string;
  };
  category: string;
  excerpt: string;
  mainImage: SanityImageSource;
  body: PortableTextBlock[];
  author?: string;
  publishedAt: string;
  featured: boolean;
}
