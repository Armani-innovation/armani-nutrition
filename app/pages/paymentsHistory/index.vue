<script setup lang="ts">
import {ref, computed} from "vue"
import type {transactionHistory} from "~/types/History";

const phone = ref("09123456789")

const transactions = ref<transactionHistory[]>([
  {date: "2025-11-24", time: "14:32", amount: "2,500,000", payment: "paid", status: "done", description: "productA"},
  {
    date: "2025-11-23",
    time: "09:15",
    amount: "1,200,000",
    payment: "unpaid",
    status: "pending",
    description: "serviceB"
  },
  {date: "2025-11-22", time: "18:50", amount: "500,000", payment: "paid", status: "done", description: "productC"},
  {date: "2025-11-22", time: "18:50", amount: "500,000", payment: "paid", status: "done", description: "productC"},
  {date: "2025-11-22", time: "18:50", amount: "500,000", payment: "paid", status: "done", description: "productC"},
  {date: "2025-11-22", time: "18:50", amount: "500,000", payment: "paid", status: "done", description: "productC"}
])

const reportCount = computed(() => transactions.value.length)
</script>

<template>
  <div class="bg-white p-4 sm:p-6 animate-fade-in rounded-2xl">

    <!-- Header -->
    <div class="mb-6 sm:mb-8 space-y-1 sm:space-y-2">
      <h1 class="text-2xl sm:text-3xl font-bold text-[#386641] animate-slide-up">
        {{ $t("payments.title") }}
      </h1>
      <p class="text-gray-600 text-sm sm:text-base animate-slide-up delay-150">
        {{ $t("payments.subtitle") }}
      </p>
    </div>

    <!-- User Info -->
    <section class="bg-primary rounded-2xl shadow-md p-4 sm:p-6 mb-6 sm:mb-10 border border-gray-100 animate-scale-in">
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 text-white">
        <div>
          <p class="text-sm">{{ $t("payments.phone") }}</p>
          <p class="text-lg font-semibold">{{ phone }}</p>
        </div>

        <div>
          <p class="text-sm">{{ $t("payments.count") }}</p>
          <p class="text-lg font-semibold">
            {{ reportCount }}
          </p>
        </div>
      </div>
    </section>

    <!-- DESKTOP TABLE -->
    <section
        class="hidden md:block bg-white rounded-2xl shadow-md border border-gray-100 animate-fade-in overflow-x-auto">

      <div class="overflow-y-auto max-h-[250px]">
        <table class="w-full text-right table-auto min-w-[600px]">
          <thead class="bg-primary text-white text-center text-sm sticky top-0 z-10">
          <tr>
            <th class="p-4">{{ $t("payments.table.date") }}</th>
            <th class="p-4">{{ $t("payments.table.time") }}</th>
            <th class="p-4">{{ $t("payments.table.price") }}</th>
            <th class="p-4">{{ $t("payments.table.payment") }}</th>
            <th class="p-4">{{ $t("payments.table.status") }}</th>
          </tr>
          </thead>

          <tbody>
          <tr
              v-for="(item, index) in transactions"
              :key="index"
              class="border-b hover:bg-gray-50 transition"
          >

            <td class="p-4">{{ item.date }}</td>
            <td class="p-4">{{ item.time }}</td>
            <td class="p-4">
              {{ item.amount }}
              {{ $t("payments.currency") }}
            </td>

            <td class="p-4">
              <span :class="item.payment === 'paid' ? 'text-green-600' : 'text-red-600'">
                {{ $t(`payments.payment.${item.payment}`) }}
              </span>
            </td>

            <td class="p-4">
              <span :class="item.status === 'done' ? 'text-[#386641]' : 'text-gray-500'">
                {{ $t(`payments.status.${item.status}`) }}
              </span>
            </td>

          </tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- MOBILE CARDS -->
    <section class="md:hidden max-h-[400px] overflow-y-auto space-y-4">

      <div
          v-for="(item, index) in transactions"
          :key="index"
          class="bg-white rounded-xl shadow p-4 border border-gray-100 animate-scale-in"
      >

        <div class="flex justify-between mb-2">
          <span class="text-gray-500 text-sm">{{ $t("payments.table.date") }}</span>
          <span class="font-semibold text-gray-900">{{ item.date }}</span>
        </div>

        <div class="flex justify-between mb-2">
          <span class="text-gray-500 text-sm">{{ $t("payments.table.time") }}</span>
          <span class="font-semibold text-gray-900">{{ item.time }}</span>
        </div>

        <div class="flex justify-between mb-2">
          <span class="text-gray-500 text-sm">{{ $t("payments.table.price") }}</span>
          <span class="font-semibold text-gray-900">
            {{ item.amount }}
            {{ $t("payments.currency") }}
          </span>
        </div>

        <div class="flex justify-between mb-2">
          <span class="text-gray-500 text-sm">{{ $t("payments.table.payment") }}</span>
          <span
              class="font-semibold"
              :class="item.payment === 'paid' ? 'text-green-600' : 'text-red-600'"
          >
            {{ $t(`payments.payment.${item.payment}`) }}
          </span>
        </div>

        <div class="flex justify-between">
          <span class="text-gray-500 text-sm">{{ $t("payments.table.status") }}</span>
          <span
              class="font-semibold"
              :class="item.status === 'done' ? 'text-[#386641]' : 'text-gray-500'"
          >
            {{ $t(`payments.status.${item.status}`) }}
          </span>
        </div>

      </div>

    </section>

  </div>
</template>

<style scoped>
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(5px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fadeIn 0.5s ease forwards;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-slide-up {
  animation: slideUp 0.5s ease forwards;
}

.animate-slide-up.delay-150 {
  animation-delay: 0.15s;
}

@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.animate-scale-in {
  animation: scaleIn 0.4s ease forwards;
}
</style>
