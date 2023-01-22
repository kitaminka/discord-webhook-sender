<template>
  <div class="field">
    <div class="header">
      <h3>{{field.name || 'Field'}}</h3>
      <field-buttons :field="field"/>
    </div>
    <div class="name">
      <p>Name</p>
      <app-input class="input" placeholder="Some name" v-model="name" maxlength="256"/>
    </div>
    <div class="value">
      <p>Value</p>
      <app-textarea class="textarea" placeholder="Some value" v-model="value" maxlength="1024"/>
    </div>
  </div>
</template>

<script>
import AppInput from '@/components/AppInput';
import AppTextarea from '@/components/AppTextarea';
import FieldButtons from '@/components/FieldButtons.vue';

export default {
  name: 'EmbedField',
  components: {
    AppTextarea,
    AppInput,
    FieldButtons
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
.header {
  display: grid;
  grid-template-columns: auto 1fr auto;
  justify-content: left;
  align-items: center;
  margin-bottom: 5px;
}
.input {
  margin: 5px 0;
  box-sizing: border-box;
  width: 100%;
}
.textarea {
  box-sizing: border-box;
  margin-top: 5px;
  width: 100%;
  height: 75px;
}
</style>