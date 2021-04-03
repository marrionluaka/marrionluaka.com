<template lang="pug">
.content-container.mx-auto.flex.items-center.justify-center.px-4(class='sm:px-6 lg:px-8')(:class='props.theme.wrapper')
  nav(:class='props.theme.nav')
    ul.flex.items-center.flex-wrap(v-show='props.showPagination' :class='props.theme.list')
      li(v-if='props.hasEdgeNav' :class='props.theme.firstPage' @click='props.setFirstPage')
        a(v-bind='{...props.aProps,...props.firstPageProps}') {{props.texts.first}}
      li(v-if='props.hasChunksNav' :class='props.theme.prevChunk' @click='props.setPrevChunk')
        a.block(v-bind='{...props.aProps, ...props.prevChunkProps}')
          svg.w-6.h-6(fill='none' stroke='currentColor' viewbox='0 0 24 24' xmlns='http://www.w3.org/2000/svg')
            path(stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M11 19l-7-7 7-7m8 14l-7-7 7-7')
      li(:class='props.theme.prev' @click='props.setPrevPage')
        a.block(v-bind='{...props.aProps,...props.prevProps}')
          svg.w-6.h-6(fill='none' stroke='currentColor' viewbox='0 0 24 24' xmlns='http://www.w3.org/2000/svg')
            path(stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M15 19l-7-7 7-7')
      li(v-for='page in props.pages' :key='page' :class='props.pageClasses(page)' v-on='props.pageEvents(page)')
        a(v-bind='props.aProps' :class='props.theme.link') {{page}}
      li(:class='props.theme.next' @click='props.setNextPage')
        a.block(v-bind='{...props.aProps, ...props.nextProps}')
          svg.w-6.h-6(fill='none' stroke='currentColor' viewbox='0 0 24 24' xmlns='http://www.w3.org/2000/svg')
            path(stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M9 5l7 7-7 7')
      li(v-if='props.hasChunksNav' :class='props.theme.nextChunk' @click='props.setNextChunk')
        a.block(v-bind='{...props.aProps, ...props.nextChunkProps}')
          svg.w-6.h-6(fill='none' stroke='currentColor' viewbox='0 0 24 24' xmlns='http://www.w3.org/2000/svg')
            path(stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M13 5l7 7-7 7M5 5l7 7-7 7')
      li(v-if='props.hasEdgeNav' :class='props.theme.lastPage' @click='props.setLastPage')
        a(v-bind='{...props.aProps, ...props.lastPageProps}') {{props.texts.last}}
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  name: 'MyPagination',
  props: ['props']
})
</script>

<style lang="stylus" scoped>
.VuePagination__pagination-item
  &.disabled
    display none

  display inline-block
  text-align center
  padding 3px 2px
  min-width 35px
  cursor pointer
  border-radius 100%
  a
    padding 3px 2px
  &:hover, &.active
    background darken($white, 25%)
    a, path
      color white
</style>
