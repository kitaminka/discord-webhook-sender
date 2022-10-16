import { createStore } from 'vuex';

export default createStore({
    state: {
        validWebhookUrl: false,
        sendButtonText: 'Send',
        editButtonText: 'Edit',
        loadButtonText: 'Load',
        webhook: {
            url: '',
            username: '',
            avatarUrl: ''
        },
        message: {
            id: '',
            content: ''
        },
        embeds: []
    },
    getters: {
        disableSendButton(state) {
            return !state.validWebhookUrl || state.message.content.length === 0;
        },
        disableEditButton(state) {
            return !state.validWebhookUrl || state.message.content.length === 0 || state.message.id.length === 0;
        },
        disableLoadButton(state) {
            return !state.validWebhookUrl || state.message.id.length === 0;
        },
        webhookUrlError(state) {
            return !state.validWebhookUrl && state.webhook.url.length !== 0;
        },
        messageEmptyError(state) {
            return state.message.content.length === 0 && state.validWebhookUrl && state.webhook.url.length !== 0;
        }
    },
    mutations: {
        setMessageId(state, messageId) {
            state.message.id = messageId;
        },
        extractMessageId(state) {
            const matchMessageUrl = state.message.id.match(/https:\/\/discord.com\/channels\/[0-9]+\/[0-9]+\/([0-9]+)/);
            if (matchMessageUrl) state.message.id = matchMessageUrl[1];
        },
        setContent(state, content) {
            state.message.content = content;
        },
        setWebhookUrl(state, webhookUrl) {
            state.webhook.url = webhookUrl;
        },
        setValidWebhookUrl(state, valid) {
            state.validWebhookUrl = valid;
        },
        setUsername(state, username) {
            state.webhook.username = username;
        },
        setAvatarUrl(state, avatarUrl) {
            state.webhook.avatarUrl = avatarUrl;
        },
        setSendButtonText(state, sendButtonText) {
            state.sendButtonText = sendButtonText;
        },
        setEditButtonText(state, editButtonText) {
            state.editButtonText = editButtonText;
        },
        setLoadButtonText(state, loadButtonText) {
            state.loadButtonText = loadButtonText;
        },
        createEmbed(state) {
            state.embeds.push({
                id: Date.now(),
                title: '',
                description: '',
                url: '',
                color: '',
            })
        },
        setEmbedTitle(state, {id, title}) {
            state.embeds.find((embed) => embed.id === id).title = title;
        },
        setEmbedDescription(state, {id, description}) {
            state.embeds.find((embed) => embed.id === id).description = description;
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
            const response  = await fetch(state.webhook.url + '?wait=true', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: state.webhook.username,
                    avatar_url: state.webhook.avatarUrl,
                    content: state.message.content
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
            const response  = await fetch(`${state.webhook.url}/messages/${state.message.id}`, {
                method: 'PATCH',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: state.webhook.username,
                    content: state.message.content
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
        },
        async loadMessage({ state, commit }) {
            const response = await fetch(`${state.webhook.url}/messages/${state.message.id}`);
            if (response.ok) {
                const message = await response.json();
                commit('setContent', message.content);
                commit('setLoadButtonText', 'Message loaded!');
            } else {
                commit('setLoadButtonText', 'Failed to load message!');
            }
            setTimeout(() => {
                commit('setLoadButtonText', 'Load');
            }, 1000);
        }
    }
})