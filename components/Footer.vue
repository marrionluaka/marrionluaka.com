<template lang="pug">
  footer.footer.bg-dark-gray.py-8
    .content-container.mx-auto.px-6
      #to-top(ref='toTop' v-scroll-to-top)
        font-awesome-icon(:icon="['fas', 'long-arrow-alt-up']")
      .flex.flex-col(class="md:flex-row md:justify-between md:items-center")
        .footer__content
          p.text-gray-300.copy &copy; {{ new Date().getFullYear() }} Marrion Luaka

        .footer__media
          ul.icons.flex.mt-4(class="md:mt-0")
            li.mr-4
              a(href='https://linkedin.com/in/marrionluaka' target='_blank')
                font-awesome-icon.w-6.h-6.icons__linkedin(:icon="['fab', 'linkedin']")
            li
              a(href='https://github.com/marrionluaka' target='_blank')
                font-awesome-icon.w-6.h-6.icons__github(:icon="['fab', 'github']")
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import scrollToTop from './directives/scroll-to-top'

export default defineComponent({
  directives: { scrollToTop }
})
</script>


<style lang="stylus" scoped>
  #to-top
    z-index 9
    right: 5%
    bottom: 7%
    opacity: 0
    color: #dad8d8
    position: fixed
    font-size: 24px
    padding: 10px 20px
    border-radius: 5px
    transition: opacity .5s ease
    background: $bg-grey
    &.show
      opacity: 1
      cursor: pointer

.icons
  &__linkedin
    width 1.5rem
    height 1.5rem
    path
      color blue
  &__github
      width 1.5rem
      height 1.5rem
    path
      color gainsboro
</style>
