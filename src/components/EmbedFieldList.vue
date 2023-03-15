<template>
  <div class="field-list">
    <h3 class="header">Fields</h3>
    <div class="buttons">
      <app-button @click="createField(embedId)" :disabled="disableCreateField">Create field</app-button>
      <app-button @click="deleteEmbedFields(embedId)" :disabled="disableDeleteFields" variant="danger">Delete all fields</app-button>
    </div>
    <div class="fields">
      <transition-group>
        <embed-field class="field" v-for="field in embedFieldArray(embedId)" :embed-id="embedId" :field="field" :key="field.id"/>
      </transition-group>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';

import AppButton from '@/components/AppButton';
import EmbedField from '@/components/EmbedField.vue';

export default {
  name: 'FieldList',
  components: {
    EmbedField,
    AppButton
  },
  props: [
    'embedId'
  ],
  methods: {
    ...mapMutations([
      'createField',
      'deleteEmbedFields'
    ])
  },
  computed: {
    disableCreateField() {
      return this..length >= 25;
    },
    disableDeleteFields() {
      return this.embedFieldArray(this.embedId).length <= 0;
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

.v-move, .v-enter-active, .v-leave-active {
  transition: all .5s ease-in-out;
}
.v-enter-from, .v-leave-to {
  opacity: 0;
}

@media only screen and (max-width: 800px) {
  .field-list {
    grid-column-start: 1;
    grid-column-end: 2;
  }
}
</style>