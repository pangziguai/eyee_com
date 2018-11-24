<template>
    <div class="banner">
        <mt-swipe>
            <mt-swipe-item v-for='(item,index) in bannerList' :key='index'>
                <img v-lazy="item.url">
            </mt-swipe-item>
        </mt-swipe>
    </div>
</template>
<script> 
    import Vue from 'vue';
    import Axios from 'axios';
    import { Swipe, SwipeItem } from 'mint-ui';
    import 'mint-ui/lib/style.css';
    export default {
        name:'Shoes-banner',
        data(){
            return{
                bannerList:[]
            }
        },
        components: {
            'mt-swipe': Swipe,
            'mt-swipe-item': SwipeItem
        },
        methods:{
            getBannerData(){
                Axios.get('/api/capi/product/qiuxie/open/firstpageshow?os=0')
                .then((res)=>{
                    if(res.statusText == 'OK'){
                        this.bannerList = res.data.data.banners;  
                    }else{
                        console.log(res.statusText);
                    }
                })
                .catch((err)=>{
                    console.log(err);
                })
            }
        },
        created(){
            this.getBannerData();
        }
    }
</script>
<style lang='less' scoped>
    @import '../../../styles/main.less';
    .banner{
        .w(375);
        .h(125);
        img{
            width:100%;
            height:100%;
        }
    }
</style>