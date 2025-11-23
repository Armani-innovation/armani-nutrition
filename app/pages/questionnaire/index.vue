<script lang="ts" setup>
import {ref, onMounted} from 'vue'
import type {Question} from '~/types/questionnaire'
import rawQuestions from '~/assets/json/questions.json'
import {navigateTo} from "#app";

const questions = ref<Question[]>(rawQuestions as Question[])
const answers = ref<Record<number, any>>({})
const followUpAnswers = ref<Record<number, any>>({})

// انیمیشن ورود سوال‌ها
const visibleQuestions = ref<number[]>([])
const questionRefs = ref<HTMLElement[]>([])

// وقتی کاربر checkbox رو تغییر میده
function updateCheckbox(qId: number, option: string) {
  if (!answers.value[qId]) answers.value[qId] = []
  const index = answers.value[qId].indexOf(option)
  if (index > -1) {
    answers.value[qId].splice(index, 1)
  } else {
    answers.value[qId].push(option)
  }
}

function handleSubmit() {
  const payload = questions.value.map(q => ({
    question: q.question,
    answer: answers.value[q.id] ?? null,
  }))
  console.log("پاسخ‌ها:", payload)
  navigateTo('/paypage')
}

onMounted(() => {
  const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const id = Number(entry.target.getAttribute('data-id'))
            if (!visibleQuestions.value.includes(id)) visibleQuestions.value.push(id)
          }
        })
      },
      {threshold: 0.1}
  )

  questionRefs.value.forEach((el, idx) => {
    el.setAttribute('data-id', String(questions.value[idx]?.id))
    observer.observe(el)
  })
})
</script>

<template>
  <div class="w-full h-full flex flex-col bg-white rounded-lg shadow-md p-4 sm:p-6">
    <h1 class="text-xl sm:text-2xl font-bold text-primary mb-3 sm:mb-4 text-center">پرسشنامه تغذیه</h1>

    <!-- سوالات اسکرول پذیر -->
    <div class="flex-1 overflow-y-auto pr-2 space-y-4 sm:space-y-6">
      <div
          v-for="q in questions"
          :key="q.id"
          ref="questionRefs"
          :class="['transform transition duration-700 ease-out opacity-0 translate-y-4', { 'opacity-100 translate-y-0': visibleQuestions.includes(q.id) }]"
      >
        <label class="block font-medium text-gray-800 mb-1 text-sm sm:text-base">
          {{ q.question }}
          <span v-if="q.required" class="text-red-500">*</span>
        </label>

        <!-- Text / Number Input -->
        <input
            v-if="q.type === 'text' || q.type === 'number'"
            v-model="answers[q.id]"
            :type="q.type === 'number' ? 'number' : 'text'"
            :placeholder="q.placeholder ?? ''"
            class="w-[99%] p-2 sm:p-3 border border-gray-300 rounded-md text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-primary"
        />

        <!-- Multiple Choice inline -->
        <div
            v-else-if="q.type === 'multiple-choice'"
            class="flex flex-wrap gap-2 sm:gap-4"
        >
          <label
              v-for="(option, index) in q.options"
              :key="index"
              class="flex items-center space-x-2 bg-gray-100 px-2 sm:px-3 py-1 rounded-md cursor-pointer transition hover:bg-[#e6f0e6] text-sm sm:text-base"
          >
            <input
                type="checkbox"
                v-if="q.multipleSelect"
                :value="option"
                :checked="answers[q.id]?.includes(option)"
                @change="updateCheckbox(q.id, option)"
                class="w-4 h-4 accent-primary"
            />
            <input
                type="radio"
                v-else
                :value="option"
                v-model="answers[q.id]"
                class="w-4 h-4 accent-primary"
            />
            <span>{{ option }}</span>
          </label>
        </div>

        <!-- FollowUp با انیمیشن -->
        <transition name="fade-slide" mode="out-in">
          <div
              v-if="q.followUp && answers[q.id] === q.followUp.if"
              class="mt-2"
              :key="'followup-' + q.id"
          >
            <input
                v-model="followUpAnswers[q.id]"
                :type="q.followUp.type === 'number' ? 'number' : 'text'"
                :placeholder="q.followUp.placeholder ?? ''"
                class="w-full p-2 sm:p-3 border border-gray-300 rounded-md text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </transition>
      </div>
    </div>

    <!-- دکمه ارسال ثابت -->
    <div class="mt-4 shrink-0">
      <button
          type="button"
          @click="handleSubmit"
          class="w-full bg-primary text-white px-4 py-2 sm:px-6 sm:py-3 rounded-lg font-semibold transition-all duration-300 hover:bg-green-900 hover:shadow-lg hover:scale-101 cursor-pointer text-sm sm:text-base"
      >
        ارسال
      </button>
    </div>
  </div>
</template>

<style scoped>
/* Scrollbar مینیمال */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-thumb {
  background-color: #386641;
  border-radius: 3px;
}

/* انیمیشن FollowUp */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.3s ease-out;
}

.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

.fade-slide-enter-to,
.fade-slide-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>
