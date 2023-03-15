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
            embeds: []
        }
    },
    getters: {
        webhookMessage: (state) => {
            return {
                content: state.message.content,
                username: state.webhook.username || undefined,
                avatar_url: state.webhook.avatarUrl || undefined,
                embeds: state.embeds
            }
        },
        embedFieldArray: (state) => (embedId) => {
            return state.embeds.find((emb) => emb.id === embedId).fields;
        },
        emptyEmbed: (state) => (embedId) => {
            const embed = state.embeds.find((embed) => embed.id === embedId);
            return embed.title.trim().length === 0
                    && embed.description.trim().length === 0
                    && embed.author.name.trim().length === 0
                    && embed.image.url.trim().length === 0
                    && embed.thumbnail.url.trim().length === 0
                    && embed.footer.text.trim().length === 0
                    && embed.footer.icon_url.trim().length === 0
                    && embed.fields.length === 0;
        },
        validUrls(state) {
            try {
                if (state.webhook.avatarUrl) new URL(state.webhook.avatarUrl);
                for (const embed of state.embeds) {
                    if (embed.url) new URL(embed.url);
                    if (embed.author.url) new URL(embed.author.url);
                    if (embed.author.icon_url) new URL(embed.author.icon_url);
                    if (embed.footer.icon_url) new URL(embed.footer.icon_url);
                    if (embed.image.url) new URL(embed.image.url);
                    if (embed.thumbnail.url) new URL(embed.thumbnail.url);
                }
                return true;
            } catch {
                return false;
            }
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
        createEmbed(state, embed) {
            if (state.embeds.length < 10) {
                state.embeds.push({
                    id: Date.now(),
                    title: embed.title || '',
                    description: embed.description || '',
                    url: embed.url || '',
                    color: embed.color || 0,
                    author: {
                        name: embed.author?.name || '',
                        url: embed.author?.url || '',
                        icon_url: embed.author?.icon_url || ''
                    },
                    footer: {
                        text: embed.footer?.text || '',
                        icon_url: embed.footer?.icon_url || ''
                    },
                    image: {
                        url: embed.image?.url || ''
                    },
                    thumbnail: {
                        url: embed.thumbnail?.url || ''
                    },
                    fields: embed.fields || []
                });
            }
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
        deleteAllEmbeds(state) {
            state.embeds = [];
        },
        createField(state, embedId) {
            const embed = state.embeds.find((emb) => emb.id === embedId);
            if (embed.fields.length < 25) {
                embed.fields.push({
                    id: Date.now(),
                    name: '',
                    value: '',
                    inline: false
                });
            }
        },
        updateField(state, {embedId, fieldId, name, value}) {
            const embed = state.embeds.find((emb) => emb.id === embedId);
            const index = embed.fields.findIndex((fld) => fld.id === fieldId);

            if (index > -1) {
                if (name !== undefined) embed.fields[index].name = name;
                if (value !== undefined) embed.fields[index].value = value;
            }
        },
        moveFieldUp(state, {embedId, fieldId}) {
            const embed = state.embeds.find((emb) => emb.id === embedId);
            const index = embed.fields.findIndex((fld) => fld.id === fieldId);

            if (index > 0) {
                const field = embed.fields[index];
                embed.fields[index] = embed.fields[index - 1];
                embed.fields[index - 1] = field;
            }
        },
        moveFieldDown(state, {embedId, fieldId}) {
            const embed = state.embeds.find((emb) => emb.id === embedId);
            const index = embed.fields.findIndex((fld) => fld.id === fieldId);

            if (index < embed.fields.length - 1) {
                const field = embed.fields[index];
                embed.fields[index] = embed.fields[index + 1];
                embed.fields[index + 1] = field;
            }
        },
        deleteField(state, {embedId, fieldId}) {
            const embed = state.embeds.find((emb) => emb.id === embedId);
            embed.fields = embed.fields.filter((fld) => fld.id !== fieldId);
        },
        deleteEmbedFields(state, embedId) {
            state.embeds.find((emb) => emb.id === embedId).fields = [];
        },
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
        loadMessage({ commit, dispatch }, message) {
            commit('setContent', message.content);
            commit('deleteAllEmbeds');
            dispatch('loadEmbeds', message.embeds);
        },
        loadEmbeds({ commit }, embeds) {
            for (const embed of embeds) {
                commit('createEmbed', embed);
            }
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