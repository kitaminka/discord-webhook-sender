<template>
  <div class="field-buttons">
    <app-button class="button" variant="secondary" @click="moveFieldUp({embedId, fieldId})">
      <app-icon name="up"/>
    </app-button>
    <app-button class="button" variant="secondary" @click="moveFieldDown({embedId, fieldId})">
      <app-icon name="down"/>
    </app-button>
    <app-button class="button" variant="danger" @click="deleteField({embedId, fieldId})">
      <app-icon name="delete"/>
    </app-button>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';

import AppButton from '@/components/AppButton.vue';
import AppIcon from '@/components/AppIcon.vue';

export default {
  name: 'FieldButtons',
  components: {
    AppButton,
    AppIcon
  },
  props: [
    'embedId',
    'fieldId'
  ],
  methods: {
    ...mapMutations([
      'moveFieldUp',
      'moveFieldDown',
      'updateField',
      'deleteField'
    ])
  }
}
</script>

<style scoped>
.field-buttons {
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: auto;
  grid-gap: 10px;
  justify-content: right;
  align-items: center;
  cursor: default;
}
.button {
  padding: 0;
  display: grid;
  justify-content: center;
  align-items: center;
  height: 24px;
  width: 24px;
}
</style>