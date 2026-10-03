<script setup lang="ts">
import {computed, onMounted, reactive, ref} from "vue"
import {useI18n} from "vue-i18n"
import {useDashboardApi} from "~/composables/APIsAccess/useDashboardApi";
import {useQuestionnaireApi} from "~/composables/APIsAccess/useQuestionnaireApi";
import {useEncrypt} from "~/composables/useEncrypt";
import type {ReportsHistory} from "~/types/History";
import type {QuestionnaireAnswers, QuestionnaireDetail} from "~/types/Questionnaires";
import {navigateTo} from "#app";

const {getReports} = useDashboardApi();
const {getQuestionnaire} = useQuestionnaireApi();
const {encrypt} = useEncrypt()
const {locale, t, te} = useI18n()

const phone: string = sessionStorage.getItem("phone") || ""

let reports = reactive<ReportsHistory[]>([])

const reportCount = computed(() => reports.length)
const selectedReport = ref<ReportsHistory | null>(null)
const questionnaireDetail = ref<QuestionnaireDetail | null>(null)
const isDetailOpen = ref(false)
const isDetailLoading = ref(false)
const detailLoadError = ref(false)
const answers = computed<QuestionnaireAnswers[]>(() => {
  const source = questionnaireDetail.value?.question_answer
  return Array.isArray(source) ? source : []
})

function formatDate(value: string) {
  return new Intl.DateTimeFormat(locale.value, {dateStyle: 'medium'}).format(new Date(value))
}

function formatTime(value: string) {
  return new Intl.DateTimeFormat(locale.value, {
    hour: '2-digit',
    minute: '2-digit'
  }).format(new Date(value))
}

function questionLabel(question: string) {
  const key = `questions.${question}`
  return te(key) ? t(key) : question
}

function answerLabel(answer: QuestionnaireAnswers) {
  const options = answer.option ?? []
  const translatedOptions = options.map((option) => {
    const key = `questions.${answer.question}_options.${option}`
    return te(key) ? t(key) : option
  })
  const values = [
    ...translatedOptions,
    answer.text_answer === null || answer.text_answer === ''
      ? null
      : String(answer.text_answer)
  ].filter((value): value is string => Boolean(value))

  return values.join('، ') || '—'
}

async function fetchReports() {

  let history = reactive<ReportsHistory[]>([])

  try {

    history = await getReports()
    reports.splice(0, reports.length, ...history)

  } catch (error) {

    console.log(error)

  }

}

async function openReportDetails(report: ReportsHistory) {
  selectedReport.value = report
  questionnaireDetail.value = null
  detailLoadError.value = false
  isDetailOpen.value = true
  isDetailLoading.value = true

  try {
    questionnaireDetail.value = await getQuestionnaire(report.id)
  } catch (error) {
    console.error('Failed to fetch questionnaire details', error)
    detailLoadError.value = true
  } finally {
    isDetailLoading.value = false
  }
}

function closeDetails() {
  isDetailOpen.value = false
}

function viewReport() {
  if (selectedReport.value?.is_reported) {
    navigateTo(`/result/${encrypt(selectedReport.value.id.toString())}`)
  }
}

function completePayment() {
  if (selectedReport.value && !selectedReport.value.is_paid) {
    navigateTo(`/paypage/${encrypt(selectedReport.value.id.toString())}`)
  }
}

onMounted(() => {
  fetchReports()
})

</script>

