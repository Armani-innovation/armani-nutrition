<script setup lang="ts">
import {ref, nextTick} from 'vue'
import {navigateTo} from "#app";

// ----------------------
// State: Phone Number
// ----------------------
const step = ref<number>(1)
const phone = ref<string>('')
const phoneError = ref<string>('')

// ----------------------
// State: OTP
// ----------------------
const codeDigits = ref<string[]>(['', '', '', '', ''])
const otpContainer = ref<HTMLElement | null>(null)
const shake = ref<boolean>(false)       // For wrong code animation
const otpError = ref<string>('')

// ----------------------
// Validate phone number (real-time)
// ----------------------
function validatePhone() {
  if (!phone.value) {
    phoneError.value = 'شماره را وارد کنید'
    return
  }

  const phoneRegex = /^09\d{9}$/

  phoneError.value = phoneRegex.test(phone.value) ? '' : 'شماره موبایل معتبر نیست'
}

// ----------------------
// Move to OTP step
// ----------------------
function goToStep2() {
  phoneError.value = ''

  if (!phone.value) {
    phoneError.value = 'لطفاً شماره تلفن را وارد کنید'
    return
  }

  const phoneRegex = /^09\d{9}$/
  if (!phoneRegex.test(phone.value)) {
    phoneError.value = 'شماره موبایل معتبر نیست'
    return
  }

  step.value = 2
}

// ----------------------
// After OTP animation → focus first input
// ----------------------
function onOtpEnter() {
  nextTick(() => {
    const first = otpContainer.value?.querySelector<HTMLInputElement>('input[data-otp="0"]')
    first?.focus()
  })
}

// ----------------------
// Verify OTP code
// ----------------------
function verifyCode() {
  const code: string = codeDigits.value.join('')

  if (code !== '12345') {  // Demo: only 12345 is correct
    otpError.value = 'کد وارد شده اشتباه است'
    shake.value = true
    setTimeout(() => (shake.value = false), 400)
    return
  }

  otpError.value = ''
  sessionStorage.setItem('phone', phone.value)
  navigateTo("/dashboard")
}

// ----------------------
// OTP Input Handler
// ----------------------
function handleOtpInput(index: number, event: InputEvent) {
  const target = event.target
  if (!(target instanceof HTMLInputElement)) return

  const input = target
  let value = input.value

  // Only allow digits, max 1 char
  value = value.replace(/[^0-9]/g, '').slice(0, 1)
  input.value = value
  codeDigits.value[index] = value

  // Reset OTP error on typing
  otpError.value = ''

  // Handle paste
  if (event.inputType === 'insertFromPaste') {
    const pasted = (event.data ?? '').replace(/\D/g, '').slice(0, codeDigits.value.length)
    pasted.split('').forEach((char, i) => (codeDigits.value[i] = char))

    nextTick(() => {
      const lastIndex = pasted.length - 1
      const lastInput = otpContainer.value?.querySelector<HTMLInputElement>(
          `input[data-otp="${lastIndex}"]`
      )
      lastInput?.focus()
    })

    if (pasted.length === codeDigits.value.length) verifyCode()
    return
  }

  // Move focus to next input
  if (value && index < codeDigits.value.length - 1) {
    const nextInput = input.nextElementSibling as HTMLInputElement | null
    nextInput?.focus()
  }

  // Auto-verify when all digits filled
  if (codeDigits.value.every(d => d !== '')) verifyCode()
}

// ----------------------
// Backspace handler
// ----------------------
function handleBackspace(index: number, event: KeyboardEvent) {
  if (event.key === 'Backspace') {
    // Reset OTP error on delete
    otpError.value = ''

    // If current input empty → move to previous
    if (codeDigits.value[index] === '' && index > 0) {
      const prev = (event.target as HTMLInputElement).previousElementSibling as HTMLInputElement
      prev?.focus()
    }
  }
}

function editPhone() {
  step.value = 1
  otpError.value = ''
  shake.value = false
  codeDigits.value = ['', '', '', '', '']

  nextTick(() => {
    // فوکوس روی ورودی شماره موبایل
    const phoneInput = document.querySelector('input[type="tel"]') as HTMLInputElement
    phoneInput?.focus()
  })
}
</script>

