<template>
  <div class="webhook-settings">
    <h3 class="webhook-settings__header">Webhook settings</h3>
    <p>Webhook URL*</p>
    <app-input class="webhook-settings__input" @input="updateWebhookUrl" placeholder="https://discord.com/api/webhooks/xxx/xxx..." v-model="webhookUrlValue"/>
    <p>Username</p>
    <app-input class="webhook-settings__input" @input="updateUsername" placeholder="Captain Hook" v-model="usernameValue"/>
  </div>
</template>

<script>
import AppInput from '@/components/AppInput';

export default {
  name: 'WebhookSettings',
  components: {
    AppInput
  },
  data() {
    return {
      webhookUrlValue: '',
      usernameValue: ''
    }
  },
  props: [
    'webhookUrl',
    'username'
  ],
  methods: {
    updateWebhookUrl() {
      this.$emit('update:webhookUrl', this.webhookUrlValue)
    },
    updateUsername() {
      this.$emit('update:username', this.usernameValue)
    }
  }
}
</script>

<style scoped>
.webhook-settings {
  grid-column-start: 2;
  grid-row-start: 2;
  padding: 30px;
  border-radius: 5px;
  background-color: #121225;
}
.webhook-settings__header {
  margin-bottom: 15px;
}
.webhook-settings__input {
  margin: 5px 0;
  box-sizing: border-box;
  width: 100%;
}
</style>