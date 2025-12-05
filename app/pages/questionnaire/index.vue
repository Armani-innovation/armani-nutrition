<script setup lang="ts">
import {ref, onMounted} from "vue"
import type {Question, RawQuestion} from "~/types/questionnaire"
import rawQuestionsJson from "~/assets/json/questions.json"
import {navigateTo} from "#app"

const rawQuestions = rawQuestionsJson as RawQuestion[]

const questions: Question[] = rawQuestions.map(q => ({
  id: q.id,
  question: q.questionKey,
  type: q.type,
  required: q.required,
  options: q.optionsKeys,
  multipleSelect: q.multipleSelect,
  placeholder: q.placeholderKey,
  followUp: q.followUp
      ? {
        if: q.followUp.ifKey,
        type: q.followUp.type,
        placeholder: q.followUp.placeholderKey,
      }
      : null,
}))

const answers = ref<Record<number, any>>({})
const followUpAnswers = ref<Record<number, any>>({})

// animation
const visibleQuestions = ref<number[]>([])
const questionRefs = ref<HTMLElement[]>([])

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
  const payload = questions.map(q => ({
    question: q.question,
    answer: answers.value[q.id] ?? null,
    followUp: followUpAnswers.value[q.id] ?? null
  }))

  console.log("ANSWERS:", payload)

  navigateTo("/paypage")
}

onMounted(() => {
  const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const id = Number(entry.target.getAttribute("data-id"))
            if (!visibleQuestions.value.includes(id)) {
              visibleQuestions.value.push(id)
            }
          }
        })
      },
      {threshold: 0.1}
  )

  questionRefs.value.forEach((el, idx) => {
    el.setAttribute("data-id", String(questions[idx]?.id))
    observer.observe(el)
  })
})
</script>

<template>
  <div class="w-full h-full flex flex-col bg-white rounded-lg shadow-md p-4 sm:p-6">

    <!-- TITLE -->
    <h1 class="text-xl sm:text-2xl font-bold text-primary mb-4 text-center">
      {{ $t("questionnaire.title") }}
    </h1>

    <!-- QUESTIONS -->
    <div class="flex-1 overflow-y-auto pr-2 space-y-4 sm:space-y-6">

      <div
          v-for="q in questions"
          :key="q.id"
          ref="questionRefs"
          :class="[
          'transform transition duration-700 ease-out opacity-0 translate-y-4',
          { 'opacity-100 translate-y-0': visibleQuestions.includes(q.id) }
        ]"
      >

        <label class="block font-medium text-gray-800 mb-1 text-sm sm:text-base">
          {{ $t(q.question) }}
          <span v-if="q.required" class="text-red-500">*</span>
        </label>

        <!-- TEXT / NUMBER INPUT -->
        <input
            v-if="q.type === 'text' || q.type === 'number'"
            v-model="answers[q.id]"
            :type="q.type === 'number' ? 'number' : 'text'"
            :placeholder="q.placeholder ? $t(q.placeholder) : ''"
            class="w-[99%] p-2 sm:p-3 border border-gray-300 rounded-md
         text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-primary"
        />

        <!-- MULTIPLE CHOICE -->
        <div
            v-else-if="q.type === 'multiple-choice'"
            class="flex flex-wrap gap-2 sm:gap-4"
        >
          <label
              v-for="(option, index) in q.options"
              :key="index"
              class="flex items-center space-x-2 bg-gray-100 px-2 sm:px-3 py-1 rounded-md
                   cursor-pointer transition hover:bg-[#e6f0e6] text-sm sm:text-base"
          >

            <input
                v-if="q.multipleSelect"
                type="checkbox"
                :value="option"
                :checked="answers[q.id]?.includes(option)"
                @change="updateCheckbox(q.id, option)"
                class="w-4 h-4 accent-primary"
            />

            <input
                v-else
                type="radio"
                :value="option"
                v-model="answers[q.id]"
                class="w-4 h-4 accent-primary"
            />

            <span>{{ $t(option) }}</span>

          </label>
        </div>

        <!-- FOLLOW UP -->
        <transition name="fade-slide" mode="out-in">
          <div
              v-if="q.followUp && answers[q.id] === q.followUp.if"
              class="mt-2"
          >
            <input
                v-model="followUpAnswers[q.id]"
                :type="q.followUp.type === 'number' ? 'number' : 'text'"
                :placeholder="q.followUp.placeholder ? $t(q.followUp.placeholder) : ''"
                class="w-full p-2 sm:p-3 border border-gray-300 rounded-md
                text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </transition>

      </div>

    </div>

    <!-- SUBMIT -->
    <div class="mt-4 shrink-0">
      <button
          type="button"
          @click="handleSubmit"
          class="w-full bg-primary text-white px-4 py-2 sm:px-6 sm:py-3
               rounded-lg font-semibold transition-all duration-300 hover:bg-green-900
               hover:shadow-lg hover:scale-101 cursor-pointer text-sm sm:text-base"
      >
        {{ $t("questionnaire.submit") }}
      </button>
    </div>

  </div>
</template>

<style scoped>
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
