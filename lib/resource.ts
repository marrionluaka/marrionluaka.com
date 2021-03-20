import { curry } from "ramda"

export default {
  getResources: (db: any) => (options: any) => db.get('cdn/stories', options),
  getResourceById: (db: any) => curry((options: any, slug: string) => db.get(`cdn/stories/${slug}`, options))
}
