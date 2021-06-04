<template>
  <h2 class="p-text-uppercase p-text-left">Categorias de Produtos</h2>
  <Toolbar class="p-p-2">
    <template #left>
      <Button
        class="p-m-0 p-button-success"
        label="Categoria"
        icon="fas fa-plus"
        @click="openNewCategoryDialog"
      ></Button>
      <Button
        class="p-ml-2 p-button-success"
        label="Produto"
        icon="fas fa-plus"
        @click="openNewProductDialog"
      ></Button>
    </template>
    <template #right>
      <div class="p-inputgroup">
        <span class="p-inputgroup-addon"><i class="fas fa-layer-group" /></span>
        <Dropdown
          v-model="groupByOption"
          :options="groupByOptionList"
          optionLabel="label"
          optionValue="value"
          placeholder="Agrupar por"
          style="width: 12rem"
          :showClear="true"
          @change="changeGrouByOption($event)"
        />
      </div>
    </template>
  </Toolbar>
  <DataTable
    :value="products"
    class="p-datatable-sm"
    :rowGroupMode="groupByOptionSelection ? 'subheader' : ''"
    :groupRowsBy="
      groupByOptionSelection === 'supplier'
        ? 'supplier.id'
        : groupByOptionSelection === 'category'
        ? 'category.id'
        : 'id'
    "
    removableSort
    :sortField="dynamicSortField"
    :sortOrder="1"
    :paginator="true"
    :rows="13"
  >
    <Column header="#" field="id" headerStyle="width: 3rem" />
    <Column header="Nome" field="name" />
    <Column header="Quantidade" field="quantity">
      <template #body="product">
        <Tag
          :value="product.data.quantity"
          style="width: 4rem"
          :severity="
            product.data.quantity >= 15
              ? 'success'
              : product.data.quantity >= 10
              ? 'warning'
              : 'danger'
          "
        />
      </template>
    </Column>
    <Column header="Preço" field="price">
      <template #body="product">
        R$ {{ product.data.price.toFixed(2) }}
      </template>
    </Column>
    <Column
      field="supplier.name"
      header="Fornecedor"
      v-if="groupByOptionSelection != 'supplier'"
    />

    <Column
      field="category.name"
      header="Categoria"
      v-if="groupByOptionSelection != 'category'"
    />
    <Column>
      <template #body="product">
        <div class="p-grid p-jc-end">
          <Button
            class="
              p-button-icon-only
              p-button-rounded
              p-button-outlined
              p-button-help
              p-mx-1
            "
            icon="fas fa-edit"
            @click="editProduct(product.data)"
          ></Button>
          <Button
            class="
              p-button-icon-only
              p-button-rounded
              p-button-outlined
              p-button-danger
              p-mx-4
            "
            icon="fas fa-trash"
            @click="openDeleteProductDialog(product.data)"
          ></Button>
        </div>
      </template>
    </Column>
    <template #groupheader="product">
      <h3 class="p-text-uppercase p-text-bold p-my-2">
        <span v-if="groupByOptionSelection == 'supplier'"
          ><i class="fas fa-building" />
          {{ product.data.supplier.name }}
        </span>
        <span v-if="groupByOptionSelection == 'category'">
          <i class="fas fa-th" />
          {{ product.data.category.name }}
        </span>
      </h3>
    </template>
  </DataTable>

  <Dialog
    v-model:visible="newCategoryDialogVisibility"
    :modal="true"
    style="width: 40vw"
    @hide="closeNewCategoryDialog"
  >
    <template #header>
      <h3>Nova Categoria</h3>
    </template>

    <div class="p-fluid p-grid p-mt-2">
      <div class="p-field p-col-12">
        <span class="p-float-label">
          <InputText
            type="text"
            v-model="newCategoryData.name"
            maxlength="50"
            :class="{
              'p-invalid':
                newCategorySubmitted &&
                isNullOrWhiteSpace(newCategoryData.name),
            }"
          />
          <label>Nome da categoria</label>
        </span>
      </div>
    </div>

    <template #footer>
      <Button
        label="Não"
        icon="pi pi-times"
        class="p-button-text"
        @click="closeNewCategoryDialog"
      />
      <Button
        label="Sim"
        icon="pi pi-check"
        autofocus
        @click="validateNewCategory"
      />
    </template>
  </Dialog>

  <Dialog
    v-model:visible="newProductDialogVisibility"
    :modal="true"
    style="width: 40vw"
    @hide="closeNewProductDialog"
  >
    <template #header>
      <h3>Novo Produto</h3>
    </template>

    <div class="p-fluid p-grid p-mt-2">
      <div class="p-field p-col-12">
        <span class="p-float-label">
          <InputText
            type="text"
            v-model="newProductData.name"
            maxlength="50"
            :class="{
              'p-invalid':
                newProductSubmitted && isNullOrWhiteSpace(newProductData.name),
            }"
          />
          <label>Nome do produto</label>
        </span>
      </div>
    </div>
    <div class="p-fluid p-grid p-mt-2">
      <div class="p-field p-col-8">
        <span class="p-float-label">
          <InputNumber
            mode="currency"
            currency="BRL"
            locale="pt-BR"
            v-model="newProductData.price"
            :class="{
              'p-invalid':
                newProductSubmitted && isNullOrWhiteSpace(newProductData.price),
            }"
          />
          <label>Preço</label>
        </span>
      </div>
      <div class="p-field p-col-4">
        <span class="p-float-label">
          <InputNumber
            v-model="newProductData.quantity"
            mode="decimal"
            locale="pt-BR"
            :class="{
              'p-invalid':
                newProductSubmitted &&
                isNullOrWhiteSpace(newProductData.quantity),
            }"
          />
          <label>Quantidade</label>
        </span>
      </div>
    </div>
    <div class="p-fluid p-grid p-mt-2">
      <div class="p-field p-col-6">
        <span class="p-float-label">
          <Dropdown
            v-model="newProductData.supplier_id"
            :options="suppliers"
            optionLabel="name"
            optionValue="id"
            :class="{
              'p-invalid':
                newProductSubmitted &&
                isNullOrWhiteSpace(newProductData.supplier_id),
            }"
          ></Dropdown>
          <label>Fornecedores</label>
        </span>
      </div>
      <div class="p-field p-col-6">
        <span class="p-float-label">
          <Dropdown
            v-model="newProductData.category_id"
            :options="categories"
            optionLabel="name"
            optionValue="id"
            :class="{
              'p-invalid':
                newProductSubmitted &&
                isNullOrWhiteSpace(newProductData.category_id),
            }"
          ></Dropdown>
          <label>Categoria</label>
        </span>
      </div>
    </div>

    <template #footer>
      <Button
        label="Não"
        icon="pi pi-times"
        class="p-button-text"
        @click="closeNewProductDialog"
      />
      <Button
        label="Sim"
        icon="pi pi-check"
        autofocus
        @click="validateNewProduct"
      />
    </template>
  </Dialog>
  <Toast />
  <ConfirmDialog />
