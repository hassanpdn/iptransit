<template>
  <VOverlay
    v-model="isLoading"
    absolute
    color="white"
    class="d-flex align-center justify-center"
  >
    <VProgressCircular
      indeterminate
      color="primary"
    />

  </VOverlay>
</template>

<script setup>
import { useLoadingStore } from '@/store/useLoadingStore'

const store = useLoadingStore()
const isLoading = computed(() => store.isLoading)
</script>
