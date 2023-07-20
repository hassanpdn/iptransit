<!-- eslint-disable import/no-unresolved -->
<script setup>
import { useTheme } from 'vuetify'
import { useThemeConfig } from '@core/composable/useThemeConfig'
import { hexToRgb } from '@layouts/utils'

import Snackbar from '@/components/shared/Snackbar.vue'
import LoadingOverlay from '@/components/shared/LoadingOverlay.vue'

const {
  syncInitialLoaderTheme,
  syncVuetifyThemeWithTheme: syncConfigThemeWithVuetifyTheme,
  isAppRtl,
} = useThemeConfig()

const { global } = useTheme()

// ℹ️ Sync current theme with initial loader theme
syncInitialLoaderTheme()
syncConfigThemeWithVuetifyTheme()
</script>

<template>
  <VLocaleProvider :rtl="isAppRtl">
    <!-- ℹ️ This is required to set the background color of active nav link based on currently active global theme's primary -->
    <VApp :style="`--v-global-theme-primary: ${hexToRgb(global.current.value.colors.primary)}`">
      <RouterView />
      <Snackbar />
      <LoadingOverlay />
    </VApp>
  </VLocaleProvider>
</template>

<style lang="scss">
.vpd-body,
.vpd-time {
  background-color: rgb(var(--v-theme-surface)) !important;
  border-bottom: none !important;
}

.vpd-actions {
  display: flex;
  justify-content: space-between;
}

.vpd-actions>button {
  border-radius: 8px;
  font-weight: 700;
  margin-inline-end: 4px;
}

.vpd-next.svg.path,
.vpd-prev.svg.path {
  fill: rgb(var(--v-theme-on-background)) !important;
}

$disabled-color: rgba(var(--v-theme-on-background), var(--v-disabled-opacity));

.vpd-day[disabled="true"] > .vpd-day-text {
  color: $disabled-color;
}

.vpd-day[disabled="true"] {
  opacity: 0.6;
  transform: scale(1);

  .vpd-day-effect {
    background-color: rgb(var(--v-theme-primary));
  }
}

::-webkit-scrollbar {
  width: 5px;
}

/* Track */
::-webkit-scrollbar-track {
  background: rgb(var(--v-theme-surface), 0.5);
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: rgb(var(--v-theme-on-background), 0.5);
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: rgb(var(--v-theme-on-background), 0.5);
}
</style>
