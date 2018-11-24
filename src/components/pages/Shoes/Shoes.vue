<template>
    <div class="shoes">
        <Search></Search>
        <Banner></Banner>
        <Main></Main>
        <Rec></Rec>
    </div>
</template>
<script> 
    import Search from './Shoes-search.vue';
    import Banner from './Shoes-banner.vue';
    import Main from './Shoes-main.vue';
    import Rec from './Shoes-rec.vue';
    export default {
        name:'Shoes',
        components:{
            Search,Banner,Main,Rec
        },
        methods:{
            created(){
            window.localStorage.removeItem('sele');
            }
        }
    }
</script>