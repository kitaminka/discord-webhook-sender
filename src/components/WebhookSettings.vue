<template>
  <div class="webhook-settings">
    <h3 class="webhook-settings__header">Webhook settings</h3>
    <p>Webhook URL*</p>
    <app-input class="webhook-settings__input" placeholder="https://discord.com/api/webhooks/xxx/xxx..." v-model="webhookUrl"/>
    <error-message :show="showWebhookError">Invalid Webhook URL</error-message>
    <p>Username</p>
    <app-input class="webhook-settings__input" placeholder="Captain Hook" v-model="username"/>
    <app-button :disabled="disableSendButton" @click="sendMessage" class="webhook-settings__send-button">{{sendButtonText}}</app-button>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex';

import AppButton from '@/components/AppButton';
import AppInput from '@/components/AppInput';
import ErrorMessage from '@/components/ErrorMessage';

export default {
  name: 'WebhookSettings',
  components: {
    ErrorMessage,
    AppButton,
    AppInput
  },
  methods: {
    ...mapActions([
      'sendMessage'
    ])
  },
  computed: {
    ...mapState([
      'sendButtonText'
    ]),
    ...mapGetters([
      'disableSendButton',
      'showWebhookError'
    ]),
    webhookUrl: {
      get() {
        return this.$store.state.webhookSettings.webhookUrl;
      },
      set(webhookUrl) {
        this.$store.dispatch('updateWebhookUrl', webhookUrl)
      }
    },
    username: {
      get() {
        return this.$store.state.webhookSettings.username;
      },
      set(username) {
        this.$store.commit('setUsername', username);
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
.webhook-settings__send-button {
  margin-top: 10px;
  margin-bottom: 5px;
  box-sizing: border-box;
}
</style>