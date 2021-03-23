<template lang="pug">
.dropdown(v-click-outside="removeActiveState")
  p.dropdown__title I want to learn 
  .dropdown__container(:class="{ active: isActive }")
    .dropdown__options
      slot(:onCloseDropdown="onCloseDropdown")
    .dropdown__selected(@click="toggleActiveState") {{ currentOption }}
</template>

<script lang="ts">
import { watch, defineComponent, ref, Ref, PropType } from '@vue/composition-api'

import { IDropdownOption } from '@/global-types'
import clickOutside from './directives/click-outside'

export default defineComponent({
  props: {
    options: {
      type: Array as PropType<IDropdownOption[]>,
      required: true
    }
  },

  directives: { clickOutside },

  setup(props) {
    const isActive: Ref<boolean> = ref(false)
    const currentOption: Ref<string> = ref('')

    watch(() => props.options, options => (currentOption.value = options[0]?.name))

    const toggleActiveState = () => isActive.value = !isActive.value
    const removeActiveState = () => isActive.value && (isActive.value = false)

    const onCloseDropdown = (option: IDropdownOption) => {
      if (currentOption.value !== option.name) {
        isActive.value = false
        currentOption.value = option.name
      }
    }

    return {
      isActive,
      onCloseDropdown,
      currentOption,
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
      bottom -2px
      height 1px
      content ""
      background-color #efecec

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

  &__option:hover
    background #ffffff

  &__selected
    @apply py-3 pr-4 pl-3 bg-white capitalize
    color #ababab
</style>
