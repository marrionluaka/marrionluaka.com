<template lang="pug">
.fixed.left-0.share-btn
  .flex.flex-row(class="sm:flex-col")
    a.btn.btn-fb.cursor-pointer.border-none.w-12.h-12.flex.justify-center.items-center(data-id='fb')
      font-awesome-icon.text-white.text-2xl(:icon="faFacebookF")
    a.btn.btn-wa.cursor-pointer.border-none.w-12.h-12.flex.justify-center.items-center(data-id='wa')
      font-awesome-icon.text-white.text-2xl(:icon="faWhatsapp")
    a.btn.btn-linkedin.cursor-pointer.border-none.w-12.h-12.flex.justify-center.items-center(data-id='in')
      font-awesome-icon.text-white.text-2xl(:icon="faLinkedinIn")
    a.btn.btn-reddit.cursor-pointer.border-none.w-12.h-12.flex.justify-center.items-center(data-id='re')
      font-awesome-icon.text-white.text-2xl(:icon="faRedditAlien")
</template>

<script lang="ts">
import { defineComponent, computed } from '@vue/composition-api'
import { faWhatsapp, faRedditAlien, faFacebookF, faLinkedinIn } from '@fortawesome/free-brands-svg-icons'

export default defineComponent({
  head() {
    return {
      script: [{ src: '/share-buttons.js' }]
    }
  },

  setup() {
    return {
      faWhatsapp: computed(() => faWhatsapp),
      faRedditAlien: computed(() => faRedditAlien),
      faFacebookF: computed(() => faFacebookF),
      faLinkedinIn: computed(() => faLinkedinIn)
    }
  },
})
</script>

<style lang="stylus" scoped>
.share-btn
  left 0
  bottom 0
  +breakpoint('sm')
    top 50%
    transform translate(0%, -50%)

.btn
  path
    color white
  &-fb
    background-color $fb-blue
  &-wa
    background-color $wa-green
  &-linkedin
    background-color $li-blue
  &-reddit
    background-color $reddit-red
</style>