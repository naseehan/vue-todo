<template>
  <NavBar />
  <TodoItem/>
</template>

<script>
import TodoItem from './components/TodoItem.vue'
import NavBar from './components/NavBar.vue';

export default {
  // name: 'App',
  components: {
    TodoItem,
    NavBar
  }
}
</script>

