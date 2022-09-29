<template>
  <div class="webhook-settings">
    <h3 class="webhook-settings__header">Webhook settings</h3>
    <p>Webhook URL*</p>
    <app-input class="webhook-settings__input" placeholder="https://discord.com/api/webhooks/xxx/xxx..." v-model="webhookUrl"/>
    <p>Username</p>
    <app-input class="webhook-settings__input" placeholder="Captain Hook" v-model="username"/>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import AppInput from '@/components/AppInput';

export default {
  name: 'WebhookSettings',
  components: {
    AppInput
  },
  data() {
    return {
      webhookUrl: '',
      username: ''
    }
  },
  methods: {
    ...mapActions([
      'editWebhookSettings'
    ]),
    updateWebhookSettings() {
      this.editWebhookSettings({
        webhookUrl: this.webhookUrl,
        username: this.username
      });
    }
  },
  watch: {
    webhookUrl() {
      this.updateWebhookSettings();
    },
    username() {
      this.updateWebhookSettings();
    }
  }
}
</script>

<style scoped>
.webhook-settings {
  grid-column-start: 2;
  grid-row-start: 2;
  padding: 30px;
  border-radius: 5px;
  background-color: #121225;
}
.webhook-settings__header {
  margin-bottom: 15px;
}
.webhook-settings__input {
  margin: 5px 0;
  box-sizing: border-box;
  width: 100%;
}
</style>