<template>
  <div class="embed-settings">
    <h3 class="header">Embed settings</h3>
    <div class="buttons">
      <app-button @click="createEmbed" :disabled="disableCreateEmbed">Create embed</app-button>
      <app-button @click="deleteAllEmbeds" :disabled="disableDeleteEmbeds" variant="danger">Delete all embeds</app-button>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

import AppButton from '@/components/AppButton';

export default {
  name: 'EmbedSettings',
  components: {
    AppButton
  },
  methods: {
    ...mapMutations('embeds', [
      'createEmbed',
      'deleteAllEmbeds',
      'updateEmbed'
    ])
  },
  computed: {
    ...mapState('embeds', [
      'embeds'
    ]),
    disableCreateEmbed() {
      return this.embeds.length >= 10;
    },
    disableDeleteEmbeds() {
      return this.embeds.length <= 0;
    }
  }
};
</script>

<style scoped>
.embed-settings {
  border-radius: 5px;
  padding: 15px;
  background-color: #121225;
}
.header {
  padding-bottom: 10px;
}
.buttons {
  justify-content: left;
  grid-template-columns: auto auto;
  display: grid;
  grid-gap: 10px;
}
</style>