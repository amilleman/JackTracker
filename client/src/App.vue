<template>
  <div>
    <div>
      <b-navbar style="padding-left: 15px" toggleable="lg" type="dark" variant="info">
        
        <b-navbar-brand :to="{ name: 'Reports'}">Jack Tracker <i class="fas fa-chart-line fa-lg"></i></b-navbar-brand>
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item :to="{ name: 'Home'}"><i class="far fa-list-alt fa-lg"></i></b-nav-item>
            <b-nav-item :to="{ name: 'Diapers'}"><i class="fas fa-toilet fa-lg"></i></b-nav-item>
            <b-nav-item :to="{ name: 'Feeds'}"><i class="fas fa-utensils fa-lg"></i></b-nav-item>
            <b-nav-item :to="{ name: 'Naps'}"><i class="fas fa-bed fa-lg"></i></b-nav-item>
            <b-nav-item :to="{ name: 'Meds'}"><i class="fas fa-prescription-bottle-alt fa-lg"></i></b-nav-item>
          </b-navbar-nav>
        </b-collapse>

      </b-navbar>
    </div>
    <b-container fluid>
      <router-view/>
    </b-container>
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
