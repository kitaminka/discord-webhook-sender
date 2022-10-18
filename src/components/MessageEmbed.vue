<template>
  <div class="embed-message">
    <div class="embed-message__title">
      <p>Embed title</p>
      <app-input v-model="title"/>
    </div>
    <div class="embed-message__description">
      <p>Embed description</p>
      <app-input v-model="description"/>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';

import AppInput from '@/components/AppInput';

export default {
  name: 'MessageEmbed',
  components: {
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
      'embeds'
    ])
  },
  created() {
    const embed = this.embeds.find((embed) => embed.id === this.id);
    this.title = embed.title;
    this.description = embed.description;
  }
};
</script>

<style scoped>

</style>