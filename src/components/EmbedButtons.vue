<template>
  <div class="embed-buttons" @click.stop>
    <app-button class="button" variant="secondary" @click="moveEmbedUp(embed)">
      <app-icon name="up"/>
    </app-button>
    <app-button class="button" variant="secondary" @click="moveEmbedDown(embed)">
      <app-icon name="down"/>
    </app-button>
    <app-button class="button" variant="danger" @click="deleteEmbed(embed.id)">
      <app-icon name="delete"/>
    </app-button>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';

import AppButton from '@/components/AppButton.vue';
import AppIcon from '@/components/AppIcon.vue';

export default {
  name: 'EmbedButtons',
  components: {
    AppButton,
    AppIcon
  },
  props: [
    'embed',
  ],
  methods: {
    ...mapMutations([
      'deleteEmbed',
      'moveEmbedUp',
      'moveEmbedDown'
    ]),
  }
};
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
  height: 24px;
  width: 24px;
}
</style>