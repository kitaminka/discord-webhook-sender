<template>
  <header class="header">
    <h2>discord-webhook-sender</h2>
  </header>
  <main class="main">
    <webhook-settings/>
    <message-settings/>
    <embed-settings/>
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
  font-family: 'Roboto', sans-serif;
  color: white;
  background-color: #030318;
  width: 100%;
  min-height: 100%;
}
.header {
  display: grid;
  justify-content: center;
  align-items: center;
  padding: 20px;
}
.main {
  display: grid;
  grid-gap: 20px;
  padding: 0 20%;
  box-sizing: border-box;
}

@media only screen and (max-width: 800px) {
  .main {
    padding: 0 20px;
  }
}
</style>
