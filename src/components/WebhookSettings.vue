<template>
  <div class="webhook-settings">
    <h3 class="header">Webhook settings</h3>
    <div class="webhook-url">
      <p>Webhook URL</p>
      <app-input type="text" class="input" placeholder="https://discord.com/api/webhooks/..." v-model="webhookUrl"/>
      <error-message :show="webhookUrlError" class="error-message">Invalid Webhook URL</error-message>
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
      <app-button class="button" :disabled="disableSendButton" @click="sendMessageButton">{{sendButtonText}}</app-button>
      <app-button class="button" :disabled="disableEditButton" @click="editMessageButton">{{editButtonText}}</app-button>
      <app-button class="button" :disabled="disableLoadButton" @click="loadMessageButton" variant="secondary">{{loadButtonText}}</app-button>
    </div>
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
  data() {
    return {
      sendButtonText: 'Send',
      editButtonText: 'Edit',
      loadButtonText: 'Load'
    }
  },
  methods: {
    ...mapActions([
      'sendMessage',
      'editMessage',
      'getMessage'
    ]),
    async sendMessageButton() {
      if (!this.validUrls) {
        this.sendButtonText = 'Some of URLs are invalid!';
      } else {
        this.sendButtonText = 'Sending...';
        const response = await this.sendMessage();
        if (response.ok) {
          this.sendButtonText = 'Sent!';
        } else {
          this.sendButtonText = 'Failed!';
        }
      }
      setTimeout(() => {
        this.sendButtonText = 'Send';
      }, 2000);
    },
    async editMessageButton() {
      if (!this.validUrls) {
        this.sendButtonText = 'Some of URLs are invalid!';
      } else {
        this.editButtonText = 'Editing...';
        const response = await this.editMessage();
        if (response.ok) {
          this.editButtonText = 'Edited!';
        } else {
          this.editButtonText = 'Failed!';
        }
      }
      setTimeout(() => {
        this.editButtonText = 'Edit';
      }, 2000);
    },
    async loadMessageButton() {
      this.loadButtonText = 'Loading...';
      const response = await this.getMessage();
      if (response.ok) {
        this.loadButtonText = 'Loaded!';
      } else {
        this.loadButtonText = 'Failed!';
      }
      setTimeout(() => {
        this.loadButtonText = 'Load';
      }, 2000);
    }
  },
  computed: {
    ...mapState([
      'embeds',
      'webhook',
      'message',
      'validWebhookUrl'
    ]),
    ...mapGetters([
      'emptyEmbed',
      'validUrls'
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
        return this.webhook.url;
      },
      set(webhookUrl) {
        this.$store.dispatch('updateWebhookUrl', webhookUrl)
      }
    },
    username: {
      get() {
        return this.webhook.username;
      },
      set(username) {
        this.$store.commit('setUsername', username);
      }
    },
    avatarUrl: {
      get() {
        return this.webhook.avatarUrl;
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
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 10px;
  border-radius: 5px;
  padding: 15px;
  background-color: #121225;
}
.header {
  padding-bottom: 10px;
}
.webhook-url {
  grid-column-start: 1;
  grid-column-end: 3;
}
.input {
  margin: 5px 0;
  box-sizing: border-box;
  width: 100%;
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