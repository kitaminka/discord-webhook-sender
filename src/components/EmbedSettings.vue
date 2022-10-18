<template>
  <app-accordion header="Embed settings" :show-default="true">
    <div class="embed-settings">
      <div class="embed-settings__buttons">
        <app-button @click="createEmbed">Create embed</app-button>
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
      'createEmbed'
    ])
  },
  computed: {
    ...mapState([
      'embeds'
    ])
  }
};
</script>

<style scoped>

</style>