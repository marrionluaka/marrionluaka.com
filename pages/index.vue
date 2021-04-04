<template lang="pug">
main.pb-20
  header.flex.items-center.bg-white.h-screen
    .max-w-xl.mx-auto.px-4(class='sm:px-6 lg:max-w-5xl lg:px-8')
      div(class='lg:grid lg:grid-cols-2 lg:grid-flow-col-dense')
        .flex.items-center.max-w-xl.mx-auto.px-4(class='sm:px-6 lg:py-16 lg:max-w-none lg:mx-0 lg:px-0')
          div
            .mt-6
              h1.text-3xl.font-extrabold.tracking-tight.text-gray-900
                | Hi, I’m Marrion Luaka.
              p.mt-4.text-base(class='md:text-lg')
                | I like making things. I turn ideas into reality. 
                | On this website, I share my thoughts on programming and various other topics. Welcome!

        .mt-16(class="md:mt-12")
          img.w-full(class='lg:h-full' src='~/assets/images/home-banner.png' alt='Inbox user interface')

  //- featured article
  section.mt-32.mb-20
    .featured.content-container.mx-auto.px-4(v-if="featuredArticle" class='sm:px-6 lg:px-8')
      nuxt-link.grid-cols-3.block.rounded-lg.overflow-hidden(class="sm:grid" :to="featuredArticle.full_slug")
        .featured__img.col-span-2.overflow-hidden(class="sm:h-72 lg:h-96")
          .h-full.bg-cover.bg-center.bg-no-repeat(:style="{ backgroundImage: `url(${featuredArticle.content.featured_image.filename})` }")
        .flex-1.bg-white.p-6.flex.flex-col.justify-between
          .flex-1
            p.featured__category Latest
            p.featured__title {{ featuredArticle.content.title }}
          .mt-6.flex.items-center
            time.featured__time(datetime='2020-03-10') {{ format(new Date(featuredArticle.published_at), "MMM d, yyyy") }}

      .w-full.border-t.border-gray-300.mt-16.mb-8

    //- latest articles
    .py-12
      .content-container.mx-auto.px-4(class='sm:px-6 lg:px-8')
        dl.space-y-10(class='sm:space-y-0 sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-6')
          div(v-for="a in latestArticles")
            PostTile(
              :link="a.full_slug"
              category="Latest"
              :title="a.content.title"
              :published_at="a.published_at"
              :imgSrc="a.content.featured_image.filename"
            )

  //- about
  section.mb-20
    .relative.bg-dark-gray
      .relative.h-56(class='sm:h-72 md:absolute md:left-0 md:h-full md:w-1/2')
        img.w-full.h-full.object-cover(src='~/assets/images/about-sec.jpeg' alt='Minimal Desk Setup')

      .relative.mx-auto.max-w-md.px-4.py-12(class='sm:max-w-5xl sm:px-6 sm:py-20 md:py-28 lg:px-8 lg:py-32')
        div(class='md:ml-auto md:w-1/2 md:pl-10')
          p.mt-2.text-white.text-3xl.font-extrabold.tracking-tight(class='sm:text-4xl')
            | Hey there!
          p.mt-3.text-lg.text-gray-300
            | Thanks for stopping by, and taking the time to checkout my website.
            | My name is Marrion, I'm a Software Developer. I specialize in everything
            | Javascript (frontend, backend, mobile, you name it!).
          .mt-8
            .inline-flex.rounded-md.shadow
              nuxt-link.inline-flex.items-center.justify-center.px-5.border.border-transparent.text-base.font-medium.rounded-3xl.text-gray-900.bg-light-gray(
                to='/about'
                class='py-2.5 hover:bg-gray-50'
              )
                | Continue reading

  //- categories  
  section
    .content-container.mx-auto.py-16.px-4.gap-8(
      v-for="article in articles.slice(1, 2)"
      :key="article[0]"
      class='sm:grid sm:px-6 lg:px-8 lg:grid-cols-3'
    )
      .flex.items-center.justify-center.col-span-2(class="lg:col-span-1")
        .categories__intro.text-center.pb-4(class="lg:pb-0 lg:text-left")
          p.mt-2.text-3xl.font-extrabold.text-gray-900.capitalize {{ article[0] }}
          p.mt-4.text-lg.text-gray-500
            | Wanna learn more about 
            span.text-gray-500.capitalize {{ article[0] }}
            | ? Check out all my the latest articles.
            //- | Hire professional web designers and developers for full-time or remote work.
          .inline-flex.rounded-3xl.mt-4(class="w-1/2")
              nuxt-link.w-full.inline-flex.items-center.justify-center.px-5.py-2.border.border-transparent.text-base.font-medium.rounded-3xl.text-gray-100.bg-dark-gray(
                :to="`/blog/${article[0]}`"
                class='mb-4 md:mb-0 hover:bg-gray-50 hover:text-grey-900 hover:bg-light-gray'
              ) View all

      dl.space-y-10(class='sm:grid sm:grid-cols-2 sm:col-span-2 sm:space-y-0 sm:gap-6')
        div(v-for="a in article[1].slice(0, 2)")
          PostTile(
            :link="a.full_slug"
            :category="article[0]"
            :title="a.content.title"
            :published_at="a.published_at"
            :imgSrc="a.content.featured_image.filename"
          )
