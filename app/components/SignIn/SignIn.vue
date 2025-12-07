<script setup lang="ts">
import {ref, nextTick, computed} from 'vue'
import {navigateTo} from '#app'
import type {Country} from "~/types/SignIn";

// ----------------------
// Country Config
// ----------------------
const countries: Country[] = [
  {
    code: 'IR',
    name: "Iran",
    dialCode: '+98',
    flag: '🇮🇷',
    regex: /^9\d{9}$/,
    placeholder: '9123456789'
  },
  {
    code: 'US',
    name: "USA",
    dialCode: '+1',
    flag: '🇺🇸',
    regex: /^\d{10}$/,
    placeholder: '5551234567'
  },
  {
    code: 'SA',
    name: "SA",
    dialCode: '+966',
    flag: '🇸🇦',
    regex: /^5\d{8}$/,
    placeholder: '5XXXXXXXX'
  }
]

// ----------------------
// State: Step
// ----------------------
const step = ref<number>(1)

// ----------------------
// State: Phone
// ----------------------
const selectedCountry = ref<Country>(countries[0] || {
  code: 'IR',
  name: 'Iran',
  dialCode: '+98',
  flag: '🇮🇷',
  regex: /^9\d{10}$/,
  placeholder: '9123456789'
})
const phone = ref<string>('')
const phoneError = ref<string>('')

// ----------------------
// State: OTP
// ----------------------
const codeDigits = ref<string[]>(['', '', '', '', ''])
const otpContainer = ref<HTMLElement | null>(null)
const shake = ref<boolean>(false)
const otpError = ref<string>('')

// ----------------------
// Computed full phone
// ----------------------
const finalPhone = computed(() => {
  return `${selectedCountry.value.dialCode}${phone.value}`
})

// ----------------------
// Validation
// ----------------------
function validatePhone() {
  if (!phone.value) {
    phoneError.value = $t("signin.phoneRequired")
    return
  }

  phoneError.value = selectedCountry.value.regex.test(phone.value)
      ? ''
      : $t("signin.phoneInvalid")
}

// ----------------------
// Go to OTP step
// ----------------------
function goToStep2() {
  validatePhone()
  if (phoneError.value) return
  step.value = 2
}

// ----------------------
// Focus OTP first input
// ----------------------
function onOtpEnter() {
  nextTick(() => {
    const first = otpContainer.value?.querySelector<HTMLInputElement>('input[data-otp="0"]')
    first?.focus()
  })
}

// ----------------------
// OTP verify
// ----------------------
function verifyCode() {
  const code = codeDigits.value.join('')

  if (code !== '12345') {
    otpError.value = $t("signin.otpInvalid")
    shake.value = true

    setTimeout(() => {
      shake.value = false
    }, 400)

    return
  }

  otpError.value = ''

  console.log("LOGIN:", finalPhone.value)

  sessionStorage.setItem('phone', finalPhone.value)
  navigateTo('/dashboard')
}

// ----------------------
// OTP input
// ----------------------
function handleOtpInput(index: number, event: InputEvent) {
  const input = event.target as HTMLInputElement
  if (!input) return

  const value = input.value.replace(/\D/g, '').slice(0, 1)
  input.value = value
  codeDigits.value[index] = value

  otpError.value = ''

  // Paste support
  if (event.inputType === 'insertFromPaste') {
    const pasted = (event.data ?? '').replace(/\D/g, '').slice(0, 5)

    pasted.split('').forEach((d, i) => {
      codeDigits.value[i] = d
    })

    nextTick(() => {
      const last = otpContainer.value?.querySelector<HTMLInputElement>(
          `input[data-otp="${pasted.length - 1}"]`
      )
      last?.focus()
    })

    if (pasted.length === 5) verifyCode()
  }

  if (value && index < 4) {
    const next = input.nextElementSibling as HTMLInputElement
    next?.focus()
  }

  if (codeDigits.value.every(d => d !== '')) verifyCode()
}

// ----------------------
// Backspace support
// ----------------------
function handleBackspace(index: number, event: KeyboardEvent) {
  if (event.key !== 'Backspace') return

  otpError.value = ''

  if (codeDigits.value[index] === '' && index > 0) {
    const prev = (event.target as HTMLInputElement)
        .previousElementSibling as HTMLInputElement
    prev?.focus()
  }
}

