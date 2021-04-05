<template lang="pug">
dt.tile.h-full
  div.flex.flex-col.h-full.rounded-lg.overflow-hidden
    .tile__img.flex-shrink-0.overflow-hidden.h-48.animate-skeleton.bg-blue-200
      .h-full.bg-cover.bg-center.bg-no-repeat
    .tile__content.flex-1.bg-white.p-6.flex.flex-col.justify-between
      .flex-1.p-4.animate-skeleton.bg-blue-200
        p.tile__category
        p.mt-2.text-xl.font-semibold.text-gray-900
      .mt-6.flex.items-center.p-4.animate-skeleton.bg-blue-200
        time.tile__time
</template>

<style lang="stylus" scoped>
@import '~assets/styl/components/_tile.styl'

.tile
  @extends .base-tile
  &:hover
    & ^[0]__img::after
      background initial

.animate-skeleton
  background-color #e3e3e3
  background-size 200px 100%
  background-repeat no-repeat
  animation progress 1.2s ease-in-out infinite
  background-image linear-gradient(90deg, #e3e3e3, #f5f5f5, #e3e3e3)

@keyframes progress
  0%
    background-position -200px 0
  100%
    background-position calc(200px + 100%) 0

</style>
