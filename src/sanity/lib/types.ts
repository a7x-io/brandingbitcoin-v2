export interface BlogPost {
  _id: string
  title: string
  slug: {
    current: string
  }
  excerpt: string
  mainImage: {
    asset: {
      _ref: string
    }
    alt?: string
  }
  publishedAt: string
  readTime: number
  featured: boolean
  categories: string[]
  author: string
}

export interface BlogPostDetail extends BlogPost {
  body: any[] // Portable Text content
  authorImage?: {
    asset: {
      _ref: string
    }
    alt?: string
  }
}

export interface Category {
  _id: string
  title: string
  description: string
  color: string
}

export interface Author {
  _id: string
  name: string
  slug: {
    current: string
  }
  image?: {
    asset: {
      _ref: string
    }
    alt?: string
  }
  bio?: any[]
}
