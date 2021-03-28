<template lang="pug">
.table-of-content
  h3 Table of Content
  hr.my-4
  div(v-html="content" v-smooth-scroll)
</template>

<script lang="ts">
import { defineComponent, PropType } from '@vue/composition-api'
import smoothScroll from './directives/smooth-scroll'

export default defineComponent({
  props: {
    content: {
      type: String as PropType<string>,
      required: true
    }
  },

  directives: { smoothScroll }
})
</script>


<style lang="stylus" scoped>
.table-of-content
  margin-top 56px
  margin-bottom 56px

  >>> h3
    @apply text-xl
    +breakpoint('md')
      @apply text-2xl

  >>> ul, ol
    @apply pl-8 space-y-1

  >>> li
    list-style disc
    color #b2b2b2
    text-decoration underline
</style>
