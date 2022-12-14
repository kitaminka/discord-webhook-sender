<template>
  <div class="embed-list">
    <div class="embed" v-for="embed in embeds" :key="embed.id">
      <div class="header" @click="toggleEmbedShow(embed.id)">
        <div class="icon" :class="{active: embed.show}">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M12 10L8 6L4 10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
          </svg>
        </div>
        <h3>{{embed.title || `Embed ${embed.id}`}}</h3>
      </div>
      <message-embed
        class="message-embed"
        :embed="embed"
        @updateEmbed="updateEmbed"
      />
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
      'updateEmbed',
      'toggleEmbedShow'
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
  border-radius: 5px;
  padding: 15px;
  background-color: #121225;
  overflow: hidden;
}
.header {
  display: grid;
  grid-template-columns: auto auto;
  justify-content: left;
  align-items: center;
  grid-gap: 10px;
  cursor: pointer;
  user-select: none;
}
.icon {
  display: grid;
  justify-content: center;
  align-items: center;
  transition: transform .5s ease-in-out;
}
.active {
  transform: rotate(180deg);
}
</style>