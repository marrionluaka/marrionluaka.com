<template lang="pug">
.flex.flex-col.min-h-screen
  .flex.flex-grow
    main.content-container.flex.items-center.justify-center.text-center.mx-auto.px-4.py-40(class='sm:px-6 lg:px-8')
      div
        h1.text-7xl(class="md:text-9xl") Got lost?
        nuxt-link.flex-none.bg-dark-gray.text-white.px-5.py-3.rounded-full.inline-block.mt-4(
          to="/"
          class="hover:text-grey-900 hover:bg-light-gray"
        ) Take me home :-)
</template>
