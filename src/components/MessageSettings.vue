<template>
  <app-accordion header="Message settings" show-default="true">
    <div class="message-settings">
      <div class="message-settings__message-id">
        <p>Message ID or URL</p>
        <app-input type="text" class="message-settings__input" placeholder="https://discord.com/channels/..." @focusout="extractMessageId" v-model="messageId"/>
      </div>
      <div class="message-settings__content">
        <p>Content</p>
        <app-textarea class="message-settings__textarea" placeholder="Some text" maxlength="2000" v-model="content"/>
        <error-message :show="content.length === 0">Message cannot be empty.</error-message>
      </div>
    </div>
  </app-accordion>
</template>

<script>
import { mapMutations } from 'vuex';

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
.message-settings__input {
  margin: 5px 0;
  box-sizing: border-box;
  width: 100%;
}
.message-settings__textarea {
  box-sizing: border-box;
  margin: 5px 0;
  width: 100%;
  height: 100px;
}
</style>