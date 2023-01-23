export default {
    namespaced: true,
    state: () => ({
        embeds: []
    }),
    getters: {
        embedById: (state) => (id) => {
            return state.embeds.find((emb) => emb.id === id);
        },
        emptyEmbed: (state, getters, rootState) => (id) => {
            const embed = state.embeds.find((emb) => emb.id === id);
            return (embed.title.length === 0
                    && embed.description.length === 0
                    && embed.author.name.length === 0
                    && embed.image.url.length === 0
                    && embed.thumbnail.url.length === 0
                    && embed.fields.length === 0)
                && rootState.validWebhookUrl;
        },
    },
    mutations: {
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
        }
    }
}