// ----------------------
// Edit phone
// ----------------------
function editPhone() {
  step.value = 1
  shake.value = false
  otpError.value = ''
  phoneError.value = ''
  codeDigits.value = ['', '', '', '', '']
}
</script>

<template>
  <div class="w-full max-w-sm sm:max-w-md bg-white rounded-2xl shadow-lg p-6 sm:p-8 mx-4 sm:mx-auto">

    <h1 class="text-2xl sm:text-3xl font-semibold text-primary text-center mb-6">
      {{ $t("signin.title") }}
    </h1>

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

      <!-- Step 1 -->
      <div v-if="step === 1" key="step1">

        <!-- Country select -->
        <label class="block text-sm sm:text-base text-gray-700 mb-2">
          {{ $t("signin.dialCodes.title") }}
        </label>

        <select
            v-model="selectedCountry"
            class="w-full px-4 py-3 mb-4 rounded-xl border transition
      border-gray-300 focus:ring-primary focus:border-primary focus:outline-none"
        >
          <option
              v-for="c in countries"
              :key="c.code"
              :value="c"
          >
            {{ c.flag }} {{ c.name }} ({{ c.dialCode }})
          </option>
        </select>

        <!-- Phone Label -->
        <label class="block text-sm sm:text-base text-gray-700 mb-2">
          {{ $t("signin.phoneLabel") }}
        </label>

        <!-- Phone wrapper -->
        <div class="flex gap-2">

          <!-- Phone input -->
          <input
              v-model="phone"
              @input="validatePhone"
              type="tel"
              :placeholder="selectedCountry.placeholder"
              class="w-full px-4 py-3 rounded-xl border transition focus:outline-none"
              :class="phoneError
          ? 'border-red-500 focus:ring-red-400'
          : 'border-gray-300 focus:ring-primary focus:border-primary'"
          />

          <!-- Dial code -->
          <div
              dir="ltr"
              class="px-4 py-3 rounded-xl bg-gray-50 border border-gray-300
              text-sm text-gray-600 flex items-center whitespace-nowrap"
          >
            {{ selectedCountry.dialCode }}
          </div>

        </div>

        <p v-if="phoneError" class="text-red-500 text-sm mt-1">
          {{ phoneError }}
        </p>

        <!-- Submit -->
        <button
            @click="goToStep2"
            :disabled="!!phoneError || !phone"
            class="w-full mt-4 bg-primary text-white py-3 rounded-xl transition
      disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#2e5133]"
        >
          {{ $t("signin.sendCode") }}
        </button>
      </div>

      <!-- Step 2 -->
      <div v-else key="step2" ref="otpContainer" :class="shake ? 'animate-shake' : ''">

        <label class="block text-sm text-gray-700 mb-2">
          {{ $t("signin.otpLabel") }}
        </label>

        <div class="flex gap-2 justify-center mb-3" style="direction:ltr">
          <input
              v-for="(_, index) in codeDigits"
              :key="index"
              v-model="codeDigits[index]"
              :data-otp="index"
              maxlength="1"
              type="text"
              class="w-10 sm:w-12 h-10 sm:h-12 text-center text-lg rounded-xl border transition focus:scale-105"
              :class="otpError
              ? 'border-red-500 ring-1 ring-red-400'
              : 'border-gray-300 focus:ring-primary focus:border-primary'"
              @input="handleOtpInput(index,$event)"
              @keydown="handleBackspace(index,$event)"
          />
        </div>

        <p v-if="otpError" class="text-red-500 text-sm text-center mb-3">
          {{ otpError }}
        </p>

        <button
            @click="verifyCode"
            class="w-full bg-primary text-white py-3 rounded-xl hover:bg-[#2e5133]"
        >
          {{ $t("signin.login") }}
        </button>

        <p class="text-xs sm:text-sm text-primary cursor-pointer my-3"
           @click="editPhone"
        >
          {{ $t("signin.editPhone") }}
        </p>
      </div>

    </transition>

    <p class="text-center text-xs sm:text-sm text-gray-500 mt-4">
      {{ $t("signin.terms") }}
    </p>

  </div>
</template>

<style scoped>
@keyframes shake {
  0% {
    transform: translateX(0)
  }
  25% {
    transform: translateX(-6px)
  }
  50% {
    transform: translateX(6px)
  }
  75% {
    transform: translateX(-6px)
  }
  100% {
    transform: translateX(0)
  }
}

.animate-shake {
  animation: shake .3s ease-in-out;
}
</style>
