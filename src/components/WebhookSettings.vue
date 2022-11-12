<template>
  <app-accordion header="Webhook settings" :show-default="true">
    <div class="webhook-settings">
      <div class="webhook-url">
        <p>Webhook URL*</p>
        <app-input type="text" class="input" placeholder="https://discord.com/api/webhooks/..." v-model="webhookUrl"/>
        <error-message :show="webhookUrlError">Invalid Webhook URL</error-message>
      </div>
      <div class="username">
        <p>Username</p>
        <app-input type="text" maxlength="80" class="input" placeholder="Captain Hook" v-model="username"/>
      </div>
      <div class="avatar-url">
        <p>Avatar URL</p>
        <app-input type="text" class="input" placeholder="https://example.com/avatar.png" v-model="avatarUrl"/>
      </div>
      <div class="buttons">
        <app-button :disabled="disableSendButton" class="button" @click="sendMessage">{{sendButtonText}}</app-button>
        <app-button :disabled="disableEditButton" class="button" @click="editMessage">{{editButtonText}}</app-button>
        <app-button :disabled="disableLoadButton" class="button" @click="loadMessage" variant="secondary">{{loadButtonText}}</app-button>
      </div>
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
      'webhook',
      'message',
      'embeds',
      'validWebhookUrl',
      'sendButtonText',
      'editButtonText',
      'loadButtonText'
    ]),
    ...mapGetters([
      'emptyEmbed'
    ]),
    webhookUrlError() {
      return !this.validWebhookUrl && this.webhook.url.length !== 0;
    },
    disableSendButton() {
      for (const embed of this.embeds) {
        if (this.emptyEmbed(embed.id)) {
          return true;
        }
      }
      return !this.validWebhookUrl || (this.message.content.length === 0 && this.embeds.length === 0);
    },
    disableEditButton() {
      return this.disableSendButton || this.message.id.length === 0;
    },
    disableLoadButton() {
      return !this.validWebhookUrl || this.message.id.length === 0;
    },
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
@import "@/styles/components.css";

.webhook-settings {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 10px;
}
.webhook-url {
  grid-column-start: 1;
  grid-column-end: 3;
}
.buttons {
  margin-top: 5px;
  box-sizing: border-box;
}
.button {
  margin-right: 10px;
}

@media only screen and (max-width: 800px) {
  .webhook-settings {
    grid-template-columns: auto;
  }
  .webhook-url {
    grid-column-end: 2;
  }
}
</style>