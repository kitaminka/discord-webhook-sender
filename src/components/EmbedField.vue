<template>
  <app-accordion header="Embed field">
    <div class="embed-field__name">
      <p>Name</p>
      <app-input class="embed-field__input"
                 :value="field.name"
                 placeholder="Some name"
                 @input="updateName"/>
    </div>
    <div class="embed-field__value">
      <p>Value</p>
      <app-input class="embed-field__input"
                 :value="field.value"
                 placeholder="Some value"
                 @input="updateValue"/>
    </div>
  </app-accordion>
</template>

<script>
import AppAccordion from '@/components/AppAccordion';
import AppInput from '@/components/AppInput';

export default {
  name: 'EmbedField',
  components: {
    AppInput,
    AppAccordion
  },
  props: [
    'field'
  ],
  methods: {
    updateName(event) {
      this.$emit('updateField', {
        name: event.target.value
      });
    },
    updateValue(event) {
      this.$emit('updateField', {
        value: event.target.value
      });
    }
  }
};
</script>

<style scoped>

</style>