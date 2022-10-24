<template>
  <app-accordion header="Embed settings" :show-default="true">
    <div class="embed-settings">
      <div class="embed-settings__buttons">
        <app-button @click="createEmbed" :disabled="disableCreateEmbed">Create embed</app-button>
        <app-button @click="deleteAllEmbeds" :disabled="disableDeleteEmbeds" variant="danger">Delete all embeds</app-button>
      </div>
      <div class="embed-settings__embeds">
        <message-embed
          class="embed-settings__embed"
          v-for="embed in embeds"
          :key="embed.id"
          :id="embed.id"
        />
      </div>
    </div>
  </app-accordion>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

import AppAccordion from '@/components/AppAccordion';
import AppButton from '@/components/AppButton';
import MessageEmbed from '@/components/MessageEmbed';

export default {
  name: 'EmbedSettings',
  components: {
    MessageEmbed,
    AppButton,
    AppAccordion
  },
  methods: {
    ...mapMutations([
      'createEmbed',
      'deleteAllEmbeds'
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
.embed-settings__buttons {
  justify-content: left;
  grid-template-columns: auto auto;
  display: grid;
  grid-gap: 10px;
  margin: 5px 0;
}
.embed-settings__embeds {
  display: grid;
  grid-gap: 5px;
  box-sizing: border-box;
}
</style>