<template>
  <div class="w-full max-w-sm sm:max-w-md bg-white rounded-2xl shadow-lg p-6 sm:p-8 mx-4 sm:mx-auto">

    <h1 class="text-2xl sm:text-3xl font-semibold text-primary text-center mb-6">ورود</h1>

    <!-- Slide Transition -->
    <transition
        mode="out-in"
        enter-active-class="transition-all duration-300 ease-out"
        leave-active-class="transition-all duration-300 ease-in"
        enter-from-class="opacity-0 -translate-x-10"
        enter-to-class="opacity-100 translate-x-0"
        leave-from-class="opacity-100 translate-x-0"
        leave-to-class="opacity-0 translate-x-10"
        @after-enter="onOtpEnter"
    >

      <!-- Step 1: Phone Number -->
      <div v-if="step === 1" key="step1">
        <label class="block text-sm sm:text-base text-gray-700 mb-2">شماره تلفن خود را وارد کنید</label>

        <input
            v-model="phone"
            @input="validatePhone"
            type="tel"
            placeholder="مثال: 09123456789"
            maxlength="11"
            :class="[
            'w-full px-4 py-3 rounded-xl border transition text-sm sm:text-base focus:outline-none',
            phoneError
              ? 'border-red-500 focus:ring-red-400'
              : 'border-gray-300 focus:ring-primary focus:border-primary'
          ]"
        />

        <p v-if="phoneError" class="text-red-500 text-sm mt-1">{{ phoneError }}</p>

        <button
            @click="goToStep2"
            :disabled="!!phoneError || !phone"
            class="w-full mt-4 bg-primary text-white py-3 rounded-xl transition text-sm sm:text-base
                 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#2e5133] cursor-pointer"
        >
          دریافت کد تایید
        </button>
      </div>

      <!-- Step 2: OTP -->
      <div v-else key="step2" ref="otpContainer" :class="shake ? 'animate-shake' : ''">
        <label class="block text-sm sm:text-base text-gray-700 mb-2">کد تایید را وارد کنید</label>

        <div class="flex gap-2 justify-center mb-3" style="direction: ltr">
          <input
              v-for="(_, index) in codeDigits"
              :key="index"
              :data-otp="index"
              v-model="codeDigits[index]"
              type="text"
              maxlength="1"
              dir="ltr"
              class="w-10 sm:w-12 h-10 sm:h-12 text-center text-lg rounded-xl border
              transition transform duration-150 focus:scale-105 focus:outline-none"
              :class="{
                'border-gray-300 focus:ring-primary focus:border-primary': !otpError,
                'border-red-500 ring-1 ring-red-400': otpError
              }"
              @input="handleOtpInput(index, $event)"
              @keydown="handleBackspace(index, $event)"
          />
        </div>

        <p v-if="otpError" class="text-red-500 text-sm text-center -mt-2 mb-3">
          {{ otpError }}
        </p>

        <button
            @click="verifyCode"
            class="w-full bg-primary text-white py-3 rounded-xl hover:bg-[#2e5133] transition text-sm sm:text-base cursor-pointer"
        >
          ورود
        </button>
        <p
            @click="editPhone"
            class="text-xs sm:text-sm text-primary cursor-pointer my-3"
        >
          اصلاح شماره تلفن
        </p>
      </div>

    </transition>

    <p class="text-center text-xs sm:text-sm text-gray-500 mt-4">
      با ورود، قوانین و شرایط را می‌پذیرید.
    </p>
  </div>
</template>

<style scoped>
/* Shake animation for wrong code */
@keyframes shake {
  0% {
    transform: translateX(0);
  }
  25% {
    transform: translateX(-6px);
  }
  50% {
    transform: translateX(6px);
  }
  75% {
    transform: translateX(-6px);
  }
  100% {
    transform: translateX(0);
  }
}

.animate-shake {
  animation: shake 0.3s ease-in-out;
}
</style>
