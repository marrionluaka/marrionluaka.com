<template lang="pug">
._flex._flex-col.min-h-screen#top(:class='$nuxt.$route.name.toLocaleLowerCase()')
  Header
  nuxt._flex-grow
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
