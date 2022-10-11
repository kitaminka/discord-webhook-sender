<template>
  <app-accordion class="webhook-settings" header="Webhook settings" show-default="true">
    <div class="webhook-settings__webhook-url">
      <p>Webhook URL*</p>
      <app-input type="text" class="webhook-settings__input" placeholder="https://discord.com/api/webhooks/..." v-model="webhookUrl"/>
      <error-message :show="webhookUrlError">Invalid Webhook URL</error-message>
    </div>
    <div class="webhook-settings__username">
      <p>Username</p>
      <app-input type="text" maxlength="80" class="webhook-settings__input" placeholder="Captain Hook" v-model="username"/>
    </div>
    <div class="webhook-settings__avatar-url">
      <p>Avatar URL</p>
      <app-input type="text" class="webhook-settings__input" placeholder="https://example.com/avatar.png" v-model="avatarUrl"/>
    </div>
    <div class="webhook-settings__buttons">
      <app-button :disabled="disableSendButton" class="webhook-settings__button" @click="sendMessage">{{sendButtonText}}</app-button>
      <app-button :disabled="disableEditButton" class="webhook-settings__button" @click="editMessage">{{editButtonText}}</app-button>
      <app-button :disabled="disableLoadButton" class="webhook-settings__button" @click="loadMessage">{{loadButtonText}}</app-button>
    </div>
  </app-accordion>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex';

import AppButton from '@/components/AppButton';
import AppInput from '@/components/AppInput';
import ErrorMessage from '@/components/ErrorMessage';
import AppAccordion from '@/components/AppAccordion';

export default {
  name: 'WebhookSettings',
  components: {
    AppAccordion,
    ErrorMessage,
    AppButton,
    AppInput
  },
  methods: {
    ...mapActions([
      'sendMessage',
      'editMessage',
      'loadMessage'
    ])
  },
  computed: {
    ...mapState([
      'sendButtonText',
      'editButtonText',
      'loadButtonText'
    ]),
    ...mapGetters([
      'disableSendButton',
      'disableEditButton',
      'disableLoadButton',
      'webhookUrlError'
    ]),
    webhookUrl: {
      get() {
        return this.$store.state.webhook.url;
      },
      set(webhookUrl) {
        this.$store.dispatch('updateWebhookUrl', webhookUrl)
      }
    },
    username: {
      get() {
        return this.$store.state.webhook.username;
      },
      set(username) {
        this.$store.commit('setUsername', username);
      }
    },
    avatarUrl: {
      get() {
        return this.$store.state.webhook.avatarUrl;
      },
      set(avatarUrl) {
        this.$store.commit('setAvatarUrl', avatarUrl);
      }
    }
  }
}
</script>

<style scoped>
.webhook-settings {
  grid-column-start: 2;
}
.webhook-settings__input {
  margin: 5px 0;
  box-sizing: border-box;
  width: 100%;
}
.webhook-settings__buttons {
  margin-top: 10px;
  box-sizing: border-box;
}
.webhook-settings__button {
  margin-right: 10px;
}
</style>