<template>
    <div>
        <h3>Descrição</h3>
        <div  class="card" v-if="todo">
            <div class="card-body">
                <p class="card-title">{{todo.descricao}}</p>
                <button @click="editar" class="btn btn-danger float-right">Editar</button>
            </div>
        </div>
        <p v-else>Nenhuma Tarefa selecionada!</p>
    </div>

</template>

<script>

import { eventBus } from './../main.js'


export default {
    data(){
        return{
            todo: undefined
        }
    },
    created(){
        eventBus.$on('selecionarTodo',(todoSelecionado)=>{
            this.todo =todoSelecionado
        })
    },
    methods:{
        editar(){
            this.$emit('editarTodo',this.todo)
        }
    }   
}
</script>