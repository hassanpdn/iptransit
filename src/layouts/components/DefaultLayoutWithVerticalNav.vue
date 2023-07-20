<script setup>
import { ref } from 'vue'
import { useDisplay } from 'vuetify'

// Store modules
import { useAuthStore } from '@/store/useAuthStore'
import { useThemeConfig } from '@core/composable/useThemeConfig'

//Utils
import navItems from '@/navigation/vertical'

// Components
import Footer from '@/layouts/components/Footer.vue'
import NavbarThemeSwitcher from '@/layouts/components/NavbarThemeSwitcher.vue'
import UserProfile from '@/layouts/components/UserProfile.vue'
import NavbarShortcuts from '@/layouts/components/NavbarShortcuts.vue'
import NavBarI18n from '@/layouts/components/NavBarI18n.vue'
// import NavBarAddUser from '@/layouts/components/NavBarAddUser.vue'

// @layouts plugin
import { VerticalNavLayout } from '@layouts'
import { storeToRefs } from 'pinia'

const { appRouteTransition, isLessThanOverlayNavBreakpoint } = useThemeConfig()
const { width: windowWidth } = useWindowSize()

const options = {
  weekday: 'long',
  month: 'long',
  day: 'numeric',
  year: 'numeric',
  hour: 'numeric', 
  minute: 'numeric', 
  second: 'numeric',
  hour12: false,
};

const currentDate = ref(new Date().toLocaleString(undefined, options))

setInterval(() => {
  currentDate.value = new Date().toLocaleString(undefined, options)
}, 1000);


// Check user permission
const authStore = useAuthStore()
const isSuperAdmin = storeToRefs(authStore)
const { user } = storeToRefs(authStore)

const { mobile } = useDisplay()

</script>

<template>
  <VerticalNavLayout :nav-items="navItems">
    <!-- 👉 navbar -->
    <template #navbar="{ toggleVerticalOverlayNavActive }">
      <div class="d-flex h-100 align-center">
        <div>
          <VBtn v-if="isLessThanOverlayNavBreakpoint(windowWidth)" icon variant="text" color="default" class="ms-n3"
            size="small" @click="toggleVerticalOverlayNavActive(true)">
            <VIcon icon="tabler-menu-2" size="24" />
          </VBtn>


          <NavbarThemeSwitcher />
        </div>

        <VSpacer />

        <div v-if="$vuetify.display.smAndUp" class="d-flex flex-column align-center">
          <div class="d-flex align-center">
            <VIcon class="text-h6 mr-2" icon="mdi-user" size="18"/>
            <span class="font-weight-bold">{{ user && user.name }}</span>
          </div>
          <div class="d-flex align-center">
            <small class="text-disabled font-bold">{{ currentDate }}</small>
          </div>
        </div>

        <VSpacer />

        <div class="d-flex align-center">
          <!-- <NavBarAddUser v-if="isSuperAdmin" /> -->
          <!-- <NavBarI18n class="me-2" /> -->
          <!-- <NavbarShortcuts v-if="!$vuetify.display.smAndDown" class="me-2" /> -->
          <UserProfile />
        </div>
      </div>
    </template>

    <!-- 👉 Pages -->
    <RouterView v-slot="{ Component }">
      <Transition :name="appRouteTransition" mode="out-in">
        <Component :is="Component" />
      </Transition>
    </RouterView>

    <!-- 👉 Footer -->
    <template #footer>
      <Footer />
    </template>

  </VerticalNavLayout>
</template>
