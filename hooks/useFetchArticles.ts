import { ref, Ref } from '@vue/composition-api'

import { IStory } from '@/global-types'
import useContext from '@/hooks/useContext'

export const MAX_POST_PER_PAGE = 5
export default function useFetchArticles() {
  const { context, storyApi } = useContext()

  const total: Ref<number> = ref(0)
  const articles: Ref<IStory[]> = ref([])

  const fetchArticles = async (opts: any) => {
    try {
      const { page = 1 } = context.route.query
      const res = await storyApi.get('cdn/stories/', {
        page,
        starts_with: 'articles/',
        per_page: MAX_POST_PER_PAGE,
        ...opts
      })

      total.value = res.total
      articles.value = res.data.stories
    } catch(e) {
      console.warn(e)
    }
  }

  return { total, articles, fetchArticles }
}
