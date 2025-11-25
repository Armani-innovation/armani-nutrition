<script setup lang="ts">

</script>

<template>
  <div>
    <BackGround/>
    <div class="grid grid-cols-12 grid-rows-12">
      <div class="row-start-1 row-end-2 col-start-4 col-end-10 content-center justify-items-center">
        <Header/>
      </div>
      <main class="max-h-[75vh] row-start-3 row-end-13 col-start-3 col-end-11 content-center justify-items-center">
        <slot/>
      </main>
    </div>
  </div>
</template>


<style scoped>

</style>