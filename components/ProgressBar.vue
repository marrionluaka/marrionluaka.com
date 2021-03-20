<template lang="pug" functional>
  .flex.items-center.justify-center.w-full.fixed.z-10.top-0.left-0.overflow-hidden.ml-progress-bar(class="h-1.5")
    .bg-gray-700.absolute.top-0.left-0.w-0.h-full.ml-progress-bar-filled(:style="{ width: `${props.value}%` }")
</template>
