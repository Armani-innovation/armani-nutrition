<script lang="ts" setup>
import { ref, computed, onMounted, watch } from 'vue'

interface Props {
  duration: number
  show: boolean
}

const props = defineProps<Props>()
const emit = defineEmits<{ 'finished': [] }>()

const visible = ref(props.show)
const timeLeft = ref(props.duration)

const minutes = computed(() => String(Math.floor(timeLeft.value / 60)).padStart(2, '0'))
const seconds = computed(() => String(timeLeft.value % 60).padStart(2, '0'))
const progress = computed(() => ((props.duration - timeLeft.value) / props.duration) * 100)

let interval: number

onMounted(() => {
  interval = window.setInterval(() => {
    if (timeLeft.value > 0) {
      timeLeft.value--
    } else {
      clearInterval(interval)
      emit('finished')
    }
  }, 1000)
})

watch(() => props.show, (newVal) => {
  visible.value = newVal
})
</script>

<template>
  <div v-if="visible" class="text-center p-6 rounded-xl shadow-lg bg-white max-w-lg w-full">
    <h1 class="text-4xl font-bold text-primary mb-4">گزارش در راهه!</h1>
    <p class="text-xl mb-6">
      لطفاً {{ minutes }}:{{ seconds }} دقیقه صبر کنید
    </p>
    <div class="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
      <div class="h-4 bg-primary" :style="{ width: progress + '%' }"></div>
    </div>
  </div>
</template>