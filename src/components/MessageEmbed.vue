<template>
  <app-accordion :header="`Embed ${id}`" :show-default="true">
    <div class="message-embed__title">
      <p>Embed title</p>
      <app-input class="message-embed__input" v-model="title" placeholder="Some title"/>
    </div>
    <div class="message-embed__description">
      <p>Embed description</p>
      <app-input class="message-embed__input" v-model="description" placeholder="Some description"/>
    </div>
    <error-message :show="emptyEmbedError">Embed cannot be empty.</error-message>
  </app-accordion>
</template>

<script>
import {mapState, mapMutations, mapGetters} from 'vuex';

import AppInput from '@/components/AppInput';
import ErrorMessage from '@/components/ErrorMessage';
import AppAccordion from '@/components/AppAccordion';

export default {
  name: 'MessageEmbed',
  components: {
    AppAccordion,
    ErrorMessage,
    AppInput
  },
  data() {
    return {
      title: '',
      description: ''
    }
  },
  props: [
    'id'
  ],
  watch: {
    title() {
      this.setEmbedTitle({
        id: this.id,
        title: this.title
      });
    },
    description() {
      this.setEmbedDescription({
        id: this.id,
        description: this.description
      });
    }
  },
  methods: {
    ...mapMutations([
      'setEmbedTitle',
      'setEmbedDescription'
    ])
  },
  computed: {
    ...mapState([
      'validWebhookUrl'
    ]),
    ...mapGetters([
      'embedById'
    ]),
    emptyEmbedError() {
      const embed = this.embedById(this.id);
      return (embed.title.length === 0 && embed.description.length === 0) && this.validWebhookUrl;
    }
  }
};
</script>

<style scoped>
.message-embed__title {
  margin: 5px 0;
}
.message-embed__input {
  margin: 5px 0;
}
</style>