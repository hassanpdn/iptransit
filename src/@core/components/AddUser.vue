<script setup>
const props = defineProps({
  items: {
    type: Array,
    required: true,
  },
})

const emit = defineEmits(['change'])

</script>

<template>
  <VBtn icon variant="text" color="default" size="small">
    <VIcon icon="mdi-account-plus" size="24" />

    <!-- Menu -->
    <VMenu activator="parent" offset="14px" location="bottom end">
      <VList>
        <VListItem @click="$emit('change', item.value)" v-for="(item, index) in items"  :key="index" :value="index">
          <RouterLink :to="{ path: item.value, query: { value: item.value } }" >
            <VListItemTitle>
                {{ item.title }}
            </VListItemTitle>
          </RouterLink>
        </VListItem>
      </VList>
    </VMenu>
  </VBtn>
</template>
