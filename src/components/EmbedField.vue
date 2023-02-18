<template>
  <div class="field">
    <div class="header">
      <h3>{{field.name || 'Field'}}</h3>
      <embed-field-buttons :embedId="embedId" :fieldId="field.id"/>
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
import { mapMutations } from 'vuex';

import AppInput from '@/components/AppInput';
import AppTextarea from '@/components/AppTextarea';
import EmbedFieldButtons from '@/components/EmbedFieldButtons.vue';

export default {
  name: 'EmbedField',
  components: {
    AppTextarea,
    AppInput,
    EmbedFieldButtons
  },
  props: [
    'embedId',
    'field'
  ],
  methods: {
    ...mapMutations([
      'updateField'
    ])
  },
  computed: {
    name: {
      get() {
        return this.field.name;
      },
      set(name) {
        this.updateField({
          id: this.field.id,
          name: name
        });
      }
    },
    value: {
      get() {
        return this.field.value;
      },
      set(value) {
        this.updateField({
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