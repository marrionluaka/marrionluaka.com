<template lang="pug">
.related-posts.overflow-hidden(v-if='prev || next')
  .related-posts__wrapper.flex.justify-between
    nuxt-link.inline-block.flex(v-if="!!prev" :to='prev')
      .flex.items-center.mr-4
        svg.w-6.h-6(fill='none' stroke='currentColor' viewbox='0 0 24 24' xmlns='http://www.w3.org/2000/svg')
          path(stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M15 19l-7-7 7-7')
      .text-left
        p.text-base Previous
        p.hidden.text-lg.font-semibold(class="sm:block sm:text-xl") {{ prevPostTitle }}

    nuxt-link.inline-block.flex(v-if="!!next" :to='next')
      .ml-8.text-right
        p.text-base Next
        p.hidden.text-lg.font-semibold(class="sm:block sm:text-xl") {{ nextPostTitle }}
      .flex.items-center.ml-4
        svg.w-6.h-6(fill='none' stroke='currentColor' viewbox='0 0 24 24' xmlns='http://www.w3.org/2000/svg')
          path(stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M9 5l7 7-7 7')

</template>

<script lang="ts">
import { defineComponent, onMounted, PropType } from '@vue/composition-api'

import useContext from '@/hooks/useContext'
import usePostLinks from '@/hooks/usePostLinks'

export default defineComponent({
  props: {
    uuid: {
      type: String as PropType<string>,
      required: true
    }
  },

  setup(props) {
    const { storyApi } = useContext()
    const { prev, next, nextPostTitle, prevPostTitle, setPrevNextLinks } = usePostLinks(storyApi)

    onMounted(async () => await setPrevNextLinks(props.uuid))

    return { prev, next, nextPostTitle, prevPostTitle }
  }
})
</script>

<style lang="stylus" scoped>
.related-posts
  &__wrapper
    margin 56px 0

  a:hover
    p, path
      color darken(white, 50%)
</style>
