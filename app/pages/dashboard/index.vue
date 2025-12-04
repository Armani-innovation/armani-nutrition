<script setup lang="ts">
import {onMounted, ref} from 'vue'

const phone = ref<string>('')
const walletBalance = ref<number>(125000)

function fetchInfos() {
  phone.value = sessionStorage.getItem('phone') || ""
}

onMounted(() => {
  fetchInfos()
})
</script>

<template>
  <!-- Page with main background -->
  <div class="bg-primary/80 p-4 sm:p-8 rounded-2xl">

    <!-- User information -->
    <div
        class="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 mb-10
             transition-all duration-300 hover:shadow-md hover:-translate-y-0.5"
    >
      <div class="flex items-center justify-between">
        <div>
          <p class="text-gray-500 text-sm">شماره تماس</p>
          <p class="text-xl font-semibold text-gray-800">
            {{ phone }}
          </p>
        </div>

        <div class="text-right">
          <p class="text-gray-500 text-sm">موجودی کیف پول</p>
          <p class="text-xl font-bold text-green-600">
            {{ walletBalance.toLocaleString() }} تومان
          </p>
        </div>
      </div>
    </div>

    <!-- Cards section -->
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">

      <NuxtLink to="/paymentsHistory" class="card-item">
        <div class="text-4xl mb-4">💰</div>
        <h2 class="card-title">سوابق مالی</h2>
      </NuxtLink>

      <!--      <div class="card-item">-->
      <!--        <div class="text-4xl mb-4">💳</div>-->
      <!--        <h2 class="card-title">شارژ کیف پول</h2>-->
      <!--      </div>-->

      <NuxtLink to="/reportsHistory" class="card-item">
        <div class="text-4xl mb-4">🥗</div>
        <h2 class="card-title">سوابق تغذیه</h2>
      </NuxtLink>

    </div>

    <!-- Reporting section -->
    <div
        class="bg-white border border-gray-200 rounded-2xl shadow-md p-8 flex flex-col items-center text-center
             transition duration-300 hover:shadow-lg hover:-translate-y-0.5"
    >
      <h3 class="text-xl font-semibold text-gray-800 mb-3">گزارش‌گیری</h3>
      <p class="text-gray-500 mb-5">از عملکرد خود گزارش دقیق دریافت کنید.</p>

      <NuxtLink
          to="/questionnaire"
          class="bg-primary text-white px-8 py-3 rounded-xl text-lg font-medium
               transition-all duration-300 hover:bg-green-900 hover:shadow-lg hover:scale-105 cursor-pointer"
      >
        شروع گزارش‌گیری
      </NuxtLink>
    </div>

  </div>
</template>

<style>
</style>
