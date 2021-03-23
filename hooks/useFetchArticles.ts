import { ref, Ref } from '@vue/composition-api'

import { IStory } from '@/global-types'
import useContext from '@/hooks/useContext'

export default function useFetchArticles() {
  const { context, storyApi } = useContext()
  const { page } = context.route.query
  const MAX_POST_PER_PAGE = 12

  const total: Ref<number> = ref(0)
  const articles: Ref<IStory[]> = ref([])

  const fetchArticles = async (opts: any) => {
    try {
      const res = await storyApi.get('cdn/stories/', {
        page: page || 1,
        starts_with: 'articles/',
        per_page: MAX_POST_PER_PAGE,
        ...opts
      })

      articles.value = res.data.stories
      total.value = res.total
    } catch(e) {
      console.warn(e)
    }
  }

  return { total, articles, fetchArticles }
}
