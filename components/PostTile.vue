<template lang="pug">
dt.tile.h-full
  nuxt-link.flex.flex-col.h-full.rounded-lg.overflow-hidden(:to="link")
    .tile__img.flex-shrink-0
      img.h-48.w-full.object-cover(:src="imgSrc" :alt="imgAlt")
    .tile__content.flex-1.bg-white.p-6.flex.flex-col.justify-between
      .flex-1
        p.tile__category(v-if="category") {{ category }}
        p.mt-2.text-xl.font-semibold.text-gray-900 {{ title }}
      .mt-6.flex.items-center
        time.tile__time(:datetime='published_at') {{ format(new Date(published_at), "MMM d, yyyy") }}
</template>

<script lang="ts">
import { format } from 'date-fns'
import { defineComponent, PropType } from '@vue/composition-api'

export default defineComponent({
  props: {
    link: {
      type: String as PropType<string>,
      required: true
    },
    category: {
      type: String as PropType<string>,
      required: false
    },
    imgSrc: {
      type: String as PropType<string>,
      required: true
    },
    imgAlt: {
      type: String as PropType<string>,
      required: false,
      default: ''
    },
    title: {
      type: String as PropType<string>,
      required: true
    },
    published_at: {
      type: String as PropType<string>,
      required: true
    }
  },

  setup() {
    return { format }
  }
})
</script>

<style lang="stylus" scoped>
.tile
  @extends .base-tile
</style>
