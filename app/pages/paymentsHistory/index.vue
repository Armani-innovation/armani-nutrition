<script setup lang="ts">
import {computed, onMounted, ref} from "vue"
import {useI18n} from "vue-i18n"
import {usePayPageApi} from "~/composables/APIsAccess/usePayPageApi"
import type {PaymentHistory} from "~/types/History"

const {locale} = useI18n()
const {getPayments} = usePayPageApi()

const phone = ref("")
const transactions = ref<PaymentHistory[]>([])
const isLoading = ref(true)
const loadError = ref(false)

const reportCount = computed(() => transactions.value.length)

function formatDate(value: string) {
  return new Intl.DateTimeFormat(locale.value, {dateStyle: 'short'}).format(new Date(value))
}

function formatTime(value: string) {
  return new Intl.DateTimeFormat(locale.value, {
    hour: '2-digit',
    minute: '2-digit'
  }).format(new Date(value))
}

async function fetchPayments() {
  phone.value = sessionStorage.getItem('phone') || ""
  if (!phone.value) {
    loadError.value = true
    isLoading.value = false
    return
  }

  try {
    transactions.value = await getPayments(phone.value)
  } catch (error) {
    console.error('Failed to fetch payments', error)
    loadError.value = true
  } finally {
    isLoading.value = false
  }
}

onMounted(fetchPayments)
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

    <p v-if="isLoading" class="py-10 text-center text-gray-500">
      {{ $t("payments.loading") }}
    </p>

    <p v-else-if="loadError" class="py-10 text-center text-red-600">
      {{ $t("payments.loadError") }}
    </p>

    <p v-else-if="transactions.length === 0" class="py-10 text-center text-gray-500">
      {{ $t("payments.empty") }}
    </p>

    <!-- DESKTOP TABLE -->
    <section
        v-else
        class="hidden md:block bg-white rounded-2xl shadow-md border border-gray-100 animate-fade-in overflow-x-auto">

      <div class="overflow-y-auto max-h-[250px]">
        <table class="w-full text-right table-auto min-w-[600px]">
          <thead class="bg-primary text-white text-center text-sm sticky top-0 z-10">
          <tr>
            <th class="p-4">{{ $t("payments.table.date") }}</th>
            <th class="p-4">{{ $t("payments.table.time") }}</th>
            <th class="p-4">{{ $t("payments.table.price") }}</th>
            <th class="p-4">{{ $t("payments.table.payment") }}</th>
            <th class="p-4">{{ $t("payments.table.description") }}</th>
          </tr>
          </thead>

          <tbody>
          <tr
              v-for="item in transactions"
              :key="item.id"
              class="border-b hover:bg-gray-50 transition"
          >

            <td class="p-4">{{ formatDate(item.created_at) }}</td>
            <td class="p-4">{{ formatTime(item.created_at) }}</td>
            <td class="p-4">
              {{ item.price.toLocaleString() }}
              {{ $t("payments.currency") }}
            </td>

            <td class="p-4">
              <span :class="item.successful ? 'text-green-600' : 'text-red-600'">
                {{ $t(`payments.payment.${item.successful ? 'paid' : 'unpaid'}`) }}
              </span>
            </td>

            <td class="p-4">{{ item.description }}</td>

          </tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- MOBILE CARDS -->
    <section v-if="!isLoading && !loadError && transactions.length" class="md:hidden max-h-[400px] overflow-y-auto space-y-4">

      <div
          v-for="item in transactions"
          :key="item.id"
          class="bg-white rounded-xl shadow p-4 border border-gray-100 animate-scale-in"
      >

        <div class="flex justify-between mb-2">
          <span class="text-gray-500 text-sm">{{ $t("payments.table.date") }}</span>
          <span class="font-semibold text-gray-900">{{ formatDate(item.created_at) }}</span>
        </div>

        <div class="flex justify-between mb-2">
          <span class="text-gray-500 text-sm">{{ $t("payments.table.time") }}</span>
          <span class="font-semibold text-gray-900">{{ formatTime(item.created_at) }}</span>
        </div>

        <div class="flex justify-between mb-2">
          <span class="text-gray-500 text-sm">{{ $t("payments.table.price") }}</span>
          <span class="font-semibold text-gray-900">
            {{ item.price.toLocaleString() }}
            {{ $t("payments.currency") }}
          </span>
        </div>

        <div class="flex justify-between mb-2">
          <span class="text-gray-500 text-sm">{{ $t("payments.table.payment") }}</span>
          <span
              class="font-semibold"
              :class="item.successful ? 'text-green-600' : 'text-red-600'"
          >
            {{ $t(`payments.payment.${item.successful ? 'paid' : 'unpaid'}`) }}
          </span>
        </div>

        <div class="flex justify-between">
          <span class="text-gray-500 text-sm">{{ $t("payments.table.description") }}</span>
          <span class="font-semibold text-gray-900">{{ item.description }}</span>
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
