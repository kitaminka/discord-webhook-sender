<template>
  <div class="embed-list">
    <message-embed
      class="embed"
      v-for="embed in embeds"
      :key="embed.id"
      :embed="embed"
      @updateEmbed="updateEmbed"
    />
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
.embed {
  margin-bottom: 15px;
}
</style>