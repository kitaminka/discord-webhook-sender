import { createStore } from 'vuex';

export default createStore({
    state: {
        validWebhook: false,
        webhookSettings: {
            webhookUrl: '',
            username: ''
        },
        messageSettings: {
            content: ''
        }
    },
    mutations: {
        editMessageSettings(state, messageSettings) {
            state.messageSettings = messageSettings;
        },
        setWebhookUrl(state, webhookUrl) {
            state.webhookSettings.webhookUrl = webhookUrl;
        },
        setWebhookValid(state, isValid) {
            state.validWebhook = isValid;
        }
    },
    actions: {
        editMessageSettings({ commit }, messageSettings) {
            commit('editMessageSettings', messageSettings);
        },
        async updateWebhookUrl({ commit }, webhookUrl) {
            if (webhookUrl.match(/https:\/\/discord.com\/api\/webhooks\/[0-9]+\/.+/)) {
                commit('setWebhookValid', (await fetch(this.webhookUrl)).ok);
            } else {
                commit('setWebhookValid', false);
            }
            commit('setWebhookUrl', webhookUrl);
        }
    }
})