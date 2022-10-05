import { createStore } from 'vuex';

export default createStore({
    state: {
        validWebhookUrl: false,
        sendButtonText: 'Send',
        editButtonText: 'Edit',
        webhookSettings: {
            webhookUrl: '',
            username: '',
            avatarUrl: ''
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
        disableEditButton(state) {
            return !state.validWebhookUrl || state.messageSettings.content.length === 0 || state.messageSettings.messageId.length === 0;
        },
        webhookUrlError(state) {
            return !state.validWebhookUrl && state.webhookSettings.webhookUrl.length !== 0;
        }
    },
    mutations: {
        setMessageId(state, messageId) {
            state.messageSettings.messageId = messageId;
        },
        extractMessageId(state) {
            const matchMessageUrl = state.messageSettings.messageId.match(/https:\/\/discord.com\/channels\/[0-9]+\/[0-9]+\/([0-9]+)/);
            if (matchMessageUrl) state.messageSettings.messageId = matchMessageUrl[1];
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
        setUsername(state, username) {
            state.webhookSettings.username = username;
        },
        setAvatarUrl(state, avatarUrl) {
            state.webhookSettings.avatarUrl = avatarUrl;
        },
        setSendButtonText(state, sendButtonText) {
            state.sendButtonText = sendButtonText;
        },
        setEditButtonText(state, editButtonText) {
            state.editButtonText = editButtonText;
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
        async sendMessage({ state, commit }) {
            const response  = await fetch(state.webhookSettings.webhookUrl + '?wait=true', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: state.webhookSettings.username,
                    avatar_url: state.webhookSettings.avatarUrl,
                    content: state.messageSettings.content
                })
            });
            const message = await response.json();
            commit('setMessageId', message.id);
            if (response.ok) {
                commit('setSendButtonText', 'Message sent!');
            } else {
                commit('setSendButtonText', 'Failed to send message!');
            }
            setTimeout(() => {
                commit('setSendButtonText', 'Send');
            }, 1000);
        },
        async editMessage({ state, commit }) {
            const response  = await fetch(`${state.webhookSettings.webhookUrl}/messages/${state.messageSettings.messageId}`, {
                method: 'PATCH',
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
                commit('setEditButtonText', 'Message edited!');
            } else {
                commit('setEditButtonText', 'Failed to edit message!');
            }
            setTimeout(() => {
                commit('setEditButtonText', 'Edit');
            }, 1000);
        }
    }
})