import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import PrimeVue from "primevue/config";
import axios from "axios";
axios.defaults.baseURL = process.env.VUE_APP_BACKEND_BASE;
import VueAxios from "vue-axios";

import "primevue/resources/themes/bootstrap4-light-blue/theme.css"; //theme
import "primevue/resources/primevue.min.css"; //core css
import "primeicons/primeicons.css"; //icons
import "primeflex/primeflex.css";

// import '@fortawesome/fontawesome-free'
// import '@fortawesome/fontawesome-svg-core'
// import '@fortawesome/vue-fontawesome'

import "@fortawesome/fontawesome-free/css/all.css";

import Tooltip from "primevue/tooltip";

import Card from "primevue/card";
import Tag from "primevue/tag";
import Button from "primevue/button";
import Dropdown from "primevue/dropdown";
import Timeline from "primevue/timeline";
import TabView from "primevue/tabview";
import TabPanel from "primevue/tabpanel";
import Dialog from "primevue/dialog";
import Toolbar from "primevue/toolbar";
import InputText from "primevue/inputtext";
import InputNumber from "primevue/inputnumber";
import Fieldset from "primevue/fieldset";
import ToastService from "primevue/toastservice";
import ConfirmationService from "primevue/confirmationservice";
import ConfirmDialog from "primevue/confirmdialog";
import Toast from "primevue/toast";
import Menubar from "primevue/menubar";
import DataTable from "primevue/datatable";
import Column from "primevue/column";

const app = createApp(App);

app.component("Card", Card);
app.component("Tag", Tag);
app.component("Button", Button);
app.component("Dropdown", Dropdown);
app.component("Timeline", Timeline);
app.component("TabView", TabView);
app.component("TabPanel", TabPanel);
app.component("Dialog", Dialog);
app.component("Toolbar", Toolbar);
app.component("InputText", InputText);
app.component("InputNumber", InputNumber);
app.component("Fieldset", Fieldset);
app.component("Toast", Toast);
app.component("ConfirmDialog", ConfirmDialog);
app.component("Menubar", Menubar);
app.component("DataTable", DataTable);
app.component("Column", Column);

app.use(PrimeVue, {
  ripple: true,
  locale: {
    yes: "Sim",
    startsWith: "Come??a com",
    contains: "Cont??m",
    notContains: "N??o cont??m",
    endsWith: "Termina com",
    equals: "Igual ??",
    notEquals: "Diferente de",
    noFilter: "Sem filtro",
    lt: "Menor que",
    lte: "Menor ou igual ??",
    gt: "Maior que",
    gte: "Maior ou igual ??",
    dateIs: "Data ??",
    dateIsNot: "Data n??o ??",
    dateBefore: "Data ?? antes",
    dateAfter: "Data ?? depois",
    clear: "Limpar",
    apply: "Aplicar",
    matchAll: "Corresponde ?? todos",
    matchAny: "Corresponde ?? qualquer",
    addRule: "Adicionar regra",
    removeRule: "Remover regra",
    accept: "Sim",
    reject: "N??o",
    choose: "Escolher",
    upload: "Carregar",
    cancel: "Cancelar",
    dayNames: [
      "Domingo",
      "Segunda",
      "Ter??a",
      "Quarta",
      "Quinta",
      "Sexta",
      "S??bado",
    ],
    dayNamesShort: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"],
    dayNamesMin: ["D", "S", "T", "Q", "Q", "S", "S"],
    monthNames: [
      "Janeiro",
      "Fevereiro",
      "Mar??o",
      "Abri",
      "Maior",
      "Junho",
      "Julho",
      "Agosto",
      "Setembro",
      "Outubro",
      "Novembro",
      "Dezembro",
    ],
    monthNamesShort: [
      "Jan",
      "Fev",
      "Mar",
      "Abr",
      "Mai",
      "Jun",
      "Jul",
      "Ago",
      "Set",
      "Out",
      "Nov",
      "Dez",
    ],
    today: "Hoje",
    weekHeader: "Sem",
    firstDayOfWeek: 0,
    dateFormat: "mm/dd/yy",
    weak: "Fraco",
    medium: "M??dio",
    strong: "Forte",
    passwordPrompt: "Insira uma senha",
    emptyFilterMessage: "Nenhum resultado encontrado",
    emptyMessage: "Sem op????es dispon??veis",
  },
});

app.use(VueAxios, axios); // ????
app.use(ToastService); //
app.use(ConfirmationService);
app.directive("tooltip", Tooltip);

app.use(router).mount("#app");
