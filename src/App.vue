<template>
  <webhook-settings/>
  <message-settings/>
</template>

<script>
import WebhookSettings from '@/components/WebhookSettings';
import MessageSettings from '@/components/MessageSettings';

export default {
  name: 'App',
  components: {
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
  display: grid;
  grid-template-columns: 1fr 3fr 1fr;
  grid-template-rows: min-content min-content min-content;
  padding: 20px;
  grid-gap: 20px;
  box-sizing: border-box;
  width: 100%;
  min-height: 100%;
  font-family: 'Roboto', sans-serif;
  background-color: #030318ff;
  color: white;
}
</style>
