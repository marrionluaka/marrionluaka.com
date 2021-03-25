<template lang="pug">
main
  div
    Dropdown(:currentOption="currentOption")
      template(v-slot:default="{ onCloseDropdown }")
        .block.px-3.py-4.text-xl.capitalize.cursor-pointer(
          :key='option.id'
          class="hover:bg-white"
          v-for='option in categoryOptions'
          @click.stop="selectCategory(onCloseDropdown, option.name)"
        )
          span.cursor-pointer(:for='option.name + option.id') {{ option.name }}

  section.row
    div(v-for="article in articles" :key="article.id")
      nuxt-link.post-card(:to="`/articles/${currentOption}/${article.slug}`")
        figure
          img(:src='article.content.featured_image.filename')
          div(style="padding: 0 16px;")
            h2.post-card__content {{ article.content.title }}
            p {{ article.content.excerpt }}

  .flex.items-center.py-3
    nuxt-link.block(:to="newest" :disabled="currentPage <= 1") <-- Newest
    p page {{ currentPage }} of {{ totalPages }}
    nuxt-link.block(:to="oldest" :disabled="currentPage >= totalPages") Oldest -->
</template>

<script lang="ts">
import { pipe, pluck, prepend } from 'ramda'
import { Dictionary } from 'vue-router/types/router'
import { defineComponent, onMounted, ref, Ref, computed, ComputedRef } from '@vue/composition-api'

import useContext from '@/hooks/useContext'
import { IDropdownOption } from '@/global-types'
import { DEFAULT_CATEGORY } from '@/global-const'
import Dropdown from '@/components/Dropdown.vue'
import usePagination from '@/hooks/usePagination'
import useFetchArticles, { MAX_POST_PER_PAGE } from '@/hooks/useFetchArticles'

export default defineComponent({
  name: 'articles',

  components: { Dropdown },

  setup() {
    const categories: Ref<string[]> = ref([])
    const currentOption: Ref<string | (string | null)[]> = ref('')

    const { context, storyApi } = useContext()
    const { total, articles, fetchArticles } = useFetchArticles()
    const { oldest, newest, currentPage, setPagination } = usePagination()

    const setArticles = async ({ category }: any, { page = '1' }: Dictionary<string | number | (string | null)[]>) => {
      const opts = !category || category === DEFAULT_CATEGORY ? { sort_by: 'position:asc' } : { with_tag: category }
      currentOption.value = categories.value.includes(category as string) ? category : categories.value[0]

      await fetchArticles(opts)
      setPagination(category, Number(page), totalPages)
    }

    const categoryOptions: ComputedRef<IDropdownOption[]> =
      computed(() => categories.value.map((name: any, i: number) => ({ id: i, name })))
    const totalPages: ComputedRef<number> =
      computed(() => total.value === 0 ? 1 : Math.ceil(total.value / MAX_POST_PER_PAGE))

    const selectCategory = async (onCloseDropdown: any, value: any) => {
      onCloseDropdown()

      history.pushState(null, value, '/articles/' + value + '/')
      await setArticles({ category: value }, { page: 1 })
    }

    onMounted(async () => {
      try {
        const { params, query } = context.route
        const { data: { tags } } = await storyApi.get('cdn/tags/', { starts_with: 'articles/' })

        categories.value = pipe(pluck('name'), prepend(DEFAULT_CATEGORY))(tags)
        await setArticles(params, query)
      } catch (e) {
        console.warn(e)
      }
    })

    return {
      total,
      oldest,
      newest,
      articles,
      totalPages,
      currentPage,
      currentOption,
      selectCategory,
      categoryOptions
    }
  }
})
</script>
