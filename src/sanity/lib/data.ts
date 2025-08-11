import { client } from './client'
import { 
  postsQuery, 
  postQuery, 
  featuredPostsQuery, 
  postsByCategoryQuery, 
  categoriesQuery 
} from './queries'
import type { BlogPost, BlogPostDetail, Category } from './types'

export async function getAllPosts(): Promise<BlogPost[]> {
  return await client.fetch(postsQuery)
}

export async function getPostBySlug(slug: string): Promise<BlogPostDetail | null> {
  return await client.fetch(postQuery, { slug })
}

export async function getFeaturedPosts(): Promise<BlogPost[]> {
  return await client.fetch(featuredPostsQuery)
}

export async function getPostsByCategory(category: string): Promise<BlogPost[]> {
  return await client.fetch(postsByCategoryQuery, { category })
}

export async function getAllCategories(): Promise<Category[]> {
  return await client.fetch(categoriesQuery)
}
