<template>
  <div class="field-list">
    <h3 class="header">Fields</h3>
    <div class="buttons">
      <app-button @click="createEmbedField(embed.id)" :disabled="disableCreateField">Create field</app-button>
      <app-button @click="deleteAllEmbedFields(embed.id)" :disabled="disableDeleteFields" variant="danger">Delete all fields</app-button>
    </div>
    <div class="fields">
      <embed-field class="field" v-for="field in this.embed.fields" :field="field" :key="field.id" @updateField="updateField"/>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';

import AppButton from '@/components/AppButton';
import EmbedField from '@/components/EmbedField';

export default {
  name: 'FieldList',
  components: {
    EmbedField,
    AppButton
  },
  props: [
    'embed'
  ],
  methods: {
    ...mapMutations([
      'createEmbedField',
      'deleteAllEmbedFields',
      'updateEmbedField'
    ]),
    updateField(field) {
      this.updateEmbedField({
        embedId: this.embed.id,
        field
      });
    }
  },
  computed: {
    disableCreateField() {
      return this.embed.fields.length >= 25;
    },
    disableDeleteFields() {
      return this.embed.fields.length <= 0;
    }
  }
};
</script>

<style scoped>
.header {
  margin-bottom: 5px;
}
.field-list {
  margin-top: 5px;
  grid-column-start: 1;
  grid-column-end: 3;
}
.buttons {
  justify-content: left;
  grid-template-columns: auto auto;
  display: grid;
  grid-gap: 10px;
  margin-bottom: 5px;
}
.fields {
  display: grid;
}
.field {
  margin-top: 5px;
  box-sizing: border-box;
  width: 100%;
}

@media only screen and (max-width: 800px) {
  .field-list {
    grid-column-start: 1;
    grid-column-end: 2;
  }
}
</style>