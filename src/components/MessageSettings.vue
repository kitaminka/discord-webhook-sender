<template>
  <div class="message-settings">
    <h3 class="message-settings__header">Message settings</h3>
    <p>Content</p>
    <app-textarea @input="updateContent"  class="message-settings__textarea" placeholder="Some text" maxlength="2000" v-model="content"/>
    <app-button @click="sendMessage" class="message-settings__send-button">Send</app-button>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import AppTextarea from '@/components/AppTextarea';
import AppButton from '@/components/AppButton';

export default {
  name: 'MessageSettings',
  components: {
    AppButton,
    AppTextarea
  },
  data() {
    return {
      content:'',
    }
  },
  methods: {
    ...mapActions([
      'editMessageSettings'
    ]),
    updateContent() {
      this.editMessageSettings({
        content: this.content
      });
    },
    sendMessage() {
      fetch(this.webhookSettings.webhookUrl, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: this.webhookSettings.username,
          content: this.messageSettings.content
        })
      })
    }
  },
  computed: {
    ...mapState([
      'webhookSettings',
      'messageSettings'
    ])
  }
}
</script>

<style scoped>
.message-settings {
  grid-column-start: 2;
  grid-row-start: 3;
  padding: 30px;
  border-radius: 5px;
  background-color: #121225;
}
.message-settings__header {
  margin-bottom: 15px;
}
.message-settings__textarea {
  box-sizing: border-box;
  margin: 5px 0;
  width: 100%;
  height: 100px;
}
.message-settings__send-button {
  margin-top: 10px;
}
</style>