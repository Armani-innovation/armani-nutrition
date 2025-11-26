<script setup lang="ts">
import { ref } from 'vue'

interface Transaction {
  date: string
  time: string
  amount: string
  payment: 'paid' | 'unpaid'
  status: 'done' | 'pending'
  description: string
}

const phone = ref('09123456789')
const transactions = ref<Transaction[]>([
  { date: '2025-11-24', time: '14:32', amount: '2,500,000 تومان', payment: 'paid', status: 'done', description: 'پرداخت بابت خرید محصول A' },
  { date: '2025-11-23', time: '09:15', amount: '1,200,000 تومان', payment: 'unpaid', status: 'pending', description: 'پرداخت بابت خدمات B' },
  { date: '2025-11-22', time: '18:50', amount: '500,000 تومان', payment: 'paid', status: 'done', description: 'پرداخت محصول C' },
  { date: '2025-11-22', time: '18:50', amount: '500,000 تومان', payment: 'paid', status: 'done', description: 'پرداخت محصول C' },
  { date: '2025-11-22', time: '18:50', amount: '500,000 تومان', payment: 'paid', status: 'done', description: 'پرداخت محصول C' },
  { date: '2025-11-22', time: '18:50', amount: '500,000 تومان', payment: 'paid', status: 'done', description: 'پرداخت محصول C' },
])

const reportCount = ref(transactions.value.length)
</script>

<template>
  <div class="bg-white p-4 sm:p-6 animate-fade-in rounded-2xl">
    <!-- Header -->
    <div class="mb-6 sm:mb-8 space-y-1 sm:space-y-2">
      <h1 class="text-2xl sm:text-3xl font-bold text-[#386641] animate-slide-up">سوابق مالی</h1>
      <p class="text-gray-600 text-sm sm:text-base animate-slide-up delay-150">
        نمایش اطلاعات کاربر و لیست سوابق مالی ثبت‌شده
      </p>
    </div>

    <!-- User Info Card -->
    <section class="bg-primary rounded-2xl shadow-md p-4 sm:p-6 mb-6 sm:mb-10 border border-gray-100 animate-scale-in">
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 text-white">
        <div class="space-y-1">
          <p class="text-sm">شماره تلفن</p>
          <p class="text-lg font-semibold">{{ phone }}</p>
        </div>
        <div class="space-y-1">
          <p class="text-sm">تعداد سوابق مالی</p>
          <p class="text-lg font-semibold">{{ reportCount }}</p>
        </div>
      </div>
    </section>

    <!-- Transactions Table / Cards -->
    <section class="w-full">
      <!-- دسکتاپ: جدول با اسکرول عمودی -->
      <div class="hidden md:block bg-white rounded-2xl shadow-md border border-gray-100 animate-fade-in overflow-x-auto">
        <div class="overflow-y-auto max-h-[250px]">
          <table class="w-full text-right table-auto min-w-[600px]">
            <thead class="bg-primary text-white text-center text-sm sticky top-0 z-10">
            <tr>
              <th class="p-4">تاریخ</th>
              <th class="p-4">ساعت</th>
              <th class="p-4">قیمت</th>
              <th class="p-4">وضعیت پرداخت</th>
              <th class="p-4">وضعیت گزارش</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(item, index) in transactions" :key="index" class="border-b hover:bg-gray-50 transition">
              <td class="p-4">{{ item.date }}</td>
              <td class="p-4">{{ item.time }}</td>
              <td class="p-4">{{ item.amount }}</td>
              <td class="p-4">
                  <span :class="item.payment === 'paid' ? 'text-green-600' : 'text-red-600'">
                    {{ item.payment === 'paid' ? 'پرداخت شده' : 'پرداخت نشده' }}
                  </span>
              </td>
              <td class="p-4">
                  <span :class="item.status === 'done' ? 'text-[#386641]' : 'text-gray-500'">
                    {{ item.status === 'done' ? 'تکمیل شده' : 'در حال بررسی' }}
                  </span>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- موبایل: کارت‌ها با اسکرول عمودی -->
      <div class="md:hidden max-h-[400px] overflow-y-auto space-y-4">
        <div v-for="(item, index) in transactions" :key="index" class="bg-white rounded-xl shadow p-4 border border-gray-100 animate-scale-in">
          <div class="flex justify-between mb-2">
            <span class="text-gray-500 text-sm">تاریخ</span>
            <span class="font-semibold text-gray-900">{{ item.date }}</span>
          </div>
          <div class="flex justify-between mb-2">
            <span class="text-gray-500 text-sm">ساعت</span>
            <span class="font-semibold text-gray-900">{{ item.time }}</span>
          </div>
          <div class="flex justify-between mb-2">
            <span class="text-gray-500 text-sm">قیمت</span>
            <span class="font-semibold text-gray-900">{{ item.amount }}</span>
          </div>
          <div class="flex justify-between mb-2">
            <span class="text-gray-500 text-sm">وضعیت پرداخت</span>
            <span :class="item.payment === 'paid' ? 'text-green-600' : 'text-red-600'" class="font-semibold">
              {{ item.payment === 'paid' ? 'پرداخت شده' : 'پرداخت نشده' }}
            </span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-500 text-sm">وضعیت گزارش</span>
            <span :class="item.status === 'done' ? 'text-[#386641]' : 'text-gray-500'" class="font-semibold">
              {{ item.status === 'done' ? 'تکمیل شده' : 'در حال بررسی' }}
            </span>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
/* Animations */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(5px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fade-in { animation: fadeIn 0.5s ease forwards; }

@keyframes slideUp {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-slide-up { animation: slideUp 0.5s ease forwards; }
.animate-slide-up.delay-150 { animation-delay: 0.15s; }

@keyframes scaleIn {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}
.animate-scale-in { animation: scaleIn 0.4s ease forwards; }
</style>
