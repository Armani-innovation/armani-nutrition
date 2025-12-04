<script setup lang="ts">
const options = [
  {label: 'Dashboard', emoji: '🏠'},
  {
    label: 'Language',
    emoji: '🌐',
    subOptions: [
      {label: 'English', emoji: '🇺🇲'},
      {label: 'Persian', emoji: '🇮🇷'},
      {label: 'Spanish', emoji: '🇸🇦'}
    ]
  },
  {label: 'Logout', emoji: '🚪'}
]

</script>

<template>
  <div class="relative h-full w-full flex items-center">
    <!-- Hover group -->
    <div class="group absolute left-0 top-1/2 -translate-y-1/2">

      <!-- Main Tab -->
      <div
          class="
          w-5 h-16
          rounded-r-full
          shadow-md
          cursor-pointer
          transition-all duration-300
          group-hover:w-7
        "
          :style="{ background: 'linear-gradient(to bottom, var(--color-primary), #5a8d60)' }"
      />

      <!-- Floating Options -->
      <div
          class="
          absolute left-6 top-1/2 -translate-y-1/2
          opacity-0 pointer-events-none
          transition-all duration-300
          group-hover:opacity-100
          group-hover:pointer-events-auto
        "
      >
        <div class="relative flex flex-col gap-2">

          <button
              class="navbar-btn"
          >
            🏠
          </button>

          <div class="relative left-5 group/lang">
            <button
                class="navbar-btn"
            >
              🌐
            </button>

            <div
                class="absolute left-full top-1/2 -translate-y-1/2 pl-2 flex flex-col gap-2
                   opacity-0 pointer-events-none transition-all duration-300
                   group-hover/lang:opacity-100 group-hover/lang:pointer-events-auto"
            >
              <button
                  v-for="sub in options[1]?.subOptions"
                  :key="sub.label"
                  class="navbar-btn"
              >
                {{ sub.emoji }}
              </button>
            </div>
          </div>

          <button
              class="navbar-btn"
          >
            🚪
          </button>

        </div>
      </div>
    </div>
  </div>
</template>