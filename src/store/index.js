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
        setContent(state, content) {
            state.messageSettings.content = content;
        },
        setWebhookUrl(state, webhookUrl) {
            state.webhookSettings.webhookUrl = webhookUrl;
        },
        setWebhookValid(state, isValid) {
            state.validWebhook = isValid;
        },
        setUsername(state, username) {
            state.webhookSettings.username = username;
        }
    },
    actions: {
        async updateWebhookUrl({ commit }, webhookUrl) {
            if (webhookUrl.match(/https:\/\/discord.com\/api\/webhooks\/[0-9]+\/.+/)) {
                commit('setWebhookValid', (await fetch(webhookUrl)).ok);
            } else {
                commit('setWebhookValid', false);
            }
            commit('setWebhookUrl', webhookUrl);
        },
        async sendMessage({ state }) {
            await fetch(state.webhookSettings.webhookUrl + '?wait=true', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: state.webhookSettings.username,
                    content: state.messageSettings.content
                })
            });
        }
    }
})