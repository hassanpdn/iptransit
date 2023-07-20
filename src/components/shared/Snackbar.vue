<template>
  <VSnackbar
    v-for=" ( {id, text, color, show } ) in messages"
    :key="id" 
    :model-value="show"
    :color="color"
    :timeout="4000"
    location="top center"
    :max-height="65"
    transition="fab-transition"
    close-on-content-click
    @update:model-value="snackbarStore.close(id)"
  >
    {{ text }}
    <template #actions>
      <VBtn
        v-if="messages.length > 1"
        class="text-caption mr-10"
        color="pink"
        variant="text"
        icon="mdi-close"
        @click="snackbarStore.close(id)"
      >
        Next ({{ messages.length - 1 }} more)
      </VBtn>
      <VIcon
        v-else
        color="pink"
        variant="text"
        icon="mdi-close"
        @click="snackbarStore.close(id)"
      />
    </template>
  </VSnackbar>
</template>

<script setup>
import { storeToRefs } from 'pinia'

import { useSnackbarStore } from '@/store/useSnackbarStore'

const snackbarStore = useSnackbarStore()

const { messages } = storeToRefs(snackbarStore)
</script>
