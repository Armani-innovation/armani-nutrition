<script setup lang="ts">
import {ref, onMounted} from 'vue'
import {useRoute} from '#app'
import {useEncrypt} from '~/composables/encodePhone'

const {decrypt} = useEncrypt()
const route = useRoute()

const decryptedPhone = ref('')

function decryptPhone() {
  const encryptedPhone = route.params.phone as string
  if (encryptedPhone) {
    decryptedPhone.value = decrypt(decodeURIComponent(encryptedPhone))
  }
}

onMounted(() => {
  decryptPhone()
})
</script>


<template>
</template>

<style scoped>
</style>