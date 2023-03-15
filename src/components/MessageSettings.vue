<template>
  <div class="message-settings">
    <h3 class="header">Message settings</h3>
    <div class="message-id">
      <p>Message ID or URL</p>
      <app-input type="text" class="input" placeholder="https://discord.com/channels/..." @focusout="extractMessageId" v-model="messageId"/>
    </div>
    <div class="content">
      <p>Content</p>
      <app-textarea class="textarea" placeholder="Some text" maxlength="2000" v-model="content"/>
      <error-message :show="emptyContentError">Content cannot be empty.</error-message>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

import AppTextarea from '@/components/AppTextarea';
import ErrorMessage from '@/components/ErrorMessage';
import AppInput from '@/components/AppInput';

export default {
  name: 'MessageSettings',
  components: {
    AppInput,
    ErrorMessage,
    AppTextarea
  },
  methods: {
    ...mapMutations([
      'setMessageId',
      'setContent',
      'extractMessageId'
    ])
  },
  computed: {
    ...mapState([
      'webhook',
      'message',
      'embeds',
      'validWebhookUrl'
    ]),
    emptyContentError() {
      return this.message.content.length === 0 && this.embeds.length === 0;
    },
    messageId: {
      get() {
        return this.message.id;
      },
      set(messageId) {
        this.setMessageId(messageId);
      }
    },
    content: {
      get() {
        return this.message.content;
      },
      set(content) {
        this.setContent(content);
      }
    }
  }
}
</script>

<style scoped>
.message-settings {
  border-radius: 5px;
  padding: 15px;
  background-color: #121225;
}
.header {
  padding-bottom: 10px;
}
.input {
  margin: 5px 0;
  box-sizing: border-box;
  width: 100%;
}
.textarea {
  box-sizing: border-box;
  margin: 5px 0;
  height: 100px;
  width: 100%;
}
</style>