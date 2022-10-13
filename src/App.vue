<template>
  <header class="header">
    <h2>discord-webhook-sender</h2>
  </header>
  <main class="main">
    <webhook-settings class="webhook-settings"/>
    <message-settings class="message-settings"/>
    <embed-settings class="embed-settings"/>
  </main>
</template>

<script>
import WebhookSettings from '@/components/WebhookSettings';
import MessageSettings from '@/components/MessageSettings';
import EmbedSettings from '@/components/EmbedSettings';

export default {
  name: 'App',
  components: {
    EmbedSettings,
    MessageSettings,
    WebhookSettings
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
  width: 100%;
  height: 100%;
}
#app {
  font-family: 'Roboto', sans-serif;
  color: white;
  background-color: #030318ff;
  /*background-color: #16163f;*/
  display: grid;
  width: 100%;
  min-height: 100%;
}
.header {
  justify-self: center;
  align-self: center;
}
.main {
  display: grid;
  grid-template-columns: 1fr 3fr 1fr;
  grid-template-rows: min-content min-content min-content;
  padding: 20px;
  grid-gap: 20px;
  box-sizing: border-box;
  width: 100%;
  min-height: 100%;
}
.webhook-settings, .message-settings, .embed-settings {
  grid-column-start: 2;
}

@media only screen and (max-width: 800px) {
  #app {
    grid-template-columns: 1fr;
  }
  .webhook-settings, .message-settings, .embed-settings {
    grid-column-start: 1;
  }
}
</style>
