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
        embedById: (state) => (id) => {
            return state.embeds.find((emb) => emb.id === id);
        },
        emptyEmbed: (state) => (id) => {
            const embed = state.embeds.find((emb) => emb.id === id);
            return (embed.title.length === 0
                    && embed.description.length === 0
                    && embed.author.name.length === 0
                    && embed.image.url.length === 0
                    && embed.thumbnail.url.length === 0
                    && embed.fields.length === 0)
                && state.validWebhookUrl;
        },
        allowMoveEmbedUp: (state) => (id) => {
            const index = state.embeds.findIndex((emb) => emb.id === id);
            return index > 0;
        },
        allowMoveEmbedDown: (state) => (id) => {
            const index = state.embeds.findIndex((emb) => emb.id === id);
            return index < state.embeds.length - 1;
        }
        // bleMoveEmbedUp: (state) => (id) => {
        //     const index = state.embeds.findIndex((emb) => emb.id === id);
        //     return index !== 0;
        // }
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
            if (state.embeds.length < 10) {
                state.embeds.push({
                    id: Date.now(),
                    title: '',
                    description: '',
                    url: '',
                    color: 0,
                    author: {
                        name: '',
                        url: '',
                        icon_url: ''
                    },
                    footer: {
                        text: '',
                        icon_url: ''
                    },
                    image: {
                        url: ''
                    },
                    thumbnail: {
                        url: ''
                    },
                    fields: [],
                    show: true
                });
            }
        },
        deleteAllEmbeds(state) {
            state.embeds = [];
        },
        setEmbeds(state, embeds) {
          state.embeds = embeds;
        },
        updateEmbed(state, embed) {
            const originalEmbed = state.embeds.find((emb) => emb.id === embed.id);
            Object.assign(originalEmbed, {
                ...embed,
                author: {
                    ...originalEmbed.author,
                    ...embed.author
                },
                footer: {
                    ...originalEmbed.footer,
                    ...embed.footer
                },
                image: {
                    ...originalEmbed.image,
                    ...embed.image
                },
                thumbnail: {
                    ...originalEmbed.thumbnail,
                    ...embed.thumbnail
                }
            });
        },
        moveEmbedUp(state, embedId) {
            const embed = state.embeds.find((emb) => emb.id === embedId);
            const index = state.embeds.indexOf(embed);
            if (index > 0) {
                state.embeds.splice(index, 1);
                state.embeds.splice(index - 1, 0, embed);
            }
        },
        moveEmbedDown(state, embedId) {
            const embed = state.embeds.find((emb) => emb.id === embedId);
            const index = state.embeds.indexOf(embed);
            if (index < state.embeds.length - 1) {
                state.embeds.splice(index, 1);
                state.embeds.splice(index + 1, 0, embed);
            }
        },
        deleteEmbed(state, embedId) {
            state.embeds = state.embeds.filter((emb) => emb.id !== embedId);
        },
        createEmbedField(state, embedId) {
            const embed = state.embeds.find((emb) => emb.id === embedId);
            if (embed.fields.length < 25) {
                embed.fields.push({
                    id: Date.now(),
                    name: '',
                    value: ''
                });
            }
        },
        deleteAllEmbedFields(state, embedId) {
            state.embeds.find((emb) => emb.id === embedId).fields = [];
        },
        updateEmbedField(state, {embedId, field}) {
            const embed = state.embeds.find((emb) => emb.id === embedId).fields.find((f) => f.id === field.id);
            Object.assign(embed, field);
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
                    content: state.message.content,
                    embeds: state.embeds
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
                    content: state.message.content,
                    embeds: state.embeds
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
                commit('setEmbeds', message.embeds);
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