</template>

<script>
import axios from "axios";
axios.defaults.baseURL = process.env.VUE_APP_BACKEND_BASE;

export default {
  data() {
    return {
      dynamicSortField: null,

      products: [],
      suppliers: [],
      categories: [],

      newProductSubmitted: false,
      newProductDialogVisibility: false,
      newProductData: {},

      newCategorySubmitted: false,
      newCategoryDialogVisibility: false,
      newCategoryData: {},

      groupByOption: null,
      groupByOptionSelection: null,
      groupByOptionList: [
        { value: "supplier", label: "Fornecedor" },
        { value: "category", label: "Categoria" },
      ],
    };
  },
  mounted() {
    console.log(process.env.VUE_APP_BACKEND_BASE);
    console.log(process.env.VUE_APP_TITLE);
    this.getProducts();
    axios.get("/api/company/").then((response) => {
      this.suppliers = response.data;
    });
    axios.get("/api/category/").then((response) => {
      this.categories = response.data;
    });
  },
  methods: {
    getProducts() {
      this.products = [];
      axios.get("/api/product/").then((response) => {
        this.products = response.data;
      });
    },
    // https://gist.github.com/EdCharbeneau/9552248
    isNullOrWhiteSpace(str) {
      return !str || str.length === 0 || /^\s*$/.test(str);
    },
    changeGrouByOption(event) {
      this.dynamicSortField = `${event.value}.name`;
      this.groupByOption = event.value;
      this.groupByOptionSelection = event.value;
    },
    openNewProductDialog() {
      this.newProductDialogVisibility = true;
    },
    closeNewProductDialog() {
      this.newProductDialogVisibility = false;
      this.newProductData = {};
      this.newProductSubmitted = false;
    },
    openNewCategoryDialog() {
      this.newCategoryDialogVisibility = true;
    },
    closeNewCategoryDialog() {
      this.newCategoryDialogVisibility = false;
      this.newCategoryData = {};
      this.newCategorySubmitted = false;
    },
    openDeleteProductDialog(product) {
      this.$confirm.require({
        message: `Deseja realmente apagar o produto ${product.name}?`,
        header: "Tem certeza?",
        icon: "pi pi-exclamation-triangle",
        accept: () => {
          this.deleteProduct(product);
          this.getProducts();
        },
        reject: () => {
          //callback to execute when user rejects the action
        },
      });
    },
    deleteProduct(product) {
      axios
        .delete(`/api/product/${product.id}/`)
        .then(() => {
          this.$toast.add({
            severity: "success",
            summary: "Sucesso!",
            detail: `Produto apagado com sucesso!`,
          });
        })
        .catch((error) => {
          this.$toast.add({
            severity: "error",
            summary: `Erro! ${error.response.status} ${error.response.statusText}`,
            detail: error.message,
          });
        });
    },
    saveProduct() {
      if (this.newProductData.id) {
        axios
          .patch(`/api/product/${this.newProductData.id}/`, this.newProductData)
          .then((response) => {
            this.$toast.add({
              severity: "success",
              summary: "Sucesso!",
              detail: `Produto "${response.data.name}" atualizado`,
              life: 3000,
            });
            this.newProductData = {};
            this.newProductDialogVisibility = false;
            this.newProductSubmitted = false;
            this.getProducts();
          });
      } else {
        axios.post("/api/product/", this.newProductData).then((response) => {
          this.$toast.add({
            severity: "success",
            summary: "Sucesso!",
            detail: `Produto "${response.data.name}" cadastrado`,
            life: 3000,
          });
          this.newProductData = {};
          this.newProductDialogVisibility = false;
          this.newProductSubmitted = false;
          this.getProducts();
        });
      }
    },
    validateNewProduct() {
      this.newProductSubmitted = true;
      if (
        this.isNullOrWhiteSpace(this.newProductData.name) ||
        this.isNullOrWhiteSpace(this.newProductData.price) ||
        this.isNullOrWhiteSpace(this.newProductData.quantity) ||
        this.isNullOrWhiteSpace(this.newProductData.supplier_id) ||
        this.isNullOrWhiteSpace(this.newProductData.category_id)
      ) {
        this.$toast.add({
          severity: "warn",
          summary: "Atenção!",
          detail: "Preencha todos os campos",
          life: 3000,
        });
      } else {
        this.saveProduct();
      }
    },
    editProduct(product) {
      this.openNewProductDialog();
      this.newProductData.id = product.id;
      this.newProductData.name = product.name;
      this.newProductData.price = product.price;
      this.newProductData.quantity = product.quantity;

      this.newProductData.supplier_id = product.supplier.id;
      this.newProductData.category_id = product.category.id;
    },
    saveCategory() {
      axios.post("/api/category/", this.newCategoryData).then((response) => {
        this.$toast.add({
          severity: "success",
          summary: "Sucesso!",
          detail: `Categoria "${response.data.name}" cadastrada`,
          life: 3000,
        });
        this.categories.unshift(response.data);
        this.newCategoryData = {};
        this.newCategoryDialogVisibility = false;
        this.newCategorySubmitted = false;
      });
    },
    validateNewCategory() {
      this.newCategorySubmitted = true;
      if (this.isNullOrWhiteSpace(this.newCategoryData.name)) {
        this.$toast.add({
          severity: "warn",
          summary: "Atenção!",
          detail: "Preencha todos os campos",
          life: 3000,
        });
      } else {
        this.saveCategory();
      }
    },
  },
};
</script>
