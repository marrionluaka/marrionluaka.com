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

    section.article-series(v-if="article.series" v-html="md.render(article.series)")
    TableOfContent(v-if="article.toc" :content="md.render(article.toc)")
    PostContent(:content="md.render(article.body)")
    RelatedPosts(:uuid="uuid")

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

import ProgressBar from '@/components/ProgressBar.vue'
import PostContent from '@/components/PostContent.vue'
import RelatedPosts from '@/components/RelatedPosts.vue'
import TableOfContent from '@/components/TableOfContent.vue'

export default defineComponent({
  components: {
    ProgressBar,
    PostContent,
    TableOfContent,
    RelatedPosts
  },

  setup() {
    const uuid: Ref<string> = ref('')
    const publishedAt: Ref<string> = ref('')
    const isLoading: Ref<boolean> = ref(true)
    const article: Ref<IArticle | null> = ref(null)

    const { md } = useMarkdown()
    const { context, storyApi } = useContext()

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

        uuid.value = story.uuid
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
      uuid,
      article,
      isLoading,
      publishedAt
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
</style>
