<template lang="pug">
  .post(v-html="content" v-image-zoom v-anchor-title)
</template>

<script lang="ts">
import { defineComponent, PropType } from '@vue/composition-api'

import imageZoom from '@/components/directives/image-zoom'
import anchorTitle from '@/components/directives/anchor-title'

export default defineComponent({
  props: {
    content: {
      type: String as PropType<string>,
      required: true
    }
  },
  directives: { imageZoom, anchorTitle }
})
</script>


<style lang="stylus" scoped>
.post
  >>> iframe
    @apply w-full border-0 rounded-md

  >>> video
    @apply max-w-full

  >>> a
    @apply underline

  >>> p
    @apply text-base
    +breakpoint('md')
      @apply text-lg
    margin 24px 0
    color #3b454e

  >>> ul
    @apply list-disc pl-10 space-y-1

  >>> ol
    list-style-type decimal

  >>> li
    color #3b454e
    list-style-type inherit

  >>> img
      margin 16px 0 8px
      border-radius 4px
      cursor zoom-in
      transition transform 300ms cubic-bezier(0.2, 0, 0.2, 1)
      position relative

      &.zoomed
        cursor zoom-out
        z-index 8
        // transform scale(0.535714) translate(-348.133px, 179.725px)
        +breakpoint('md')
          transform scale(1.55714) translate(-6.42202px, 4.27666px)

  >>> h2
    @apply flex items-center font-medium text-2xl mt-8 pt-8 mb-3
    // font-family $san-fran-semi-bold
    +breakpoint('md')
      @apply text-3xl
    a
      @apply inline-block pr-1

  >>> h2 + p
    margin-top 8px
  
  >>> h3
    @apply mt-6 pt-6 text-xl
    +breakpoint('md')
      @apply text-2xl

  >>> pre
    margin-bottom 24px
    code.hljs
      padding: 16px 30px 20px

  >>> pre, >>> code
    border-radius 5px
  
  >>> :not(pre) > code
    font-size 14px
    background #f0f0f0
    color #ef3b7d
    border-radius 2px
    font-family Source Code Pro,Consolas,monospace
    display inline-block
    padding 1px 6px

  >>> blockquote
    color #828282
    border-left 4px solid #e8e8e8
    padding-left 15px
    font-size 18px
    letter-spacing -1px
    font-style italic
</style>
