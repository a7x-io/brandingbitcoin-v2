import { groq } from 'next-sanity'

// Fetch all published blog posts
export const postsQuery = groq`
  *[_type == "post" && publishedAt <= now()] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    mainImage,
    publishedAt,
    readTime,
    featured,
    "categories": categories[]->title,
    "author": author->name
  }
`

// Fetch a single blog post by slug
export const postQuery = groq`
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    excerpt,
    mainImage,
    publishedAt,
    readTime,
    featured,
    body,
    "categories": categories[]->title,
    "author": author->name,
    "authorImage": author->image
  }
`

// Fetch featured posts
export const featuredPostsQuery = groq`
  *[_type == "post" && featured == true && publishedAt <= now()] | order(publishedAt desc)[0...3] {
    _id,
    title,
    slug,
    excerpt,
    mainImage,
    publishedAt,
    readTime,
    "categories": categories[]->title,
    "author": author->name
  }
`

// Fetch posts by category
export const postsByCategoryQuery = groq`
  *[_type == "post" && $category in categories[]->title && publishedAt <= now()] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    mainImage,
    publishedAt,
    readTime,
    "categories": categories[]->title,
    "author": author->name
  }
`

// Fetch all categories
export const categoriesQuery = groq`
  *[_type == "category"] | order(title asc) {
    _id,
    title,
    description,
    color
  }
`
