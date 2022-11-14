<template>
  <header class="app-header">
    <h2>Discord Webhook Sender</h2>
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
.app-header {
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

.primary {
  --button-background-color: #399a58;
  --button-background-color-hover: #246738;
  --button-background-color-active: #1c4f28;

  --accordion-background-color: #121225;
}
.secondary {
  --button-background-color: #138fb6;
  --button-background-color-hover: #107494;
  --button-background-color-active: #0c5772;

  --accordion-background-color: #030318;
}
.danger {
  --button-background-color: #ec3232;
  --button-background-color-hover: #b92525;
  --button-background-color-active: #8f1919;
}

@media only screen and (max-width: 800px) {
  .main {
    padding: 0 20px;
  }
}
</style>
