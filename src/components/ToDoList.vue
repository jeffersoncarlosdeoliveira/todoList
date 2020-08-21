<template>
    <div class="row">

        
        <div class="col-8">
            <br>
            <button v-if="!adicionar" @click="adicionarNovoTodo" :todoSelecionado="undefined" class="btn btn-primary float-right">Adicionar nova tarefa</button>
            <button v-else @click="salvarNovoTodo" class="btn btn-primary float-right">Salvar nova tarefa</button>
        </div>
        <div class="col-8">
            <h2>Lista de Tarefas</h2>
            
            <ul v-if="!adicionar" class="list-group list-group-flush">
                <ToDoListItem v-for="todo in todos" 
                :key="todo.id" 
                :todo="todo" 
                @selecionarTodo="todoSelecionado = $event"
                :class="aplicarClasseAtiva(todo)"
                @remove="todos.splice(todo, 1)"/>
            </ul>
            <form v-else>
                <div class="form-group">
                    <label for="formGroupExampleInput">Tarefa</label>
                    <input v-model="novoTodo"  type="text" class="form-control" id="formGroupExampleInput" placeholder="Insira o nome da tarefa">
                </div>
                <div class="form-group">
                    <label for="formGroupExampleInput2">Descrição</label>
                    <input v-model="descricaoNovoTodo" class="form-control" id="formGroupExampleInput2" placeholder="Insira a descrição da tarefa">
                </div>
            </form>
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
            ],
            /* Propriedade que valida se a div para Edição da tarefa será mostrada*/
            editar: false,
            todoSelecionado: undefined,
            adicionar: false,
            novoTodo:'',
            descricaoNovoTodo:'',
            proximoID:1
        }
    },
    created(){
        eventBus.$on('selecionarTodo',(todoSelecionado)=>{
            this.todoSelecionado = todoSelecionado
        }),
        eventBus.$on('atualizarTodo',this.atualizarTodo)
        eventBus.$on('excluirTodo',this.excluirTodo)
        eventBus.$on('cancelarEdicao',this.cancelarEdicao)
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
        },
        adicionarNovoTodo(){
            this.todoSelecionado = undefined
            this.editar =false
            this.adicionar =true
              
        },
        salvarNovoTodo(){
            this.todos.push({id:this.proximoID, titulo: this.novoTodo, descricao: this.descricaoNovoTodo,finalizada:false}) 
            this.adicionar =false
            this.novoTodo = '',
            this.descricaoNovoTodo ='',
            this.proximoID++
        },
        excluirTodo(todoExcluido){
            const indice = this.todos.findIndex(todo => todo.id === todoExcluido.id)
            this.todos.splice(indice, 1)
            this.todoSelecionado = undefined
        },
        cancelarEdicao(){
            this.todoSelecionado = undefined
            this.editar =false
        }
    }
}
</script>