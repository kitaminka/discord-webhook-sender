<template>
  <div class="message-embed">
    <h3>Embed {{id}}</h3>
    <div class="message-embed__title">
      <p>Embed title</p>
      <app-input class="message-embed__input" v-model="title" placeholder="Some title"/>
    </div>
    <div class="message-embed__description">
      <p>Embed description</p>
      <app-input class="message-embed__input" v-model="description" placeholder="Some description"/>
    </div>
    <error-message :show="emptyEmbedError(id)">Embed cannot be empty.</error-message>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex';

import AppInput from '@/components/AppInput';
import ErrorMessage from '@/components/ErrorMessage';

export default {
  name: 'MessageEmbed',
  components: {
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
    ...mapGetters([
      'embedById',
      'emptyEmbedError'
    ])
  },
  created() {
    const embed = this.embedById(this.id);
    this.title = embed.title;
    this.description = embed.description;
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