<template>
  <div class="bg-white p-4 sm:p-6 animate-fade-in rounded-2xl">

    <!-- Header -->
    <div class="mb-6 sm:mb-8 space-y-1 sm:space-y-2">
      <h1 class="text-2xl sm:text-3xl font-bold text-primary animate-slide-up">
        {{ $t("reports.title") }}
      </h1>

      <p class="text-gray-600 text-sm sm:text-base animate-slide-up delay-150">
        {{ $t("reports.subtitle") }}
      </p>
    </div>

    <!-- User Info -->
    <section class="bg-primary rounded-2xl shadow-md p-4 sm:p-6 mb-6 sm:mb-10 border border-gray-100 animate-scale-in">
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 text-white">

        <div>
          <p class="text-sm">
            {{ $t("reports.phone") }}
          </p>
          <p dir="ltr" class="w-max text-lg font-semibold">
            {{ phone }}
          </p>
        </div>

        <div>
          <p class="text-sm">
            {{ $t("reports.count") }}
          </p>
          <p class="text-lg font-semibold">
            {{ reportCount }}
          </p>
        </div>

      </div>
    </section>

    <!-- DESKTOP TABLE -->
    <section
        class="hidden md:block bg-white rounded-2xl shadow-md border border-gray-100 animate-fade-in overflow-x-auto"
    >

      <div class="overflow-y-auto max-h-[250px]">
        <table class="w-full text-right table-auto min-w-[600px]">

          <thead class="bg-primary text-white text-sm sticky top-0 z-10">
          <tr>
            <th class="p-4">{{ $t("reports.table.date") }}</th>
            <th class="p-4">{{ $t("reports.table.time") }}</th>
            <th class="p-4">{{ $t("reports.table.payment") }}</th>
            <th class="p-4">{{ $t("reports.table.status") }}</th>
          </tr>
          </thead>

          <tbody>
          <tr
              v-for="(item, index) in reports"
              :key="index"
              class="border-b hover:bg-gray-50 transition cursor-pointer"
              @click="openReportDetails(item)"
          >

            <td class="p-4">{{ item.created_at.toString().split('T')[0] }}</td>
            <td class="p-4">{{ item.created_at.toString().split('T')[1]?.toString().split('.')[0] }}</td>

            <td class="p-4">
                <span
                    :class="item.is_paid ? 'text-primary' : 'text-red-600'"
                >
                  {{ $t(`reports.payment.${item.is_paid}`) }}
                </span>
            </td>

            <td class="p-4">
                <span
                    :class="item.is_reported ? 'text-green-600' : 'text-gray-500'"
                >
                  {{ $t(`reports.status.${item.is_reported}`) }}
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
          v-for="(item, index) in reports"
          :key="index"
          class="bg-white rounded-xl shadow p-4 border border-gray-100 animate-scale-in cursor-pointer"
          @click="openReportDetails(item)"
      >

        <div class="flex justify-between mb-2">
          <span class="text-gray-500 text-sm">
            {{ $t("reports.table.date") }}
          </span>
          <span class="font-semibold text-gray-900">
            {{ item.created_at.toString().split('T')[0] }}
          </span>
        </div>

        <div class="flex justify-between mb-2">
          <span class="text-gray-500 text-sm">
            {{ $t("reports.table.time") }}
          </span>
          <span class="font-semibold text-gray-900">
            {{ item.created_at.toString().split('T')[1]?.toString().split('.')[0] }}
          </span>
        </div>

        <div class="flex justify-between mb-2">
          <span class="text-gray-500 text-sm">
            {{ $t("reports.table.payment") }}
          </span>

          <span
              :class="item.is_paid ? 'text-primary' : 'text-red-600'"
              class="font-semibold"
          >
            {{ $t(`reports.payment.${item.is_paid}`) }}
          </span>
        </div>

        <div class="flex justify-between">
          <span class="text-gray-500 text-sm">
            {{ $t("reports.table.status") }}
          </span>

          <span
              :class="item.is_reported ? 'text-green-600' : 'text-gray-500'"
              class="font-semibold"
          >
            {{ $t(`reports.status.${item.is_reported}`) }}
          </span>
        </div>

      </div>

    </section>

    <HistoryDetailModal
        :open="isDetailOpen"
        :title="$t('historyDetails.questionnaireTitle')"
        :subtitle="selectedReport ? `#${selectedReport.id} • ${formatDate(selectedReport.created_at)}` : undefined"
        @close="closeDetails"
    >
      <div v-if="selectedReport" class="space-y-6">
        <div class="grid grid-cols-2 gap-3">
          <div class="rounded-2xl bg-slate-50 p-4">
            <p class="text-xs text-slate-500">{{ $t('reports.table.payment') }}</p>
            <p class="mt-1 font-semibold" :class="selectedReport.is_paid ? 'text-green-700' : 'text-red-600'">
              {{ $t(`reports.payment.${selectedReport.is_paid}`) }}
            </p>
          </div>
          <div class="rounded-2xl bg-slate-50 p-4">
            <p class="text-xs text-slate-500">{{ $t('reports.table.status') }}</p>
            <p class="mt-1 font-semibold" :class="selectedReport.is_reported ? 'text-green-700' : 'text-amber-600'">
              {{ $t(`reports.status.${selectedReport.is_reported}`) }}
            </p>
          </div>
        </div>

        <p v-if="isDetailLoading" class="py-8 text-center text-slate-500">
          {{ $t('historyDetails.loading') }}
        </p>
        <p v-else-if="detailLoadError" class="rounded-2xl bg-red-50 p-4 text-center text-red-700">
          {{ $t('historyDetails.loadError') }}
        </p>
        <div v-else>
          <h3 class="mb-3 font-bold text-slate-900">{{ $t('historyDetails.answers') }}</h3>
          <div v-if="answers.length" class="space-y-3">
            <div
                v-for="(answer, index) in answers"
                :key="`${answer.question}-${index}`"
                class="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm"
            >
              <p class="text-sm leading-6 text-slate-500">{{ questionLabel(answer.question) }}</p>
              <p class="mt-1 font-semibold leading-7 text-slate-900">{{ answerLabel(answer) }}</p>
            </div>
          </div>
          <p v-else class="rounded-2xl bg-slate-50 p-5 text-center text-slate-500">
            {{ $t('historyDetails.noAnswers') }}
          </p>
        </div>
      </div>

      <template #footer>
        <div class="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
              type="button"
              class="rounded-xl border border-slate-200 px-5 py-2.5 font-medium text-slate-700 transition hover:bg-white"
              @click="closeDetails"
          >
            {{ $t('historyDetails.close') }}
          </button>
          <button
              v-if="selectedReport?.is_reported"
              type="button"
              class="rounded-xl bg-primary px-5 py-2.5 font-medium text-white transition hover:opacity-90"
              @click="viewReport"
          >
            {{ $t('historyDetails.viewReport') }}
          </button>
          <button
              v-else-if="selectedReport && !selectedReport.is_paid"
              type="button"
              class="rounded-xl bg-primary px-5 py-2.5 font-medium text-white transition hover:opacity-90"
              @click="completePayment"
          >
            {{ $t('historyDetails.completePayment') }}
          </button>
        </div>
      </template>
    </HistoryDetailModal>

  </div>
</template>

<style scoped>
.text-primary {
  color: var(--color-primary);
}

/* Animations */
@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slide-up {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes scale-in {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.animate-fade-in {
  animation: fade-in .5s ease-out forwards;
}

.animate-slide-up {
  animation: slide-up .6s ease-out forwards;
}

.animate-scale-in {
  animation: scale-in .4s ease-out forwards;
}
</style>
