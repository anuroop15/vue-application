<template>
  <div class="hello">
    About this Application
    <button  class="button" click="getTodosList()">Get Todos</button>
    <div v-for="todo in todos" :key="todo.id">
        <p>{{todo.title}}</p>
    </div>
  </div>
</template>

<script>
import apiService from '../services/apiService'

export default {
  name: 'About',
  data () {
    return {
      todos: []
    }
  },
  methods: {
    getTodosList: function () {
      apiService.getTodos().then((response) => {
        this.todos = response
      }, (e) => {
        console.log(e)
        this.todos = []
      })
    }
  },
  created () {
    this.getTodosList()
  }
}

</script>
