<template>
  <h2 class="p-text-uppercase p-text-left">Empresas Fornecedoras</h2>
  <Toolbar class="p-p-2">
    <template #left>
      <Button
        class="p-ml-2 p-button-success"
        label="Empresa"
        icon="fas fa-plus"
        @click="openNewCompanyDialog"
      ></Button>
    </template>
  </Toolbar>
  <DataTable
    :value="companies"
    class="p-datatable-sm"
    :paginator="true"
    :rows="13"
    v-model:expandedRows="expandedCompanies"
    dataKey="id"
    style="width: 100%"
  >
    <Column :expander="true" headerStyle="width: 3rem" />
    <Column header="#" field="id" headerStyle="width: 3rem" />
    <Column field="name" header="Nome" />
    <Column field="products.total_itens" header="Tota de Itens" />
    <Column field="products.total_quantity" header="Total de Estoque" />
    <template #expansion="company">
      <div style="">
        <h4>
          {{ company.data.products.total_itens }} produtos fornecidos por
          {{ company.data.name }}
        </h4>
        <DataTable :value="company.data.products.itens" class="p-datatable-sm">
          <Column field="id" header="#" headerStyle="width: 3rem"></Column>
          <Column field="name" header="Nome do produto"></Column>
          <Column header="Preço" field="price">
            <template #body="product">
              R$ {{ product.data.price.toFixed(2) }}
            </template>
          </Column>
          <Column field="quantity" header="Quantidade"></Column>
        </DataTable>
      </div>
    </template>
  </DataTable>
  <Dialog
    v-model:visible="newCompanyDialogVisibility"
    :modal="true"
    style="width: 40vw"
    @hide="closeNewCompanyDialog"
  >
    <template #header>
      <h3>Nova Empresa</h3>
    </template>

    <div class="p-fluid p-grid p-mt-2">
      <div class="p-field p-col-12">
        <span class="p-float-label">
          <InputText
            type="text"
            v-model="newCompanyData.name"
            maxlength="50"
            :class="{
              'p-invalid':
                newCompanySubmitted && isNullOrWhiteSpace(newCompanyData.name),
            }"
          />
          <label>Nome da empresa</label>
        </span>
      </div>
    </div>

    <template #footer>
      <Button
        label="Não"
        icon="pi pi-times"
        class="p-button-text"
        @click="closeNewCompanyDialog"
      />
      <Button
        label="Sim"
        icon="pi pi-check"
        autofocus
        @click="validateNewCompany"
      />
    </template>
  </Dialog>
  <Toast />
</template>

<script>
import axios from "axios";
axios.defaults.baseURL = process.env.VUE_APP_BACKEND_BASE;
export default {
  name: "Empresas.vue",
  data() {
    return {
      companies: [],
      expandedCompanies: [],

      newCompanySubmitted: false,
      newCompanyDialogVisibility: false,
      newCompanyData: {},
    };
  },
  mounted() {
    axios.get("/api/company/").then((response) => {
      this.companies = response.data;
    });
  },
  methods: {
    // https://gist.github.com/EdCharbeneau/9552248
    isNullOrWhiteSpace(str) {
      return !str || str.length === 0 || /^\s*$/.test(str);
    },
    openNewCompanyDialog() {
      this.newCompanyDialogVisibility = true;
    },
    closeNewCompanyDialog() {
      this.newCompanyDialogVisibility = false;
      this.newCompanyData = {};
      this.newCompanySubmitted = false;
    },
    validateNewCompany() {
      this.newCompanySubmitted = true;
      if (this.isNullOrWhiteSpace(this.newCompanyData.name)) {
        this.$toast.add({
          severity: "warn",
          summary: "Atenção!",
          detail: "Preencha todos os campos",
          life: 3000,
        });
      } else {
        this.saveCompany();
      }
    },
    saveCompany() {
      axios.post("/api/company/", this.newCompanyData).then((response) => {
        this.$toast.add({
          severity: "success",
          summary: "Sucesso!",
          detail: `Empresa "${response.data.name}" cadastrada`,
          life: 3000,
        });
        this.companies.unshift(response.data);
        this.newCompanyData = {};
        this.newCompanyDialogVisibility = false;
        this.newCompanySubmitted = false;
      });
    },
  },
};
</script>

<style scoped></style>
