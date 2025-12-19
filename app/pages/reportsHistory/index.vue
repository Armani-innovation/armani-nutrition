<script setup lang="ts">
import {computed, onMounted, reactive} from "vue"
import {useDashboardApi} from "~/composables/APIsAccess/useDashboardApi";
import {useEncrypt} from "~/composables/useEncrypt";
import type {reportsHistory} from "~/types/History";
import {navigateTo} from "#app";

const {getReports} = useDashboardApi();
const {encrypt} = useEncrypt()

const phone: string = sessionStorage.getItem("phone") || ""

let reports = reactive<reportsHistory[]>([])

const reportCount = computed(() => reports.length)

async function fetchReports() {

  let history = reactive<reportsHistory[]>([])

  try {

    history = await getReports()
    reports.splice(0, reports.length, ...history)

  } catch (error) {

    console.log(error)

  }

}

function handleReport(report: reportsHistory) {
  if (report.is_reported) {
    navigateTo(`/result/${encrypt(report.id.toString())}`)
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
              @click="handleReport(item)"
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
          class="bg-white rounded-xl shadow p-4 border border-gray-100 animate-scale-in"
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
