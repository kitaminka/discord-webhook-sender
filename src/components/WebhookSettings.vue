<template>
  <div class="form">
    <p>Webhook URL</p>
    <app-input class="form__input" placeholder="https://discord.com/api/webhooks/xxx/xxx..." v-model="webhookUrl"/>
    <p>Content</p>
    <app-input class="form__input" placeholder="Some text" v-model="content"/>
  </div>
</template>

<script>
import AppInput from '@/components/AppInput';

export default {
  name: "MainForm",
  data() {
    return {
      webhookUrl: '',
      content: '',
    }
  },
  components: {
    AppInput
  }
}
</script>

<style scoped>
.form {
  padding: 30px;
  width: 50%;
  height: 300px;
  background-color: #121225;
}
.form__input {
  margin: 5px 0;
  width: 300px;
}
</style>