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
        dl.space-y-10(class='sm:space-y-0 sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-8')
          div(v-for="article in articles" :key="article.id")
            dt.h-full
              nuxt-link.h-full.flex.flex-col.rounded-lg.overflow-hidden(:to="`/${article.full_slug}`")
                .flex-shrink-0
                  img.h-48.w-full.object-cover(:src="article.content.featured_image.filename" alt='')
                .flex-1.bg-white.p-6.flex.flex-col.justify-between
                  .flex-1
                    p.text-sm.font-medium.text-cyan-600.uppercase Latest
                    article.block.mt-2(href='#')
                      p.text-xl.font-semibold.text-gray-900 {{ article.content.title }}
                  .mt-6.flex.items-center
                    time(datetime='2020-03-10') {{ format(new Date(article.published_at), "MMM d, yyyy") }}

  Pagination(
    :options="opts"
    :records="total"
    @paginate="paginate"
    v-model="currentPage"
    :per-page="postPerPage"
  )
</template>

<script lang="ts">
import { format } from 'date-fns'
import Pagination from 'vue-pagination-2'
import { pipe, pluck, prepend } from 'ramda'
import { Dictionary } from 'vue-router/types/router'
import { defineComponent, watch, onMounted, ref, Ref, computed, ComputedRef } from '@vue/composition-api'

import useContext from '@/hooks/useContext'
import Dropdown from '@/components/Dropdown.vue'
import { IDropdownOption } from '@/global-types'
import { DEFAULT_CATEGORY } from '@/global-const'
import CustomPagination from '@/components/CustomPagination.vue'
import useFetchArticles, { MAX_POST_PER_PAGE } from '@/hooks/useFetchArticles'

const queryString: Ref<string | (string | null)[]> = ref('')
export default defineComponent({
  name: 'articles',

  watchQuery: true,

  components: { Dropdown, Pagination },

  asyncData: ({ query }) => {
    queryString.value = query.page
  },

  setup() {
    const currentPage: Ref<number> = ref(1)
    const categories: Ref<string[]> = ref([])
    const currentOption: Ref<string | (string | null)[]> = ref('')

    const { context, storyApi } = useContext()
    const { total, articles, fetchArticles } = useFetchArticles()

    const selectCategory = async (onCloseDropdown: any, category: string) => {
      onCloseDropdown()
      await navTo('/blog/' + category, category, 1)
    }

    const paginate = async (page: number) => {
      console.log('called', page)
      await navTo((`?page=${page}`), currentOption.value, page)
    }

    const navTo = async (url: string, category: string | (string | null)[], page: number) => {
      history.pushState(null, '', url)
      await setArticles({ category }, { page })
    }

    const setArticles = async ({ category }: any, { page = '1' }: Dictionary<string | number | (string | null)[]>) => {
      currentPage.value = Number(page)
      currentOption.value = categories.value.includes(category as string) ? category : categories.value[0]

      await fetchArticlesProxy(category, Number(page) || 1)
    }

    const fetchArticlesProxy = async (category: string | (string | null)[], page: number): Promise<void> => {
      const params = !category || category === DEFAULT_CATEGORY ? { sort_by: 'position:asc' } : { with_tag: category }
      await fetchArticles({ ...params, page })
    }

    watch(
      () => queryString.value,
      async (page: any): Promise<void> => await fetchArticlesProxy(currentOption.value, Number(page) || 1)
    )

    const postPerPage: ComputedRef<number> = computed(() => MAX_POST_PER_PAGE)

    const categoryOptions: ComputedRef<IDropdownOption[]> =
      computed(() => categories.value.map((name: any, i: number) => ({ id: i, name })))

    onMounted(async () => {
      try {
        const { params, query } = context.route
        const { data: { tags } } = await storyApi.get('cdn/tags/', { starts_with: 'article/' })

        categories.value = pipe(pluck('name'), prepend(DEFAULT_CATEGORY))(tags)
        await setArticles(params, query)
      } catch (e) {
        console.warn(e)
      }
    })

    return {
      total,
      format,
      paginate,
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
