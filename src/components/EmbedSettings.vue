<template>
  <app-accordion header="Embed settings" :show-default="true">
    <div class="embed-settings">
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