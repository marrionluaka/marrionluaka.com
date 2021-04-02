<template lang="pug">
.dropdown(v-click-outside="removeActiveState")
  p.dropdown__title I want to learn 
  .dropdown__container(:class="{ active: isActive }")
    .dropdown__options
      slot(:onCloseDropdown="onCloseDropdown")
    .dropdown__selected(@click="toggleActiveState") {{ currentOption }}
</template>

<script lang="ts">
import { defineComponent, ref, Ref, PropType } from '@vue/composition-api'

import clickOutside from './directives/click-outside'

export default defineComponent({
  props: {
    currentOption: {
      type: String as PropType<string>,
      required: true
    }
  },

  directives: { clickOutside },

  setup() {
    const isActive: Ref<boolean> = ref(false)

    const onCloseDropdown = () => (isActive.value = false)
    const toggleActiveState = () => isActive.value = !isActive.value
    const removeActiveState = () => isActive.value && (isActive.value = false)

    return {
      isActive,
      onCloseDropdown,
      removeActiveState,
      toggleActiveState
    }
  }
})
</script>

<style lang="stylus" scoped>
.dropdown
  @apply flex flex-col items-center mb-12 text-xl
  +breakpoint('md')
    @apply flex flex-row justify-center text-3xl

  &__title
    margin 0
    font-size inherit

  &__container
    @apply flex flex-col m-0 relative cursor-pointer
    max-width 400px

    &.active
      &::after
        top -15px
        transform rotateX(180deg)

      .dropdown__options
        @apply absolute overflow-y-scroll opacity-100 left-1/2
        max-height: 240px
        transform: translate(-50%, 0)
        +breakpoint('md')
          transform none
          left: 0

    &::after
      @apply bg-contain bg-no-repeat absolute h-full right-0 pointer-events-none transition-all
      content ""
      width 32px
      top 18px

    &::before
      @apply left-0 right-0 absolute
      bottom 3px
      height 1px
      content ""
      background-color #1d1d1f

  &__options
    @apply absolute z-10 max-h-0 w-full opacity-0 transition-all rounded-xl overflow-hidden order-1
    top 70px
    min-width 250px
    color $dark-grey
    background $bg-grey

    &::-webkit-scrollbar
      width 8px
      background #aaa
      border-radius 0 8px 8px 0

    &::-webkit-scrollbar-thumb
      background #ccc
      border-radius 0 8px 8px 0

  &__selected
    @apply py-3 pr-4 pl-3 bg-transparent capitalize
    // color #ababab
</style>
