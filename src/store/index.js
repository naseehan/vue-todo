// import { createStore } from 'vuex';

// export default createStore({
//     state: {
//         tasks: []
//     },
//     mutations: {
//         ADD_TASK(state, task) {
//             state.tasks.push(task);
//         },
//         DELETE_TASK(state, index) {
//             state.tasks.splice(index, 1);
//         },
//         UPDATE_TASK(state, { index, task }) {
//             state.tasks[index] = task;
//         }
//     },
//     actions: {
//         addTask({ commit }, task) {
//             commit('ADD_TASK', task);
//         },
//         deleteTask({ commit }, index) {
//             commit('DELETE_TASK', index);
//         },
//         updateTask({ commit }, { index, task }) {
//             commit('UPDATE_TASK', { index, task });
//         }
//     },
//     getters: {
//         tasks: (state) => state.tasks
//     }
// });



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
