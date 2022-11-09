<template>
  <app-accordion header="Embed field">
  </app-accordion>
</template>

<script>
import AppAccordion from '@/components/AppAccordion';

export default {
  name: 'EmbedField',
  components: {
    AppAccordion
  },
  props: [
    'modelValue'
  ]
};
</script>

<style scoped>

</style>