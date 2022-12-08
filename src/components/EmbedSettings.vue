<template>
  <div class="embed-settings">
    <h3 class="header">Embed settings</h3>
    <div class="buttons">
      <app-button @click="createEmbed" :disabled="disableCreateEmbed">Create embed</app-button>
      <app-button @click="deleteAllEmbeds" :disabled="disableDeleteEmbeds" variant="danger">Delete all embeds</app-button>
    </div>
    <div class="embeds">
      <message-embed
        class="embed"
        v-for="embed in embeds"
        :key="embed.id"
        :embed="embed"
        @updateEmbed="updateEmbed"
      />
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

import AppButton from '@/components/AppButton';
import MessageEmbed from '@/components/MessageEmbed';

export default {
  name: 'EmbedSettings',
  components: {
    MessageEmbed,
    AppButton
  },
  methods: {
    ...mapMutations([
      'createEmbed',
      'deleteAllEmbeds',
      'updateEmbed'
    ])
  },
  computed: {
    ...mapState([
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
.embeds {
  display: grid;
  box-sizing: border-box;
}
.embed {
  margin-top: 10px;
}
</style>