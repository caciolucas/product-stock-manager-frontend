<template>
  <h2 class="p-text-uppercase p-text-left">Relatório</h2>
  <TabView>
    <TabPanel>
      <template #header>
        <i class="fas fa-list-alt"></i>
        <span class="p-ml-1">Estoque por categoria</span>
      </template>
      <DataTable
        :value="categories"
        class="p-datatable-sm"
        :paginator="true"
        :rows="13"
        v-model:expandedRows="expandedCategories"
        dataKey="id"
        ref="categoriesTable"
        style="width: 100%"
      >
        <template #header>
          <div class="p-d-flex p-jc-between p-ai-center">
            <h3 class="p-m-0">Categorias</h3>
            <Button
              icon="pi pi-external-link"
              label="Export"
              class="p-button-info"
              @click="exportCategories($event)"
            />
          </div>
        </template>
        <Column :expander="true" headerStyle="width: 3rem" />
        <Column field="id" header="#" headerStyle="width: 3rem" />
        <Column field="name" header="Nome" />
        <Column field="products.total_itens" header="Total de Itens" />
        <Column field="products.total_quantity" header="Total de estoque" />
        <template #expansion="category">
          <div style="">
            <DataTable
              :value="category.data.products.itens"
              class="p-datatable-sm"
            >
              <template #header>
                <h4>
                  {{ category.data.products.total_itens }} produtos da categoria
                  {{ category.data.name }}
                </h4>
              </template>
              <Column field="id" header="#" headerStyle="width: 3rem"></Column>
              <Column field="name" header="Nome do produto"></Column>
              <Column field="price" header="Preço">
                <template #body="product">
                  R$ {{ product.data.price.toFixed(2) }}
                </template>
              </Column>
              <Column field="quantity" header="Quantidade"></Column>
            </DataTable>
          </div>
        </template>
      </DataTable>
    </TabPanel>
    <TabPanel>
      <template #header>
        <i class="fas fa-box-open"></i>
        <span class="p-ml-1">Produtos em falta</span>
      </template>
      <DataTable
        :value="missingProducts"
        class="p-datatable-sm"
        :paginator="true"
        :rows="13"
        dataKey="id"
        ref="missingProductsTable"
        style="width: 100%"
      >
        <template #header>
          <div class="p-d-flex p-jc-between p-ai-center">
            <h3 class="p-m-0">Produtos em Falta</h3>
            <Button
              icon="pi pi-external-link"
              label="Export"
              class="p-button-info"
              @click="exportMissingProducts($event)"
            />
          </div>
        </template>
        <Column field="id" header="#" headerStyle="width: 3rem" />
        <Column field="name" header="Nome" />
        <Column field="price" header="Preço" />
        <Column field="supplier.name" header="Fornecedor" />
        <Column field="category.name" header="Categoria" />
        <Column field="quantity" header="Quantidade" :exportable="false" />
      </DataTable>
    </TabPanel>
    <TabPanel>
      <template #header>
        <i class="fas fa-pallet"></i>
        <span class="p-ml-1">Fornecedores sem estoque</span>
      </template>
      <DataTable
        :value="suppliersMissingStock"
        class="p-datatable-sm"
        :paginator="true"
        :rows="13"
        dataKey="id"
        ref="suppliersMissingStockTable"
        style="width: 100%"
        v-model:expandedRows="expandedSuppliersMissingStock"
      >
        <template #header>
          <div class="p-d-flex p-jc-between p-ai-center">
            <h3 class="p-m-0">Fornecedores com falta de estoque</h3>
            <Button
              icon="pi pi-external-link"
              label="Export"
              class="p-button-info"
              @click="exportSuppliersMissingStock($event)"
            />
          </div>
        </template>
        <Column :expander="true" headerStyle="width: 3rem" />
        <Column field="id" header="#" headerStyle="width: 3rem" />
        <Column field="name" header="Nome" />
        <template #expansion="company">
          <DataTable
            :value="
              company.data.products.itens.filter(
                (product) => product.quantity == 0
              )
            "
          >
            <Column field="id" header="#" headerStyle="width: 3rem"></Column>
            <Column field="name" header="Nome"></Column>
            <Column field="category.name" header="Category"></Column>
            <Column field="quantity" header="Quantidade"></Column>
            <Column field="price" header="Preço">
              <template #body="product">
                R$ {{ product.data.price.toFixed(2) }}
              </template>
            </Column>
          </DataTable>
        </template>
      </DataTable>
    </TabPanel>
  </TabView>
</template>

<script>
import axios from "axios";
axios.defaults.baseURL = process.env.VUE_APP_BACKEND_BASE;

export default {
  name: "Relatorio",
  data() {
    return {
      categories: [],
      expandedCategories: [],

      missingProducts: [],

      suppliersMissingStock: [],
      expandedSuppliersMissingStock: [],
    };
  },
  mounted() {
    axios.get("/api/category/").then((response) => {
      this.categories = response.data;
    });
    axios.get("/api/product/?quantity=0").then((response) => {
      this.missingProducts = response.data;
    });
    axios.get("/api/company/missing-stock/").then((response) => {
      this.suppliersMissingStock = response.data;
    });
  },
  methods: {
    exportCategories() {
      this.$refs.categoriesTable.exportCSV();
    },
    exportMissingProducts() {
      this.$refs.missingProductsTable.exportCSV();
    },
    exportSuppliersMissingStock() {
      this.$refs.suppliersMissingStockTable.exportCSV();
    },
  },
};
</script>

<style scoped></style>
