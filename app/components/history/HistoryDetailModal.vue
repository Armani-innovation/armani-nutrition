<script setup lang="ts">
defineProps<{
  open: boolean
  title: string
  subtitle?: string
}>()

const emit = defineEmits<{
  close: []
}>()
</script>

<template>
  <Teleport to="body">
    <Transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
    >
      <div
          v-if="open"
          class="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/45 p-0 backdrop-blur-sm sm:items-center sm:p-5"
          role="presentation"
          @click.self="emit('close')"
      >
        <section
            role="dialog"
            aria-modal="true"
            :aria-label="title"
            class="flex max-h-[92vh] w-full max-w-2xl flex-col overflow-hidden rounded-t-3xl bg-white shadow-2xl sm:rounded-3xl"
        >
          <header class="flex items-start justify-between gap-4 border-b border-slate-100 px-5 py-4 sm:px-7 sm:py-5">
            <div class="min-w-0">
              <h2 class="text-xl font-bold text-slate-900 sm:text-2xl">{{ title }}</h2>
              <p v-if="subtitle" class="mt-1 text-sm text-slate-500">{{ subtitle }}</p>
            </div>
            <button
                type="button"
                class="grid size-10 shrink-0 place-items-center rounded-full bg-slate-100 text-xl text-slate-600 transition hover:bg-slate-200 hover:text-slate-900"
                :aria-label="$t('historyDetails.close')"
                @click="emit('close')"
            >
              ×
            </button>
          </header>

          <div class="overflow-y-auto px-5 py-5 sm:px-7 sm:py-6">
            <slot/>
          </div>

          <footer v-if="$slots.footer" class="border-t border-slate-100 bg-slate-50 px-5 py-4 sm:px-7">
            <slot name="footer"/>
          </footer>
        </section>
      </div>
    </Transition>
  </Teleport>
</template>
