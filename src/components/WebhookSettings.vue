<template>
  <div class="webhook-settings">
    <h3 class="webhook-settings__header">Webhook settings</h3>
    <p>Webhook URL*</p>
    <app-input class="webhook-settings__input" placeholder="https://discord.com/api/webhooks/xxx/xxx..." v-model="webhookUrl"/>
    <transition>
      <p class="webhook-settings__invalid-webhook-message" v-if="!validWebhook && webhookUrl !== ''">Invalid Webhook URL</p>
    </transition>
    <p>Username</p>
    <app-input class="webhook-settings__input" placeholder="Captain Hook" v-model="username"/>
    <app-button :disabled="!validWebhook" @click="sendMessage" class="webhook-settings__send-button">Send</app-button>
  </div>
</template>

<script>
import { mapState } from 'vuex';

import AppButton from '@/components/AppButton';
import AppInput from '@/components/AppInput';

export default {
  name: 'WebhookSettings',
  components: {
    AppButton,
    AppInput
  },
  methods: {
    async sendMessage() {
      await fetch(this.webhookUrl + '?wait=true', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: this.username,
          content: this.messageSettings.content
        })
      });
    }
  },
  computed: {
    ...mapState([
      'messageSettings',
      'validWebhook'
    ]),
    webhookUrl: {
      get() {
        return this.$store.messageSettings.webhookUrl;
      },
      set(value) {
        this.$store.dispatch('updateWebhookUrl', value)
      }
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
.webhook-settings__invalid-webhook-message {
  color: #fc6661;
  font-size: 14px;
  margin: 5px 0;
  max-height: 17px;
}
.webhook-settings__send-button {
  margin-top: 10px;
  box-sizing: border-box;
}

.v-enter-active {
  transition: opacity 0.4s ease, max-height 0.2s ease, margin 0.2s ease;
}
.v-leave-active {
  transition: opacity 0.2s ease, max-height 0.4s ease, margin 0.4s ease;
}
.v-enter-from,
.v-leave-to {
  max-height: 0;
  opacity: 0;
  margin: 0;
}
</style>