<template lang="pug">
main
  div(v-for="(article, i) in articles")
    div(v-if="i === 1")
      .flex.items-center.py-6
        div IMG
        div
          h2 About Love
          p I don't want to be without you gurl!
    h2.capitalize.text-2xl popular in {{ article[0] }}
    div(v-for="a in article[1]")
      nuxt-link.block.shadow-lg.rounded.overflow-hidden.max-w-md(
        :to="a.full_slug"
        :key="a._uid"
        class='sm:flex'
      )
        .bg-cover.bg-center.h-48.w-auto(
          style="background-image:url('https://marrionluaka.com/wp-content/uploads/2020/07/template-3-1-400x209.png')"
          class='sm:h-auto sm:w-64'
        )
        .p-4
          h2.font-black.mb-3 {{ a.content.title }}
          p.text-sm.text-grey-dark.mb-4 {{ a.content.excerpt }}
</template>

<script lang="ts">
import { pipe, reduce, toPairs } from 'ramda'
import { defineComponent, onMounted, ref, Ref } from '@vue/composition-api'

import { IStory } from '@/global-types'
import useContext from '@/hooks/useContext'

export default defineComponent({
  setup() {
    const { repo } = useContext()
    const articles: Ref<any> = ref([])

    onMounted(async () => {
      try {
        const { data: { stories } } = await repo.getResources({ starts_with: 'articles/', sort_by: 'position:asc' })

        articles.value = pipe(
          reduce((acc: any, story: IStory): { [key:string]: IStory[] } => {
            const setCategory = (key: string) => acc[key] = acc[key] ? [...acc[key], story] : [story]

            if (!acc['latest'] || acc['latest'].length < 8)
              setCategory('latest')

            if (!story.tag_list.length) {
              setCategory('miscellaneous')
              return acc
            }

            story.tag_list.forEach(setCategory)

            return acc
          }, {}),
          toPairs
        )(stories)

      } catch (e) {
        console.warn(e)
      }
    })

    return { articles }
  }
})
</script>
