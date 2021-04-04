<template lang="pug">
.related-posts.overflow-hidden(v-if='prev || next')
  .related-posts__wrapper.flex.justify-between
    nuxt-link(v-if="!!prev" :to='prev')
      span.related-posts__left < Previous
      //- p {{ prevPostTitle }}
    nuxt-link(v-if="!!next" :to='next')
      span.related-posts__right Next >
      //- p {{ nextPostTitle }}
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

  &__left, &__right
    padding 7px 20px
    border 1px solid
    border-radius 4px
</style>
