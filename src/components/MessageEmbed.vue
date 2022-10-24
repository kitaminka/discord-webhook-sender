<template>
  <app-accordion :header="`Embed ${id}`" :show-default="true" variant="secondary">
    <div class="message-embed">
      <div class="message-embed__title">
        <p>Embed title</p>
        <app-input class="message-embed__input" v-model="title" placeholder="Some title"/>
      </div>
      <div class="message-embed__description">
        <p>Embed description</p>
        <app-input class="message-embed__input" v-model="description" placeholder="Some description"/>
      </div>
      <error-message :show="emptyEmbedError">Embed cannot be empty.</error-message>
    </div>
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
.message-embed {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 10px;
}
.message-embed__title {
  margin: 5px 0;
}
.message-embed__description {
  margin: 5px 0;
}
.message-embed__input {
  box-sizing: border-box;
  margin: 5px 0;
  width: 100%;
}
</style>