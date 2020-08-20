<template>
    <div>
        <h2>Editar tarefa</h2>

        <div class="form-group">
            <label>Título:</label>
            <input type="text" class="form-control" 
            placeholder="Insira o título" 
            :value="todoSelecionado.titulo"
            @input="todoSelecionado = {propriedade: 'titulo', valor: $event.target.value}" >
        </div>

        <div class="form-group">
            <label>Descrição:</label>
            <input type="text" class="form-control" 
            placeholder="Insira a descrição" 
            :value="todoSelecionado.descricao"
            @textarea="todoSelecionado = {propriedade: 'descricao', valor: $event.target.value}">
        </div>
        <button @click="salvarTodo" class="btn btn-success float-right">Salvar</button>
        <button @click="cancelarEdicao" type="button" class="btn btn-danger">Cancelar</button>
    </div>
    
</template>

<script>

import {eventBus} from './../main.js'

export default {
    props:{
        todo: {
            type: Object,
            require: true
        }
    },
    data(){
        return{
            todoLocal: this.todo
        }

    },
    computed: {
        todoSelecionado: {
            get(){
                return this.todoLocal 
            },
            set(dados){
                this.todoLocal = Object.assign(
                    {},
                    this.todoLocal,
                    {[dados.propriedade]: dados.valor}
                )

            }
        }
    },
    watch: {
        todo(novoTodo) { // crie o watcher na prop "todo"
        this.todoLocal = Object.assign({}, novoTodo)
        }
    },
    methods:{
        salvarTodo(){
           eventBus.atualizarTodo(this.todoLocal) 
        },
        cancelarEdicao(){
            eventBus.cancelarEdicao()
        }
    }
}
</script>