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
    max-width 100%

  >>> a
    text-decoration underline

  >>> p
    font-size 17px
    line-height 1.47059
    letter-spacing -.022em
    +breakpoint('md')
      font-size 19px
      line-height 1.4211
      letter-spacing .012em
    margin 24px 0

  >>> ul
    @apply list-disc pl-10 space-y-1

  >>> ol
    list-style-type decimal

  >>> li
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
    @extends .post-header
    margin-top 2rem
    padding-top 2rem
    a
      @apply inline-block pr-1

  >>> h2 + p
    margin-top 8px
  
  >>> h3
    @apply mt-6 pt-6 text-xl
    +breakpoint('md')
      @apply text-2xl

  >>> pre
    overflow auto
    width 100%
    max-width 744px
    padding 32px
    font-size 13px
    margin 15px auto 50px
    border-radius 5px
    font-family "Operator Mono", Consolas, Menlo, Monaco, source-code-pro, "Courier New", monospace
    background rgb(41, 44, 52)

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
