import { createStore } from 'vuex';

export default createStore({
    state: {
        validWebhook: false,
        sendButtonText: 'Send',
        webhookSettings: {
            webhookUrl: '',
            username: ''
        },
        messageSettings: {
            content: ''
        }
    },
    getters: {
        disableSendButton(state) {
            return !state.validWebhook || state.messageSettings.content.length === 0;
        },
        showWebhookError(state) {
            return !state.validWebhook && state.webhookSettings.webhookUrl.length !== 0;
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
        },
        setSendButtonText(state, sendButtonText) {
            state.sendButtonText = sendButtonText;
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
        async sendMessage({ state, commit }) {
            const response  = await fetch(state.webhookSettings.webhookUrl + '?wait=true', {
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
            if (response.ok) {
                commit('setSendButtonText', 'Message sent!');
            } else {
                commit('setSendButtonText', 'Failed to send message!');
            }
            setTimeout(() => {
                commit('setSendButtonText', 'Send');
            }, 1000);
        }
    }
})