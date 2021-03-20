<template lang="pug">
main
  nuxt-link.block.shadow-lg.rounded.overflow-hidden.max-w-md(
    v-for="article in articles"
    :to="article.full_slug"
    :key="article._uid"
    class='sm:flex'
  )
    .bg-cover.bg-center.h-48.w-auto(style="background-image:url('https://marrionluaka.com/wp-content/uploads/2020/07/template-3-1-400x209.png')" class='sm:h-auto sm:w-64')
    // <img src="./img/image1.jpg" alt="">
    .p-4
      h2.font-black.mb-3 {{ article.content.title }}
      p.text-sm.text-grey-dark.mb-4 {{ article.content.excerpt }}

</template>

<script lang="ts">
import { defineComponent, onMounted, ref, Ref } from '@vue/composition-api'

import { IStory } from '@/global-types'
import useContext from '@/hooks/useContext'

export default defineComponent({
  setup() {
    const { repo } = useContext()
    const articles: Ref<IStory[]> = ref([])

    onMounted(async () => {
      try {
        const { data: { stories } } = await repo.getResources({ starts_with: 'articles/' })

        articles.value = stories
      } catch (e) {
        console.warn(e)
      }
    })

    return { articles }
  }
})
</script>

<style lang="stylus">
</style>
