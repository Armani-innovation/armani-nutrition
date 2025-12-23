<script setup lang="ts">
import {useRoute, useRouter} from "#vue-router"
import {useCookie} from "#app";
import {ref, onMounted} from 'vue'


type langs = "fa" | "en" | "ar"

// Router
const route = useRoute()
const router = useRouter()

// i18n
const {setLocale} = useI18n()

// Navbar options
const options = [
  {label: "Dashboard", emoji: "🏠"},
  {
    label: "Language",
    emoji: "🌐",
    subOptions: [
      {label: "English", emoji: "🇺🇲", code: "en"},
      {label: "Persian", emoji: "🇮🇷", code: "fa"},
      {label: "Arabic", emoji: "🇸🇦", code: "ar"}
    ]
  },
  {label: "LogOut", emoji: "🚪"}
]

const isTouch = ref(false)
const isOpen = ref(false)
const isLangOpen = ref(false)

function toggleLang() {
  if (isTouch.value) {
    isLangOpen.value = !isLangOpen.value
  }
}

function toggleMenu() {
  if (isTouch.value) {
    isOpen.value = !isOpen.value
  }
}

function logOut(): void {
  const access = useCookie('access_token')
  const refresh = useCookie('refresh_token')

  access.value = null
  refresh.value = null

  sessionStorage.clear()

  isOpen.value = false
  isLangOpen.value = false
  router.push("/")
}

function navigateToHome() {
  isOpen.value = false
  isLangOpen.value = false
  if (route.path !== "/dashboard") router.push("/dashboard")
}

function changeLang(code: langs) {
  setLocale(code)
  isLangOpen.value = false
  isOpen.value = false
}

onMounted(() => {
  isTouch.value = window.matchMedia('(pointer: coarse)').matches
})
</script>

<template>
  <div class="relative h-full w-full flex items-center">
    <!-- Hover group -->
    <div
        class="absolute left-0 top-1/2 -translate-y-1/2"
        :class="!isTouch ? 'group' : ''"
    >
      <div
          class="w-5 h-16 rounded-r-full shadow-md cursor-pointer transition-all duration-300
         md:group-hover:w-7"
          :class="isOpen ? 'w-7' : ''"
          @click="toggleMenu"
          :style="{ background: 'linear-gradient(to bottom, var(--color-primary), #5a8d60)' }"
      />

      <div
          class="absolute left-6 top-1/2 -translate-y-1/2 transition-all duration-300"
          :class="isTouch
            ? (isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none')
            : 'opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto'
          "
      >
        <div class="relative flex flex-col gap-2">

          <!-- Dashboard -->
          <button class="navbar-btn" @click="navigateToHome">
            🏠
          </button>

          <!-- Language Menu -->
          <div class="relative left-5 group/lang">
            <button class="navbar-btn" @click="toggleLang">🌐</button>

            <div
                class="absolute left-full top-1/2 -translate-y-1/2 pl-2 flex flex-col gap-2
                transition-all duration-300"
                :class="[
                  isTouch
                  ? (isLangOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none')
                  : 'opacity-0 pointer-events-none group-hover/lang:opacity-100 group-hover/lang:pointer-events-auto'
                ]"
            >
              <button
                  v-for="sub in options[1]?.subOptions"
                  :key="sub.code"
                  class="navbar-btn"
                  @click="changeLang(sub.code as langs)"
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
