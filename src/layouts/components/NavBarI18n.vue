<script setup>
import NavBarI18n from '@core/components/I18n.vue'
import { useThemeConfig } from '@core/composable/useThemeConfig'

const { isAppRtl } = useThemeConfig()

const i18nCompLanguages = [
  {
    label: 'English',
    i18nLang: 'en',
    abbr: 'En'
  },
  {
    label: 'French',
    i18nLang: 'fr',
    abbr: 'Fr'
  },
  {
    label: 'Spanish',
    i18nLang: 'spa',
    abbr: 'Spa'
  },
  {
    label: 'Arabic',
    i18nLang: 'ar',
    abbr: 'Ar'
  },
]

const handleLangChange = lang => {
  isAppRtl.value = lang === 'ar'
}
</script>

<template>
  <NavBarI18n
    :languages="i18nCompLanguages"
    @change="handleLangChange"
  />
</template>
