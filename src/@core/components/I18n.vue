<script setup>
const props = defineProps({
  languages: {
    type: Array,
    required: true,
  },
  location: {
    type: null,
    required: false,
    default: 'bottom end',
  },
})

const emit = defineEmits(['change'])

const { locale } = useI18n({ useScope: 'global' })
</script>

<template>
  <VBtn icon variant="text" color="default" size="small">
    <VIcon icon="tabler-language" size="24" />
    <!-- Menu -->
    <VMenu activator="parent" :location="props.location" offset="14px">
      <!-- List -->
      <VList min-width="175px">
        <!-- List item -->
        <VListItem v-for="lang in props.languages" :key="lang.i18nLang"
          :value="lang.i18nLang" @click="locale = lang.i18nLang; $emit('change', lang.i18nLang)">
          <!-- Language label -->
          <VListItemTitle class="d-flex justify-space-between align-center">
            <span>{{ lang.label }}</span>
            <VAvatar color="primary" variant="tonal" size="36">
              <span>{{ lang.abbr }}</span>
            </VAvatar>
          </VListItemTitle>
        </VListItem>
      </VList>
    </VMenu>
  </VBtn>
</template>
