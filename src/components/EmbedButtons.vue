<template>
  <div class="embed-buttons" @click.stop>
    <app-button class="button" variant="secondary" @click="moveEmbedUp(embedId)">
      <app-icon name="up"/>
    </app-button>
    <app-button class="button" variant="secondary" @click="moveEmbedDown(embedId)">
      <app-icon name="down"/>
    </app-button>
    <app-button class="button" variant="danger" @click="deleteEmbed(embedId)">
      <app-icon name="delete"/>
    </app-button>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';

import AppButton from '@/components/ui/AppButton.vue';
import AppIcon from '@/components/AppIcon.vue';

export default {
  name: 'EmbedButtons',
  components: {
    AppButton,
    AppIcon
  },
  props: [
    'embedId'
  ],
  methods: {
    ...mapMutations([
      'deleteEmbed',
      'moveEmbedUp',
      'moveEmbedDown'
    ])
  }
}
</script>

<style scoped>
.embed-buttons {
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
  height: 30px;
  width: 30px;
}
</style>