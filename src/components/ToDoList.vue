<template>
    <div class="row">

        <div class="col-8">
            <h2>Lista de Tarefas</h2>
            
            <ul class="list-group list-group-flush">
                <ToDoListItem v-for="todo in todos" 
                :key="todo.id" 
                :todo="todo" 
                @selecionarTodo="todoSelecionado = $event"
                :class="aplicarClasseAtiva(todo)"/>
            </ul>
        </div>
        <div class="col-4">
            <ToDoListItemInfo v-if="!editar" :todo="todoSelecionado" @editarTodo="editarTodo"/>
            <ToDoListItemEditar v-else :todo="todoSelecionado"/>
        </div>
    </div>
</template>

<script>
/*
    Importação dos componentes fihos
*/
import { eventBus } from './../main.js' 
import ToDoListItem from './ToDoListItem.vue'
import ToDoListItemInfo from './ToDoListItemInfo.vue'
import ToDoListItemEditar from './ToDoListItemEditar.vue'

/*
    Exportaçãp de 
*/

export default {
    components:{
        ToDoListItem,
        ToDoListItemInfo,
        ToDoListItemEditar
    },
    data(){
        return {
            todos: [
                {id: 1, titulo: 'Aprender VueJS', descricao: 'Aprender uma nova tecnologia',finalizada: false},
                {id: 2, titulo: 'Ler Livro Clean Code', descricao: 'Aprofundar conhecimento',finalizada: false}
            ],
            /* Propriedade que valida se a div para Edição da tarefa será mostrada*/
            editar: false,
            todoSelecionado: undefined
        }
    },
    created(){
        eventBus.$on('selecionarTodo',(todoSelecionado)=>{
            this.todoSelecionado = todoSelecionado
        }),
        eventBus.$on('atualizarTodo',this.atualizarTodo)
    },
    methods:{
        aplicarClasseAtiva(todoIterado){
            return {
                active: this.todoSelecionado && this.todoSelecionado.id === todoIterado.id
            }
        },
        editarTodo(todo){
        this.editar = true
        this.todoSelecionado = todo
        },
        cancelarTodo(){
        this.editar = true
        },
        atualizarTodo(todoAtualizado){
            const indice = this.todos.findIndex(todo => todo.id === todoAtualizado.id)
            this.todos.splice(indice, 1 , todoAtualizado)
            this.todoSelecionado = undefined
            this.editar =false
        }
    }
}
</script>