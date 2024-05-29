<template>
  <v-container class="todo-app" max-width="1000px">
    <v-card class="pa-5">
      <v-card-title class="title">My Todo App</v-card-title>
      <v-form @submit.prevent="submitTodo" class="todo-form">
        <v-row>
          <v-col cols="12" sm="6" md="4">
            <v-text-field
              v-model="text"
              label="Write your daily tasks here"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-select
              v-model="status"
              :items="['Completed', 'Pending']"
              label="Status"
              required
            ></v-select>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-select
              v-model="category"
              :items="['Work', 'Personal', 'Shopping']"
              label="Category"
              required
            ></v-select>
          </v-col>
          <v-col cols="12">
            <v-btn type="submit" color="primary" class="submit-button">
              Submit
            </v-btn>
          </v-col>
        </v-row>
      </v-form>
      <br>
      <!-- for alert if task name is empty -->
      <v-alert v-if="showWarning" type="error" dismissible>
        Task name is required.
      </v-alert>
      <br>
      <v-select
        v-model="filterStatus"
        :items="['', 'Completed', 'Pending']"
        label="Filter by status"
      ></v-select>
    </v-card>

    <v-data-table
    :headers="headers"
      :items="filteredTasks"
      class="elevation-1"
    >
      <template v-slot:[`item.actions`]="{ item, index }">
        <v-btn class="action-btn" icon color="info" @click="startUpdateTask(index, item)">
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
        <v-btn class="action-btn" icon color="error" @click="deleteTask(index)">
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </template>

      <template v-slot:no-data>
        <v-alert :value="true" color="error" icon="mdi-alert">
          No tasks found
        </v-alert>
      </template>
    </v-data-table>

    <v-dialog v-model="isDialogOpen" max-width="600px">
      <v-card>
        <v-card-title>Edit Task</v-card-title>
        <v-card-text>
          <v-text-field
            v-model="editText"
            label="Task Name"
            required
          ></v-text-field>
          <v-select
            v-model="editStatus"
            :items="['Completed', 'Pending']"
            label="Status"
            required
          ></v-select>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" @click="saveUpdateTask(editIndex)">
            Save
          </v-btn>
          <v-btn color="red darken-1" @click="cancelUpdateTask">
            Cancel
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
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
      isDialogOpen: false,
      editIndex: null,
      editText: '',
      editStatus: 'Completed',
      filterStatus: '',
      showWarning: false,
      headers: [
        { title: 'Task Name', value: 'text' },
        { title: 'Status', value: 'status' },
        { title: 'Category', value: 'category' },
        { title: 'Created At', value: 'createdAt' },
        { title: 'Updated At', value: 'updatedAt' },
        { title: 'Actions', value: 'actions', sortable: false },
      ]
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
      if (!this.text) {
        this.showWarning = true;
        return;
      }
      this.showWarning = false;
      const now = new Date().toLocaleString();
      this.addTask({
        text: this.text,
        status: this.status,
        createdAt: now,
        updatedAt: null,
        category: this.category
      });
      this.text = '';
      this.status = 'Completed';
      this.category = 'Work';
    },
    startUpdateTask(index, task) {
      this.editIndex = index;
      this.editText = task.text;
      this.editStatus = task.status;
      this.isDialogOpen = true;
    },
    saveUpdateTask(index) {
      const now = new Date().toLocaleString();
      this.updateTask({
        index,
        task: {
          ...this.tasks[index],
          text: this.editText,
          status: this.editStatus,
          updatedAt: now
        }
      });
      this.isDialogOpen = false;
      this.editIndex = null;
      this.editText = '';
      this.editStatus = 'Completed';
    },
    cancelUpdateTask() {
      this.isDialogOpen = false;
      this.editIndex = null;
      this.editText = '';
      this.editStatus = 'Completed';
    }
  }
};
</script>





/* In your component's style section */
<style scoped>
.todo-app {
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

.title {
  text-align: center;
  font-size: 1.5em;
  margin-bottom: 20px;
}

.submit-button {
  display: flex;
  justify-content: center;
}

.v-text-field,
.v-select {
  width: 100%;
}

.action-button {
  margin: 0 5px;
}

.action-button v-icon {
  font-size: 18px;
}

.action-btn {
    height: 40px !important;
    width: 40px !important;
}

.v-data-table {
  margin-top: 20px;
}
</style>
