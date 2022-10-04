<template>
  <div class="message-settings">
    <h3 class="message-settings__header">Message settings</h3>
    <p>Message ID or URL</p>
    <app-input class="message-settings__input" placeholder="https://discord.com/channels/..." @focusout="extractMessageId" v-model="messageId"/>
    <p>Content</p>
    <app-textarea class="message-settings__textarea" placeholder="Some text" maxlength="2000" v-model="content"/>
    <error-message :show="content.length === 0">Message cannot be empty.</error-message>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';

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
      'extractMessageId'
    ])
  },
  computed: {
    messageId: {
      get() {
        return this.$store.state.messageSettings.messageId;
      },
      set(messageId) {
        this.$store.commit('setMessageId', messageId)
      }
    },
    content: {
      get() {
        return this.$store.state.messageSettings.content;
      },
      set(content) {
        this.$store.commit('setContent', content);
      }
    }
  }
}
</script>

<style scoped>
.message-settings {
  grid-column-start: 2;
  padding: 30px;
  border-radius: 5px;
  background-color: #121225;
}
.message-settings__header {
  margin-bottom: 15px;
}
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