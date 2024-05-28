


import { createStore } from 'vuex';

const store = createStore({
    state() {
        return {
            tasks: []
        };
    },
    mutations: {
        addTask(state, task) {
            state.tasks.push(task);
        },
        deleteTask(state, index) {
            state.tasks.splice(index, 1);
        },
        updateTask(state, { index, task }) {
            state.tasks.splice(index, 1, task);
        }
    },
    actions: {
        addTask({ commit }, task) {
            commit('addTask', task);
        },
        deleteTask({ commit }, index) {
            commit('deleteTask', index);
        },
        updateTask({ commit }, payload) {
            commit('updateTask', payload);
        }
    }
});

export default store;
