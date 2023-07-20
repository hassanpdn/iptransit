<template>
  <svg class="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
    <!-- <circle class="checkmark__circle" cx="26" cy="26" r="25" fill="none" /> -->
    <path class="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
  </svg>
</template>

<style>
.checkmark__circle {
  animation: stroke 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards;
  fill: rgb(var(--v-theme-on-background));
  stroke: green;
  stroke-dasharray: 166;
  stroke-dashoffset: 166;
  stroke-miterlimit: 10;
  stroke-width: 2;
}

.checkmark {
  display: block;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  /* animation: fill 0.4s ease-in-out 0.4s forwards, scale 0.3s ease-in-out 0.9s both; */
  box-shadow: inset 0 0 0 #7ac142;
  stroke: green;
  stroke-miterlimit: 10;
  stroke-width: 7;
}

.checkmark__check {
  transform-origin: 50% 50%;
  stroke-dasharray: 48;
  stroke-dashoffset: 48;
  animation: stroke 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.4s forwards;
}

@keyframes stroke {
  100% {
    stroke-dashoffset: 0;
  }
}
</style>
