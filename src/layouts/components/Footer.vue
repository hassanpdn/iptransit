<template>
  <div class="h-100 d-flex align-center justify-space-between">
    <!-- 👉 Footer: left content -->
    <span class="d-flex align-center">
      &copy;
      {{ new Date().getFullYear() }}
      <a
        href="https://xicomm.com"
        rel="noopener noreferrer"
        class="text-primary ms-1 pointer"
      >Xicomm</a>
      <span class="ma-2">{{ $t('All Rights Reserved') }}</span>
    </span>
  </div>
</template>

<style>
  .pointer {
    cursor: pointer;
  }
</style>
