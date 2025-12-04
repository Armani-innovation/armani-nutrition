<template>
  <div
      class="
      relative
      w-10 h-10
      rounded-full
      bg-gradient-to-br from-yellow-300 to-lime-400
      shadow-md
      border border-yellow-200
      overflow-hidden
      flex items-center justify-center
    "
  >
    <!-- center -->
    <div class="w-1.5 h-1.5 bg-yellow-200 rounded-full z-10" />

    <!-- slices -->
    <span
        v-for="i in 6"
        :key="i"
        class="absolute w-full h-full"
        :style="`transform: rotate(${i * 60}deg)`"
    >
      <span
          class="
          block
          absolute
          top-1/2 left-1/2
          w-[2px] h-5
          bg-yellow-200/80
          origin-top
          -translate-x-1/2
        "
      />
    </span>
  </div>
</template>
