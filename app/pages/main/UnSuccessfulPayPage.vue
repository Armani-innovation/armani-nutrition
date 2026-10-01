<template>
  <main class="flex min-h-[70vh] items-center justify-center p-4 sm:p-6">
    <section class="w-full max-w-lg rounded-2xl border border-red-100 bg-white p-6 text-center shadow-lg sm:p-10">
      <div class="mx-auto mb-5 flex size-16 items-center justify-center rounded-full bg-red-100 text-3xl text-red-700">
        ×
      </div>
      <h1 class="mb-3 text-2xl font-bold text-red-700 sm:text-3xl">
        {{ $t('paymentResult.failureTitle') }}
      </h1>
      <p class="mb-8 leading-7 text-gray-600">
        {{ $t('paymentResult.failureDescription') }}
      </p>
      <NuxtLink
          to="/dashboard"
          class="inline-flex w-full items-center justify-center rounded-xl bg-primary px-5 py-3 font-medium text-white transition hover:opacity-90"
      >
        {{ $t('paymentResult.backToDashboard') }}
      </NuxtLink>
    </section>
  </main>
</template>
