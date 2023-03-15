<template>
  <app-header/>
  <main class="main">
    <webhook-settings/>
    <message-settings/>
    <embed-settings/>
    <message-embed-list/>
  </main>
</template>

<script>
import { mapState, mapActions } from 'vuex';

import WebhookSettings from '@/components/WebhookSettings';
import MessageSettings from '@/components/MessageSettings';
import EmbedSettings from '@/components/EmbedSettings';
import MessageEmbedList from '@/components/MessageEmbedList.vue';
import AppHeader from '@/components/AppHeader.vue';

export default {
  name: 'App',
  components: {
    AppHeader,
    MessageEmbedList,
    EmbedSettings,
    MessageSettings,
    WebhookSettings
  },
  computed: {
    ...mapState([
      'message',
      'embeds'
    ])
  },
  methods: {
    ...mapActions([
      'saveMessageToLocalStorage',
      'loadMessageFromLocalStorage'
    ])
  },
  watch: {
    message: {
      handler() {
        this.saveMessageToLocalStorage();
      },
      deep: true
    },
    embeds: {
      handler() {
        this.saveMessageToLocalStorage();
      },
      deep: true
    }
  },
  beforeMount() {
    this.loadMessageFromLocalStorage();
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');

* {
  margin: 0;
  padding: 0;
}
html, body {
  font-family: 'Roboto', sans-serif;
  color: white;
  background-color: #030318;
  width: 100%;
  min-height: 100%;
}
.main {
  display: grid;
  grid-gap: 15px;
  padding: 0 20%;
  box-sizing: border-box;
}

.primary {
  --button-background-color: #399a58;
  --button-background-color-hover: #246738;
  --button-background-color-active: #1c4f28;
}
.secondary {
  --button-background-color: #138fb6;
  --button-background-color-hover: #107494;
  --button-background-color-active: #0c5772;
}
.danger {
  --button-background-color: #ec3232;
  --button-background-color-hover: #b92525;
  --button-background-color-active: #8f1919;
}

@media only screen and (max-width: 1000px) {
  .main {
    padding: 0 20px;
  }
}
</style>
