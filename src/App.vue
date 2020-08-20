<template>
<div>
    <div class="jumbotron jumbotron-fluid">
      <div class="container">
        <h1 class="display-4">Lista de Tarefas</h1>
        <p class="lead">Otimizando suas atividades</p>
      </div>
    </div>
    <div class="container">
       <ToDoList/>
    </div>
</div> 
</template>

<script>
import ToDoList from './components/ToDoList.vue'

export default {
  name: 'App',
  components: {
    ToDoList //Componente pai
  }
}
</script>


