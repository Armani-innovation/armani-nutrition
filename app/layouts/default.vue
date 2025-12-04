<script setup lang="ts">
import LemonFloatPanel from "~/components/FloatPanel/LemonFloatPanel.vue";
</script>

<template>
  <div>
    <div class="grid grid-cols-12 grid-rows-12">
      <div class="row-start-1 row-end-2 col-start-4 col-end-10 content-center justify-items-center">
        <Header/>
      </div>
      <main class="max-h-[75vh] row-start-3 row-end-13 col-start-3 col-end-11 content-center justify-items-center">
        <slot/>
      </main>
      <nav class="max-h-[100vh] row-start-1 row-end-13 col-start-1 col-end-3 content-center justify-items-center">

      </nav>
      <nav
          class="max-h-[100vh] row-start-1 row-end-13 col-start-11 col-end-13 content-center justify-items-center">
        <LemonFloatPanel/>
      </nav>
    </div>
  </div>
</template>


<style scoped>

</style>