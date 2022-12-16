<template>
  <div class="embed-list">
    <message-embed class="message-embed" v-for="embed in embeds" :key="embed.id" :embed="embed" @updateEmbed="updateEmbed"/>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

import MessageEmbed from '@/components/MessageEmbed';

export default {
  name: 'EmbedList',
  components: {
    MessageEmbed
  },
  methods: {
    ...mapMutations([
      'updateEmbed'
    ])
  },
  computed: {
    ...mapState([
      'embeds'
    ]),
  }
};
</script>

<style scoped>
.embed-list {
  display: grid;
  box-sizing: border-box;
}
</style>