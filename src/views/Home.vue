<template>
  <div class="home">
    <div class="p-my-">
      <h1 class="p-text-uppercase p-m-4">
        Gerenciamento de estoque de produtos
      </h1>
    </div>
    <div class="p-grid p-jc-center p-mt-4">
      <Card
        class="p-col-7 p-shadow-12"
        style="display: inline-block"
        id="tarefa-1"
      >
        <template #title>Tarefa 1</template>
        <template #content>
          <InputText
            v-model="tarefa1String"
            placeholder="String a ser buscada"
            id="tarefa1Input"
            @keypress.enter="tarefa1"
          />
          <Button
            v-tooltip.top="'Buscar vogal'"
            label="[GET]"
            @click="tarefa1"
            :loading="tarefa1Loading"
          ></Button>
          <div class="json-code-block p-mt-4">
            <pre><code><span class="comment">// Resposta obtida <span v-if="tarefa1Response.status"> ({{tarefa1Response.status}} - {{tarefa1Response.statusText}})</span></span>
<span class="comment" v-if="tarefa1Response.config">// {{tarefa1Response.config.baseURL.slice(0, -1)}}{{tarefa1Response.config.url}}</span>
{{ tarefa1Response.data }}
</code></pre>
          </div>
        </template>
      </Card>
    </div>
  </div>
  <Toast />
</template>

<script>
import axios from "axios";
axios.defaults.baseURL = process.env.VUE_APP_BACKEND_BASE;

export default {
  name: "Home",
  data() {
    return {
      tarefa1String: null,
      tarefa1Response: "",
      tarefa1Loading: false,
    };
  },
  methods: {
    // https://gist.github.com/EdCharbeneau/9552248
    isNullOrWhiteSpace(str) {
      return !str || str.length === 0 || /^\s*$/.test(str);
    },
    tarefa1() {
      if (this.isNullOrWhiteSpace(this.tarefa1String)) {
        this.$toast.add({
          severity: "warn",
          summary: "Atenção!",
          detail: "Preencha uma string válida para busca.",
          life: 3000,
        });
      } else {
        this.tarefa1Loading = true;
        axios
          .get(`/api/tarefa-1?string=${this.tarefa1String}`)
          .then((response) => {
            this.tarefa1Response = response;
            this.$toast.add({
              severity: "success",
              summary: "Sucesso!",
              detail: "Vogal obtida com sucesso!",
              life: 3000,
            });
            this.tarefa1Loading = false;
          })
          .catch((error) => {
            this.$toast.add({
              severity: "error",
              summary: `Erro! ${error.response.status} ${error.response.statusText}`,
              detail: error.message,
            });
          });
      }
    },
  },
};
</script>

<style>
.json-code-block {
  text-align: left !important;
  background-color: var(--surface-b);
  padding: 1rem;
  border-radius: 0.25rem;
}
.comment {
  color: var(--text-color-secondary);
}
#tarefa-1 {
  transition-duration: 0.5s;
}
#tarefa-1:focus-within {
  transform: scale(1.2);
}
#tarefa1Input {
  text-align: center;
}
</style>
