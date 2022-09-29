import { createStore } from 'vuex';

export default createStore({
    state: {
        webhookSettings: {
            webhookUrl: '',
            username: ''
        },
        messageSettings: {
            content: ''
        }
    },
    mutations: {
        editWebhookSettings(state, webhookSettings) {
            state.webhookSettings = webhookSettings;
        }
    },
    actions: {
        editWebhookSettings({ commit }, webhookSettings) {
            commit('editWebhookSettings', webhookSettings);
        }
    }
})