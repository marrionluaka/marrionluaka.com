<template lang="pug">
.flex.flex-col.min-h-screen#top(:class='$nuxt.$route.name.toLocaleLowerCase()')
  Header
  nuxt.flex-grow
  Footer
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'

export default defineComponent({
  components: { Header, Footer },
})
</script>

<style lang="stylus" scoped>
// @import '~/assets/styl/_transitions.styl'
</style>
