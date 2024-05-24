        <!-- <ul class="todo-list">
            <li v-for="(task, index) in tasks" :key="index" class="todo-item">
                <template v-if="editIndex !== index">
                    <span>{{ task.text }}</span>
                    <p>{{ task.status }}</p>
                    <p>Created: {{ task.createdAt }}</p>
                    <p v-if="task.updatedAt">Updated: {{ task.updatedAt }}</p>
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
        </ul> -->




        // import { ref } from 'vue'

// export default {
//     name: "TodoItem",
//     setup() {
//         const text = ref("")
//         const status = ref("Completed")
//         const tasks = ref([])

//         const editIndex = ref(null)
//         const editText = ref("")
//         const editStatus = ref("Completed")

//         function submitTodo() {
//             tasks.value.push({ text: text.value, status: status.value })
//             text.value = ""
//             status.value = "Completed"
//         }

//         function deleteTask(index) {
//             tasks.value.splice(index, 1)
//         }

//         function startUpdateTask(index, task) {
//             editIndex.value = index
//             editText.value = task.text
//             editStatus.value = task.status
//         }

//         function saveUpdateTask(index) {
//             tasks.value[index] = { text: editText.value, status: editStatus.value }
//             editIndex.value = null
//             editText.value = ""
//             editStatus.value = "Completed"
//         }

//         function cancelUpdateTask() {
//             editIndex.value = null
//             editText.value = ""
//             editStatus.value = "Completed"
//         }

//         return {
//             submitTodo,
//             deleteTask,
//             startUpdateTask,
//             saveUpdateTask,
//             cancelUpdateTask,
//             text,
//             status,
//             tasks,
//             editIndex,
//             editText,
//             editStatus
//         }
//     }
// }