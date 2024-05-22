/* eslint-disable */
<template>
    <div class="todo-app">
        <p class="title">My todo app</p>
        <form @submit.prevent="submitTodo" class="todo-form">
            <input type="text" v-model="text" placeholder="Write your daily tasks here" required />
            <select name="status" v-model="status" required>
                <option value="Completed">Completed</option>
                <option value="Pending">Pending</option>
            </select>
            <!-- <button type="submit">Submit</button> -->
            <button className="button-28" type="submit" role="button">
               Submit
            </button>
        </form>
        <ul class="todo-list">
            <li v-for="(task, index) in tasks" :key="index" class="todo-item">
                <template v-if="editIndex !== index">
                    <span>{{ task.text }}</span>
                    <p>{{ task.status }}</p>
                    <div class="btn-group">
                        <button class="btn btn-danger" @click="deleteTask(index)">Delete</button>
                        <button class="btn btn-info" @click="startUpdateTask(index, task)">Update</button>
                    </div>
                </template>
                <template v-else>
                    <input type="text" v-model="editText" />
                    <select v-model="editStatus">
                        <option value="Completed">Completed</option>
                        <option value="Pending">Pending</option>
                    </select>
                    <div class="btn-group">
                        <button class="btn btn-success" @click="saveUpdateTask(index)">Save</button>
                        <button class="btn btn-warning" @click="cancelUpdateTask">Cancel</button>
                    </div>
                </template>
            </li>
        </ul>
    </div>
</template>

<script>
import { ref } from 'vue'

export default {
    name: "TodoItem",
    setup() {
        const text = ref("")
        const status = ref("Completed")
        const tasks = ref([])

        const editIndex = ref(null)
        const editText = ref("")
        const editStatus = ref("Completed")

        function submitTodo() {
            tasks.value.push({ text: text.value, status: status.value })
            text.value = ""
            status.value = "Completed"
        }

        function deleteTask(index) {
            tasks.value.splice(index, 1)
        }

        function startUpdateTask(index, task) {
            editIndex.value = index
            editText.value = task.text
            editStatus.value = task.status
        }

        function saveUpdateTask(index) {
            tasks.value[index] = { text: editText.value, status: editStatus.value }
            editIndex.value = null
            editText.value = ""
            editStatus.value = "Completed"
        }

        function cancelUpdateTask() {
            editIndex.value = null
            editText.value = ""
            editStatus.value = "Completed"
        }

        return {
            submitTodo,
            deleteTask,
            startUpdateTask,
            saveUpdateTask,
            cancelUpdateTask,
            text,
            status,
            tasks,
            editIndex,
            editText,
            editStatus
        }
    }
}
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
.todo-form button {
    padding: 10px;
    font-size: 1em;
}

.todo-form input {
    grid-column: span 2;
}

.todo-list {
    list-style-type: none;
    padding: 0;
}

.todo-item {
    display: flex;
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
