<template lang="pug">
.flex.items-center.justify-center.pb-4.space-x-2
  a.btn.btn-fb.cursor-pointer.border-none.w-8.h-8.flex.justify-center.items-center.rounded-full(data-id='fb')
    font-awesome-icon.text-white.text-lg(:icon="faFacebookF")
  a.btn.btn-wa.cursor-pointer.border-none.w-8.h-8.flex.justify-center.items-center.rounded-full(data-id='wa')
    font-awesome-icon.text-white.text-lg(:icon="faWhatsapp")
  a.btn.btn-linkedin.cursor-pointer.border-none.w-8.h-8.flex.justify-center.items-center.rounded-full(data-id='in')
    font-awesome-icon.text-white.text-lg(:icon="faLinkedinIn")
  a.btn.btn-reddit.cursor-pointer.border-none.w-8.h-8.flex.justify-center.items-center.rounded-full(data-id='re')
    font-awesome-icon.text-white.text-lg(:icon="faRedditAlien")
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
.btn
  border 1px solid
  path
    color #1d1d1f
  &-fb:hover
    border-color $fb-blue
    path
      color $fb-blue
  &-wa:hover
    border-color $wa-green
    path
      color $wa-green
  &-linkedin:hover
    border-color $li-blue
    path
      color $li-blue
  &-reddit:hover
    border-color $reddit-red
    path
      color $reddit-red
</style>
