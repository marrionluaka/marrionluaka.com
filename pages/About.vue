<template lang="pug">
  main.mt-20.pb-20
    .intro.content-container.mx-auto.px-4(class='sm:px-6 lg:px-8')
      h2.header Hey, I'm Marrion
      span.ml-underline
      .intro__content
        p I'm a Frontend developer who's always looking for new knowledge to master. 
          | I am currently building cutting edge products in Vuejs.

    img.banner(src='~assets/images/about_banner.png')

    section.content-container.mx-auto.px-4(class='sm:px-6 lg:px-8')
      div.mb-8.space-y-10(class='lg:mb-0 sm:space-y-0 sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-6')
        .summary
          h2.text-2xl Experience
          span.ml-underline
          .summary__item
            h3.mb-2.text-lg VRIFY Technology
            p.text-lg Software Developer
            p.text-lg 2019 - Present
          .summary__item
            h3.mb-2.text-lg PNI Media Inc.
            p.text-lg Software Developer
            p.text-lg 2016 - 2019

        .summary
          h2.text-2xl Education
          span.ml-underline
          .summary__item
            h3.mb-2.text-lg BCIT
            p.text-lg Software Systems Developer
            p.text-lg 2015 - 2016
          .summary__item
            h3.mb-2.text-lg BCIT
            p.text-lg Technical Web Designer
            p.text-lg 2015 - 2015

        .summary
          h2.text-2xl Skillset
          span.ml-underline
          ul.summary__list
            li.text-lg Web Development
            li.text-lg WebSocket
            li.text-lg WebRTC
            li.text-lg Hybrid app development (React Navitve)
            li.text-lg Responsive user experience

      .summary
        h2.text-2xl Hobbies
        span.ml-underline
        ul.summary__list
          li.text-lg Developing apps
          li.text-lg Experimenting with the latest tech
          li.text-lg Learning
          li.text-lg Writing
          li.text-lg Reading
          li.text-lg Sports
</template>

<script>
export default {
  name: 'about',
  head () {
    return {
      title: `About - marrionluaka.com`,
      link: [
        { rel: 'canonical', href: 'marrionluaka.com' }
      ],
      meta: [
        { hid: 'robots', name: 'robots', content: 'index, follow' },
        { hid: 'og:type', property: 'og:type', content: 'article' },
        { hid: 'og:locale', property: 'og:locale', content: 'en_US' },
        { hid: 'og:site_name', property: 'og:site_name', content: 'marrionluaka.com' },
        { hid: 'twitter:card', property: 'twitter:card', content: 'summary_large_image' },
        { hid: 'og:title', property: 'og:title', content: `About - marrionluaka.com` },
        { hid: 'description', name: 'description', content: 'Marrion Luaka software developer nuxt vue nestjs docker marrionluaka.com' },
        { hid: 'og:description', property: 'og:description', content: 'Marrion Luaka software developer nuxt vue nestjs docker marrionluaka.com' },
        { hid: 'bingbot', name: 'bingbot', content: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1' },
        { hid: 'googlebot', name: 'googlebot', content: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1' }
      ]
    }
  }
}
</script>

<style lang="stylus" scoped>
.intro
  .header
    font-size: 2rem
    +breakpoint('md')
      font-size: 2.4rem

  &__content
    max-width: 600px

.banner
  width 100%
  margin: 40px 0
  +breakpoint('md')
    margin: 72px 0

.summary
  &__item
    margin-bottom: 40px
    p
      color #b2b2b2

  &__list
    li
      color: #b2b2b2
      line-height: 2.2
</style>
