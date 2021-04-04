<template lang="pug" functional>
  header.py-8.bg-white.w-full.px-4
    nav.content-container.mx-auto.flex.flex-col(class="md:flex-row md:justify-between")
      .logo
        nuxt-link(to='/')
          img(src='~/assets/images/logo.png')

      ul.flex.flex-col.py-4(class="md:py-0 md:flex-row md:items-center")
        li
          nuxt-link.text-lg.inline-block.mr-6.mb-6(class="md:mb-0" to='/') Home
        li
          nuxt-link.text-lg.inline-block.mr-6.mb-6(class="md:mb-0" to='/about') About
        li
          nuxt-link.text-lg.inline-block.mr-6.mb-6(class="md:mb-0" to='/blog/all') Blog
        //- li(v-if="!props.isSubscribed")
          //- button.subscribe(v-on:click="listeners.onSubscribe") Subscribe
</template>

<style lang="stylus" scoped>
nav
  .logo
    padding-bottom: 8px
    +breakpoint('desktop-small')
      padding-bottom: 0

  .nuxt-link-exact-active.nuxt-link-active
    color: darken($white, 25%)

  li a:hover
    color: darken($white, 25%)

  li
    // .subscribe
    //   @extends .btn
    //   color white
    //   font-size 1rem
    //   padding 4px 16px
    //   background #494749
    //   border-radius 100px

    //   &:focus
    //     outline none
</style>
