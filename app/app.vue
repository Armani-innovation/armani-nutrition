<script setup lang="ts">
import {watch} from "vue"
import {useI18n} from "#imports"

const {locale} = useI18n()

if (process.client) {
  watch(
      locale,
      (lang) => {
        document.documentElement.dir = lang === "fa" || lang === "ar" ? "rtl" : "ltr"
      },
      {immediate: true}
  )
}


</script>

<template>
  <div>
    <BackGround/>
    <NuxtLayout>
      <NuxtPage/>
    </NuxtLayout>
  </div>
</template>