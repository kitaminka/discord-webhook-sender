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
        },
        editMessageSettings(state, messageSettings) {
            state.messageSettings = messageSettings;
        }
    },
    actions: {
        editWebhookSettings({ commit }, webhookSettings) {
            commit('editWebhookSettings', webhookSettings);
        },
        editMessageSettings({ commit }, messageSettings) {
            commit('editMessageSettings', messageSettings);
        }
    }
})