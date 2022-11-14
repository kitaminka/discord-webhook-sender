<template>
  <app-accordion header="Message settings" :show-default="true">
    <div class="message-settings">
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
  </app-accordion>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

import AppTextarea from '@/components/AppTextarea';
import ErrorMessage from '@/components/ErrorMessage';
import AppInput from '@/components/AppInput';
import AppAccordion from '@/components/AppAccordion';

export default {
  name: 'MessageSettings',
  components: {
    AppAccordion,
    AppInput,
    ErrorMessage,
    AppTextarea
  },
  methods: {
    ...mapMutations([
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
      return this.message.content.length === 0 && this.validWebhookUrl && this.webhook.url.length !== 0 && this.embeds.length === 0;
    },
    messageId: {
      get() {
        return this.$store.state.message.id;
      },
      set(messageId) {
        this.$store.commit('setMessageId', messageId)
      }
    },
    content: {
      get() {
        return this.$store.state.message.content;
      },
      set(content) {
        this.$store.commit('setContent', content);
      }
    }
  }
}
</script>

<style scoped>
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