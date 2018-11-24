<template>
    <div class="banner">
        <div class="swiper-container1">
            <div class="nvaSearch">
                <img src="https://files.eyee.com/static/img/search_white.png" alt="" />
            </div>
            <div class="swiper-wrapper">
                <div class="swiper-slide" v-for='(item,index) in bannerList' :key='index'>
                    <img v-lazy="item">
                </div>
            </div>
            <div class="swiper-scrollbar"></div>
        </div>
    </div>
   
</template>
<script> 
    import Vue from 'vue';
    import Swiper from 'swiper';
    import Axios from 'axios';
    export default {
        name:'Banner',
        data(){
            return {
                bannerList:[]
            }
        },
        methods:{
            getBannerData(){
                Axios.post('/api/api/base/HomeFirst',{"version":"2.6.5","lang":"zh","os":"h5","deviceudid":"h5","sign":"1f3b2fb7ea77caf5827452c5fda5d593","param":"","extend":"/api/base/HomeFirst"})
                .then((res)=>{
                    if(res.statusText == 'OK'){
                        let dataLength = res.data.data.flash.length;
                        for(let i = 0;i < dataLength;i++){
                            this.bannerList.push(res.data.data.flash[i].picurl);
                        };
                        Vue.nextTick(()=>{
                            this.initSwiper();
                        })                    
                    }else{
                        console.log(res.statusText);
                    }
                })
                .catch((err)=>{
                    console.log(err);
                })
            },
            initSwiper(){
                var mySwiper1 = new Swiper ('.swiper-container1', {
                    autoplay:true,
                    scrollbar: {
                        el: '.swiper-scrollbar',
                    },
                })        
            }
        },
        created(){
            this.getBannerData();
        }
    }
  
</script>
<style lang='less' scoped>
    @import '../../../../node_modules/swiper/dist/css/swiper.min.css';
    @import '../../../styles/main.less';
    .swiper-container1{
        overflow: hidden;
    }
    .swiper-wrapper img{
        .w(375);
        .h(300);
    }
    .nvaSearch{
        position: fixed;
        display: flex;
        align-items:center;
        justify-content:center;
        top:11px;
        left:11px;
        background-color: rgba(0,0,0,.3);
        z-index:11;
        .w(35);
        .h(35);
        border-radius: 50%;
        img{
            .w(20);
        }
    }
</style>