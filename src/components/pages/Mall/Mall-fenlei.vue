<template>
    <div class="mall-fenlei">
        <div class="topSwiper">
            <div class="swiper-wrapper">
                <div class="swiper-slide" v-for='(item,index) in category' :key='index'>
                    <img v-lazy="item.data.logourl" alt="" />
                </div>
            </div>
            <div class="swiper-button-prev swiper-button-black"></div>
            <div class="swiper-button-next swiper-button-black"></div>
        </div>
        <Fenlei :current='selected' :currentId='nowId'></Fenlei>
    </div>
</template>
<script> 
    import Vue from 'vue';
    import Swiper from 'swiper';
    import Axios from 'axios';
    import Fenlei from './fenlei'
    export default {
        name:'Mall-fenlei',
        components:{
            Fenlei
        },
        data(){
            return {
                category:[],
                selected:0,
                nowId:'730645d9f6444d7db732bf153f4d8b37'
            }
        },
        methods:{
            getBannerData(){
                Axios.post('/api/api/Base/CategoryAll',{"version":"2.6.5","lang":"zh","os":"h5","deviceid":"h5","sign":"57fd100ffa0cffd84b5376b95c221620","param":"%7B%7D","extend":"/api/Base/CategoryAll"})
                .then((res)=>{
                    if(res.statusText == 'OK'){
                        for(let i = 0;i < res.data.data.length;i++){
                            let obj = {};
                            if(res.data.data[i].haschildren){
                                obj.data = res.data.data[i];
                                this.category.push(obj);
                            }
                        }
                        this.category[0].catId = '730645d9f6444d7db732bf153f4d8b37';
                        this.category[1].catId = '3f95dbadd82743138ca7c84a986d58d6';
                        this.category[2].catId = 'c06f0f1475c54069b06be76d2cb2de12';
                        this.category[3].catId = '3ade3929d6294007a34d5d4b22384b91';
                        this.category[4].catId = 'f7e8118eb8f64dcbabd4802a51f27557';
                        this.category[5].catId = '79f787b3cb4c4362af57e3bc23cec965';
                        this.category[6].catId = '7f3cdb69bd394cdba9f6a9151d8b7dd6';
                        this.category[7].catId = '888286e02de04ee9964d3f374ee096f3';
                        Vue.nextTick(()=>{
                            this.initSwiper(this.add,this.sub);
                        })
                    }else{
                        console.log(res.statusText);
                    }
                })
                .catch((err)=>{
                    console.log(err);
                })
            },
            add(){
                this.selected += 1;
                this.nowId = this.category[this.selected].catId;
            },
            sub(){
                this.selected -= 1;
                this.nowId = this.category[this.selected].catId;
            },
            initSwiper(fun1,fun2){
                var topSwiper = new Swiper ('.topSwiper', {
                    navigation: {
                      nextEl: '.swiper-button-next',
                      prevEl: '.swiper-button-prev',
                    },
                    on:{
                        slideNextTransitionEnd: function(){
                            fun1();
                        },
                        slidePrevTransitionEnd: function(){
                            fun2();
                        }
                    }
                })        
            }
        },
        mounted(){
            this.getBannerData();
        }
    }
</script>
<style lang='less' scoped>
    @import '../../../styles/main.less';
    @import '../../../../node_modules/swiper/dist/css/swiper.min.css';
    .topSwiper{
        overflow:hidden;
        position:relative;
        .swiper-slide{
            .w(375);
            .h(60);
            img{
                width: 100%;
            }
        }
        .swiper-button-prev,.swiper-button-next{
            .w(13);
            .h(22);
            margin-top: -10px;
            background-size: 13px 22px;
        }
    }
    .mall-fenlei{
        margin-top: 95px;
    }
</style>