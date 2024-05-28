<template>


    <div class="todo-app">
        <p class="title">My todo app</p>
        <form @submit.prevent="submitTodo" class="todo-form">
            <input type="text" v-model="text" placeholder="Write your daily tasks here" required />
            <select name="status" v-model="status" required>
                <option value="Completed">Completed</option>
                <option value="Pending">Pending</option>
            </select>
            <select name="category" v-model="category" required>
                <option value="Work">Work</option>
                <option value="Personal">Personal</option>
                <option value="Shopping">Shopping</option>
            </select>
            <div class="submit-button">
                <button class="button-28" type="submit" role="button">
                    Submit
                </button>
            </div>
        </form>
        <!-- filter for tasks -->
        <label for="filter">Filter by status</label>
        <select name="filter" id="filter" v-model="filterStatus">
            <option value="">All</option>
            <option value="Completed">Completed</option>
            <option value="Pending">Pending</option>
        </select>

    </div>

    <table class="table container">
        <thead>
            <tr>
                <th scope="col">Task Name</th>
                <th scope="col">Status</th>
                <th scope="col">Category</th>
                <th scope="col">Created At</th>
                <th scope="col">Updated At</th>
                <th scope="col">Actions</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(task, index) in filteredTasks" :key="index" class="todo-item">
                <template v-if="editIndex !== index">
                    <td>{{ task.text }}</td>
                    <td>{{ task.status }}</td>
                    <td>{{ task.category }}</td>
                    <td>{{ task.createdAt }}</td>
                    <td>{{ task.updatedAt || 'N/A' }}</td>
                    <td class="btn-group">
                        <button class="btn btn-danger" @click="deleteTask(index)">Delete</button>
                        <button class="btn btn-info" @click="startUpdateTask(index, task)">Update</button>
                    </td>
                </template>
                <template v-else>
                    <td colspan="5">
                        <input autocomplete="off" name="email" id="Email" v-model="editText" class="input" type="text">
                        <select v-model="editStatus">
                            <option value="Completed">Completed</option>
                            <option value="Pending">Pending</option>
                        </select>
                        <div class="btn-group">
                            <button class="btn btn-success" @click="saveUpdateTask(index)">Save</button>
                            <button class="btn btn-warning" @click="cancelUpdateTask">Cancel</button>
                        </div>
                    </td>
                </template>
            </tr>
        </tbody>
    </table>
</template>







<script>
import { mapState, mapActions } from 'vuex';

export default {
    name: 'TodoItem',
    data() {
        return {
            text: '',
            status: 'Completed',
            category: 'Work',
            editIndex: null,
            editText: '',
            editStatus: 'Completed',
            filterStatus: ''
        };
    },
    computed: {
        ...mapState(['tasks']),
        filteredTasks() {
            if (!this.filterStatus) {
                return this.tasks;
            }
            return this.tasks.filter(task => task.status === this.filterStatus);
        }
    },
    methods: {
        ...mapActions(['addTask', 'deleteTask', 'updateTask']),
        submitTodo() {
            const now = new Date().toLocaleString();
            this.addTask({ text: this.text, status: this.status, createdAt: now, updatedAt: null, category: this.category });
            this.text = '';
            this.status = 'Completed';
            this.category = 'Work';
        },
        startUpdateTask(index, task) {
            this.editIndex = index;
            this.editText = task.text;
            this.editStatus = task.status;
        },
        saveUpdateTask(index) {
            const now = new Date().toLocaleString();
            this.updateTask({ index, task: { ...this.tasks[index], text: this.editText, status: this.editStatus, updatedAt: now } });
            this.editIndex = null;
            this.editText = '';
            this.editStatus = 'Completed';
        },
        cancelUpdateTask() {
            this.editIndex = null;
            this.editText = '';
            this.editStatus = 'Completed';
        }
    }
};

</script>




<style scoped>
.todo-app {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    font-family: Arial, sans-serif;
}

.title {
    text-align: center;
    font-size: 1.5em;
    margin-bottom: 20px;
}

.todo-form {
    display: grid;
    grid-template-columns: 1fr auto;
    grid-gap: 10px;
    margin-bottom: 20px;
}

.todo-form input,
.todo-form select,
.todo-form button,
select {
    padding: 10px;
    font-size: 1em;
}
label{
    margin-right: 10px;
}
.todo-form input {
    /* grid-column: span 2; */
}

.todo-list {
    list-style-type: none;
    padding: 0;
}

.todo-item {
    /* display: flex; */
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
    margin-bottom: 10px;
    background-color: #f9f9f9;
}

.todo-item span {
    flex: 1;
}

.todo-item p {
    flex: 1;
    text-align: right;
    margin-right: 20px;
    color: #666;
    margin-top: 0;
}

.btn-group {
    display: flex;
    gap: 10px;
}

.btn {
    padding: 5px 10px;
    border: none;
    border-radius: 3px;
    cursor: pointer;
}

.btn-danger {
    background-color: #e74c3c;
    color: white;
}

.btn-info {
    background-color: #3498db;
    color: white;
}

.btn-success {
    background-color: #2ecc71;
    color: white;
}

.btn-warning {
    background-color: #f1c40f;
    color: white;
}
.submit-button{
    display: flex;
    justify-content: center;
}
/* search button */
.button-28 {
    appearance: none;
    background-color: transparent;
    border: 2px solid #1a1a1a;
    border-radius: 15px;
    box-sizing: border-box;
    color: #3b3b3b;
    cursor: pointer;
    display: inline-block;
    font-family: Roobert, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica,
        Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    font-size: 16px;
    font-weight: 600;
    line-height: normal;
    margin: 0;
    min-height: 60px;
    min-width: 0;
    outline: none;
    padding: 16px 24px;
    text-align: center;
    text-decoration: none;
    transition: all 300ms cubic-bezier(0.23, 1, 0.32, 1);
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
    width: 100%;
    will-change: transform;
}

.button-28:disabled {
    pointer-events: none;
}

.button-28:hover {
    color: #fff;
    background-color: #1a1a1a;
    box-shadow: rgba(0, 0, 0, 0.25) 0 8px 15px;
    transform: translateY(-2px);
}

.button-28:active {
    box-shadow: none;
    transform: translateY(0);
}

tr {
    text-align: center;
}

/* input styles */
.input {
    max-width: 190px;
    height: 44px;
    background-color: #05060f0a;
    border-radius: .5rem;
    padding: 0 1rem;
    border: 2px solid transparent;
    font-size: 1rem;
    transition: border-color .3s cubic-bezier(.25, .01, .25, 1) 0s, color .3s cubic-bezier(.25, .01, .25, 1) 0s, background .2s cubic-bezier(.25, .01, .25, 1) 0s;
}

.input:hover {
    outline: none;
    border-color: #05060f;
}

.input:focus {
    color: #05060fc2;
}

@media (max-width: 600px) {
    .todo-item {
        flex-direction: column;
        align-items: flex-start;
    }

    .todo-item p {
        margin: 10px 0;
    }

    .btn-group {
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 5px;
    }
}
</style>
