<template>
  <div class="embed-list">
    <div class="embed"
         v-for="embed in embeds"
         :key="embed.id"
    >
    </div>
    <div class="header" @click="toggleShow">
      <div class="icon" :class="{active: show}">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M12 10L8 6L4 10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
        </svg>
      </div>
      <h3></h3>
    </div>
    <message-embed
      :embed="embed"
      @updateEmbed="updateEmbed"
    />
    <div v-show="show" class="content">
      <slot/>
    </div>
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