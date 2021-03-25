<template lang="pug">
.article.container.my-12.mx-auto.px-4(class="lg:px-52 xl:px-64")
  ProgressBar
  div(v-if="isLoading")
    | loading...
  div(v-else-if="article")
    section.article-header
      .article-header__title
        h1.text-2xl(class="md:text-4xl") {{ article.title }}
        span.ml-underline

      .article-header__meta.flex.justify-center.items-center
        .flex.items-center.pr-1
          .transform.scale-75
            svg.w-6.h-6(fill='none' stroke='currentColor' viewbox='0 0 24 24' xmlns='http://www.w3.org/2000/svg')
              path(stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z')
          p.text-sm(class="md:text-lg") {{ publishedAt }}
        span.px-1(class="md:px-4") &#xb7;

        .flex.items-center
          .transform.scale-75
            svg.w-6.h-6(fill='none' stroke='currentColor' viewbox='0 0 24 24' xmlns='http://www.w3.org/2000/svg')
              path(stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z')
          p.text-sm(class="md:text-lg") {{ article.reading_time || '12 minutes' }}

      figure.article-header__image(v-if="article.featured_image")
        .flex.flex-col.justify-center
          img(
            :alt="article.featured_image.alt"
            :title="article.featured_image.title"
            :src="article.featured_image.filename"
          )
          figcaption(v-if="article.featured_image.copyright" v-html="article.featured_image.copyright")

    section.article-intro
      p {{ article.intro_paragraph }}

    section.article-series(v-if="article.series")
      div(v-html="md.render(article.series)")

    section.article-table-of-content(v-if="article.toc")
      h3 Table of Content
      hr.my-4
      .article-content(ref="articleContent" v-html="md.render(article.toc)")

    section.article-body(v-html="md.render(article.body)" ref="articleBody")

    section.article-footer(v-if='prev || next')
      .angles.flex.justify-between
        nuxt-link(v-if="!!prev" :to='prev')
          span.angle-left < Previous
        nuxt-link(v-if="!!next" :to='next')
          span.angle-right Next >
  div(v-else)
    | Whoops! No article found.
</template>

<script lang="ts">
import { path } from 'ramda'
import { format } from 'date-fns'
import { defineComponent, onMounted, ref, Ref } from '@vue/composition-api'

import { IArticle } from '@/global-types'
import { DEFAULT_CATEGORY, DATE_FORMAT } from '@/global-const'

import useContext from '@/hooks/useContext'
import useMarkdown from '@/hooks/useMarkdown'
import usePostLinks from '@/hooks/usePostLinks'
import useImageZoom from '@/hooks/useImageZoom'
import useAnchorTitle from '@/hooks/useAnchorTitle'
import useSmoothScroll from '@/hooks/useSmoothScroll'

import ProgressBar from '@/components/ProgressBar.vue'

export default defineComponent({
  components: { ProgressBar },

  setup() {
    const publishedAt: Ref<string> = ref('')
    const isLoading: Ref<boolean> = ref(true)
    const article: Ref<IArticle | null> = ref(null)
    const articleBody: Ref<HTMLElement | null> = ref(null)
    const articleContent: Ref<HTMLElement | null> = ref(null)

    useImageZoom(articleBody)
    useAnchorTitle(articleBody)
    const { md } = useMarkdown()
    const { context, storyApi } = useContext()
    const { smoothScroll } = useSmoothScroll(articleContent)
    const { prev, next, setPrevNextLinks } = usePostLinks(context.app.$storyapi)

    onMounted(async () => {
      try {
        const slug = path(['route', 'params', 'post'], context)
        const findCategory = (x: string): boolean => x === context.route.params.category

        if (!slug) throw new Error('Article not found.')

        const { data: { story } } = await storyApi.get(`cdn/stories/articles/${slug}`, { version: 'published' })

        if (!story.tag_list.find(findCategory) && context.route.params.category !== DEFAULT_CATEGORY) {
          context.error({ statusCode: 404 })
          return
        }

        await setPrevNextLinks(story.uuid)

        article.value = story.content
        publishedAt.value = format(new Date(story.published_at), DATE_FORMAT)
      } catch (e) {
        console.warn(e)
      } finally {
        isLoading.value = false
      }
    })

    return {
      md,
      prev,
      next,
      article,
      isLoading,
      publishedAt,
      articleBody,
      smoothScroll,
      articleContent
    }
  }
})
</script>

<style lang="stylus" scoped>
.article
  &-header
    text-align center
    margin 32px 0
    +breakpoint('md')
      margin 80px 0 32px

    &__meta
      margin-bottom .5rem

      svg
        margin-right 5px
        color #ababab

    &__title
      h1
        line-height 32.4px
        font-size 1.6875rem
        +breakpoint('md')
          line-height 60px
          font-size 2.5rem

      span.ml-underline
        width 70px
        margin 16px auto

    &__image
      img
        border-radius 5px
      figcaption
        margin-top 10px
        text-align center
        color rgba(0, 0, 0, 0.54)
        font-size 14px

  &-intro
    margin-bottom 40px
    >>> p
      color #3b454e
      @apply text-base
      +breakpoint('md')
        @apply text-lg
  
  &-series
    >>> p
      color #494749
    >>> ul, ol
      @apply pl-10 space-y-1
    >>> li
      list-style disc
      color #b2b2b2

      strong
        font-weight bold
        color #494749

      &.active
        color #494749

      a
        text-decoration underline

  &-table-of-content
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

  &-body
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

  &-footer
    overflow hidden
    .angles
      margin 56px 0
      .angle-left, .angle-right
        padding 7px 20px
        border 1px solid
        border-radius 4px
</style>
