<template lang="pug">
  .progress-bar(class="h-1.5")
    .progress-bar__fill(:style="{ width: `${progress}%` }")
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted } from '@vue/composition-api'
import useProgressScroll from '@/hooks/useProgressScroll'

export default defineComponent({
  setup() {
    const { progress, setProgress } = useProgressScroll()

    onMounted(() => document.addEventListener('scroll', setProgress))
    onUnmounted(() => document.removeEventListener('scroll', setProgress))

    return { progress }
  }
})
</script>

<style lang="stylus" scoped>
.progress-bar
  @apply flex items-center justify-center w-full fixed z-10 top-0 left-0 overflow-hidden
  &__fill
    @apply absolute top-0 left-0 w-0 h-full
    background $dark-grey
</style>
