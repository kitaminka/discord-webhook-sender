<template>
  <div class="field-buttons">
    <app-button class="button" variant="secondary" @click="moveFieldUp">
      <app-icon name="up"/>
    </app-button>
    <app-button class="button" variant="secondary" @click="moveFieldDown">
      <app-icon name="down"/>
    </app-button>
    <app-button class="button" variant="danger" @click="deleteField">
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
    AppIcon,
    AppButton
  },
  props: [
    'embed'
  ],
  methods: {
    ...mapMutations([
      'deleteField',
      'moveFieldUp',
      'moveFieldDown'
    ]),
  }
};
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