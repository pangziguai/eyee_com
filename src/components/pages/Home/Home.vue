<template>
    <div class="home">
        <Banner></Banner>
        <HomeBrands></HomeBrands>
        <HomeNews></HomeNews>
        <HomeHelp></HomeHelp>
        <HomeLimit></HomeLimit>
        <HomeShops></HomeShops>
        <HomeHot></HomeHot>
        <HomeCate></HomeCate>
    </div>
</template>
<script> 
    import Banner from './Banner.vue';
    import HomeBrands from './HomeBrands.vue';
    import HomeNews from './HomeNews.vue';
    import HomeHelp from './HomeHelp.vue';
    import HomeLimit from './HomeLimit.vue';
    import HomeShops from './HomeShops.vue';
    import HomeHot from './HomeHot.vue';
    import HomeCate from './HomeCate.vue';
    export default {
        name:'Home',
        components:{
            Banner,HomeBrands,HomeNews,HomeHelp,HomeLimit,HomeShops,HomeHot,HomeCate
        },
        created(){
            window.localStorage.removeItem('sele');
        }
    }
</script>