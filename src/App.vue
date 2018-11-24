<template>
  <div id="app">
      <router-view></router-view>
      <Footer></Footer>
  </div>
</template>

<script>
  import Home from './components/pages/Home/Home.vue';
  import Footer from './components/commons/Footer/Footer.vue';
  import Information from './components/pages/Information/Information.vue';
  import Shoes from './components/pages/Shoes/Shoes.vue';
  import Mall from './components/pages/Mall/Mall.vue';
  export default {
    name: 'App',
    data(){
      return{
        name:'app'
      }
    },
    components:{
      Home,Footer,Information,Shoes,Mall
    }
  }
</script>

<style>
</style>
