<template>
  <transition>
    <p class="error-message" v-if="show">
      <slot/>
    </p>
  </transition>
</template>

<script>
export default {
  name: 'ErrorMessage',
  props: {
    show: {
      default: true
    }
  }
}
</script>

<style scoped>
.error-message {
  color: #fc6661;
  font-size: 14px;
  margin: 5px 0;
  max-height: 17px;
}

.v-enter-active {
  transition: opacity 0.4s ease, max-height 0.2s ease, margin 0.2s ease;
}
.v-leave-active {
  transition: opacity 0.2s ease, max-height 0.4s ease, margin 0.4s ease;
}
.v-enter-from,
.v-leave-to {
  max-height: 0;
  opacity: 0;
  margin: 0;
}
</style>