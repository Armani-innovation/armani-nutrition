<script setup lang="ts">
import {computed} from 'vue'
import {useRoute} from '#vue-router'

const route = useRoute()
const destination = computed(() => {
  const questionnaireID = route.query.questionnaire_id
  return questionnaireID ? `/result/${questionnaireID}` : '/reportsHistory'
})
</script>

<template>
  <main class="flex min-h-[70vh] items-center justify-center p-4 sm:p-6">
    <section class="w-full max-w-lg rounded-2xl border border-green-100 bg-white p-6 text-center shadow-lg sm:p-10">
      <div class="mx-auto mb-5 flex size-16 items-center justify-center rounded-full bg-green-100 text-3xl text-green-700">
        ✓
      </div>
      <h1 class="mb-3 text-2xl font-bold text-primary sm:text-3xl">
        {{ $t('paymentResult.successTitle') }}
      </h1>
      <p class="mb-8 leading-7 text-gray-600">
        {{ $t('paymentResult.successDescription') }}
      </p>
      <NuxtLink
          :to="destination"
          class="inline-flex w-full items-center justify-center rounded-xl bg-primary px-5 py-3 font-medium text-white transition hover:opacity-90"
      >
        {{ $t('paymentResult.viewReports') }}
      </NuxtLink>
    </section>
  </main>
</template>
