<template>
  <div class="home">
    <h1 class="p-text-uppercase">
      Gerenciamento de estoque de produtos
    </h1>
    <div class="p-grid p-jc-center p-mt-4">
      <Card class="p-col-5 p-shadow-12" id="tarefa-1">
        <template #title>Tarefa 1</template>
        <template #content>
          <div class="p-grid">
            <div class="p-col-8">
              <InputText
                v-model="tarefa1String"
                placeholder="String a ser buscada"
                style="width: 100%"
              />
            </div>
            <div class="p-col-4">
              <Button
                v-tooltip.top="'Buscar vogal'"
                label="[POST]"
                style="width: 100%"
                @click="tarefa1"
              ></Button>
            </div>
          </div>
          <div class="json-code-block">
            <pre><code><span class="comment">// Resposta obtida</span><br>{{ JSONfy(tarefa1Response) }}</code></pre>
          </div>
        </template>
      </Card>
    </div>
  </div>
  <Toast />
</template>

<script>
import axios from 'axios';
axios.defaults.baseURL =  process.env.VUE_APP_BACKEND_BASE;

export default {
  name: 'Home',
  data() {
    return {
      tarefa1String: null,
      tarefa1Response: '',
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
          severity: 'warn',
          summary: 'Atenção!',
          detail: 'Preencha uma string válida para busca.',
          life: 3000,
        });
      } else {
        axios
          .get(
            `/api/tarefa-1?string=${this.tarefa1String}`,
          )
          .then((response) => {
            this.tarefa1Response = response.data;
          });
      }
    },
    JSONfy(value) {
      return JSON.parse(JSON.stringify(value), null, 2);
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
</style>
