<template lang="pug">
main
  div
    Dropdown(:currentOption="currentOption")
      template(v-slot:default="{ onCloseDropdown }")
        nuxt-link.block.px-3.py-4.text-xl.capitalize.cursor-pointer(
          :key='option.id'
          class="hover:bg-white"
          v-for='option in categoryOptions'
          @click.native="onCloseDropdown"
          :to="{ name: 'articles', query: { category: option.name }}"
        )
          input.hidden(type='radio' :id='option.name + option.id' name='category')
          label.cursor-pointer(:for='option.name + option.id') {{ option.name }}

  section.row
    div(v-for="article in articles" :key="article.id")
      nuxt-link.post-card(:to='article.full_slug')
        figure
          img(:src='article.content.featured_image.filename')
          div(style="padding: 0 16px;")
            h2.post-card__content {{ article.content.title }}
            p {{ article.content.excerpt }}
  div.pagination
    p page {{ currentPage }} of {{ total }}
</template>

<script lang="ts">
import { pluck } from 'ramda'
import { watch, defineComponent, onMounted, ref, Ref, computed } from '@vue/composition-api'

import useContext from '@/hooks/useContext'
import Dropdown from '@/components/Dropdown.vue'
import useFetchArticles from '@/hooks/useFetchArticles'

// -- until nuxt comes up with a reliable solution for dealing with asyncData
const currentCategory: Ref<string | (string | null)[]> = ref('')

export default defineComponent({
  name: 'articles',

  watchQuery: true,

  components: { Dropdown },

  asyncData: ({ query }) => {
    currentCategory.value = query?.category
  },

  setup() {
    const currentPage: Ref<number> = ref(1)
    const categories: Ref<string[]> = ref([])
    const currentOption: Ref<string | (string | null)[]> = ref('')

    const { context, storyApi } = useContext()
    const { total, articles, fetchArticles } = useFetchArticles()
    const categoryOptions = computed(() => categories.value.map((name: any, i: number) => ({ id: i, name })))

    const setArticles = async (category: string | (string | null)[]) => {
      const opts = !category || category === 'latest' ? { sort_by: 'position:asc' } : { with_tag: category }
      currentOption.value = categories.value.includes(category as string) ? category : categories.value[0]
      await fetchArticles(opts)
    }

    watch(
      () => currentCategory.value,
      async (currentCategory: string | (string | null)[]) => await setArticles(currentCategory)
    )

    onMounted(async () => {
      try {
        const { category } = context.route.query
        const { data: { tags } } = await storyApi.get('cdn/tags/', { starts_with: 'articles/' })

        categories.value = pluck('name')(tags)
        await setArticles(category)
      } catch (e) {
        console.warn(e)
      }
    })

    return {
      total,
      articles,
      categories,
      currentPage,
      currentOption,
      currentCategory,
      categoryOptions
    }
  }
})
</script>
