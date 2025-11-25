<script setup lang="ts">
// Logic can be added here (redirect to payment gateway, etc.)
import {ref} from "vue";
import TickCheck from "~/components/Job Done/TickCheck.vue";

const isValid = ref<boolean>(true);
const discountText = ref<string>("");
</script>

<template>
  <div class="flex items-center justify-center p-4 sm:p-6">
    <div class="w-full max-w-md bg-white shadow-lg rounded-2xl p-6 sm:p-8 space-y-6">
      <div class="text-center space-y-2">
        <h1 class="text-2xl font-semibold text-gray-800">تکمیل پرسشنامه</h1>
        <p class="text-gray-600 text-sm leading-relaxed">
          شما با موفقیت تمام سوالات پرسشنامه را پاسخ دادید. برای مشاهده نتیجه و دریافت تحلیل برندینگ، لطفاً پرداخت را
          انجام دهید.
        </p>
        <TickCheck/>
      </div>

      <div class="space-y-4">
        <!-- Discount Field -->
        <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-x-3 ">
          <input
              type="text"
              placeholder="کد تخفیف"
              :class="[
                'w-full px-3 py-2 sm:px-4 sm:py-2 rounded-xl border border-gray-300 outline-none focus:ring-1' ,
                isValid
                ? 'border-gray-300 focus:ring-primary focus:border-primary'
                : 'border-red-500 focus:ring-red-400'
              ]"
          />
          <button
              class="px-4 py-2 rounded-xl text-white font-medium hover:opacity-90 cursor-pointer"
              style="background-color: #386641;"
          >
            اعمال
          </button>
        </div>
        <p v-if="discountText && !isValid" class="text-red-500">{{ discountText }}</p>
        <p v-if="discountText && isValid" class="text-primary">{{ discountText }}</p>

        <!-- Price Box -->
        <div class="bg-gray-100 p-3 sm:p-4 rounded-xl flex items-center justify-between">
          <span class="text-primary font-medium">هزینه پرداخت</span>
          <span class="text-xl font-bold text-primary">180,000 تومان</span>
        </div>

        <!-- Pay Button -->
        <NuxtLink
            class="w-full block text-center bg-primary py-3 rounded-xl font-medium text-white transition hover:opacity-90"
            to="/result"
        >
          پرداخت و مشاهده نتیجه
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
