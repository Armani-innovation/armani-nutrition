<script setup lang="ts">
import {ref, onMounted} from "vue"

const active = ref(false)

onMounted(() => {
  setTimeout(() => {
    active.value = true
  }, 100)
})
</script>

<template>
  <div class="relative flex items-center justify-center">

    <!-- SVG دایره + تیک -->
    <svg viewBox="0 0 52 52" class="w-24 h-24 relative z-10">
      <!-- Circle -->
      <circle
          cx="26"
          cy="26"
          r="24"
          class="stroke-primary"
          stroke-width="4"
          fill="transparent"
          stroke-linecap="round"
          :class="active ? 'circle-anim' : 'circle-reset'"
      />

      <!-- Checkmark -->
      <path
          d="M16 28 L24 34 L36 18"
          stroke-linecap="round"
          stroke-linejoin="round"
          fill="none"
          stroke-width="5"
          :class="active ? 'tick-anim' : 'tick-reset'"
      />
    </svg>

    <!-- Radial particles on circle edge -->
    <div class="absolute inset-0">
      <div
          v-for="angle in [0, 60, 120, 180, 240, 300]"
          :key="angle"
          class="particle"
          :style="{
            '--angle': angle + 'deg',
            animationPlayState: active ? 'running' : 'paused'
          }"
      />
    </div>

  </div>
</template>

<style scoped>
/* --------------------------------------------- */
/* Circle + Tick Animation */
/* --------------------------------------------- */

.circle-reset {
  stroke-dasharray: 160;
  stroke-dashoffset: 160;
  transform-origin: center;
  transform: rotate(-90deg);
}

.circle-anim {
  stroke-dasharray: 160;
  stroke-dashoffset: 0;
  transform-origin: center;
  transform: rotate(-90deg);
  animation: drawBoth 0.9s ease-out forwards;
}

.tick-reset {
  stroke: var(--color-primary);
  stroke-dasharray: 60;
  stroke-dashoffset: 60;
}

.tick-anim {
  stroke: var(--color-primary);
  stroke-dasharray: 60;
  stroke-dashoffset: 0;
  animation: drawBoth 0.9s ease-out forwards;
}

.circle-anim {
  --offset-start: 160;
}

.tick-anim {
  --offset-start: 60;
}

@keyframes drawBoth {
  from {
    stroke-dashoffset: var(--offset-start);
  }
  to {
    stroke-dashoffset: 0;
  }
}

/* --------------------------------------------- */
/* Radial particles */
/* --------------------------------------------- */
.particle {
  --angle: 0deg; /* پیش‌فرض */
  position: absolute;
  width: 6px;
  height: 6px;
  background: #22c55e;
  border-radius: 50%;
  opacity: 0;

  top: 50%;
  left: 50%;
  transform: rotate(var(--angle)) translate(38px) rotate(calc(-1 * var(--angle)));

  animation: explode 0.9s ease-out forwards;
  animation-play-state: paused;
}

@keyframes explode {
  0% {
    opacity: 1;
    transform: rotate(var(--angle)) translate(38px) scale(1) rotate(calc(-1 * var(--angle)));
  }
  100% {
    opacity: 0;
    transform: rotate(var(--angle)) translate(55px) scale(0.4) rotate(calc(-1 * var(--angle)));
  }
}

</style>
