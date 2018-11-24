<template>
    <div class="homeBrands">
        <div class="hotBrand">
            <div class="left">
                <p>热门品牌</p>
                <p>HOT BRANDS</p>
            </div>
            <div class="right" @click='toBrands'>
                <a href="#">更多品牌></a>
            </div>
        </div>
        <mt-swipe :auto="0" :continuous='false'>
            <mt-swipe-item>
                <div class='brand' v-for='(item,index) in homeBrands1' :key='index'><img v-lazy="item"></div>
            </mt-swipe-item>
            <mt-swipe-item>
                <div class='brand' v-for='(item,index) in homeBrands2' :key='index'><img v-lazy="item"></div>
            </mt-swipe-item>
        </mt-swipe>
        <div class="banner">
            <img v-lazy="banner">
        </div>
    </div>
    
</template>
<script> 
    import Vue from 'vue';
    import Axios from 'axios';
    import { Swipe, SwipeItem } from 'mint-ui';
    import 'mint-ui/lib/style.css';

    export default {
        name:'HomeBrands',
        data(){
            return {
                homeBrands1:[],
                homeBrands2:[],
                banner:''
            }
        },
        components: {
            'mt-swipe': Swipe,
            'mt-swipe-item': SwipeItem
        },
        methods:{
            getBrandsData(){
                Axios.post('/api/api/base/HomeFirst',{"version":"2.6.5","lang":"zh","os":"h5","deviceudid":"h5","sign":"1f3b2fb7ea77caf5827452c5fda5d593","param":"","extend":"/api/base/HomeFirst"})
                .then((res)=>{
                    if(res.statusText == 'OK'){
                        for(let i = 0;i < 9;i++){
                            this.homeBrands1.push(res.data.data.hotbrand[i].coverurl);
                        }
                        for(let i = 9;i < res.data.data.hotbrand.length;i++){
                            this.homeBrands2.push(res.data.data.hotbrand[i].coverurl);
                        }
                        this.banner = res.data.data.couponenter.banner;                
                    }else{
                        console.log(res.statusText);
                    }
                })
                .catch((err)=>{
                    console.log(err);
                })
            },
            toBrands(){
                this.$router.push('/mall/pinpai');
                window.localStorage.setItem('sele','品牌');
            }
        },
        created(){
            this.getBrandsData();
        }
    }
  
</script>
<style lang='less' scoped>
    @import '../../../styles/main.less';
    .mint-swipe{
        .w(375);
        .h(447);
        .padding(0,5,0,5);
        box-sizing: border-box;
        .brand{
            .w(111);
            .h(138);
            display:inline-block;
            .padding(0,5,0,5);
            img{
                width:100%;
                height:100%;
                border-radius: 10px;
            }
        }
    }
    .hotBrand{
        .w(375);
        .h(75);
        .padding(30,5,15,5);
        box-sizing: border-box;
        .fs(12);
        display:flex;
        justify-content:space-between;
        align-items:center;
        .left{
            border-left:2px solid @home-color;
            .padding(0,0,0,10);
            font-weight: bold;
        }
        .right a{
            color:@home-a;
        }
    }
    .banner{
        .w(375);
        .h(60);
        .padding(0,2,0,2);
        margin-top:10px;
        box-sizing: border-box;
        img{
            width:100%;
        }
    }
</style>