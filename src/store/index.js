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
                content: ''
            },
            embeds: {
                byId: {},
                allIds: []
            },
            fields: {},
        }
    },
    getters: {
        webhookParams: (state) => {
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
            const embed = state.embeds.byId[embedId];
            return (embed.title.length === 0
                    && embed.description.length === 0
                    && embed.authorName.length === 0
                    && embed.imageUrl.length === 0
                    && embed.thumbnailUrl.length === 0
                    && embed.fields.length === 0)
                && state.validWebhookUrl;
        },
        embedArray: (state) => {
            return state.embeds.allIds.map((id) => state.embeds.byId[id]);
        },
        embedFieldArray: (state) => (embedId) => {
            return state.embeds.byId[embedId].fields.map((id) => state.fields[id]);
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
            if (state.embeds.allIds.length < 10) {
                const embedId = Date.now();
                state.embeds.allIds.push(embedId);
                state.embeds.byId[embedId] = {
                    id: embedId,
                    title: '',
                    description: '',
                    url: '',
                    color: 0,
                    authorName: '',
                    authorUrl: '',
                    authorIconUrl: '',
                    footerText: '',
                    footerIconUrl: '',
                    imageUrl: '',
                    thumbnailUrl: '',
                    fields: [],
                    show: true
                }
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
            state.embeds.byId = {};
            state.embeds.allIds = [];
        },
        updateEmbed(state, embed) {
            state.embeds.byId[embed.id] = {
                ...state.embeds.byId[embed.id],
                ...embed
            }
        },
        moveEmbedUp(state, embedId) {
            const index = state.embeds.allIds.findIndex((id) => id === embedId);
            if (index > 0) {
                state.embeds.allIds.splice(index, 1);
                state.embeds.allIds.splice(index - 1, 0, embedId);
            }
        },
        moveEmbedDown(state, embedId) {
            const index = state.embeds.allIds.findIndex((id) => id === embedId);
            if (index < state.embeds.allIds.length - 1) {
                state.embeds.allIds.splice(index, 1);
                state.embeds.allIds.splice(index + 1, 0, embedId);
            }
        },
        deleteEmbed(state, embedId) {
            state.embeds.allIds = state.embeds.allIds.filter((id) => id !== embedId);
            delete state.embeds.byId[embedId];
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
                body: JSON.stringify(getters.webhookParams)
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
                body: JSON.stringify(getters.webhookParams)
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
        }
    }
})