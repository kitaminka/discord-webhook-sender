<template>
  <div class="message-settings">
    <h3 class="message-settings__header">Message settings</h3>
    <p>Content</p>
    <app-textarea class="message-settings__textarea" placeholder="Some text" maxlength="2000" v-model="content"/>
    <error-message :show="content.length === 0">Message cannot be empty.</error-message>
  </div>
</template>

<script>
import AppTextarea from '@/components/AppTextarea';
import ErrorMessage from '@/components/ErrorMessage';

export default {
  name: 'MessageSettings',
  components: {
    ErrorMessage,
    AppTextarea
  },
  computed: {
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
</style>