<template lang="pug">
main.pt-20.bg-primary.pb-20
  div
    Dropdown(:currentOption="currentOption")
      template(v-slot:default="{ onCloseDropdown }")
        .block.px-3.py-4.text-xl.capitalize.cursor-pointer(
          :key='option.id'
          class="hover:bg-white"
          v-for='option in categoryOptions'
          @click.stop="selectCategory(onCloseDropdown, option.name)"
        )
          span.cursor-pointer {{ option.name }}

  section
    .py-12
      .content-container.mx-auto.px-4(class='md:px-0')
        transition-group.space-y-10(
          name="fade"
          tag="dl"
          class='sm:space-y-0 sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-8'
        )
          template(v-if="isLoading")
            div(v-for="(_, i) in list" :key="i")
              TileSkeleton

        dl.space-y-10(class='sm:space-y-0 sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-8')
          div(v-for="article in articles" :key="article.id")
            PostTile(
              :link="`/${article.full_slug}`"
              :category="article[0]"
              :title="article.content.title"
              :published_at="article.published_at"
              :imgSrc="article.content.featured_image.filename"
            )

  Pagination(
    :options="opts"
    :records="total"
    @paginate="paginate"
    v-model="currentPage"
    :per-page="postPerPage"
  )
</template>

<script lang="ts">
// @ts-ignore
import Pagination from 'vue-pagination-2'
import { pipe, pluck, prepend } from 'ramda'
import { Dictionary } from 'vue-router/types/router'
import { defineComponent, watch, onMounted, ref, Ref, computed, ComputedRef } from '@vue/composition-api'

import useContext from '@/hooks/useContext'
import PostTile from '@/components/PostTile.vue'
import Dropdown from '@/components/Dropdown.vue'
import { IDropdownOption } from '@/global-types'
import { DEFAULT_CATEGORY } from '@/global-const'
import TileSkeleton from '@/components/TileSkeleton.vue'
import CustomPagination from '@/components/CustomPagination.vue'
import useFetchArticles, { MAX_POST_PER_PAGE } from '@/hooks/useFetchArticles'

const queryString: Ref<string | (string | null)[]> = ref('')
export default defineComponent({
  name: 'articles',

  watchQuery: true,

  components: { Dropdown, Pagination, PostTile, TileSkeleton },

  asyncData: ({ query }) => {
    queryString.value = query.page
  },

  setup() {
    const currentPage: Ref<number> = ref(1)
    const isLoading: Ref<boolean> = ref(true)
    const categories: Ref<string[]> = ref([])
    const currentOption: Ref<string | (string | null)[]> = ref('')
    const list: Ref<any[]> = ref([...Array(12)])

    const { context, storyApi } = useContext()
    const { total, articles, fetchArticles } = useFetchArticles()

    const selectCategory = (onCloseDropdown: any, category: string) => {
      if (category === currentOption.value) return

      onCloseDropdown()
      navTo('/blog/' + category, category, 1)
    }

    const paginate = (page: number) =>
      navTo((`?page=${page}`), currentOption.value, page)

    const navTo = (url: string, category: string | (string | null)[], page: number) => {
      history.pushState(null, '', url)
      setArticles({ category }, { page })
    }

    const setArticles = ({ category }: any, { page = '1' }: Dictionary<string | number | (string | null)[]>) => {
      currentPage.value = Number(page)
      currentOption.value = categories.value.includes(category as string) ? category : categories.value[0]

      fetchArticlesProxy(category, Number(page)||1)
    }

    const fetchArticlesProxy = (category: string | (string | null)[], page: number): void => {
      const params = !category || category === DEFAULT_CATEGORY ? { sort_by: 'position:asc' } : { with_tag: category }
      isLoading.value = true

      setTimeout(async () => {
        await fetchArticles({ ...params, page })
        isLoading.value = false

        if (!articles.value.length) {
          context.error({ statusCode: 404 })
        }
      }, 1000)
    }

    watch(
      () => queryString.value,
      async (page: any): Promise<void> => fetchArticlesProxy(currentOption.value, Number(page)||1)
    )

    const postPerPage: ComputedRef<number> = computed(() => MAX_POST_PER_PAGE)

    const categoryOptions: ComputedRef<IDropdownOption[]> =
      computed(() => categories.value.map((name: any, i: number) => ({ id: i, name })))

    onMounted(async () => {
      try {
        const { params, query } = context.route
        const { data: { tags } } = await storyApi.get('cdn/tags/', { starts_with: 'article/' })

        categories.value = pipe<any, any, any>(pluck('name'), prepend(DEFAULT_CATEGORY))(tags)
        setArticles(params, query)
      } catch (e) {
        console.warn(e)
        context.error({ statusCode: 404 })
      }
    })

    return {
      list,
      total,
      paginate,
      isLoading,
      articles,
      postPerPage,
      currentPage,
      currentOption,
      selectCategory,
      categoryOptions,
      opts: { template: CustomPagination }
    }
  }
})
</script>

<style lang="stylus" scoped>
@import '~/assets/styl/_transitions.styl'
</style>
