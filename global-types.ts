export interface IStory {
  _uid: string
  full_slug: string
  tag_list: string[]
  content: IArticlePreview
  published_at: string
}

export interface IArticlePreview {
  date: string
  title: string
  excerpt: string
  featured_image: IStoryImage
}

export interface IArticle extends IArticlePreview {
  body: object
  reading_time: string
  intro_paragraph: string
  series?: string
  toc?: string
  _uid: string
}

export interface IDropdownOption {
  id: number | string
  name: string
}

interface IStoryImage {
  alt: string
  copyright: string
  fieldtype: string
  filename: string
  focus: null
  id: number
  name: string
  title: string
}