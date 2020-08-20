import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

export const eventBus = new Vue({
  methods:{

    /*
      Método que captura a tarefa selecionada através do botão SELECIONAR
    */
    selecionarTodo(todoSelecionado){
      this.$emit('selecionarTodo',todoSelecionado)
    },
    /*
      Método que salva a alteração feita.
    */ 
    atualizarTodo(todoAtualizado){
      this.$emit('atualizarTodo',todoAtualizado)
    },
    excluirTodo(todoExcluido){
      this.$emit('excluirTodo',todoExcluido)
    },
    cancelarEdicao(){
      this.$emit('cancelarEdicao')
    }

  }
})

new Vue({
  render: h => h(App),
}).$mount('#app') // Onde minha instânciaserá montada
