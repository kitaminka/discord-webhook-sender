import { createStore } from 'vuex';

export default createStore({
    state: {
        messageSettings: {
            content: ''
        }
    },
    mutations: {
        editMessageSettings(state, messageSettings) {
            state.messageSettings = messageSettings;
        }
    },
    actions: {
        editMessageSettings({ commit }, messageSettings) {
            commit('editMessageSettings', messageSettings);
        }
    }
})