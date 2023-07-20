<script setup>
import { computed } from 'vue'
const props = defineProps({
  details: {
    type: Object,
    required: false,
  },
  isDialogVisible: {
    type: Boolean,
    required: true,
  },
  title: {
    type: String,
    required: false,
  },
  imageUrl: {
    type: String,
    required: false
  }
})

const emit = defineEmits([
  'submit',
  'update:isDialogVisible',
])

const details = ref(structuredClone(toRaw(props.details)))

watch(props, () => {
  details.value = structuredClone(toRaw(props.details))
})

const dialogModelValueUpdate = val => {
  emit('update:isDialogVisible', val)
}

const src = computed(() => {
  return new URL('/src/assets/images/placeholder.png', import.meta.url).href;
});
</script>

<template>
  <VDialog :width="$vuetify.display.smAndDown ? 'auto' : '70%'" :model-value="props.isDialogVisible"
    @update:model-value="dialogModelValueUpdate">
    <!-- Dialog close btn -->
    <v-card class="mx-auto my-12" max-width="374">
      <template v-slot:loader="{ isActive }">
        <v-progress-linear :active="isActive" color="deep-purple" height="4" indeterminate></v-progress-linear>
      </template>

      <v-img cover height="250" :src="imageUrl || src"></v-img>

      <v-card-item>
        <v-card-title>{{ props.details.Name }}</v-card-title>

        <v-card-subtitle v-if="props.details['Create Date']">
          <span class="me-1">{{ props.details['Create Date'] }}</span>

          <v-icon color="error" icon="mdi-fire-circle" size="small"></v-icon>
        </v-card-subtitle>
      </v-card-item>

      <v-card-text class="py-0">

        <small v-if="props.details['Creator']" class="d-inline-block mb-4 text-subtitle-1">
          created by <b>{{ props.details['Creator'] }}</b>
        </small>

        <v-divider class="mx-4 mb-6"></v-divider>
        <VRow>
          <VCol v-for="(key, value) in details" :key="key" class="list-item" cols="12">
            <small class="text-truncate mr-1">{{ value }} : </small>
            <v-chip variant="text" class="text-truncate d-flex mb-0 flex-item justify-end text-body-2">{{ key }}</v-chip>
          </VCol>
        </VRow>
        <v-divider class="mx-4 my-6"></v-divider>
      </v-card-text>

      <v-card-actions class="justify-center">
        <v-btn variant="tonal" color="primary" @click="dialogModelValueUpdate(false)">
          Ok
        </v-btn>
      </v-card-actions>
    </v-card>

    <!-- <VCard>
      <VCardItem class="text-center py-4">
        <VCardTitle class="text-h5 font-weight-medium">
          <VAvatar variant="tonal" size="32" class="me-2">
            <VIcon color="warning" icon="mdi-tag-text" size="20" />
          </VAvatar>
          {{ props.title || 'Selected Row Information' }}
        </VCardTitle>
      </VCardItem>

      <VDivider />

      <VCardText class="pt-6">
        <VRow class="align-center" v-if="props.imageUrl">
          <VCol cols="12" sm="3">
            <VRow class="justify-center">
              <VCol class="d-flex justify-center" v-if="props.imageUrl" cols="12">
                <div class="imagePreviewWrapper" :style="{ 'background-image': `url(${props.imageUrl})` }">
                </div>
              </VCol>
            </VRow>
          </VCol>
          <VCol cols="12" sm="9">
            <VRow>
              <VCol v-for="(key, value) in details" :key="key" class="list-item" cols="12" sm="3">
                <small class="text-truncate mr-1">{{ value }} : </small>
                <v-chip label class="text-truncate d-flex mb-0 flex-item justify-end text-body-2">{{ key }}</v-chip>
              </VCol>
            </VRow>
          </VCol>
        </VRow>
        <VRow v-else>
          <VCol v-for="(key, value) in details" :key="key" class="list-item" cols="12" sm="3">
            <b class="text-truncate mr-1">{{ value }} : </b>
            <v-chip label :variant="$vuetify.display.smAndDown ? 'text' : 'tonal'"
              :class="$vuetify.display.smAndDown ? 'justify-end' : 'justify-center'"
              class="text-truncate d-flex mb-0 flex-item">{{ key }}</v-chip>
          </VCol>
        </VRow>
      </VCardText>
    </VCard> -->
  </VDialog>
</template>

<style lang="scss">
.list-item {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 4px 0;
}

.list-item:before {
  content: "";
  display: inline-block;
  vertical-align: middle;
  width: 6px;
  height: 6px;
  border-radius: 10px;
  margin-right: 10px;

}

.list-item:nth-child(even) {
  &:before {
    background: rgba(var(--v-theme-grey-300));
  }
}

.list-item:nth-child(odd) {
  &:before {
    background: rgba(var(--v-theme-warning));
  }
}

.imagePreviewWrapper {
  // position: relative;
  display: block;
  border: 0.5px solid rgb(var(--v-theme-grey-300));
  border-radius: 50%;
  background-position: center center;
  background-size: cover;
  block-size: 130px;
  cursor: pointer;
  inline-size: 130px;
}

.flex-item {
  flex: 1
}
</style>
