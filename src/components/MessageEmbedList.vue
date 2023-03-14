<template>
  <div class="embed-list">
    <transition-group>
      <message-embed class="message-embed" v-for="embed in embeds" :key="embed.id" :embed="embed"/>
    </transition-group>
  </div>
</template>

<script>
import { mapState } from 'vuex';

import MessageEmbed from '@/components/MessageEmbed.vue';

export default {
  name: 'EmbedList',
  components: {
    MessageEmbed
  },
  computed: {
    ...mapState([
      'embeds'
    ])
  }
};
</script>

<style scoped>
.embed-list {
  display: grid;
  box-sizing: border-box;
}

.v-move, .v-enter-active, .v-leave-active {
  transition: all .5s ease-in-out;
}
.v-enter-from, .v-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>