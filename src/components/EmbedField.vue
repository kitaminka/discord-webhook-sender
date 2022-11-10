<template>
  <app-accordion header="Embed field">
    <div class="embed-field__name">
      <p>Name</p>
      <app-input class="embed-field__input"
                 placeholder="Some name"
                 v-model="name"/>
    </div>
    <div class="embed-field__value">
      <p>Value</p>
      <app-input class="embed-field__input"
                 placeholder="Some value"
                 v-model="value"/>
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
  computed: {
    name: {
      get() {
        return this.field.name;
      },
      set(name) {
        this.$emit('updateField', {
          id: this.field.id,
          name: name,
        });
      }
    },
    value: {
      get() {
        return this.field.value;
      },
      set(value) {
        this.$emit('updateField', {
          id: this.field.id,
          value: value
        });
      }
    }
  }
};
</script>

<style scoped>

</style>