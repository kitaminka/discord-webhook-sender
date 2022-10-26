<template>
  <app-accordion :header="`Embed ${id}`" :show-default="true" variant="secondary">
    <div class="message-embed">
      <div class="message-embed__author">
        <p>Author</p>
        <app-input class="message-embed__input" v-model="description" placeholder="Unknown author"/>
      </div>
      <div class="message-embed__author-url">
        <p>Author URL</p>
        <app-input class="message-embed__input" v-model="description" placeholder="https://example.com/"/>
      </div>
      <div class="message-embed__author-icon-url">
        <p>Author Icon URL</p>
        <app-input class="message-embed__input" v-model="description" placeholder="https://example.com/icon.png"/>
      </div>
      <div class="message-embed__title">
        <p>Title</p>
        <app-input class="message-embed__input" v-model="title" placeholder="Some title"/>
        <error-message :show="emptyEmbedError">Embed cannot be empty.</error-message>
      </div>
      <div class="message-embed__description">
        <p>Description</p>
        <app-input class="message-embed__input" v-model="description" placeholder="Some description"/>
      </div>
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
  grid-column-gap: 10px;
}
.message-embed__input {
  box-sizing: border-box;
  margin: 5px 0;
  width: 100%;
}
.message-embed__author {
  grid-column-start: 1;
  grid-column-end: 3;
}
.message-embed__title {
  grid-column-start: 1;
  grid-column-end: 3;
}
.message-embed__description {
  grid-column-start: 1;
  grid-column-end: 3;
}

@media only screen and (max-width: 800px) {
  .message-embed {
    grid-template-columns: auto;
  }
  .message-embed__author, .message-embed__title, .message-embed__description {
    grid-column-start: 1;
    grid-column-end: 2;
  }
}
</style>