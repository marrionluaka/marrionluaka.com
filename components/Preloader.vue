<template lang="pug">
.preloader
  .dot-container
    .dot.dot--one
    .dot.dot--two
    .dot.dot--three

  svg(xmlns='http://www.w3.org/2000/svg' version='1.1')
    defs
      filter#mush
        fegaussianblur(in='SourceGraphic' stddeviation='10' result='blur')
        fecolormatrix(in='blur' mode='matrix' values='1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 21 -7')

</template>

<style lang="stylus" scoped>
.preloader
  top 0
  left 0
  z-index 999
  width 100vw
  height 100vh
  position fixed
  background white
  text-align center

svg
  overflow hidden
  vertical-align middle

.dot
  top 0
  left 0
  right 0
  bottom 0
  margin auto
  width 70px
  height 70px
  border-radius 50%
  position absolute
  background-color #000

  &--one
    background-color #000000
    animation dot-one-move 2s ease infinite, index 6s -2s ease infinite
  &--two
    background-color #000000
    animation dot-two-move 2s ease infinite, index 6s -4s ease infinite
  &--three
    background-color #000000
    animation dot-three-move 2s ease infinite, index 6s ease infinite

  &-container
    top 50%
    left 50%
    margin auto
    width 200px
    height 200px
    filter url(#mush)
    position absolute
    transform translate(-50%, -50%)
    animation rotate-move 2s ease-in-out infinite

@keyframes rotate-move
  55% 
    transform translate(-50%, -50%) rotate(0deg)
  80%
    transform translate(-50%, -50%) rotate(360deg)
  100%
    transform translate(-50%, -50%) rotate(360deg)

@keyframes index
  0%, 100%
    z-index 3
  33.3%
    z-index 2
  66.6%
    z-index 1

@keyframes dot-one-move
  20%
    transform scale(1)
  45%
    transform translate(16px, 12px) scale(.45)
  60%
    transform translate(80px, 60px) scale(.45)
  80%
    transform translate(80px, 60px) scale(.45)
  100%
    transform translateY(0px) scale(1)

@keyframes dot-two-move
  20%
    transform scale(1)
  45%
    transform translate(-16px, 12px) scale(.45)
  60%
    transform translate(-80px, 60px) scale(.45)
  80%
    transform translate(-80px, 60px) scale(.45)
  100%
    transform translateY(0px) scale(1)

@keyframes dot-three-move
  20%
    transform scale(1)
  45%
    transform translateY(-18px) scale(.45)
  60%
    transform translateY(-90px) scale(.45)
  80%
    transform translateY(-90px) scale(.45)
  100%
    transform translateY(0px) scale(1)
</style>
