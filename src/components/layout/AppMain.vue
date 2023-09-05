<template>
  <main class="main">
    <webhook-settings/>
    <message-settings/>
    <embed-settings/>
    <message-embed-list/>
  </main>
</template>

<script>
import WebhookSettings from '@/components/layout/WebhookSettings.vue';
import MessageEmbedList from '@/components/layout/MessageEmbedList.vue';
import MessageSettings from '@/components/layout/MessageSettings.vue';
import EmbedSettings from '@/components/EmbedSettings.vue';

export default {
  name: 'AppMain',
  components: {
    EmbedSettings,
    MessageSettings,
    MessageEmbedList,
    WebhookSettings
  }
}
</script>

<style scoped>
.main {
  display: grid;
  grid-gap: 15px;
  padding: 0 20%;
  box-sizing: border-box;
}

@media only screen and (max-width: 1000px) {
  .main {
    padding: 0 20px;
  }
}
</style>