<script setup>
const shortcuts = [
  {
    icon: 'tabler-layout',
    title: 'Dashboard',
    subtitle: 'Dashboard Analytics',
    to: { name: 'index' },
  }
]
</script>

<template>
  <Shortcuts :shortcuts="shortcuts" />
</template>
