import { createStore } from 'vuex';

export default createStore({
    state: {
        validWebhookUrl: false,
        validMessageId: false,
        sendButtonText: 'Send',
        webhookSettings: {
            webhookUrl: '',
            username: ''
        },
        messageSettings: {
            messageId: '',
            content: ''
        }
    },
    getters: {
        disableSendButton(state) {
            return !state.validWebhookUrl || state.messageSettings.content.length === 0;
        },
        showWebhookError(state) {
            return !state.validWebhookUrl && state.webhookSettings.webhookUrl.length !== 0;
        }
    },
    mutations: {
        setMessageId(state, messageId) {
            state.messageSettings.messageId = messageId;
        },
        setContent(state, content) {
            state.messageSettings.content = content;
        },
        setWebhookUrl(state, webhookUrl) {
            state.webhookSettings.webhookUrl = webhookUrl;
        },
        setValidWebhookUrl(state, valid) {
            state.validWebhookUrl = valid;
        },
        setValidMessageId(state, valid) {
            state.validMessageId = valid;
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
                commit('setValidWebhookUrl', (await fetch(webhookUrl)).ok);
            } else {
                commit('setValidWebhookUrl', false);
            }
            commit('setWebhookUrl', webhookUrl);
        },
        async updateMessageId({ state, commit }, messageData) {
            if (!state.validWebhookUrl) return;

            let messageId = messageData;
            const matchMessageUrl = messageData.match(/https:\/\/discord.com\/channels\/[0-9]+\/[0-9]+\/([0-9]+)/);

            if (matchMessageUrl) {
                messageId = matchMessageUrl[1];
            }

            if (messageId.match(/([0-9]+)/)) {
                const response = await fetch(`${state.webhookSettings.webhookUrl}/messages/${messageId}`);
                commit('setValidMessageId', response.ok);
            } else {
                commit('setValidMessageId', false);
            }
            commit('setMessageId', messageId);
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