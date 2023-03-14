import { createStore } from 'vuex';

export default createStore({
    state() {
        return {
            validWebhookUrl: false,
            webhook: {
                url: '',
                username: '',
                avatarUrl: ''
            },
            message: {
                id: '',
                content: 'Test message'
            },
            embeds: []
        }
    },
    getters: {
        webhookMessage: (state) => {
            return {
                content: state.message.content || undefined,
                username: state.webhook.username || undefined,
                avatar_url: state.webhook.avatarUrl || undefined,
                embeds: state.embeds.allIds.map((id) => {
                    const embed = state.embeds.byId[id];
                    return {
                        title: embed.title || undefined,
                        description: embed.description || undefined,
                        url: embed.url || undefined,
                        color: embed.color || undefined,
                        footer: {
                            text: embed.footerText || undefined,
                            icon_url: embed.footerIconUrl || undefined
                        },
                        image: {
                            url: embed.imageUrl || undefined
                        },
                        thumbnail: {
                            url: embed.thumbnailUrl || undefined
                        },
                        author: {
                            name: embed.authorName || undefined,
                            url: embed.authorUrl || undefined,
                            icon_url: embed.authorIconUrl || undefined
                        },
                        fields: embed.fields.map((id) => {
                            const field = state.fields[id];
                            return {
                                name: field.name,
                                value: field.value
                            }
                        })
                    }
                })
            }
        },
        emptyEmbed: (state) => (embedId) => {
            const embed = state.embeds.find((embed) => embed.id === embedId);
            return embed.title.trim().length === 0
                    && embed.description.trim().length === 0
                    && embed.author.name.trim().length === 0
                    && embed.image.url.trim().length === 0
                    && embed.thumbnail.url.trim().length === 0
                    && embed.fields.length === 0;
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
        loadEmbeds(state, embeds) {
            for (const embed of embeds) {
                const embedId = Date.now();
                state.embeds.allIds.push(embedId);
                state.embeds.byId[embedId] = {
                    id: embedId,
                    title: embed.title || '',
                    description: embed.description || '',
                    url: embed.url || '',
                    color: embed.color || 0,
                    authorName: embed.author?.name || '',
                    authorUrl: embed.author?.url || '',
                    authorIconUrl: embed.author?.icon_url || '',
                    footerText: embed.footer?.text || '',
                    footerIconUrl: embed.footer?.icon_url || '',
                    imageUrl: embed.image?.url || '',
                    thumbnailUrl: embed.thumbnail?.url || '',
                    fields: [],
                    show: true
                }
                if (embed.fields) {
                    for (const field of embed.fields) {
                        const fieldId = Date.now();
                        state.embeds.byId[embedId].fields.push(fieldId);
                        state.fields[fieldId] = {
                            id: fieldId,
                            name: field.name || '',
                            value: field.value || ''
                        }
                    }
                }
            }
        },
        deleteAllEmbeds(state) {
            state.embeds = [];
        },
        updateEmbed(state, embed) {
            const index = state.embeds.findIndex((emb) => emb.id === embed.id);
            if (index > -1) {
                const oldEmbed = state.embeds[index];

                state.embeds[index] = {
                    ...oldEmbed,
                    ...embed,
                    author: {
                        ...oldEmbed.author,
                        ...embed.author
                    },
                    footer: {
                        ...oldEmbed.footer,
                        ...embed.footer
                    },
                    image: {
                        ...oldEmbed.image,
                        ...embed.image
                    },
                    thumbnail: {
                        ...oldEmbed.thumbnail,
                        ...embed.thumbnail
                    }
                }
            }
        },
        moveEmbedUp(state, embedId) {
            const index = state.embeds.findIndex((emb) => emb.id === embedId);
            if (index > 0) {
                const embed = state.embeds[index];
                state.embeds[index] = state.embeds[index - 1];
                state.embeds[index - 1] = embed;
            }
        },
        moveEmbedDown(state, embedId) {
            const index = state.embeds.findIndex((emb) => emb.id === embedId);
            if (index < state.embeds.length - 1) {
                const embed = state.embeds[index];
                state.embeds[index] = state.embeds[index + 1];
                state.embeds[index + 1] = embed;
            }
        },
        deleteEmbed(state, embedId) {
            state.embeds = state.embeds.filter((emb) => emb.id !== embedId);
        },
        createField(state, embedId) {
            const fieldId = Date.now();
            state.embeds.byId[embedId].fields.push(fieldId);
            state.fields[fieldId] = {
                id: fieldId,
                name: '',
                value: ''
            }
        },
        deleteEmbedFields(state, embedId) {
            state.embeds.byId[embedId].fields = [];
            delete state.fields[embedId];
        },
        deleteAllFields(state) {
            state.fields = {};
        },
        updateField(state, field) {
            state.fields[field.id] = {
                ...state.fields[field.id],
                ...field
            }
        },
        moveFieldUp(state, {embedId, fieldId}) {
            const embed = state.embeds.byId[embedId];
            const index = state.embeds.byId[embedId].fields.findIndex((id) => id === fieldId);
            if (index > 0) {
                embed.fields.splice(index, 1);
                embed.fields.splice(index - 1, 0, fieldId);
            }
        },
        moveFieldDown(state, {embedId, fieldId}) {
            const embed = state.embeds.byId[embedId];
            const index = embed.fields.findIndex((id) => id === fieldId);
            if (index < embed.fields.length - 1) {
                embed.fields.splice(index, 1);
                embed.fields.splice(index + 1, 0, fieldId);
            }
        },
        deleteField(state, {embedId, fieldId}) {
            const embed = state.embeds.byId[embedId];
            embed.fields = embed.fields.filter((id) => id !== fieldId);
            delete state.fields[fieldId];
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
        async sendMessage({ state, getters, commit }) {
            const response  = await fetch(state.webhook.url + '?wait=true', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(getters.webhookMessage)
            });
            if (response.ok) {
                const message = await response.json();
                commit('setMessageId', message.id);
            }
            return response;
        },
        async editMessage({ state, getters }) {
            return await fetch(`${state.webhook.url}/messages/${state.message.id}`, {
                method: 'PATCH',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(getters.webhookMessage)
            });
        },
        async getMessage({ state, dispatch }) {
            const response = await fetch(`${state.webhook.url}/messages/${state.message.id}`);
            if (response.ok) {
                const message = await response.json();
                dispatch('loadMessage', message);
            }
            return response;
        },
        loadMessage({ commit }, message) {
            commit('setContent', message.content);
            commit('deleteAllEmbeds');
            commit('deleteAllFields');
            commit('loadEmbeds', message.embeds);
        },
        saveMessageToLocalStorage({ getters }) {
            localStorage.setItem('lastMessage', JSON.stringify(getters.webhookMessage));
        },
        loadMessageFromLocalStorage({ dispatch }) {
            try {
                const message = JSON.parse(localStorage.getItem('lastMessage'));
                if (message) {
                    dispatch('loadMessage', message);
                }
            } catch {
                console.log('Failed to load message from local storage');
            }
        }
    }
})