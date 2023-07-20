<script setup>
import NavBarAddUser from '@core/components/AddUser.vue'

const items = [{ title: 'Add Vendor', value: 'vendor' }, { title: 'Add Staff', value: 'staff' }]

const handleItemChange = val => {
  console.info(val)
}
</script>

<template>
  <NavBarAddUser :items="items" @change="handleItemChange" />
</template>