</template>

<script lang="ts">
import { format } from 'date-fns'
import { pipe, reduce, toPairs, head, path } from 'ramda'
import { computed, defineComponent, onMounted, ref, Ref } from '@vue/composition-api'

import { IStory } from '@/global-types'
import useContext from '@/hooks/useContext'
import PostTile from '@/components/PostTile.vue'
import { DEFAULT_CATEGORY } from '@/global-const'

export default defineComponent({
  components: { PostTile },

  setup() {
    const { storyApi } = useContext()
    const articles: Ref<any> = ref([])
    const getLatestArticles = pipe<any, any, any>(head, path<any>(['1']))

    onMounted(async () => {
      try {
        const { data: { stories } } = await storyApi.get('cdn/stories/', { starts_with: 'article/', sort_by: 'position:asc' })

        articles.value = pipe(
          reduce((acc: any, story: IStory): { [key:string]: IStory[] } => {
            const setCategory = (key: string) => acc[key] = acc[key] ? [...acc[key], story] : [story]

            if (!acc[DEFAULT_CATEGORY] || acc[DEFAULT_CATEGORY].length < 8)
              setCategory(DEFAULT_CATEGORY)

            if (story.tag_list.length)
              story.tag_list.forEach(setCategory)

            return acc
          }, {}),
          toPairs
        )(stories)

      } catch (e) {
        console.warn(e)
      }
    })

    return {
      format,
      articles,
      featuredArticle: computed(() => articles.value.length && head(getLatestArticles(articles.value))),
      latestArticles: computed(() => !articles.value.length ? [] : getLatestArticles(articles.value).slice(1, 4))
    }
  }
})
</script>

<style lang="stylus" scoped>
@import '~assets/styl/components/_tile.styl'

h1
  font-size 32px
  line-height 1.125
  font-weight 600
  letter-spacing .004em
  +breakpoint('md')
    font-size 48px
    line-height 1.08349
    font-weight 600
    letter-spacing -.002em
  +breakpoint('lg')
    font-size 56px
    line-height 1.07143
    font-weight 600
    letter-spacing -.005em

.categories__intro
  max-width 400px

.featured
  @extends .base-tile
  &__title
    font-size: 19px;
    line-height: 1.21053;
    font-weight: 700;
    letter-spacing: .012em;
    +breakpoint('md')
      font-size 21px
      line-height 1.19048
      font-weight 700
      letter-spacing .011em
    +breakpoint('lg')
      font-size 32px
      line-height 1.125
      font-weight 600
      letter-spacing .004em
</style>