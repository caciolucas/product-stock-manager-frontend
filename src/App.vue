<template>
  <Menubar :model="items">
    <template #start>
      <router-link to="/">
        <img
          alt="logo"
          src="../src/assets/logaplogo.png"
          height="50"
          class="p-mr-2"
      /></router-link>
    </template>
  </Menubar>
  <div id="container" class="p-center">
    <router-view />
  </div>
</template>
<script>
export default {
  data() {
    return {
      items: [
        {
          label: 'Produtos',
          icon: 'fas fa-boxes',
          to: '/produtos',
        },
        {
          label: 'Empresas',
          icon: 'fas fa-building',
          to: '/empresas',
        },
        {
          label: 'Relatórios',
          icon: 'fas fa-table',
          to: '/relatorio',
        },
      ],
    };
  },
};
</script>
<style>
body {
  background-color: var(--surface-a);
}
#container {
  width: 90vw;
  margin: auto;
}
.p-menubar .p-submenu-list {
  width: 18rem !important;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
