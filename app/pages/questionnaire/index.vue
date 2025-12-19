<script setup lang="ts">
import {ref, onMounted} from "vue"
import type {Question, QuestionnaireAnswers, RawQuestion} from "~/types/Questionnaires"
import rawQuestionsJson from "~/assets/json/questions.json"
import {navigateTo} from "#app"
import {useQuestionnaireApi} from "~/composables/APIsAccess/useQuestionnaireApi";
import {useEncrypt} from "~/composables/useEncrypt";

const {createQuestionnaire} = useQuestionnaireApi()
const {encrypt} = useEncrypt()

const rawQuestions = rawQuestionsJson as RawQuestion[]

const questions = computed<Question[]>(() =>
    rawQuestions.map(q => ({
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
)

const answers = ref<Record<number, any>>({})
const followUpAnswers = ref<Record<number, any>>({})

// animation
const visibleQuestions = ref<number[]>([])
const questionRefs = ref<HTMLElement[]>([])

const errors = ref<Record<number, string>>({})

function handleScrollAnimation(): void {
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
    el.setAttribute("data-id", String(questions.value[idx]?.id))
    observer.observe(el)
  })
}

function handleInput(qId: number) {
  if (errors.value[qId]) {
    const answer = answers.value[qId]
    if (
        answer !== undefined &&
        answer !== null &&
        (!(Array.isArray(answer)) || answer.length > 0)
    ) {
      delete errors.value[qId]
    }
  }
}

function updateCheckbox(qId: number, option: string) {
  if (!answers.value[qId]) answers.value[qId] = []

  const index = answers.value[qId].indexOf(option)
  if (index > -1) {
    answers.value[qId].splice(index, 1)
  } else {
    answers.value[qId].push(option)
  }

  if (errors.value[qId] && answers.value[qId].length > 0) {
    delete errors.value[qId]
  }
}

function handleRadioInput(qId: number) {
  if (errors.value[qId] && answers.value[qId] !== undefined && answers.value[qId] !== null) {
    delete errors.value[qId]
  }
}

function handleFollowUpInput(qId: number) {
  if (errors.value[qId] && followUpAnswers.value[qId]) {
    delete errors.value[qId]
  }
}

function handleSubmit() {
  errors.value = {}

  let hasError = false

  questions.value.forEach(q => {
    if (q.required) {
      const answer = answers.value[q.id]
      if (
          answer === undefined ||
          answer === null ||
          (Array.isArray(answer) && answer.length === 0)
      ) {
        errors.value[q.id] = "این فیلد اجباری است"
        hasError = true
      }
    }
  })

  if (hasError) {
    const firstErrorId = Number(Object.keys(errors.value)[0])
    const el = questionRefs.value.find(el => Number(el.getAttribute("data-id")) === firstErrorId)
    if (el) el.scrollIntoView({behavior: "smooth", block: "center"})
    return
  }

  const payload = questions.value.map(q => {
    const value = answers.value[q.id]
    const followUpValue = followUpAnswers.value[q.id]
    const hasActiveFollowUp =
        q.followUp && value === q.followUp.if

    return {
      question: $t(q.question),

      text_answer:
          hasActiveFollowUp
              ? followUpValue ?? null
              : q.type === "text" || q.type === "number"
                  ? value ?? null
                  : null,

      option:
          q.type === "multiple-choice"
              ? hasActiveFollowUp
                  ? null
                  : q.multipleSelect
                      ? value?.map((opt: string) => $t(opt)) ?? null
                      : value
                          ? [$t(value)]
                          : null
              : null
    }
  })

  getQuestionnaireId(payload)

}

async function getQuestionnaireId(payload: QuestionnaireAnswers[]) {

  const questionnaireID = ref<number>(0)

  try {

    const questionnaire = await createQuestionnaire(payload)
    questionnaireID.value = questionnaire.id

  } catch (e) {
    console.log(e)
  }

  // sessionStorage.setItem("questionnaireID", `${questionnaireID.value}`)

  navigateTo(`/paypage/${encrypt(questionnaireID.value.toString())}`)

}

onMounted(() => {
  handleScrollAnimation()
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
        ]">

        <label class="block font-medium text-gray-800 mb-1 text-sm sm:text-base">
          {{ $t(q.question) }}
          <span v-if="q.required" class="text-red-500">*</span>
        </label>

        <!-- TEXT / NUMBER INPUT -->
        <input
            v-if="q.type === 'text' || q.type === 'number'"
            v-model="answers[q.id]"
            @input="handleInput(q.id)"
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
                @change="handleRadioInput(q.id)"
            />

            <span>{{ $t(option) }}</span>

          </label>
        </div>

        <!-- خطای سوال -->
        <div v-if="errors[q.id]" class="text-red-500 text-sm mt-1">
          {{ errors[q.id] }}
        </div>


        <!-- FOLLOW UP -->
        <transition name="fade-slide" mode="out-in">
          <div
              v-if="q.followUp && answers[q.id] === q.followUp.if"
              class="mt-2"
          >
            <input
                v-model="followUpAnswers[q.id]"
                @input="handleFollowUpInput(q.id)"
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
