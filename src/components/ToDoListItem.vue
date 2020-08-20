<template>
    <li class="list-group-item">
        <span>{{todo.id}} - {{todo.titulo}} </span> 
        <button @click="selecionar" class="btn btn-success float-right">Selecionar</button>
    </li>
</template>

<script>
import { eventBus } from './../main.js'

export default {
    props:{
        todo: {
            type: Object,
            required: true
        }
    },
    methods:{
        selecionar(){
            eventBus.selecionarTodo(this.todo)
        }
    }
}
</script>