<script setup lang="ts">
import { ref } from "vue"
import TickCheck from "~/components/Job Done/TickCheck.vue"

// ===== STATE =====
const discountCode = ref<string>("")
const isValid = ref<boolean>(true)
const discountText = ref<string>("")

const price = ref<number>(180_000)
const finalPrice = ref<number>(price.value)

// ===== METHODS =====
const applyDiscount = () => {
  isValid.value = true
  discountText.value = ""

  if (!discountCode.value) {
    isValid.value = false
    discountText.value = "paypage.emptyDiscount"
    return
  }

  // نمونه تست اعتبارسنجی (بعدا به API وصل میشه)
  if (discountCode.value === "OFF20") {
    finalPrice.value = price.value * 0.8
    discountText.value = "paypage.discountApplied"
  } else {
    isValid.value = false
    discountText.value = "paypage.invalidDiscount"
    finalPrice.value = price.value
  }
}

// ===== UTILS =====
const formatPrice = (num: number) => {
  return num.toLocaleString("fa-IR")
}
</script>

<template>
  <div class="flex items-center justify-center p-4 sm:p-6">
    <div class="w-full max-w-md bg-white shadow-lg rounded-2xl p-6 sm:p-8 space-y-6">

      <!-- HEADER -->
      <div class="text-center space-y-2">
        <h1 class="text-2xl font-semibold text-gray-800">
          {{ $t("paypage.title") }}
        </h1>

        <p class="text-gray-600 text-sm leading-relaxed">
          {{ $t("paypage.description") }}
        </p>

        <TickCheck/>
      </div>

      <!-- FORM -->
      <div class="space-y-4">

        <!-- Discount -->
        <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-x-3">
          <input
              v-model="discountCode"
              type="text"
              :placeholder="$t('paypage.discountPlaceholder')"
              :class="[
                'w-full px-3 py-2 sm:px-4 sm:py-2 rounded-xl border outline-none focus:ring-1',
                isValid
                  ? 'border-gray-300 focus:ring-primary focus:border-primary'
                  : 'border-red-500 focus:ring-red-400'
              ]"
          />

          <button
              @click="applyDiscount"
              type="button"
              class="px-4 py-2 rounded-xl text-white font-medium hover:opacity-90 cursor-pointer bg-primary"
          >
            {{ $t("paypage.apply") }}
          </button>
        </div>

        <p v-if="discountText" :class="isValid ? 'text-primary' : 'text-red-500'">
          {{ $t(discountText) }}
        </p>

        <!-- PRICE -->
        <div class="bg-gray-100 p-3 sm:p-4 rounded-xl flex items-center justify-between">
          <span class="text-primary font-medium">
            {{ $t("paypage.priceLabel") }}
          </span>

          <div class="flex flex-col text-right">
            <span
                v-if="finalPrice !== price"
                class="line-through text-sm text-gray-400"
            >
              {{ formatPrice(price) }}
            </span>

            <span class="text-xl font-bold text-primary">
              {{ finalPrice.toLocaleString() }} {{ $t("paypage.currency") }}
            </span>
          </div>
        </div>

        <!-- PAY -->
        <NuxtLink
            to="/result"
            class="w-full block text-center bg-primary py-3 rounded-xl font-medium text-white transition hover:opacity-90"
        >
          {{ $t("paypage.payBtn") }}
        </NuxtLink>

      </div>

    </div>
  </div>
</template>
