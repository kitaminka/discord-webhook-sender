<template>
  <svg v-if="name === 'up'" width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 10L8 6L4 10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
  </svg>
  <svg v-else-if="name === 'down'" width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g transform="rotate(180 8 8)">
      <path d="M12 10L8 6L4 10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
    </g>
  </svg>
  <svg v-else-if="name === 'delete'" width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none">
    <path d="M19 6L5 6M14 5L10 5M6 10L6 20C6 20.6666667 6.33333333 21 7 21 7.66666667 21 11 21 17 21 17.6666667 21 18 20.6666667 18 20 18 19.3333333 18 16 18 10"/>
  </svg>
</template>

<script>
export default {
  name: 'AppIcon',
  props: [
    'name'
  ]
}
</script>

<style scoped>

</style>