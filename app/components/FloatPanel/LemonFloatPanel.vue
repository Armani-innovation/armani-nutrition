<script setup lang="ts">
import {useRoute, useRouter} from "#vue-router"

type langs = "fa" | "en" | "ar"

// Router
const route = useRoute()
const router = useRouter()

// i18n
const {setLocale} = useI18n()

// Navbar options
const options = [
  {label: $t("navbar.dashboard"), emoji: "🏠"},
  {
    label: $t("navbar.language"),
    emoji: "🌐",
    subOptions: [
      {label: "English", emoji: "🇺🇲", code: "en"},
      {label: "Persian", emoji: "🇮🇷", code: "fa"},
      {label: "Arabic", emoji: "🇸🇦", code: "ar"}
    ]
  },
  {label: $t("navbar.logout"), emoji: "🚪"}
]

// Navigate functions
function navigateToHome() {
  if (route.path !== "/dashboard") router.push("/dashboard")
}

function logOut(): void {
  sessionStorage.clear()
  router.push("/")
}

// Change language
function changeLang(code: langs) {
  setLocale(code)
}

</script>

<template>
  <div class="relative h-full w-full flex items-center">
    <!-- Hover group -->
    <div class="group absolute left-0 top-1/2 -translate-y-1/2">

      <!-- Main Tab -->
      <div
          class="w-5 h-16 rounded-r-full shadow-md cursor-pointer transition-all duration-300 group-hover:w-7"
          :style="{ background: 'linear-gradient(to bottom, var(--color-primary), #5a8d60)' }"
      />

      <!-- Floating Options -->
      <div
          class="absolute left-6 top-1/2 -translate-y-1/2
               opacity-0 pointer-events-none
               transition-all duration-300
               group-hover:opacity-100
               group-hover:pointer-events-auto"
      >
        <div class="relative flex flex-col gap-2">

          <!-- Dashboard -->
          <button class="navbar-btn" @click="navigateToHome">
            🏠
          </button>

          <!-- Language Menu -->
          <div class="relative left-5 group/lang">
            <button class="navbar-btn">🌐</button>

            <div
                class="absolute left-full top-1/2 -translate-y-1/2 pl-2 flex flex-col gap-2
                     opacity-0 pointer-events-none transition-all duration-300
                     group-hover/lang:opacity-100 group-hover/lang:pointer-events-auto"
            >
              <button
                  v-for="sub in options[1]?.subOptions"
                  :key="sub.code"
                  class="navbar-btn"
                  @click="changeLang(sub.code)"
              >
                {{ sub.emoji }}
              </button>
            </div>
          </div>

          <!-- Logout -->
          <button class="navbar-btn" @click="logOut">
            🚪
          </button>

        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
